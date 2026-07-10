import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Target, Lightbulb, Compass, Award, Sparkles, BookOpen } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: `About ${SITE.name} — India's Smart Payroll & HRMS` },
      { name: "description", content: "GSHRM is on a mission to simplify HR and payroll operations, helping businesses unleash the potential of their people." },
      { property: "og:title", content: `About ${SITE.name}` },
      { property: "og:description", content: "Fostering continuous learning, innovation, and customer success." },
      { property: "og:url", content: "/about-us" },
    ],
    links: [{ rel: "canonical", href: "/about-us" }],
  }),
  component: About,
});

const methodology = [
  {
    icon: Lightbulb,
    title: "Dream Big",
    desc: "We look at industry challenges through our customers' eyes and build solutions that redefine how payroll and HR work.",
  },
  {
    icon: Compass,
    title: "Be Fearless",
    desc: "We embrace new technologies, intuitive user interfaces, and bold decisions to make payroll execution zero-friction.",
  },
  {
    icon: Target,
    title: "Focus on Impact",
    desc: "We don't build features just to build them. We build tools that save time, automate compliance, and solve real HR workflows.",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Improve Every Day",
    desc: "A commitment to learning, self-development, and raising the bar for our product and customer support operations.",
  },
  {
    icon: Award,
    title: "Deliver Excellence",
    desc: "Ensuring top-tier standards in data security, calculation accuracy, server performance, and design aesthetics.",
  },
  {
    icon: BookOpen,
    title: "Nurture Learning & Sharing",
    desc: "Fostering an open, collaborative environment built on mutual trust, shared goals, and helping each other grow.",
  },
];

function About() {
  return (
    <>
      <PageHero 
        eyebrow="Company" 
        title={<>Unleashing the potential of <span className="text-gradient">Indian businesses</span></>} 
        subtitle="We build smart payroll and HRMS solutions designed to help entrepreneurs automate manual processes and succeed." 
      />

      {/* BRAND PHILOSOPHY */}
      <section className="section-y bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-xs">Our Philosophy</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
                Business is fundamentally <br />
                <span className="text-gradient">about people</span>
              </h2>
              <p className="mt-6 text-muted-foreground text-base leading-relaxed">
                Behind every growing startup, retail chain, factory, or restaurant, there is a dedicated team of individuals striving to do their best work. Yet, hours are spent monthly on manual payroll sheets, error-prone tax computations, and compliance administration.
              </p>
              <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                GSHRM was built to automate the administrative overhead, letting you focus entirely on building enduring relationships, empowering your teams, and scaling your organization.
              </p>
            </div>
            <div className="relative rounded-2xl border border-border bg-surface-elevated p-8 md:p-12 overflow-hidden shadow-lg">
              <div className="absolute -right-16 -top-16 w-36 h-36 rounded-full bg-primary/10 blur-xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-36 h-36 rounded-full bg-accent/10 blur-xl pointer-events-none" />
              <h3 className="text-xl font-bold text-foreground">Our Mission</h3>
              <p className="mt-4 text-foreground/80 leading-relaxed text-sm">
                To empower a new wave of Indian entrepreneurs and HR leaders to unleash their ambitions and succeed for everyone – themselves, their organizations, and their communities.
              </p>
              <div className="mt-8 border-t border-border/60 pt-6 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Payroll Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground mt-0.5">CSM Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY & VALUES */}
      <section className="section-y bg-surface-elevated border-t border-b border-border/40">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading 
            eyebrow="Operational Methodology" 
            title={<>How we build & deliver</>} 
            subtitle="The core values and operational principles that define our product decisions and customer relationships."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {methodology.map((m, i) => (
              <div key={i} className="surface-card p-8 hover-lift border border-border bg-surface">
                <div className="w-10 h-10 rounded-lg grid place-items-center bg-primary/10 text-primary mb-6">
                  <m.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-3">{m.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="surface-card p-8 hover-lift border border-border bg-surface">
                <div className="w-10 h-10 rounded-lg grid place-items-center bg-primary/10 text-primary mb-6">
                  <v.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-foreground mb-3">{v.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUOUS COMMITMENT */}
      <section className="section-y bg-background">
        <div className="container-px mx-auto max-w-4xl text-center">
          <span className="text-primary font-semibold text-sm">Commitment</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground tracking-tight">Relentless Innovation</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-base">
            Compliance structures, labor codes, shift practices, and user expectations are constantly evolving in India. We commit to a process of continuous update and improvement. Our team updates statutory tax rules automatically and rolls out weekly product optimizations to ensure your payroll is always compliant and accurate.
          </p>
        </div>
      </section>
    </>
  );
}
