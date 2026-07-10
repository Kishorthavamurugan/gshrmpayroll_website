import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getServerConfig } from "../config.server";
import {
  createDemoRequest,
  getDemoRequests as dbGetDemoRequests,
  updateDemoRequestStatus as dbUpdateDemoRequestStatus,
  isDuplicateRequest,
  DemoRequestStatus,
  deleteDemoRequest as dbDeleteDemoRequest,
  deleteMultipleDemoRequests as dbDeleteMultipleDemoRequests,
  deleteAllDemoRequests as dbDeleteAllDemoRequests,
} from "./db.server";

// Input validation schema using Zod
const BookingInputSchema = z.object({
  name: z.string().min(1, "Full Name is required").trim(),
  company: z.string().min(1, "Company Name is required").trim(),
  email: z.string().email("Invalid work email address").trim().toLowerCase(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").trim(),
  employees: z.string().min(1, "Number of employees is required").trim(),
});

type BookingData = z.infer<typeof BookingInputSchema>;

// Memory cache for rate limiting by IP (max 5 requests per hour per IP)
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitTime = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const record = ipRequestCounts.get(ip);
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + limitTime });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export const bookDemo = createServerFn({ method: "POST" })
  .validator(BookingInputSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();
    const errors: string[] = [];
    const logs: string[] = [];

    // --- 1. RATE LIMITING ---
    const clientIp = getRequestIP({ xForwardedFor: true }) || "unknown";
    if (!checkRateLimit(clientIp)) {
      throw new Error("Too many requests from this IP. Please try again after an hour.");
    }

    // --- 2. DUPLICATE CHECK ---
    const isDuplicate = await isDuplicateRequest(data.email);
    if (isDuplicate) {
      throw new Error("A demo request for this email has already been submitted in the last 24 hours.");
    }

    // --- 3. SAVE TO DATABASE ---
    let savedRequest;
    try {
      savedRequest = await createDemoRequest({
        fullName: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        employees: data.employees,
      });
      logs.push(`Demo request successfully saved with ID: ${savedRequest.id}`);
    } catch (dbErr: any) {
      console.error("Database save failed:", dbErr);
      throw new Error("Failed to save demo request to the database. Please try again.");
    }

    // --- 4. SEND EMAIL NOTIFICATIONS (via Resend) ---
    const date = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    const time = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

    if (config.smtpUser && config.smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          pool: true,
          host: config.smtpHost,
          port: config.smtpPort,
          secure: config.smtpSecure,
          auth: {
            user: config.smtpUser,
            pass: config.smtpPass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        // Send Notification Email to Admin(s) - send concurrently in parallel to speed up requests
        const adminEmailHtml = getAdminEmailHtml(data, date, time);
        const adminEmails = typeof config.adminEmail === "string" 
          ? config.adminEmail.split(",").map(e => e.trim()).filter(Boolean)
          : [config.adminEmail];

        const adminMailPromises = adminEmails.map(async (email) => {
          try {
            await transporter.sendMail({
              from: `"GSHRM Payroll" <${config.smtpUser}>`,
              to: email,
              subject: "🚀 New Demo Request - GSHRM Payroll",
              html: adminEmailHtml,
            });
            return { email, success: true };
          } catch (err: any) {
            console.error(`Failed to send admin notification to ${email} via SMTP:`, err);
            return { email, success: false, error: err.message || err };
          }
        });

        // Customer confirmation email promise
        const customerMailPromise = (async () => {
          try {
            const customerEmailHtml = getCustomerEmailHtml(data);
            await transporter.sendMail({
              from: `"GSHRM Payroll" <${config.smtpUser}>`,
              to: data.email,
              subject: "Thank You for Requesting a Live Demo",
              html: customerEmailHtml,
            });
            return { success: true };
          } catch (customerErr: any) {
            console.error("Failed to send customer confirmation via SMTP:", customerErr);
            return { success: false, error: customerErr.message || customerErr };
          }
        })();

        // Await all emails in parallel for high speed
        const [adminResults, customerResult] = await Promise.all([
          Promise.all(adminMailPromises),
          customerMailPromise,
        ]);

        for (const res of adminResults) {
          if (res.success) {
            logs.push(`Admin notification email sent successfully to ${res.email} via Gmail SMTP.`);
          } else {
            logs.push(`Failed to send admin notification to ${res.email} via SMTP: ${res.error}`);
          }
        }

        if (customerResult.success) {
          logs.push("Customer confirmation email sent successfully via Gmail SMTP.");
        } else {
          logs.push(`Failed to send customer confirmation via SMTP: ${customerResult.error}`);
        }
      } catch (err: any) {
        console.error("Gmail SMTP Email Sending Failed:", err);
        logs.push(`Email delivery warning (SMTP): ${err.message || err}`);
      }
    } else if (config.resendApiKey) {
      try {
        const isSandbox = config.resendFromEmail.includes("onboarding@resend.dev");

        // Send Notification Email to Admin(s) - send individually to isolate failures
        const adminEmailHtml = getAdminEmailHtml(data, date, time);
        const adminEmails = typeof config.adminEmail === "string" 
          ? config.adminEmail.split(",").map(e => e.trim()).filter(Boolean)
          : [config.adminEmail];

        for (const email of adminEmails) {
          try {
            await sendResendEmail({
              apiKey: config.resendApiKey,
              from: `GSHRM Payroll <${config.resendFromEmail}>`,
              to: email,
              subject: "🚀 New Demo Request - GSHRM Payroll",
              html: adminEmailHtml,
            });
            logs.push(`Admin notification email sent successfully to ${email} via Resend.`);
          } catch (err: any) {
            console.error(`Failed to send admin notification to ${email}:`, err);
            logs.push(`Failed to send admin notification to ${email}: ${err.message || err}`);
            
            // If the custom domain email failed to send (likely due to verification),
            // and the recipient is the registered account owner, attempt sandbox fallback.
            if (email === "kishorthavamurugan@gmail.com" && !config.resendFromEmail.includes("onboarding@resend.dev")) {
              try {
                console.log(`Attempting fallback to onboarding@resend.dev for ${email}...`);
                await sendResendEmail({
                  apiKey: config.resendApiKey,
                  from: `GSHRM Payroll <onboarding@resend.dev>`,
                  to: email,
                  subject: "🚀 New Demo Request - GSHRM Payroll (Fallback)",
                  html: adminEmailHtml,
                });
                logs.push(`Admin notification fallback email sent successfully to ${email} via onboarding@resend.dev.`);
              } catch (fallbackErr: any) {
                console.error(`Fallback failed for ${email}:`, fallbackErr);
              }
            }
          }
        }

        // Send Confirmation Email to Customer (only if using a custom verified domain)
        if (!isSandbox) {
          const customerEmailHtml = getCustomerEmailHtml(data);
          await sendResendEmail({
            apiKey: config.resendApiKey,
            from: `GSHRM Payroll <${config.resendFromEmail}>`,
            to: data.email,
            subject: "Thank You for Requesting a Live Demo",
            html: customerEmailHtml,
          });
          logs.push("Customer confirmation email sent successfully via Resend.");
        } else {
          logs.push(
            `[Resend Sandbox Mode] Customer email confirmation skipped (can only send to verified domain or owner). Details logged to console.`
          );
          console.log("Mock Customer Email Confirmation:\n", getCustomerEmailHtml(data));
        }
      } catch (err: any) {
        console.error("Resend Email Sending Failed:", err);
        logs.push(`Email delivery warning: ${err.message || err}`);
      }
    } else {
      // Mock log for development without credentials
      logs.push("Resend API Key not set. Notification emails logged to console.");
      console.log(`
====== [MOCK EMAIL: ADMIN NOTIFICATION] ======
From: GSHRM Payroll <${config.resendFromEmail}>
To: ${config.adminEmail}
Subject: 🚀 New Demo Request - GSHRM Payroll
Content:
${getAdminEmailText(data, date, time)}
==============================================
      `);
      console.log(`
====== [MOCK EMAIL: CUSTOMER CONFIRMATION] ======
From: GSHRM Payroll <${config.resendFromEmail}>
To: ${data.email}
Subject: Thank You for Requesting a Live Demo
Content:
${getCustomerEmailText(data)}
=================================================
      `);
    }

    return {
      success: errors.length === 0,
      logs,
      errors: errors.length > 0 ? errors : null,
      requestId: savedRequest.id,
    };
  });

