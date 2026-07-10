import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Sparkles, Shield, HelpCircle, ArrowRight } from "lucide-react";
import { DemoForm } from "@/components/site/DemoForm";
import { FAQ } from "@/components/site/FAQ";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Book a Free Live Demo — GSHRM Payroll" },
      { name: "description", content: "Schedule a personalized 1-on-1 walkthrough of India's smartest payroll & HRMS platform. See automated compliance, attendance, and custom configurations." },
      { property: "og:title", content: "Book a Free Live Demo — GSHRM Payroll" },
      { property: "og:description", content: "Get a personalized payroll walkthrough and free sandbox trial account." },
      { property: "og:url", content: "/book-demo" },
    ],
    links: [{ rel: "canonical", href: "/book-demo" }],
  }),
  component: BookDemoPage,
});

const demoFaqs = [
  {
    q: "Is the live demo really free?",
    a: "Yes, 100% free with no credit card required and no obligation. We want to show you how GSHRM fits your business before you make any decisions.",
  },
  {
    q: "How long does the demo take?",
    a: "Usually around 15 to 20 minutes. We'll show you the core automation features, answer your questions, and can configure a custom workspace during the call.",
  },
  {
    q: "Can I try GSHRM with my own employee database?",
    a: "Absolutely! After the demo, we will help you set up a free sandbox account preloaded with your pay structures so you can test standard salary runs with your team.",
  },
  {
    q: "Do you help with migration from Excel or other software?",
    a: "Yes. Our implementation specialists provide complete setup support. We migrate your employee history, previous month records, and compliance profiles for free.",
  },
];

function BookDemoPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28" style={{ background: "var(--gradient-hero-dark)" }}>
        <div className="container-px mx-auto max-w-7xl text-white">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-accent-light">
                <Sparkles className="w-3.5 h-3.5" /> Book a Live Demo
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Experience the <span className="text-gradient">future of payroll</span>
              </h1>
              <p className="text-lg text-white/80 max-w-xl leading-relaxed">
                See how India's smart payroll & HRMS platform can help you run payroll in under 3 minutes, eliminate errors, and automate tax calculations.
              </p>
              
              {/* Value Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-4">
                {[
                  {
                    icon: Clock,
                    title: "15-Minute Walkthrough",
                    desc: "Quick, customized product tour matching your industry's exact pay slabs.",
                  },
                  {
                    icon: Shield,
                    title: "Compliances Handled",
                    desc: "See automatic generation of ready-to-file PF, ESI, PT, and TDS challans.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Free Sandbox Setup",
                    desc: "Get an interactive trial workspace preloaded with test employee data.",
                  },
                  {
                    icon: Sparkles,
                    title: "Free Data Migration",
                    desc: "We will migrate your employee history from Excel or old software for free.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                    <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-30 blur-lg"></div>
              <div className="relative">
                <DemoForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y bg-surface">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground">What happens next?</h2>
            <p className="mt-3 text-muted-foreground">Getting started with GSHRM is simple and takes less than 48 hours.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Fill the Form",
                desc: "Tell us about your team size and industry. Takes less than 30 seconds.",
              },
              {
                step: "02",
                title: "Receive Callback",
                desc: "A payroll specialist will call you back within 15 minutes to schedule the demo.",
              },
              {
                step: "03",
                title: "Personalized Demo",
                desc: "We will demonstrate the software live, configured around your specific pay structures.",
              },
              {
                step: "04",
                title: "Go Live",
                desc: "We migrate your historical data and train your staff. You are ready to run payroll!",
              },
            ].map((item, index) => (
              <div key={index} className="relative surface-card p-8 border border-border bg-surface-elevated hover-lift flex flex-col justify-between rounded-xl">
                <div>
                  <div className="text-4xl font-extrabold text-primary/10 mb-4">{item.step}</div>
                  <h4 className="font-bold text-lg text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-y bg-background border-t border-border/40">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="w-8 h-8 text-primary" /> Got Questions?
            </h2>
            <p className="mt-2 text-muted-foreground">Everything you need to know about our demo and onboarding process.</p>
          </div>
          <div className="max-w-4xl mx-auto mt-8">
            <FAQ items={demoFaqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
