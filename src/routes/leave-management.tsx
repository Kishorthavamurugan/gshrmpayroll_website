import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "How does GSHRM Leave Management work?", a: "Define leave types, accrual rules, holiday calendars and approval workflows. Employees apply via app or web; managers approve with one tap; balances and LOP flow into payroll automatically." },
  { q: "Can we set state-specific holidays?", a: "Yes. Each branch or state can have its own holiday calendar with optional 'restricted holidays' employees pick from." },
  { q: "Does it support comp-off and sandwich leave?", a: "Yes — comp-off, sandwich rules, half-days, hourly leaves and leave clubbing are all configurable." },
];

export const Route = createFileRoute("/leave-management")({
  head: () => buildFaqHead(faqs, {
    title: "Leave Management Software — Policies, Approvals & Accruals | GSHRM",
    description: "Configure leave policies, holidays, accruals and approvals. Employees apply from the GSHRM app; balances sync to payroll in real-time.",
    path: "/leave-management",
  }),
  component: () => (
    <ProductPage
      eyebrow="Leave Management"
      title={<>Leave policies that <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>work the way you do</span></>}
      subtitle="Unlimited leave types, accrual rules and approval workflows — fully integrated with payroll."
      intro="GSHRM Leave Management lets you configure unlimited leave types, accrual schedules, carry-forward rules and approval workflows. Employees apply via mobile; managers approve in one tap; balances and LOP flow straight to payroll."
      features={[
        { title: "Unlimited leave types", desc: "CL, SL, EL, PL, maternity, paternity, comp-off, sabbatical." },
        { title: "Accrual engine", desc: "Monthly, quarterly, anniversary or custom accruals." },
        { title: "Holiday calendars", desc: "State, branch and role-based with restricted holidays." },
        { title: "Approval workflows", desc: "Multi-level, conditional and delegation-ready." },
        { title: "Mobile leaves", desc: "Apply, withdraw and check balance from the app." },
        { title: "Encashment", desc: "Configurable encashment rules into F&F or annually." },
        { title: "Sandwich rules", desc: "Auto-handle off-days and holidays inside leaves." },
        { title: "Team calendar", desc: "See who's out across teams before approving." },
        { title: "Payroll sync", desc: "LOP and encashment flow into payroll automatically." },
      ]}
      bullets={[
        "Unlimited leave types and policies",
        "State / branch / role-specific holiday calendars",
        "Multi-level conditional approvals",
        "Comp-off, sandwich and hourly leave support",
        "Encashment baked into payroll & F&F",
        "Mobile-first apply & approve flows",
        "Team visibility before approval",
        "Complete audit trail of policy changes",
      ]}
      faqs={faqs}
    />
  ),
});
