import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "What can employees do on the GSHRM self-service app?", a: "Mark attendance, apply for leaves, download payslips, submit tax declarations, raise reimbursements, view loans & advances, access HR policies, raise helpdesk tickets and update personal details — all from a single mobile app." },
  { q: "Is the mobile app free for employees?", a: "Yes. The iOS and Android app is free for every employee on every plan." },
  { q: "Does it work offline?", a: "Attendance check-ins work offline and sync once the network returns. Payslips and documents are cached locally." },
];

export const Route = createFileRoute("/employee-self-service")({
  head: () => buildFaqHead(faqs, {
    title: "Employee Self-Service Portal & Mobile App | GSHRM",
    description: "Empower employees with payslips, leaves, attendance, tax declarations and reimbursements on a free mobile app. Available on iOS and Android.",
    path: "/employee-self-service",
  }),
  component: () => (
    <ProductPage
      eyebrow="Employee Self-Service"
      title={<>Put HR <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>in every employee's pocket</span></>}
      subtitle="A free mobile app for payslips, attendance, leaves, tax and reimbursements."
      intro="GSHRM's Employee Self-Service portal and mobile app put HR workflows directly in employees' hands — reducing HR tickets by up to 70%. Free for every employee on every plan."
      features={[
        { title: "Attendance check-in", desc: "Selfie + GPS marking from anywhere." },
        { title: "Payslip download", desc: "Branded PDF payslips — past & current." },
        { title: "Leave management", desc: "Apply, withdraw, see balance and team calendar." },
        { title: "Tax declarations", desc: "Investment proofs, regime selection, Form 16." },
        { title: "Reimbursements", desc: "Photo bills, claim categories, status tracking." },
        { title: "Loans & advances", desc: "Apply, track EMIs and outstanding balance." },
        { title: "HR helpdesk", desc: "Raise tickets and chat with HR." },
        { title: "Policy library", desc: "All company documents in one place." },
        { title: "Push notifications", desc: "Salary credited, leave approved, ticket replies." },
      ]}
      bullets={[
        "Free for every employee — no per-seat fees",
        "Available on iOS, Android and web",
        "Reduces HR ticket volume by up to 70%",
        "Works offline — syncs when online",
        "Push notifications for payroll & approvals",
        "Branded with your company logo",
        "Multi-language UI (EN, HI + regional)",
        "Accessible (WCAG 2.1 AA)",
      ]}
      faqs={faqs}
    />
  ),
});
