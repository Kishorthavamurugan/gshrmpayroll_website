import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "Which Indian labour laws does GSHRM cover?", a: "GSHRM is aligned with the Income Tax Act, EPF & MP Act, ESI Act, Professional Tax (state-wise), Payment of Wages Act, Payment of Bonus Act, Gratuity Act, Maternity Benefit Act, Shops & Establishments Acts and the new Labour Codes." },
  { q: "Does GSHRM file statutory returns automatically?", a: "GSHRM generates exact-format files for PF (ECR), ESI, PT, Form 24Q (TDS) and LWF. Managed-compliance plans include filing on your behalf with confirmation receipts." },
  { q: "How are statutory rate changes handled?", a: "Our in-house compliance team monitors gazette notifications and pushes rate, slab and form updates to your account — usually within 24 hours of publication, at no extra cost." },
  { q: "Can I generate Form 16 for employees?", a: "Yes. Form 16 Part A & B is generated for every employee at year-end with TRACES-ready files for upload." },
];

export const Route = createFileRoute("/compliance-management")({
  head: () => buildFaqHead(faqs, {
    title: "Compliance Management Software — PF, ESI, PT, TDS, LWF | GSHRM",
    description: "Stay 100% compliant. GSHRM automates PF, ESI, PT, TDS, LWF returns and filings. Backed by an in-house Indian compliance team.",
    path: "/compliance-management",
  }),
  component: () => (
    <ProductPage
      eyebrow="Compliance Management"
      title={<>Indian payroll compliance, <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>on autopilot</span></>}
      subtitle="PF, ESI, PT, TDS, LWF and labour-law returns — generated, filed and audit-ready."
      intro="GSHRM Compliance Management automates every statutory obligation for Indian businesses. From PF ECR to ESI returns, Professional Tax filings (state-wise), TDS Form 24Q and Form 16 — everything is generated, validated and filed without manual rework."
      features={[
        { title: "PF (EPFO)", desc: "ECR generation, challan & UAN management." },
        { title: "ESI (ESIC)", desc: "Monthly contributions and half-yearly returns." },
        { title: "Professional Tax", desc: "State-wise slabs, returns and challans." },
        { title: "TDS — Form 24Q", desc: "Quarterly filings + Form 16 generation." },
        { title: "Labour Welfare Fund", desc: "All states covered with auto-updates." },
        { title: "Gratuity & Bonus", desc: "Eligibility, accrual and payment workflows." },
        { title: "Minimum Wages", desc: "State & scheduled-employment compliance alerts." },
        { title: "Audit trail", desc: "Every filing, change and approval logged." },
        { title: "Notice & inspection support", desc: "Documentation ready for any inspection." },
      ]}
      bullets={[
        "100% Indian statutory coverage out-of-the-box",
        "State-wise rules for 28 states + 8 UTs",
        "In-house compliance team pushes updates",
        "TRACES-ready Form 16 & Form 24Q",
        "PF, ESI, PT and LWF challans auto-generated",
        "Managed-filing service available",
        "Audit-grade documentation",
        "New Labour Codes ready",
      ]}
      faqs={faqs}
    />
  ),
});
