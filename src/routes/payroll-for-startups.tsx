import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Is GSHRM good for early-stage startups?", a: "Yes. GSHRM is built for startups from 5 employees onwards — with ESOP tracking, founder-friendly CTC builders and lightning-fast onboarding." },
  { q: "Does GSHRM support ESOPs?", a: "Yes — grants, vesting, exercise and cap-table-friendly reporting are built in on Growth and Enterprise plans." },
  { q: "Can investors get a dashboard view?", a: "Yes. Read-only investor and board dashboards are available with headcount, attrition and payroll metrics." },
];

export const Route = createFileRoute("/payroll-for-startups")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Startups in India | GSHRM",
    description: "Founder-friendly payroll, HRMS, ESOP tracking and compliance for Indian startups. Setup in 24 hours. Free trial.",
    path: "/payroll-for-startups",
  }),
  component: () => (
    <IndustryPage
      industry="Startups"
      challenges={[
        "Setting up compliant payroll without a CFO",
        "ESOP grant, vesting and exercise tracking",
        "Hiring across multiple states without HR ops",
        "Investor reporting on headcount and burn",
        "Founder-friendly CTC structures and FBP",
        "Scaling from 10 to 200 employees fast",
      ]}
      faqs={faqs}
    />
  ),
});
