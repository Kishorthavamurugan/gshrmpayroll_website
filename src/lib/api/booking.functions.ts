import { z } from "zod";

// Input validation schema using Zod
const BookingInputSchema = z.object({
  name: z.string().min(1, "Full Name is required").trim(),
  company: z.string().min(1, "Company Name is required").trim(),
  email: z.string().email("Invalid work email address").trim().toLowerCase(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").trim(),
  employees: z.string().min(1, "Number of employees is required").trim(),
});

type BookingData = z.infer<typeof BookingInputSchema>;

export type DemoRequestStatus =
  | "Pending"
  | "Contacted"
  | "Demo Scheduled"
  | "Demo Completed"
  | "Cancelled";

export interface DemoRequest {
  id: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  employees: string;
  status: DemoRequestStatus;
  createdAt: string;
  updatedAt: string;
}

const LOCAL_STORAGE_KEY = "gshrm_demo_requests";

const SEED_REQUESTS: DemoRequest[] = [
  {
    id: "req_05gkl22z3_1783603649244",
    fullName: "arjun",
    company: "K S Rangasamy Collage of Technology",
    email: "yuj@gmail.com",
    phone: "+917010584360",
    employees: "1 – 25",
    status: "Pending",
    createdAt: "2026-07-09T13:27:29.244Z",
    updatedAt: "2026-07-09T13:27:29.244Z"
  },
  {
    id: "req_6q2sj58rk_1783664943887",
    fullName: "arjun",
    company: "K S Rangasamy Collage of Technology",
    email: "jsxb@gmail.com",
    phone: "+917010584360",
    employees: "1 – 25",
    status: "Pending",
    createdAt: "2026-07-10T06:29:03.887Z",
    updatedAt: "2026-07-10T06:29:03.887Z"
  }
];

// Helper to get requests from localStorage
function getLocalDemoRequests(): DemoRequest[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SEED_REQUESTS, null, 2));
    return SEED_REQUESTS;
  }
  try {
    return JSON.parse(stored) as DemoRequest[];
  } catch {
    return SEED_REQUESTS;
  }
}

// Helper to save requests to localStorage
function saveLocalDemoRequests(requests: DemoRequest[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requests, null, 2));
  }
}

// Memory cache for rate limiting by IP (mock client-side)
const lastRequestTimeKey = "gshrm_last_request_time";
function checkRateLimit(): boolean {
  if (typeof window === "undefined") return true;
  const now = Date.now();
  const stored = localStorage.getItem(lastRequestTimeKey);
  if (stored) {
    const lastTime = parseInt(stored, 10);
    if (now - lastTime < 5000) { // 5 seconds rate limit client-side
      return false;
    }
  }
  localStorage.setItem(lastRequestTimeKey, now.toString());
  return true;
}

function isDuplicateRequest(email: string): boolean {
  const requests = getLocalDemoRequests();
  const normalizedEmail = email.trim().toLowerCase();
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  return requests.some(
    (r) =>
      r.email === normalizedEmail &&
      new Date(r.createdAt).getTime() > oneDayAgo &&
      r.status !== "Cancelled"
  );
}

export const bookDemo = async (args: { data: BookingData }) => {
  const { data } = args;
  const errors: string[] = [];
  const logs: string[] = [];

  // Validate data client-side
  const parseResult = BookingInputSchema.safeParse(data);
  if (!parseResult.success) {
    throw new Error(parseResult.error.errors.map(e => e.message).join(", "));
  }

  // Rate Limiting
  if (!checkRateLimit()) {
    throw new Error("Too many requests. Please wait a few seconds before submitting again.");
  }

  // Duplicate Check
  if (isDuplicateRequest(data.email)) {
    throw new Error("A demo request for this email has already been submitted in the last 24 hours.");
  }

  // Save to LocalStorage
  const requests = getLocalDemoRequests();
  const newRequest: DemoRequest = {
    id: `req_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`,
    fullName: data.name,
    company: data.company,
    email: data.email,
    phone: data.phone,
    employees: data.employees,
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  requests.push(newRequest);
  saveLocalDemoRequests(requests);
  logs.push(`Demo request successfully saved with ID: ${newRequest.id}`);

  // Send request to serverless API
  try {
    const response = await fetch("/api/book-demo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        logs.push(...(result.logs || []));
      } else {
        errors.push(result.error || "Failed to send email");
        if (result.logs) logs.push(...result.logs);
      }
    } else {
      const errorText = await response.text();
      errors.push(`Server error: ${errorText}`);
    }
  } catch (err: any) {
    console.error("Failed to trigger serverless email endpoint:", err);
    logs.push("Could not contact serverless function. Enquiry saved locally only.");
  }

  return {
    success: errors.length === 0,
    logs,
    errors: errors.length > 0 ? errors : null,
    requestId: newRequest.id,
  };
};

export const getDemoRequestsList = async () => {
  const requests = getLocalDemoRequests();
  // Sort by createdAt descending
  return requests.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const updateDemoRequestStatusFn = async (args: { data: { id: string; status: string } }) => {
  const { id, status } = args.data;
  const requests = getLocalDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return null;

  requests[index].status = status as DemoRequestStatus;
  requests[index].updatedAt = new Date().toISOString();

  saveLocalDemoRequests(requests);
  return requests[index];
};

export const deleteDemoRequestFn = async (args: { data: { id: string } }) => {
  const { id } = args.data;
  const requests = getLocalDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return false;

  requests.splice(index, 1);
  saveLocalDemoRequests(requests);
  return true;
};

export const deleteMultipleDemoRequestsFn = async (args: { data: { ids: string[] } }) => {
  const { ids } = args.data;
  const requests = getLocalDemoRequests();
  const filtered = requests.filter((r) => !ids.includes(r.id));
  if (filtered.length === requests.length) return false;

  saveLocalDemoRequests(filtered);
  return true;
};

export const deleteAllDemoRequestsFn = async () => {
  saveLocalDemoRequests([]);
  return true;
};

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
