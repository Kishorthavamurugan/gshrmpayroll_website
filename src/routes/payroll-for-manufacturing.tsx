import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Does GSHRM work for factories?", a: "Yes. GSHRM is built for manufacturing — shop-floor biometric, piece-rate, daily-wage and contract labour, plus Factories Act, CLRA and minimum wages compliance." },
];

export const Route = createFileRoute("/payroll-for-manufacturing")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Manufacturing in India | GSHRM",
    description: "Shop-floor attendance, piece-rate, contract labour and Factories Act compliance — purpose-built for Indian manufacturers.",
    path: "/payroll-for-manufacturing",
  }),
  component: () => (
    <IndustryPage
      industry="Manufacturing"
      challenges={[
        "Shop-floor biometric & RFID attendance",
        "Piece-rate, incentive and OT computations",
        "Daily-wage, contract & temporary labour",
        "Factories Act and CLRA compliance",
        "Minimum wages by scheduled employment",
        "Safety, training and PF/ESI registers",
      ]}
      faqs={faqs}
    />
  ),
});
