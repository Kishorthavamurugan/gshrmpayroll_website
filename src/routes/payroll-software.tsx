import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "What is payroll software?", a: "Payroll software automates the calculation of employee salaries, statutory deductions (PF, ESI, PT, TDS), payslip generation and government filings. GSHRM goes further by integrating attendance, leaves, reimbursements and compliance into a single workflow." },
  { q: "How does GSHRM automate payroll?", a: "GSHRM pulls attendance, leave, overtime and reimbursement data into the salary engine, applies your CTC structures and statutory rules, computes net pay, and generates payslips, bank advice files, PF ECR, ESI returns and Form 24Q in one click." },
  { q: "Can it handle variable pay and arrears?", a: "Yes — variable pay, performance bonuses, arrears, LOP adjustments and full-and-final settlements are all configurable and audited." },
  { q: "Does GSHRM file PF and ESI returns?", a: "GSHRM generates the exact files required by EPFO and ESIC portals. Our managed-compliance plan can also file them on your behalf." },
  { q: "Is the payroll engine accurate?", a: "GSHRM has a 99.9% accuracy track record across 5,000+ businesses. Every calculation is audit-logged with explanations." },
];

export const Route = createFileRoute("/payroll-software")({
  head: () => buildFaqHead(faqs, {
    title: "Payroll Software India — Auto PF, ESI, TDS | GSHRM",
    description: "GSHRM is India's smart payroll software. Run error-free payroll, auto-file PF, ESI, PT and TDS, and generate payslips in minutes. Free demo.",
    path: "/payroll-software",
  }),
  component: () => (
    <ProductPage
      eyebrow="Payroll Software"
      title={<>Run payroll in <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>10 minutes</span>, not 10 days</>}
      subtitle="Automated salary, statutory deductions and filings — purpose-built for Indian businesses."
      intro="GSHRM Payroll Software automates monthly salary processing for Indian businesses. It calculates earnings and deductions, applies PF, ESI, PT and TDS rules state-wise, generates payslips and bank files, and prepares ready-to-file statutory returns — all from one dashboard."
      features={[
        { title: "One-click salary run", desc: "Process payroll across branches in under 10 minutes." },
        { title: "CTC structure builder", desc: "Unlimited components, conditional formulas, grade-based templates." },
        { title: "Statutory engine", desc: "PF, ESI, PT, LWF and TDS computed automatically." },
        { title: "Payslip & bank file", desc: "Branded PDF payslips and bank-ready advice (NEFT/RTGS/IMPS)." },
        { title: "Reimbursements", desc: "Employee claims, approvals, FBP and tax-saver components." },
        { title: "Loans & advances", desc: "Track loans, EMIs and advances with auto-recovery from payroll." },
        { title: "Arrears & off-cycle", desc: "Backdated revisions, bonuses and ad-hoc pay runs." },
        { title: "Full & Final settlement", desc: "F&F with leave encashment, gratuity and notice recovery." },
        { title: "Audit trail", desc: "Every action logged for SOX, ISO 27001 and internal audits." },
      ]}
      bullets={[
        "End-to-end payroll in under 10 minutes",
        "99.9% calculation accuracy across 5,000+ businesses",
        "Auto-filing for PF, ESI, PT and Form 24Q",
        "Unlimited salary structures and branches",
        "Branded, multi-language payslips (EN/HI/regional)",
        "Bank-ready NEFT/RTGS advice files",
        "Mobile app for employees to view payslips & tax",
        "ISO 27001-aligned security & full audit trail",
      ]}
      faqs={faqs}
    />
  ),
});
