import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  {
    q: "Why is GSHRM ideal for schools?",
    a: "Schools manage complex payrolls with varying staff categories — permanent teachers, contract staff, support staff and part-time workers. GSHRM handles all with automated deductions, compliance filings and leave accruals per category.",
  },
  {
    q: "Can it handle different staff categories?",
    a: "Yes — permanent, contractual, part-time and guest faculty with different salary structures, leave policies and statutory compliance rules are configured separately.",
  },
  {
    q: "Does it support academic calendar attendance?",
    a: "Yes. Attendance marking syncs with your academic calendar. Holiday lists can be configured for vacations, weekends and special holidays.",
  },
  {
    q: "Can it generate statutory filings?",
    a: "Yes. PF, ESI, PT and TDS are auto-calculated and auto-filed. Professional tax varies by state and is handled automatically.",
  },
  {
    q: "Does it support the school management app?",
    a: "Yes — staff can view payslips, apply for leave, track attendance and download tax documents via the free mobile app.",
  },
];

export const Route = createFileRoute("/payroll-for-schools")({
  head: () =>
    buildFaqHead(faqs, {
      title: "Payroll & HRMS for Schools in India | GSHRM",
      description:
        "Built for schools and educational institutions — manage permanent, contract and part-time staff with compliance filings, leave accruals and a free staff mobile app.",
      path: "/payroll-for-schools",
    }),
  component: () => (
    <IndustryPage
      industry="Schools"
      challenges={[
        "Multiple staff categories with different salary structures",
        "Complex leave policies and accruals per category",
        "Compliance with PF, ESI, PT and TDS regulations",
        "Academic calendar-based attendance tracking",
        "Automated statutory filings and challans",
        "Seasonal hiring for part-time and contract staff",
      ]}
      faqs={faqs}
    />
  ),
});
