import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
