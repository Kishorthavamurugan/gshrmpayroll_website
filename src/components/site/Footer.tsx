import { Link } from "@tanstack/react-router";
import { NAV, SITE } from "@/lib/site";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[oklch(0.16_0.05_260)] text-[oklch(0.95_0.01_240)]">
      <div className="container-px mx-auto max-w-7xl py-16 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 font-display font-bold text-xl">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="GSHRM Payroll Logo" className="w-full h-full object-contain" />
            </div>
            {SITE.name}
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-sm">{SITE.description}</p>
          <ul className="mt-6 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {SITE.phone}</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> {SITE.email}</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {SITE.address}</li>
          </ul>
        </div>

        <FooterCol title="Products" items={NAV.products} />
        <FooterCol title="Industries" items={NAV.industries} />
        <FooterCol title="Company" items={[
          { title: "About Us", to: "/about-us" },
          { title: "Pricing", to: "/pricing" },
          { title: "Blog", to: "/blog" },
          { title: "Contact", to: "/contact-us" },
        ]} />
      </div>
      <div className="border-t border-white/10">
        <div className="container-px mx-auto max-w-7xl py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</div>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-white">Privacy</Link>
            <Link to="/" className="hover:text-white">Terms</Link>
            <Link to="/" className="hover:text-white">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { title: string; to: string }[] }) {
  return (
    <div>
      <div className="font-display font-semibold text-sm uppercase tracking-wider text-white/90">{title}</div>
      <ul className="mt-4 space-y-2">
        {items.slice(0, 6).map(i => (
          <li key={i.to}>
            <Link to={i.to} className="text-sm text-white/70 hover:text-white transition-colors">{i.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
