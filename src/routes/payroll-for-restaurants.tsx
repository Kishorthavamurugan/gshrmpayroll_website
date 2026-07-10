import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Why is GSHRM ideal for restaurants?", a: "Restaurants run on rotational shifts, tips, OT and high attrition. GSHRM handles all of this with shift-based attendance, tip pooling, daily-wage workflows and one-tap onboarding for new hires." },
  { q: "Does it handle multiple outlets?", a: "Yes — unlimited outlets, branches and brands with location-wise reporting and consolidated owner dashboards." },
  { q: "Can it pay staff daily or weekly?", a: "Yes. Daily-wage, weekly and fortnightly pay cycles are configurable per outlet or per worker group." },
];

export const Route = createFileRoute("/payroll-for-restaurants")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Restaurants in India | GSHRM",
    description: "Built for restaurant chains — shift attendance, tip pooling, daily wages, multi-outlet compliance and a free staff mobile app.",
    path: "/payroll-for-restaurants",
  }),
  component: () => (
    <IndustryPage
      industry="Restaurants"
      challenges={[
        "Rotational and split-shift attendance across outlets",
        "Tip pooling and service-charge distribution",
        "Daily-wage and weekly-pay cycles",
        "High attrition and constant onboarding",
        "Multi-state Shops & Establishments compliance",
        "Overtime and night-shift differentials",
      ]}
      faqs={faqs}
    />
  ),
});
