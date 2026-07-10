import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
//
// On Cloudflare Workers, env binds at REQUEST time. Module-scope reads
// (e.g. `const x = process.env.X`) resolve to undefined — always read
// process.env INSIDE a function or handler.
//
// When to use which env-access pattern:
//   - .server.ts module (this file): server-only helpers reused across
//     handlers. Wrap reads in a function so they run per-request.
//   - inline process.env inside a createServerFn handler: one-off reads
//     not reused elsewhere.
//   - import.meta.env.VITE_FOO: PUBLIC config readable from both client
//     and server (analytics IDs, public URLs). Define in .env with the
//     VITE_ prefix. Never put secrets here — they ship to the browser.

export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL || "info@greatsupports.in",
    adminEmail: process.env.ADMIN_EMAIL || "kishorthavamurugan@gmail.com, masskishor143l@gmail.com, info@greatsupports.in, ganishv2@gmail.com",
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioFromNumber: process.env.TWILIO_FROM_NUMBER,
    twilioWhatsappFromNumber: process.env.TWILIO_WHATSAPP_FROM_NUMBER || "whatsapp:+14155238886",
    adminPhone: process.env.ADMIN_PHONE || "+919841279594",
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
    smtpSecure: process.env.SMTP_SECURE !== "false",
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  };
}
