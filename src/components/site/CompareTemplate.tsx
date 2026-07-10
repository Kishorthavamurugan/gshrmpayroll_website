import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQ, type QA } from "@/components/site/FAQ";
import { buildFaqHead } from "@/components/site/PageTemplates";

export type Row = [label: string, gshrm: ReactNode, other: ReactNode];

export function CompareTemplate({
  competitor,
  intro,
  rows,
  faqs,
}: {
  competitor: string;
  intro: string;
  rows: Row[];
  faqs: QA[];
}) {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title={<>GSHRM <span className="opacity-60">vs</span> {competitor}</>}
        subtitle={`A neutral, feature-by-feature comparison so you can choose the right payroll & HRMS for India.`}
      />
      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <div className="surface-card p-8 border-l-4 border-l-primary">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Quick answer</div>
            <p className="mt-2 text-lg leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-6xl">
          <SectionHeading eyebrow="Feature-by-feature" title={<>GSHRM <span className="text-gradient">vs</span> {competitor}</>} />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] surface-card overflow-hidden">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm text-muted-foreground">Capability</th>
                  <th className="p-4 text-center text-primary font-semibold">GSHRM <span className="ml-1 inline-block px-2 py-0.5 text-[10px] rounded-full bg-primary text-primary-foreground align-middle">BEST</span></th>
                  <th className="p-4 text-center font-semibold">{competitor}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, a, b], i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-4 text-sm font-medium">{label}</td>
                    <td className="p-4 text-center text-sm bg-primary/5">{render(a)}</td>
                    <td className="p-4 text-center text-sm">{render(b)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 text-center">
            <Link to="/book-demo" className="btn-hero">Switch to GSHRM <ArrowRight className="w-4 h-4"/></Link>
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title={`GSHRM vs ${competitor} — FAQs`} />
          <div className="mt-12"><FAQ items={faqs} /></div>
        </div>
      </section>
    </>
  );
}

function render(v: ReactNode) {
  if (v === true) return <Check className="w-5 h-5 text-accent inline" />;
  if (v === false) return <X className="w-5 h-5 text-muted-foreground/50 inline" />;
  return v;
}

