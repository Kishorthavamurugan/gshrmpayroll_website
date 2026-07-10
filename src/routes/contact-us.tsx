import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle, Headset, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact GSHRM — Book a Free Payroll Demo" },
      { name: "description", content: "Get in touch with GSHRM for a free demo, custom pricing, or migration support. Call, email, WhatsApp or fill the form." },
      { property: "og:title", content: "Contact GSHRM — Book a Free Demo" },
      { property: "og:description", content: "Book a free demo or talk to our payroll experts." },
      { property: "og:url", content: "/contact-us" },
    ],
    links: [{ rel: "canonical", href: "/contact-us" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero 
        eyebrow="Contact Us" 
        title={<>How can we <span className="text-gradient">help you?</span></>} 
        subtitle="Have any queries about GSHRM? Our teams are here to help you find the right solutions." 
      />

      {/* SALES & SUPPORT OPTIONS */}
      <section className="section-y bg-background">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Sales Card */}
            <div className="surface-card p-8 hover-lift border border-border flex flex-col justify-between h-full bg-surface">
              <div>
                <div className="w-12 h-12 rounded-xl grid place-items-center bg-primary/10 text-primary mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Sales & Demo Inquiries</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  Speak to our product experts to learn about GSHRM's features, pricing plans, and scheduling a custom live demo for your organization.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sales Hotline</div>
                      <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {SITE.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Sales</div>
                      <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border/60">
                <Link to="/book-demo" className="btn-hero text-sm w-full justify-center">
                  Book a Free Demo
                </Link>
              </div>
            </div>

            {/* Support Card */}
            <div className="surface-card p-8 hover-lift border border-border flex flex-col justify-between h-full bg-surface">
              <div>
                <div className="w-12 h-12 rounded-xl grid place-items-center bg-primary/10 text-primary mb-6">
                  <Headset className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Customer Support</h3>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  Already a GSHRM customer? Get help with technical queries, payroll processing, statutory compliances, or account administration.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-accent shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">WhatsApp Support</div>
                      <a 
                        href={`https://wa.me/${SITE.whatsapp}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        Chat with Support (24x7)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Email Support</div>
                      <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border/60">
                <a 
                  href={`tel:${SITE.phone.replace(/[\s-]/g, "")}`} 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold border border-border bg-surface hover:bg-surface-elevated transition-colors text-sm w-full text-center hover:border-primary/50"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" /> Call Support ({SITE.phone})
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICES & ADDRESSES */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Office</h2>
            <p className="mt-2 text-muted-foreground">Visit us or get in touch with our team directly.</p>
          </div>

          <div className="flex justify-center">
            {[
              {
                city: "Chennai (HQ)",
                address: "New No:31/4,Old No:89/4, Indira Colony,Ashok Nagar, Chennai-600083 (Behind Udhayam Theater)",
                phone: SITE.phone,
                email: SITE.email,
              },
            ].map((loc, i) => (
              <div key={i} className="surface-card p-8 border border-border hover:border-primary/50 transition-colors flex flex-col justify-between bg-surface max-w-2xl w-full shadow-md">
                <div>
                  <div className="w-12 h-12 rounded-xl grid place-items-center bg-primary/10 text-primary mb-6">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-2xl text-foreground mb-3">{loc.city}</h4>
                  <p className="text-muted-foreground leading-relaxed text-base">{loc.address}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-border/40 space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Telephone:</span>{" "}
                    <a href={`tel:${loc.phone.replace(/[\s-]/g, "")}`} className="hover:text-primary text-foreground font-medium transition-colors">
                      {loc.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Email:</span>{" "}
                    <a href={`mailto:${loc.email}`} className="hover:text-primary text-foreground font-medium transition-colors">
                      {loc.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
