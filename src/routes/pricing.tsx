import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X, Sparkles, Calculator, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQ, faqSchema } from "@/components/site/FAQ";
import { useState, useMemo } from "react";
import { SITE } from "@/lib/site";

const faqs = [
  {
    q: "How does the 2-month free trial work?",
    a: "All our plans (Starter, Essential, Growth, Custom) include a 2-month free trial. You can set up your account, onboard your employees, and run payroll completely free for the first 2 months. You will only be billed starting from the 3rd month, and you can cancel anytime during the trial with no questions asked."
  },
  { 
    q: "How does the per-employee pricing work?", 
    a: "Our Starter plan includes up to 10 employees. Our Essential and Growth plans include up to 50 employees in their base price. For teams larger than 50 on Essential or Growth, a per-employee monthly fee (+₹45 for Essential, +₹85 for Growth) applies only to the additional active employees." 
  },
  { 
    q: "Is there a free setup or onboarding cost?", 
    a: "We do not charge any setup or hidden fees. Standard onboarding, including data import and HR team training, is completely free." 
  },
  { 
    q: "Can I upgrade, downgrade or cancel at any time?", 
    a: "Yes. GSHRM is a pay-as-you-go service with no lock-in contract. You can scale your plan up or down, or cancel your subscription at the end of any billing cycle." 
  },
  { 
    q: "Do you offer discounts for annual billing?", 
    a: "Yes, you save 20% on both the base package and additional employee pricing when you choose annual billing." 
  },
  { 
    q: "How is the active employee count calculated?", 
    a: "We only bill you for employees who have active profiles in the system during the billing month. Terminated employees or archived profiles are not counted towards your bill." 
  }
];

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: `Transparent Pricing Plans | ${SITE.name}` },
      { name: "description", content: "Explore GSHRM's transparent pricing. Choose from Starter, Essential, Growth, or Custom packages. Use our calculator to get an instant cost estimate." },
      { property: "og:title", content: `${SITE.name} Pricing Plans` },
      { property: "og:description", content: "Transparent pricing. 2-month free trial on all plans. Save 20% on annual billing." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) }],
  }),
  component: Pricing,
});

