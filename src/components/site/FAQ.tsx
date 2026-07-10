import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type QA = { q: string; a: string };

export function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl grid gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="surface-card overflow-hidden">
            <button
              className="w-full flex items-center justify-between gap-4 text-left p-5 font-semibold"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {it.q}
              <ChevronDown className={`w-5 h-5 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{it.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

export function faqSchema(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
