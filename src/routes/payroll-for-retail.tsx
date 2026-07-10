import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Why GSHRM for retail?", a: "Retail chains need store-wise rosters, incentive computations, geo-fenced attendance and high-volume seasonal hiring. GSHRM handles all of this with multi-state PT, Shops Act compliance and a free store-staff mobile app." },
];

export const Route = createFileRoute("/payroll-for-retail")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Retail Chains in India | GSHRM",
    description: "Store-wise attendance, incentives, geo-fencing, multi-state compliance and a staff mobile app — built for Indian retail.",
    path: "/payroll-for-retail",
  }),
  component: () => (
    <IndustryPage
      industry="Retail"
      challenges={[
        "Store-wise rosters and shift scheduling",
        "Sales-linked incentive computations",
        "Geo-fenced selfie attendance per store",
        "Multi-state PF, ESI and PT compliance",
        "Seasonal hiring & rapid onboarding",
        "Store-manager visibility on headcount and cost",
      ]}
      faqs={faqs}
    />
  ),
});