function Pricing() {
  const [employees, setEmployees] = useState(50);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const pricingDetails = useMemo(() => {
    const isAnnual = billingCycle === "annual";
    
    // Pricing configuration (with 20% off for annual)
    const starterBase = 999;
    
    const essentialBase = isAnnual ? 1995 : 2495;
    const essentialPerEmp = isAnnual ? 36 : 45;
    
    const growthBase = isAnnual ? 3595 : 4495;
    const growthPerEmp = isAnnual ? 68 : 85;

    // Calculate totals
    const essentialTotal = employees <= 50 
      ? essentialBase 
      : essentialBase + (employees - 50) * essentialPerEmp;

    const growthTotal = employees <= 50 
      ? growthBase 
      : growthBase + (employees - 50) * growthPerEmp;

    return {
      starterBase,
      essentialBase,
      essentialPerEmp,
      growthBase,
      growthPerEmp,
      essentialTotal,
      growthTotal
    };
  }, [employees, billingCycle]);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={<>Flexible plans that <span className="text-gradient">scale with you</span></>}
        subtitle="Transparent plans. No hidden costs. Pay only for the active employees you manage."
      />

      {/* PRICING CALCULATOR */}
      <section className="section-y bg-background -mt-16 relative z-10">
        <div className="container-px mx-auto max-w-7xl">
          <div className="surface-card p-6 md:p-8 border border-border shadow-lg bg-surface mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-lg text-foreground">Interactive Cost Estimator</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-foreground">Number of Employees</label>
                  <span className="text-2xl font-extrabold text-primary">{employees}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-border rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
                  <span>10 Employees</span>
                  <span>500 Employees</span>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end justify-center">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2">Billing Cycle</span>
                <div className="inline-flex rounded-full border border-border p-1 bg-surface-elevated">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      billingCycle === "monthly" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("annual")}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      billingCycle === "annual" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground"
                    }`}
                  >
                    Annual <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PLAN CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Starter Plan */}
            <div className="surface-card p-8 border border-border bg-surface flex flex-col justify-between h-full hover-lift shadow-sm relative">
              <div>
                <h4 className="font-bold text-xl text-foreground">Starter</h4>
                <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">For micro businesses starting their HR & payroll automation journey.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  {employees <= 10 ? (
                    <>
                      <span className="text-4xl font-extrabold text-foreground">₹{pricingDetails.starterBase.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-muted-foreground font-medium">/ month</span>
                    </>
                  ) : (
                    <div className="text-sm font-semibold text-amber-600 min-h-[40px] flex items-center">
                      Upgrade to Essential
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-2">
                  Base structure includes 10 employees. <br />
                  <span className="text-primary">2 Months Free Trial included</span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-border/40 pt-6">
                  {["Core HR & standard payroll", "Employee database (Max 10)", "Secure digital document locker", "Free onboarding & setup", "Email support"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/contact-us" className="inline-flex w-full justify-center px-5 py-2.5 rounded-full border border-border font-semibold hover:bg-muted text-sm transition-colors text-foreground">
                  Start 2-Month Free Trial
                </Link>
              </div>
            </div>

            {/* Essential Plan */}
            <div className="surface-card p-8 border border-border bg-surface flex flex-col justify-between h-full hover-lift shadow-sm relative">
              <div>
                <h4 className="font-bold text-xl text-foreground">Essential</h4>
                <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">For SMEs needing automated compliance filings and document storage.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">₹{pricingDetails.essentialTotal.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-muted-foreground font-medium">/ month</span>
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-2">
                  Base structure includes 50 employees. <br />
                  <span className="text-primary">+₹{pricingDetails.essentialPerEmp} / addl. employee / month</span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-border/40 pt-6">
                  {["Core HR & standard payroll", "Auto challans & filings (Form 24Q)", "Professional Tax (PT) state slabs", "Secure digital document locker", "WhatsApp & email support"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/contact-us" className="inline-flex w-full justify-center px-5 py-2.5 rounded-full border border-border font-semibold hover:bg-muted text-sm transition-colors text-foreground">
                  Start 2-Month Free Trial
                </Link>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="surface-card p-8 border border-primary/50 bg-surface flex flex-col justify-between h-full hover-lift shadow-md relative ring-2 ring-primary/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full text-white inline-flex items-center gap-1" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="w-3.5 h-3.5"/> Recommended
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground">Growth</h4>
                <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">For companies needing biometric sync, shifts, and geo-fenced checking.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">₹{pricingDetails.growthTotal.toLocaleString("en-IN")}</span>
                  <span className="text-xs text-muted-foreground font-medium">/ month</span>
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-2">
                  Base structure includes 50 employees. <br />
                  <span className="text-primary">+₹{pricingDetails.growthPerEmp} / addl. employee / month</span>
                </div>

                <ul className="mt-8 space-y-3.5 border-t border-border/40 pt-6">
                  {["Everything in Essential", "Biometric device API integration", "GPS & geo-fenced selfie check-in", "Rotational shift & roster scheduler", "Dedicated CSM support (24x7)"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/contact-us" className="btn-hero text-sm w-full justify-center">
                  Start 2-Month Free Trial
                </Link>
              </div>
            </div>

            {/* Custom Plan */}
            <div className="surface-card p-8 border border-border bg-surface flex flex-col justify-between h-full hover-lift shadow-sm">
              <div>
                <h4 className="font-bold text-xl text-foreground">Custom</h4>
                <p className="mt-2 text-sm text-muted-foreground min-h-[40px]">For enterprise companies requiring dedicated servers, custom SLAs, or integrations.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-foreground">Custom</span>
                </div>
                <div className="text-xs text-muted-foreground font-semibold mt-2">Tailored pricing for large teams</div>

                <ul className="mt-8 space-y-3.5 border-t border-border/40 pt-6">
                  {["Everything in Growth", "Custom integrations & API access", "Multi-entity & multi-branch support", "SSO & SAML authentication", "Dedicated CSM & enterprise SLAs"].map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/contact-us" className="inline-flex w-full justify-center px-5 py-2.5 rounded-full border border-border font-semibold hover:bg-muted text-sm transition-colors text-foreground">
                  Get a Custom Quote (2 Months Free)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN COMPARISON MATRIX */}
      <section className="section-y bg-surface-elevated border-t border-b border-border/40">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Feature Matrix" title="Compare all features" />
          
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[760px] surface-card overflow-hidden bg-surface">
              <thead>
                <tr className="text-left bg-surface-elevated">
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Feature Module</th>
                  <th className="p-4 text-sm font-bold text-center text-foreground w-[18%]">Starter</th>
                  <th className="p-4 text-sm font-bold text-center text-foreground w-[18%]">Essential</th>
                  <th className="p-4 text-sm font-bold text-center text-foreground w-[18%]">Growth</th>
                  <th className="p-4 text-sm font-bold text-center text-foreground w-[18%]">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {/* Section header */}
                <tr className="bg-muted/30">
                  <td colSpan={5} className="p-3 text-xs font-bold uppercase tracking-wider text-primary">Core HR & Payroll</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">Employee Database</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">Automated Payroll Run</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">Statutory PF & ESI Calcs</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>

                {/* Section header */}
                <tr className="bg-muted/30">
                  <td colSpan={5} className="p-3 text-xs font-bold uppercase tracking-wider text-primary">Support & Services</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">Email Ticketing Helpdesk</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">WhatsApp support (24x7)</td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-muted-foreground/30 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>
                <tr>
                  <td className="p-4 text-sm font-medium text-foreground">Dedicated Customer Success</td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-muted-foreground/30 inline" /></td>
                  <td className="p-4 text-center"><X className="w-4 h-4 text-muted-foreground/30 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-emerald-500 inline" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="section-y bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <div className="mt-12 max-w-3xl mx-auto"><FAQ items={faqs} /></div>
        </div>
      </section>
    </>
  );
}
