import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "What is HRMS software?", a: "An HRMS (Human Resource Management System) digitises the entire employee lifecycle — from hiring and onboarding to payroll, performance and exit. GSHRM HRMS unifies HR, payroll, attendance and compliance in one platform." },
  { q: "How is HRMS different from payroll software?", a: "Payroll software handles salary processing. An HRMS includes payroll plus core HR, attendance, leaves, performance, recruitment and self-service. GSHRM gives you both with no integration headaches." },
  { q: "Can GSHRM HRMS scale with my business?", a: "Yes — from 5 to 5,000+ employees. Multi-entity, multi-branch and multi-country support is included on Growth and Enterprise plans." },
  { q: "Does GSHRM HRMS support remote teams?", a: "Yes. Geo-fenced selfie attendance, document e-signing, virtual onboarding and a full mobile app keep distributed teams in sync." },
];

export const Route = createFileRoute("/hrms-software")({
  head: () => buildFaqHead(faqs, {
    title: "HRMS Software in India — Complete HR Platform | GSHRM",
    description: "GSHRM HRMS unifies HR, payroll, attendance, leaves, performance and compliance in one platform. Built for Indian businesses. Free demo.",
    path: "/hrms-software",
  }),
  component: () => (
    <ProductPage
      eyebrow="HRMS Software"
      title={<>The complete <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>HRMS</span> for modern India</>}
      subtitle="Hire, onboard, pay and grow your team — all from a single intelligent platform."
      intro="GSHRM HRMS is an end-to-end human resource management system for Indian businesses. It unifies core HR data, payroll, attendance, leaves, performance and employee self-service — replacing 6+ disconnected tools with one platform."
      features={[
        { title: "Core HR", desc: "Single source of truth for every employee record and document." },
        { title: "Onboarding", desc: "Digital offer letters, e-signed docs and day-1 ready experiences." },
        { title: "Attendance & shifts", desc: "Biometric, GPS, geo-fence and rotational shifts." },
        { title: "Leaves & holidays", desc: "Configurable leave types, accruals and state-wise holidays." },
        { title: "Performance", desc: "OKRs, 360° reviews, 1:1s and competency frameworks." },
        { title: "Recruitment (ATS)", desc: "Job posting, candidate pipelines and offer workflows." },
        { title: "Employee self-service", desc: "Mobile app for payslips, leaves, tax and reimbursements." },
        { title: "Helpdesk & policies", desc: "Centralised HR helpdesk with SLA tracking." },
        { title: "Reports & analytics", desc: "60+ pre-built reports, attrition and DEI dashboards." },
      ]}
      bullets={[
        "Replaces 6+ tools (payroll, attendance, leave, ATS, performance, helpdesk)",
        "Mobile-first employee experience",
        "Configurable for any company size or structure",
        "India-first compliance baked in",
        "60+ analytics dashboards out-of-the-box",
        "SSO, role-based access and audit logs",
        "Open APIs and 100+ integrations",
        "ISO 27001-aligned data security",
      ]}
      faqs={faqs}
    />
  ),
});
