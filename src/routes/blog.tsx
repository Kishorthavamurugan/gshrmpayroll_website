import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Search, BookOpen, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { POSTS } from "@/lib/blog-data";
import { useState, useMemo } from "react";
import { SITE } from "@/lib/site";

// Import assets to render contextual blog images
import heroImg from "@/assets/hero-dashboard.png";
import reportsImg from "@/assets/reports.jpg";
import attendanceImg from "@/assets/attendance.jpg";
import complianceImg from "@/assets/compliance.jpg";
import employeesImg from "@/assets/employees-list.png";
import payrollImg from "@/assets/payroll-list.png";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `${SITE.name} Blog — Payroll, HRMS & Compliance Insights` },
      { name: "description", content: "Practical guides on payroll, HRMS, attendance, PF, ESI, TDS and Indian labour-law compliance — written by GSHRM's experts." },
      { property: "og:title", content: `${SITE.name} Blog` },
      { property: "og:description", content: "Practical guides on payroll, HRMS and Indian compliance." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const CATEGORIES = ["All", "Payroll", "HRMS", "Attendance", "Compliance", "Buying Intent"];

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

function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || post.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = useMemo(() => {
    if (filteredPosts.length > 0) {
      return filteredPosts[0];
    }
    return null;
  }, [filteredPosts]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return [];
    return filteredPosts.filter((post) => post.slug !== featuredPost.slug);
  }, [filteredPosts, featuredPost]);

  return (
    <>
      <PageHero 
        eyebrow="Resources" 
        title={<>Payroll & HRMS <span className="text-gradient">knowledge center</span></>} 
        subtitle="Practical guides, compliance insights, templates, and best practices — compiled by GSHRM's payroll experts." 
      />

      <section className="section-y bg-background">
        <div className="container-px mx-auto max-w-7xl">
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border mb-10">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none select-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? "bg-primary border-primary text-primary-foreground shadow-md"
                      : "bg-surface border-border text-muted-foreground hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-foreground"
              />
            </div>
          </div>

          {/* DYNAMIC POSTS RENDER */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-surface-elevated border border-dashed border-border rounded-2xl max-w-xl mx-auto p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl grid place-items-center bg-rose-50 text-rose-500 mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">No articles found</h3>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                We couldn't find any articles matching your search query "{searchQuery}" under the category "{activeCategory}". Try refining your keywords or choosing a different filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 inline-flex items-center gap-1.5 font-semibold text-primary text-sm hover:underline"
              >
                Clear all filters <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Featured Post Card */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Featured Article
                  </div>
                  <Link 
                    to="/blog/$slug" 
                    params={{ slug: featuredPost.slug }} 
                    className="block surface-card hover-lift p-8 md:p-10 grid lg:grid-cols-2 gap-8 items-center bg-surface border border-border shadow-md group"
                  >
                    <div>
                      <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                        {featuredPost.category}
                      </span>
                      <h2 className="mt-4 text-2xl md:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border" />
                        <span>
                          {new Date(featuredPost.date).toLocaleDateString("en-IN", { 
                            day: "numeric", 
                            month: "long", 
                            year: "numeric" 
                          })}
                        </span>
                      </div>
                      <div className="mt-8 inline-flex items-center gap-2 text-primary font-semibold text-sm">
                        Read full guide <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Visual Card Image */}
                    <div className="relative rounded-2xl border border-border shadow-md overflow-hidden aspect-video w-full max-h-[300px]">
                      <img 
                        src={getPostImage(featuredPost.slug)} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bg-white" 
                      />
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid Posts */}
              {gridPosts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6 pb-3 border-b border-border">
                    Recent Articles
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((p) => (
                      <Link 
                        key={p.slug} 
                        to="/blog/$slug" 
                        params={{ slug: p.slug }} 
                        className="surface-card hover-lift border border-border bg-surface flex flex-col justify-between h-full shadow-sm overflow-hidden group"
                      >
                        <div>
                          {/* Card Image */}
                          <div className="aspect-video w-full overflow-hidden border-b border-border bg-white">
                            <img 
                              src={getPostImage(p.slug)} 
                              alt={p.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                          </div>

                          <div className="p-6">
                            <span className="inline-block px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                              {p.category}
                            </span>
                            <h4 className="mt-3 text-lg font-bold text-foreground leading-snug hover:text-primary transition-colors">
                              {p.title}
                            </h4>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                              {p.excerpt}
                            </p>
                          </div>
                        </div>
                        <div className="mx-6 mb-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> {p.readTime}
                          </span>
                          <span>
                            {new Date(p.date).toLocaleDateString("en-IN", { 
                              day: "numeric", 
                              month: "short", 
                              year: "numeric" 
                            })}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
