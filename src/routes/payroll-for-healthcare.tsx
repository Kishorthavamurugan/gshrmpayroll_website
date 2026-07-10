import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Why GSHRM for hospitals?", a: "Hospitals run 24×7, with critical care staff, doctors on rotation, nursing schedules and contract workers. GSHRM handles complex shift differentials, on-call payments and full statutory compliance — across every facility." },
];

export const Route = createFileRoute("/payroll-for-healthcare")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Hospitals & Clinics in India | GSHRM",
    description: "24×7 shifts, on-call pay, doctor rosters and full statutory compliance — built for Indian healthcare and hospital groups.",
    path: "/payroll-for-healthcare",
  }),
  component: () => (
    <IndustryPage
      industry="Healthcare"
      challenges={[
        "24×7 rotational shifts for nursing and critical care",
        "Doctor on-call and visit-based payments",
        "Multi-facility, multi-specialty payroll",
        "Locum and contract staff compliance",
        "Clinical Establishments Act readiness",
        "Audit-grade documentation for accreditation",
      ]}
      faqs={faqs}
    />
  ),
});
