import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV, SITE } from "@/lib/site";

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
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0_var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto max-w-7xl flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
          <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="GSHRM Payroll Logo" className="w-full h-full object-contain" />
          </div>
          <span className="tracking-tight">{SITE.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <MegaItem label="Products" items={NAV.products} />
          <MegaItem label="Industries" items={NAV.industries.map(i => ({ ...i, desc: "" }))} columns={2} />
          <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md">Pricing</Link>
          <Link to="/blog" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md">Blog</Link>
          <Link to="/about-us" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md">About</Link>
          <Link to="/contact-us" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md">Contact Us</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/book-demo" className="btn-hero text-sm">Book Free Demo</Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md border border-border"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-px mx-auto max-w-7xl py-4 grid gap-2 text-sm">
            <MobileGroup label="Products" items={NAV.products} onNav={() => setOpen(false)} />
            <MobileGroup label="Industries" items={NAV.industries} onNav={() => setOpen(false)} />
            <Link to="/pricing" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Pricing</Link>
            <Link to="/blog" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Blog</Link>
            <Link to="/about-us" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">About</Link>
            <Link to="/contact-us" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-muted">Contact Us</Link>
            <Link to="/book-demo" onClick={() => setOpen(false)} className="btn-hero mt-2 font-semibold">Book Free Demo</Link>
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
