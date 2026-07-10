import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero-dark)" }}>
      <div className="container-px mx-auto max-w-7xl pt-20 pb-20 md:pt-28 md:pb-28 text-white">
        {eyebrow && <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">{eyebrow}</div>}
        <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-white/80 max-w-2xl">{subtitle}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/book-demo" className="btn-hero">Book Free Demo</Link>
          <Link to="/pricing" className="btn-ghost-light">View Pricing</Link>
        </div>
        {children}
      </div>
    </section>
  );
}