const competitors: Record<string, { intro: string; rows: Row[]; faqs: QA[] }> = {
  "Petpooja": {
    intro: "Petpooja Payroll is built into the Petpooja restaurant POS. GSHRM is a full payroll and HRMS platform that serves restaurants and 9 other industries with deeper compliance, mobile self-service and multi-branch operations.",
    rows: [["Standalone payroll & HRMS", true, false], ["Multi-industry support", true, false], ["Full statutory filings (PF/ESI/PT/TDS)", true, "Partial"], ["Free employee mobile app", true, "Limited"], ["Biometric + GPS attendance", true, "POS-linked only"], ["Multi-branch & multi-entity", true, "Outlet-linked"], ["Starting price", "₹49/emp/mo", "Bundled with POS"]],
    faqs: [
      { q: "Is GSHRM better than Petpooja Payroll?", a: "If you only run restaurants on Petpooja POS, Petpooja Payroll is convenient. If you need full HRMS, multi-industry support, deeper compliance and a dedicated mobile app — GSHRM is the more complete platform." },
    ],
  },
  "Keka": {
    intro: "Keka is a popular HRMS for mid-market Indian companies. GSHRM offers comparable HRMS depth with stronger compliance automation, faster onboarding and a lower entry price — especially attractive for SMEs and multi-branch operations.",
    rows: [["Entry price (per employee/mo)", "₹49", "₹120"], ["Setup time", "48 hours", "2–4 weeks"], ["Dedicated CSM on all plans", true, "Enterprise only"], ["Biometric integration included", true, "Add-on"], ["Full PF/ESI/PT/TDS filing", true, true], ["Free employee mobile app", true, true], ["Geo-fenced selfie attendance", true, true]],
    faqs: [
      { q: "Is GSHRM cheaper than Keka?", a: "Yes — GSHRM starts at ₹49 per employee per month versus Keka's ₹120 entry price, and includes biometric integration, a dedicated CSM and full compliance filings on all plans." },
      { q: "Can I migrate from Keka to GSHRM?", a: "Yes. Our migration team handles employee, payroll history, leave-balance and compliance-data migration from Keka at no extra cost." },
    ],
  },
  "GreytHR": {
    intro: "GreytHR pioneered cloud payroll in India. GSHRM is a more modern, mobile-first alternative with a faster UI, deeper attendance tooling and integrated industry templates.",
    rows: [["Modern UI & mobile-first", true, "Legacy UI"], ["Industry-specific templates", true, false], ["Geo-fenced selfie attendance", true, "Add-on"], ["Full compliance filings", true, true], ["Starting price", "₹49/emp/mo", "₹3,495/mo"], ["Setup time", "48 hours", "1–2 weeks"]],
    faqs: [
      { q: "Is GSHRM a good GreytHR alternative?", a: "Yes — GSHRM offers comparable core HR and compliance with a more modern interface, mobile-first design and industry-specific templates at a lower per-employee cost." },
    ],
  },
  "Zoho Payroll": {
    intro: "Zoho Payroll is a strong fit for businesses already on the Zoho suite. GSHRM is a more comprehensive standalone HRMS with attendance, leave, performance and industry templates beyond Zoho Payroll's scope.",
    rows: [["Standalone HRMS (not just payroll)", true, false], ["Biometric & GPS attendance", true, false], ["Industry-specific templates", true, false], ["Compliance filings", true, true], ["Starting price", "₹49/emp/mo", "₹50/emp/mo"], ["Multi-branch HRMS", true, "Payroll-only"]],
    faqs: [
      { q: "Should I pick GSHRM over Zoho Payroll?", a: "If you only need salary processing and you already use Zoho, Zoho Payroll is fine. If you need attendance, leave, performance and industry-specific HRMS in one place, choose GSHRM." },
    ],
  },
  "PagarBook": {
    intro: "PagarBook is a salary-register and attendance app for very small businesses. GSHRM is a full payroll and HRMS platform with statutory filings, mobile app, compliance and multi-branch support.",
    rows: [["Statutory filings (PF/ESI/PT/TDS)", true, false], ["Biometric integration", true, false], ["Multi-branch & multi-entity", true, false], ["Dedicated CSM", true, false], ["Built for >10 employees", true, "<10 ideal"], ["Starting price", "₹49/emp/mo", "Freemium"]],
    faqs: [
      { q: "Is GSHRM better than PagarBook?", a: "For businesses with 10+ employees who need real payroll, statutory filings, attendance integration and HRMS, GSHRM is significantly more capable than PagarBook." },
    ],
  },
  "RazorpayX Payroll": {
    intro: "RazorpayX Payroll is a strong choice if you already bank with Razorpay. GSHRM is a deeper HRMS with attendance, leave, performance and industry templates — and pairs with any payment provider.",
    rows: [["Standalone HRMS (not just payroll)", true, false], ["Bank-agnostic", true, "Razorpay-first"], ["Biometric + GPS attendance", true, false], ["Industry templates", true, false], ["Compliance filings", true, true], ["Starting price", "₹49/emp/mo", "Bundled"]],
    faqs: [
      { q: "Is GSHRM a good RazorpayX Payroll alternative?", a: "If you want a full HRMS with attendance, leave, performance, industry templates and the freedom to use any bank, GSHRM is the broader platform." },
    ],
  },
};

const slugs: Record<string, string> = {
  "petpooja": "Petpooja",
  "keka": "Keka",
  "greythr": "GreytHR",
  "zoho-payroll": "Zoho Payroll",
  "pagarbook": "PagarBook",
  "razorpay-payroll": "RazorpayX Payroll",
};

export function makeCompareRoute(slug: string) {
  const name = slugs[slug];
  const data = competitors[name];
  return {
    head: () => buildFaqHead(data.faqs, {
      title: `GSHRM vs ${name} — Honest Comparison (2026)`,
      description: `Side-by-side comparison of GSHRM and ${name}. Features, pricing, compliance and support for Indian businesses.`,
      path: `/gshrm-vs-${slug}`,
    }),
    component: () => <CompareTemplate competitor={name} intro={data.intro} rows={data.rows} faqs={data.faqs} />,
  };
}
