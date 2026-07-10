import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "How does GSHRM help hotels?", a: "Hotels run 24×7 with multiple departments, shifts and contract staff. GSHRM handles night-shift differentials, F&B service charges, contract-staff payroll and Shops & Establishments compliance — across every property." },
];

export const Route = createFileRoute("/payroll-for-hotels")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Hotels in India | GSHRM",
    description: "Built for hotel groups — 24×7 shifts, F&B service charges, contract staff payroll and multi-property compliance.",
    path: "/payroll-for-hotels",
  }),
  component: () => (
    <IndustryPage
      industry="Hotels"
      challenges={[
        "24×7 rotational shifts with night differentials",
        "F&B service charge and tip distribution",
        "Contract and outsourced staff payroll",
        "Property-wise P&L and headcount reporting",
        "High seasonality and casual hiring",
        "Shops & Establishments compliance per state",
      ]}
      faqs={faqs}
    />
  ),
});
