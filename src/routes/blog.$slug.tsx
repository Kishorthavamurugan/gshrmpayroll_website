import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, ArrowLeft } from "lucide-react";
import { POSTS } from "@/lib/blog-data";
import { SITE } from "@/lib/site";

// Import assets to render contextual blog images
import heroImg from "@/assets/hero-dashboard.png";
import reportsImg from "@/assets/reports.jpg";
import attendanceImg from "@/assets/attendance.jpg";
import complianceImg from "@/assets/compliance.jpg";
import employeesImg from "@/assets/employees-list.png";
import payrollImg from "@/assets/payroll-list.png";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    const p = loaderData;
    if (!p) return {};
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
    };
    return {
      meta: [
        { title: `${p.title} | GSHRM` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(articleSchema) }],
    };
  },
  notFoundComponent: () => (
    <div className="section-y container-px mx-auto max-w-4xl text-center">
      <h1 className="text-3xl font-bold">Post not found</h1>
      <Link to="/blog" className="mt-6 inline-block btn-hero">Back to blog</Link>
    </div>
  ),
  component: Post,
});

function getPostImage(slug: string) {
  switch (slug) {
    case "what-is-payroll-software":
      return payrollImg;
    case "best-payroll-software-india":
      return reportsImg;
    case "pf-esi-compliance-guide":
      return complianceImg;
    case "hrms-vs-payroll-software":
      return employeesImg;
    case "biometric-attendance-guide":
      return attendanceImg;
    default:
      return heroImg;
  }
}

function Post() {
  const p = Route.useLoaderData();
  return (
    <article>
      <header className="section-y" style={{ background: "var(--gradient-hero-dark)" }}>
        <div className="container-px mx-auto max-w-3xl text-white">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"><ArrowLeft className="w-4 h-4"/> All articles</Link>
          <div className="mt-6 inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/10 border border-white/20">{p.category}</div>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">{p.title}</h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {p.readTime}</span>
            <span>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </header>
      <div className="section-y">
        <div className="container-px mx-auto max-w-3xl">
          {/* Article Featured Image */}
          <div className="rounded-2xl border border-border shadow-md overflow-hidden aspect-video w-full max-h-[380px] mb-8 bg-white">
            <img 
              src={getPostImage(p.slug)} 
              alt={p.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">{p.excerpt}</p>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground">
            {p.body.map((para: string, i: number) => <p key={i}>{para}</p>)}
          </div>
          <div className="mt-14 surface-card p-8 text-center bg-surface border border-border rounded-xl">
            <h2 className="text-2xl font-semibold">See GSHRM run your payroll, live.</h2>
            <p className="mt-2 text-muted-foreground">Free 30-minute demo on your data. No credit card needed.</p>
            <Link to="/contact-us" className="mt-5 inline-flex btn-hero">Book a free demo</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
