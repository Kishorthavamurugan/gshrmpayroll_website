import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Why do SMEs choose GSHRM?", a: "GSHRM is built specifically for Indian SMEs — affordable per-employee pricing, 48-hour onboarding, full Indian compliance, and a dedicated CSM. Most SMEs save 80% of payroll processing time in month one." },
  { q: "How much does GSHRM cost for an SME?", a: "Starter starts at ₹49 per employee per month. There are no setup fees, no contracts and a 14-day free trial." },
  { q: "Can my CA / accountant access GSHRM?", a: "Yes. Add your CA or accountant as a read-only or compliance-only user at no extra cost." },
];

export const Route = createFileRoute("/payroll-for-smes")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll Software for SMEs in India | GSHRM",
    description: "Affordable, compliant payroll & HRMS for Indian SMEs. Starts at ₹49 per employee. Free trial. Trusted by 5,000+ small and mid-sized businesses.",
    path: "/payroll-for-smes",
  }),
  component: () => (
    <IndustryPage
      industry="SMEs"
      challenges={[
        "Spreadsheets that break every time a rule changes",
        "PF, ESI and PT errors that lead to penalties",
        "HR managers spending 30+ hours on monthly payroll",
        "No real-time visibility into attendance and leaves",
        "Difficulty scaling across new states or branches",
        "Compliance updates that nobody tracks",
      ]}
      faqs={faqs}
    />
  ),
});