export const getDemoRequestsList = createServerFn({ method: "GET" })
  .handler(async () => {
    return await dbGetDemoRequests();
  });

export const updateDemoRequestStatusFn = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      status: z.enum(["Pending", "Contacted", "Demo Scheduled", "Demo Completed", "Cancelled"]),
    })
  )
  .handler(async ({ data }) => {
    return await dbUpdateDemoRequestStatus(data.id, data.status as DemoRequestStatus);
  });

export const deleteDemoRequestFn = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    return await dbDeleteDemoRequest(data.id);
  });

export const deleteMultipleDemoRequestsFn = createServerFn({ method: "POST" })
  .validator(z.object({ ids: z.array(z.string()) }))
  .handler(async ({ data }) => {
    return await dbDeleteMultipleDemoRequests(data.ids);
  });

export const deleteAllDemoRequestsFn = createServerFn({ method: "POST" })
  .handler(async () => {
    return await dbDeleteAllDemoRequests();
  });


// --- API CLIENT HELPERS (fetch-based to avoid extra dependencies) ---

interface EmailPayload {
  apiKey: string;
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}

async function sendResendEmail({ apiKey, from, to, subject, html }: EmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: typeof to === "string" && to.includes(",")
        ? to.split(",").map((email) => email.trim())
        : to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API Error (${response.status}): ${errText}`);
  }
}

// --- HTML & TEXT EMAIL TEMPLATES (Professional Layouts) ---

function getAdminEmailHtml(data: BookingData, date: string, time: string) {
  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0052CC; padding: 32px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">GSHRM Payroll</h2>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">New Demo Request Received</p>
      </div>
      <div style="padding: 32px 24px; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.5; margin-top: 0; color: #334155;">Hello Team,</p>
        <p style="font-size: 15px; line-height: 1.5; color: #475569; margin-bottom: 24px;">A new visitor has requested a live demo of GSHRM Payroll. Here are the submission details:</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b; width: 150px;">Full Name</td>
              <td style="padding: 12px 0; font-weight: 700; color: #0f172a;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Company</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;">${data.company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Work Email</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;"><a href="mailto:${data.email}" style="color: #0052CC; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Phone / WhatsApp</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;"><a href="tel:${data.phone}" style="color: #0052CC; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Employees</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;">${data.employees}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Date</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #64748b;">Time</td>
              <td style="padding: 12px 0; font-weight: 500; color: #0f172a;">${time}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 16px; text-align: center;">
          <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 24px; border-radius: 6px; background-color: #0052CC; color: white; text-decoration: none; font-size: 14px; font-weight: 600; text-align: center; margin-right: 8px;">Reply by Email</a>
          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; padding: 12px 24px; border-radius: 6px; background-color: #25D366; color: white; text-decoration: none; font-size: 14px; font-weight: 600; text-align: center;">WhatsApp Lead</a>
        </div>
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.5;">
        This email was generated automatically from the GSHRM Payroll website.
      </div>
    </div>
  `;
}

