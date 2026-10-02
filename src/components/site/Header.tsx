import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size="md" />
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          <MegaItem label="Products" items={NAV.products} />
          <MegaItem label="Industries" items={NAV.industries.map(i => ({ ...i, desc: "" }))} columns={2} />
          <Link to="/pricing" className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#008269] transition-colors rounded-lg">
            Pricing
          </Link>
          <Link to="/blog" className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-[#008269] transition-colors rounded-lg">
            Blog
          </Link>
          <MegaItem label="Resources" items={NAV.resources} />
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book-demo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#006e5b] via-[#008a6e] to-[#00a87d] shadow-md shadow-[#008a6e]/25 hover:shadow-lg hover:shadow-[#008a6e]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>Book a Live Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg border border-emerald-100 text-slate-700 hover:bg-emerald-50"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-lg">
          <div className="container-px mx-auto max-w-7xl py-4 grid gap-2 text-sm">
            <MobileGroup label="Products" items={NAV.products} onNav={() => setOpen(false)} />
            <MobileGroup label="Industries" items={NAV.industries} onNav={() => setOpen(false)} />
            <Link to="/pricing" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md font-medium hover:bg-emerald-50 text-slate-700">Pricing</Link>
            <Link to="/blog" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md font-medium hover:bg-emerald-50 text-slate-700">Blog</Link>
            <MobileGroup label="Resources" items={NAV.resources} onNav={() => setOpen(false)} />
            <Link
              to="/book-demo"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#006e5b] to-[#00a87d] mt-2 shadow-md"
            >
              <span>Book a Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaItem({ label, items, columns = 1 }: { label: string; items: { title: string; to: string; desc?: string }[]; columns?: 1 | 2 }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md">
        {label} <ChevronDown className="w-4 h-4 opacity-60 group-hover:rotate-180 transition-transform" />
      </button>
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 top-full pt-3 z-50">
        <div className={`surface-card p-3 shadow-[var(--shadow-lg)] grid gap-1 ${columns === 2 ? "grid-cols-2 w-[520px]" : "w-[340px]"}`}>
          {items.map((i) => (
            <Link key={i.to} to={i.to} className="block rounded-lg p-3 hover:bg-muted">
              <div className="font-semibold text-sm">{i.title}</div>
              {i.desc && <div className="text-xs text-muted-foreground mt-0.5">{i.desc}</div>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroup({ label, items, onNav }: { label: string; items: { title: string; to: string }[]; onNav: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted font-medium">
        {label} <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pl-3 grid gap-1">
          {items.map(i => (
            <Link key={i.to} to={i.to} onClick={onNav} className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md">
              {i.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
