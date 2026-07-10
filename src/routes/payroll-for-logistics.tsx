import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Does GSHRM support drivers and field staff?", a: "Yes. GPS-based attendance, trip-linked incentives, daily-wage flows and offline-first mobile app make it ideal for logistics and last-mile fleets." },
];

export const Route = createFileRoute("/payroll-for-logistics")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll & HRMS for Logistics & Transport in India | GSHRM",
    description: "GPS-based attendance, trip incentives and contract labour payroll for fleets, warehousing and last-mile companies.",
    path: "/payroll-for-logistics",
  }),
  component: () => (
    <IndustryPage
      industry="Logistics"
      challenges={[
        "GPS-based attendance for drivers & field staff",
        "Trip-linked incentives and per-km payouts",
        "Warehouse rotational shifts",
        "Daily-wage and contract labour payroll",
        "Multi-state Motor Transport Workers Act",
        "Offline mobile app for drivers on the road",
      ]}
      faqs={faqs}
    />
  ),
});
