import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const data = req.body;
  if (!data || !data.email) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }

  // Retrieve environment variables from the server environment
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpSecure = process.env.SMTP_SECURE !== "false";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : undefined;

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL || "info@greatsupports.in";
  const adminEmail = process.env.ADMIN_EMAIL || "kishorthavamurugan@gmail.com, masskishor143l@gmail.com, info@greatsupports.in, ganishv2@gmail.com, shivagk729@hotmail.com";

  const logs: string[] = [];
  const errors: string[] = [];

  const date = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  const time = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1. SMTP Sending (Gmail)
  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        pool: true,
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const adminEmailHtml = getAdminEmailHtml(data, date, time);
      const adminEmails = adminEmail.split(",").map((e: string) => e.trim()).filter(Boolean);

      // Send to admin(s) in parallel
      await Promise.all(
        adminEmails.map(async (email: string) => {
          await transporter.sendMail({
            from: `"GSHRM Payroll" <${smtpUser}>`,
            to: email,
            subject: "🚀 New Demo Request - GSHRM Payroll",
            html: adminEmailHtml,
          });
          logs.push(`Admin email sent to ${email} via SMTP.`);
        })
      );

      // Send to customer
      const customerEmailHtml = getCustomerEmailHtml(data);
      await transporter.sendMail({
        from: `"GSHRM Payroll" <${smtpUser}>`,
        to: data.email,
        subject: "Thank You for Requesting a Live Demo",
        html: customerEmailHtml,
      });
      logs.push(`Customer email sent to ${data.email} via SMTP.`);

    } catch (err: any) {
      console.error("SMTP Error:", err);
      errors.push(`SMTP error: ${err.message || err}`);
    }
  } 
  // 2. Resend Sending
  else if (resendApiKey) {
    try {
      const isSandbox = resendFromEmail.includes("onboarding@resend.dev");
      const adminEmailHtml = getAdminEmailHtml(data, date, time);
      const adminEmails = adminEmail.split(",").map((e: string) => e.trim()).filter(Boolean);

      // Send to admin(s)
      for (const email of adminEmails) {
        await sendResendEmail({
          apiKey: resendApiKey,
          from: `GSHRM Payroll <${resendFromEmail}>`,
          to: email,
          subject: "🚀 New Demo Request - GSHRM Payroll",
          html: adminEmailHtml,
        });
        logs.push(`Admin email sent to ${email} via Resend.`);
      }

      // Send to customer
      if (!isSandbox) {
        const customerEmailHtml = getCustomerEmailHtml(data);
        await sendResendEmail({
          apiKey: resendApiKey,
          from: `GSHRM Payroll <${resendFromEmail}>`,
          to: data.email,
          subject: "Thank You for Requesting a Live Demo",
          html: customerEmailHtml,
        });
        logs.push(`Customer email sent to ${data.email} via Resend.`);
      }
    } catch (err: any) {
      console.error("Resend Error:", err);
      errors.push(`Resend error: ${err.message || err}`);
    }
  } else {
    errors.push("No email configuration found on server (set SMTP_USER/PASS or RESEND_API_KEY).");
  }

  if (errors.length > 0) {
    return res.status(500).json({ success: false, error: errors.join(", "), logs });
  }

  return res.status(200).json({ success: true, logs });
}

// Resend fetch client helper
async function sendResendEmail({ apiKey, from, to, subject, html }: any) {
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
    throw new Error(`Resend API Error: ${errText}`);
  }
}

// Templates
function getAdminEmailHtml(data: any, date: string, time: string) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0052CC; padding: 32px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: white;">GSHRM Payroll</h2>
        <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">New Demo Request Received</p>
      </div>
      <div style="padding: 24px; color: #1e293b;">
        <p>Hello Team,</p>
        <p>A new visitor has requested a live demo. Details:</p>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600; width: 140px;">Name</td><td>${data.name}</td></tr>
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600;">Company</td><td>${data.company}</td></tr>
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600;">Email</td><td>${data.email}</td></tr>
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600;">Phone</td><td>${data.phone}</td></tr>
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600;">Employees</td><td>${data.employees}</td></tr>
          <tr style="border-bottom: 1px solid #e2e8f0;"><td style="padding: 10px 0; font-weight: 600;">Date</td><td>${date}</td></tr>
          <tr><td style="padding: 10px 0; font-weight: 600;">Time</td><td>${time}</td></tr>
        </table>
      </div>
    </div>
  `;
}

function getCustomerEmailHtml(data: any) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0052CC; padding: 32px; border-radius: 8px 8px 0 0; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 700; color: white;">GSHRM Payroll</h2>
      </div>
      <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
        <p>Hello ${data.name},</p>
        <p>Thank you for requesting a live demo of GSHRM Payroll. We have received your request.</p>
        <p>Our sales team will contact you shortly to schedule your personalized demonstration.</p>
        <p>Regards,<br>GSHRM Payroll Team</p>
      </div>
    </div>
  `;
}
