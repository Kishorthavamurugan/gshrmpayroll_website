import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQ, faqSchema, type QA } from "@/components/site/FAQ";
import { DemoForm } from "@/components/site/DemoForm";

export type FeatureItem = { title: string; desc: string };

export function ProductPage({
  eyebrow,
  title,
  subtitle,
  intro,
  features,
  bullets,
  faqs,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: ReactNode;
  intro: ReactNode;
  features: FeatureItem[];
  bullets: string[];
  faqs: QA[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      {/* Quick answer */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <div className="surface-card p-8 border-l-4 border-l-primary">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Quick answer</div>
            <p className="mt-2 text-lg leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Capabilities" title={<>Everything inside <span className="text-gradient">one module</span></>} />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="surface-card hover-lift p-6">
                <div className="w-10 h-10 rounded-lg grid place-items-center text-white" style={{ background: "var(--gradient-primary)" }}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="mt-4 font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key takeaways */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <SectionHeading eyebrow="Key takeaways" title={<>What you get with <span className="text-gradient">GSHRM</span></>} align="left" />
          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <div className="rounded-3xl p-8 md:p-14 text-white grid lg:grid-cols-2 gap-10 items-center" style={{ background: "var(--gradient-hero-dark)" }}>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">See it on your data — in 30 minutes.</h2>
              <p className="mt-3 text-white/80">Live demo, no slides. Bring your CTC structures and we'll show payroll running end-to-end.</p>
            </div>
            <DemoForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title="People also ask" />
          <div className="mt-12"><FAQ items={faqs} /></div>
        </div>
      </section>
    </>
  );
}

export function IndustryPage({
  industry,
  challenges,
  faqs,
}: {
  industry: string;
  challenges: string[];
  faqs: QA[];
}) {
  return (
    <>
      <PageHero
        eyebrow={`For ${industry}`}
        title={<>Payroll & HRMS built for <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>{industry}</span></>}
        subtitle={`Pre-configured for ${industry.toLowerCase()} shifts, wage codes, statutory rules and reporting. Go live in 48 hours.`}
      />
      <section className="section-y">
        <div className="container-px mx-auto max-w-4xl">
          <div className="surface-card p-8 border-l-4 border-l-primary">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Quick answer</div>
            <p className="mt-2 text-lg leading-relaxed">
              GSHRM is purpose-built for {industry.toLowerCase()} businesses in India — handling rotational shifts, overtime, attendance variance, and compliance (PF, ESI, PT, TDS) so HR can focus on people, not spreadsheets.
            </p>
          </div>
        </div>
      </section>
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why" title={<>Common challenges we solve for <span className="text-gradient">{industry.toLowerCase()}</span></>} />
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {challenges.map((c) => (
              <div key={c} className="surface-card p-6 flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" /> <span>{c}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/book-demo" className="btn-hero">Book a demo for your {industry.toLowerCase()} business</Link>
          </div>
        </div>
      </section>
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading eyebrow="FAQs" title={`${industry} payroll FAQs`} />
          <div className="mt-12"><FAQ items={faqs} /></div>
        </div>
      </section>
    </>
  );
}

export function buildFaqHead(faqs: QA[], meta: { title: string; description: string; path: string }) {
  return {
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:url", content: meta.path },
    ],
    links: [{ rel: "canonical", href: meta.path }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) }],
  };
}