function getAdminEmailText(data: BookingData, date: string, time: string) {
  return `New Demo Booking Request Lead:\nName: ${data.name}\nCompany: ${data.company}\nEmail: ${data.email}\nPhone: ${data.phone}\nEmployees: ${data.employees}\nDate: ${date}\nTime: ${time}`;
}

function getCustomerEmailHtml(data: BookingData) {
  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0052CC; padding: 32px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">GSHRM Payroll</h2>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Smart Payroll & HRMS Software</p>
      </div>
      <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">
        <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hello ${data.name},</p>
        <p style="font-size: 15px; color: #334155; margin-bottom: 20px;">Thank you for requesting a live demo of GSHRM Payroll.</p>
        <p style="font-size: 15px; color: #334155; margin-bottom: 20px;">We have successfully received your request.</p>
        <p style="font-size: 15px; color: #334155; margin-bottom: 24px;">Our sales team will review your request and contact you shortly to schedule your personalized demonstration.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">Your Submitted Details</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 140px;">Full Name</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${data.name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${data.company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Email</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${data.email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: 600; color: #64748b;">Employees</td>
              <td style="padding: 10px 0; font-weight: 500; color: #0f172a;">${data.employees}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 14px; color: #475569; margin-bottom: 24px;">If you have any urgent questions, feel free to reply to this email.</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 24px;">Thank you for choosing GSHRM Payroll.</p>
        
        <div style="font-size: 14px; color: #334155; font-weight: 600;">
          Regards,<br>
          <span style="color: #0052CC;">GSHRM Payroll Team</span>
        </div>
      </div>
      <div style="border-top: 1px solid #e2e8f0; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} GSHRM Payroll. Bengaluru, Karnataka, India
      </div>
    </div>
  `;
}

function getCustomerEmailText(data: BookingData) {
  return `Hello ${data.name},\n\nThank you for requesting a live demo of GSHRM Payroll.\n\nWe have successfully received your request.\n\nOur sales team will review your request and contact you shortly to schedule your personalized demonstration.\n\nYour submitted details:\n- Full Name: ${data.name}\n- Company: ${data.company}\n- Email: ${data.email}\n- Phone: ${data.phone}\n- Employees: ${data.employees}\n\nIf you have any urgent questions, feel free to reply to this email.\n\nThank you for choosing GSHRM Payroll.\n\nRegards,\nGSHRM Payroll Team`;
}
