import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  // CORS Headers for separate Vercel frontend / API projects
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Reject unsupported HTTP methods
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST", "OPTIONS"]);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`,
    });
  }

  const rawData = req.body || {};
  
  // Normalize incoming field names (supports fullName / name, workEmail / email, etc.)
  const fullName = (rawData.fullName || rawData.name || "").toString().trim();
  const company = (rawData.company || "").toString().trim();
  const workEmail = (rawData.workEmail || rawData.email || "").toString().trim().toLowerCase();
  const phone = (rawData.phone || "").toString().trim();
  const employees = (rawData.employees || "").toString().trim();

  if (!workEmail || !fullName) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: fullName and workEmail are required.",
    });
  }

  const data = {
    fullName,
    company: company || "Not specified",
    workEmail,
    phone: phone || "Not specified",
    employees: employees || "Not specified",
  };

  // Retrieve environment variables securely on the server side
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = process.env.SMTP_SECURE === "true" || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : undefined;
  const adminEmail = process.env.ADMIN_EMAIL || "kishorthavamurugan@gmail.com, masskishor143l@gmail.com, info@greatsupports.in";

  if (!smtpUser || !smtpPass) {
    console.error("[SMTP Server Error] Missing SMTP_USER or SMTP_PASS environment variables.");
    return res.status(500).json({
      success: false,
      message: "Unable to send email",
    });
  }

  const date = new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
  const time = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });

  try {
    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 3,
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const adminEmailHtml = getAdminEmailHtml(data, date, time);
    const customerEmailHtml = getCustomerEmailHtml(data);

    // Send emails in parallel asynchronously
    const emailPromises = [
      transporter.sendMail({
        from: `"Great Supports GSHRM" <${smtpUser}>`,
        to: adminEmail,
        replyTo: data.workEmail,
        subject: "🚀 New GSHRM Payroll Demo Request",
        html: adminEmailHtml,
      }),
    ];

    if (data.workEmail) {
      emailPromises.push(
        transporter.sendMail({
          from: `"Great Supports GSHRM" <${smtpUser}>`,
          to: data.workEmail,
          subject: "Thank You for Requesting a Live Demo - Great Supports GSHRM",
          html: customerEmailHtml,
        }).catch((err) => {
          console.warn("[Notice] Customer confirmation email skipped:", err.message);
          return null as any;
        })
      );
    }

    // Execute email dispatch in background
    Promise.all(emailPromises)
      .then(() => {
        console.log(`[SMTP] Successfully dispatched emails in background for ${data.workEmail}`);
      })
      .catch((err) => {
        console.error("[SMTP Background Error]:", err.message || err);
      });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (err: any) {
    console.error("[SMTP Server Error]:", err.message || err);
    return res.status(500).json({
      success: false,
      message: "Unable to send email",
    });
  }
}

// Admin Notification HTML Template
function getAdminEmailHtml(data: { fullName: string; company: string; workEmail: string; phone: string; employees: string }, date: string, time: string) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2ede8; border-radius: 16px; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #006e5b, #00a87d); padding: 28px; border-radius: 12px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: white;">GREAT SUPPORTS GSHRM</h2>
        <p style="margin: 6px 0 0; opacity: 0.92; font-size: 14px;">New Live Demo Request</p>
      </div>
      <div style="padding: 24px 8px; color: #1e293b;">
        <p style="font-size: 15px; margin-top: 0;">Hello Team,</p>
        <p style="font-size: 14px; color: #475569;">A new enquiry has been submitted through the Book Demo form:</p>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 16px;">
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b; width: 140px;">Full Name</td><td style="color: #0f172a; font-weight: 500;">${data.fullName}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Company</td><td style="color: #0f172a; font-weight: 500;">${data.company}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Work Email</td><td><a href="mailto:${data.workEmail}" style="color: #008269; text-decoration: none; font-weight: 500;">${data.workEmail}</a></td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Phone / WhatsApp</td><td><a href="tel:${data.phone}" style="color: #008269; text-decoration: none; font-weight: 500;">${data.phone}</a></td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Employees</td><td style="color: #0f172a; font-weight: 500;">${data.employees}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Date</td><td style="color: #64748b;">${date}</td></tr>
          <tr><td style="padding: 10px 0; font-weight: 600; color: #006e5b;">Time</td><td style="color: #64748b;">${time} IST</td></tr>
        </table>
      </div>
      <div style="border-top: 1px solid #e2ede8; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
        Sent automatically from Great Supports GSHRM System
      </div>
    </div>
  `;
}

// Customer Confirmation HTML Template
function getCustomerEmailHtml(data: { fullName: string; company: string; workEmail: string }) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2ede8; border-radius: 16px; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #006e5b, #00a87d); padding: 28px; border-radius: 12px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: white;">GREAT SUPPORTS GSHRM</h2>
        <p style="margin: 6px 0 0; opacity: 0.92; font-size: 14px;">Payroll & HRMS Automation</p>
      </div>
      <div style="padding: 24px 8px; color: #1e293b; line-height: 1.6;">
        <p style="font-size: 15px; margin-top: 0;">Hello <strong>${data.fullName}</strong>,</p>
        <p style="font-size: 14px; color: #334155;">Thank you for requesting a live product demonstration of Great Supports GSHRM.</p>
        <p style="font-size: 14px; color: #334155;">Our payroll and compliance specialists have received your request and will connect with you shortly to tailor a demo for <strong>${data.company}</strong>.</p>
        <div style="background-color: #f4fbf8; border: 1px solid #c9eee1; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 13px; color: #006e5b;">
          <strong>Quick highlights of what we'll cover:</strong>
          <ul style="margin: 8px 0 0; padding-left: 18px; color: #334155;">
            <li>Running complete monthly payroll in under 3 minutes</li>
            <li>Automated PF, ESI, PT, and TDS statutory calculation</li>
            <li>Biometric & geo-fenced attendance integration</li>
          </ul>
        </div>
        <p style="font-size: 14px; color: #334155;">Warm regards,<br><strong>Great Supports Team</strong><br><a href="https://greatsupports.in" style="color: #008269; text-decoration: none;">greatsupports.in</a></p>
      </div>
    </div>
  `;
}
