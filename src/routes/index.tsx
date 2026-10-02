import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Smartphone,
  BarChart3,
  Users,
  Calendar,
  Briefcase,
  Building2,
  Utensils,
  Hotel,
  ShoppingBag,
  Factory,
  Stethoscope,
  GraduationCap,
  Truck,
  Fingerprint,
  FileCheck2,
  Calculator,
  Star,
  Quote,
  X,
  Check,
  PlayCircle,
  TrendingUp,
  Gift,
  Printer,
  FileText,
} from "lucide-react";
import heroImg from "@/assets/hero-dashboard.png";
import mobileImg from "@/assets/mobile-app.jpg";
import reportsImg from "@/assets/reports.jpg";
import attendanceImg from "@/assets/attendance.jpg";
import complianceImg from "@/assets/compliance.jpg";
import employeesImg from "@/assets/employees-list.png";
import payrollImg from "@/assets/payroll-list.png";
import attendanceListImg from "@/assets/attendance-list.png";
import shiftImg from "@/assets/shift-list.png";
import leaveImg from "@/assets/leave-list.png";
import otReportImg from "@/assets/ot-report.png";
import bonusReportImg from "@/assets/bonus-report.png";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FAQ, faqSchema } from "@/components/site/FAQ";
import { SITE } from "@/lib/site";
import { DemoForm } from "@/components/site/DemoForm";
import { HeroLaptopMockup } from "@/components/site/HeroLaptopMockup";

const homeFaqs = [
  {
    q: "What is GSHRM Payroll software?",
    a: "GSHRM is an all-in-one payroll and HRMS platform built for Indian businesses. It automates salary processing, attendance, leaves, PF, ESI, PT and TDS — replacing spreadsheets and disconnected HR tools with a single intelligent system.",
  },
  {
    q: "How long does it take to set up GSHRM?",
    a: "Most SMEs go live within 48 hours. Our onboarding team imports your employee data, configures your salary structures and statutory settings, and trains your HR team in two 60-minute sessions.",
  },
  {
    q: "Is GSHRM compliant with Indian payroll laws?",
    a: "Yes. GSHRM is fully compliant with the Income Tax Act, EPF Act, ESI Act, Professional Tax (state-wise), Payment of Bonus Act, Payment of Gratuity Act and Shops & Establishments Acts. Statutory rates are auto-updated by our compliance team.",
  },
  {
    q: "Can GSHRM handle multi-branch and multi-state companies?",
    a: "Yes. Configure unlimited branches, states, business units and pay groups. State-specific PT slabs, holiday lists and shift rules are applied automatically.",
  },
  {
    q: "Does GSHRM integrate with biometric devices?",
    a: "GSHRM integrates with all major biometric attendance devices (eSSL, ZKTeco, Matrix, Realtime) plus GPS, geo-fenced selfie check-ins, and access-control systems.",
  },
  {
    q: "Is there a mobile app for employees?",
    a: "Yes. Employees get a free iOS and Android app to mark attendance, apply for leave, download payslips, view tax declarations, raise reimbursement claims and access HR policies.",
  },
  {
    q: "How is GSHRM priced?",
    a: "Pricing starts at ₹49 per employee per month for the Starter plan. Volume discounts apply above 100 employees. There are no setup fees and no long-term contracts.",
  },
  {
    q: "Is my payroll data secure?",
    a: "GSHRM is ISO 27001 aligned. Data is encrypted at rest (AES-256) and in transit (TLS 1.3), hosted on Indian servers, with role-based access, audit logs and SSO support.",
  },
  {
    q: "Can we run payroll for contract or gig workers?",
    a: "Yes. GSHRM supports salaried staff, contract workers, daily-wage labour and gig/freelance workers in the same platform with separate compliance flows.",
  },
  {
    q: "What kind of support do you offer?",
    a: "24×7 support via WhatsApp, email and phone. Every customer also gets a dedicated Customer Success Manager. Our average response time is under 7 minutes.",
  },
] as const;

const featureBlocks = [
  {
    tag: "Employee Management",
    title: "Complete employee lifecycle management",
    desc: "From hiring to retirement, manage every aspect of the employee journey with digital profiles, documents, and complete history.",
    bullets: [
      "Employee database with profiles",
      "Digital document management",
      "Employee ID generation",
      "Reporting hierarchy setup",
    ],
    image: employeesImg,
  },
  {
    tag: "Payroll",
    title: "Run accurate payroll in under 10 minutes",
    desc: "Automated salary calculation, statutory deductions, arrears, reimbursements and bank transfers. Zero spreadsheets, zero errors.",
    bullets: [
      "One-click salary processing",
      "Auto PF, ESI, PT & TDS",
      "Bank-ready NEFT/IMPS files",
      "Payslips emailed instantly",
    ],
    image: payrollImg,
    reverse: true,
  },
  {
    tag: "Attendance",
    title: "Smart attendance across every location",
    desc: "Biometric, GPS, geo-fenced selfie or web check-ins. Real-time visibility across branches, shifts and workforce types.",
    bullets: [
      "Works with eSSL, ZKTeco, Matrix, Realtime",
      "GPS + selfie check-in",
      "Drag-and-drop shift rosters",
      "Live attendance dashboard",
    ],
    image: attendanceListImg,
  },
  {
    tag: "Shift & Roster Management",
    title: "Flexible scheduling for every work model",
    desc: "Create general, rotational, night, and split shifts with automatic rotation and intelligent scheduling.",
    bullets: [
      "Rotational shift planning",
      "Weekly off management",
      "Holiday mapping",
      "Auto shift rotation",
    ],
    image: shiftImg,
    reverse: true,
  },
  {
    tag: "Leave Management",
    title: "Complete leave automation and approvals",
    desc: "Manage leave policies, accruals, encashment, and approvals with support for maternity, medical, and special leaves.",
    bullets: [
      "Leave policy configuration",
      "Automatic accruals",
      "Leave balance tracking",
      "One-click approval workflow",
    ],
    image: leaveImg,
  },
  {
    tag: "OT Report",
    title: "Automated Overtime Tracking & Analytics",
    desc: "Track overtime hours, double-time, and shift differentials automatically. Complete audit trails and approval workflows for payroll processing.",
    bullets: [
      "Real-time overtime calculation",
      "Custom OT approval workflows",
      "Late-coming & short-leave rules",
      "Detailed employee OT summaries",
    ],
    image: otReportImg,
    reverse: true,
  },
  {
    tag: "Bonus Report",
    title: "Accurate Bonus & Incentive Disbursement",
    desc: "Manage and distribute performance bonuses, festival bonuses, and variable incentives with complete tracking and analytics.",
    bullets: [
      "Performance bonus tracking",
      "Automated incentive payouts",
      "Statutory compliance for bonus payment",
      "Detailed bonus disbursement history",
    ],
    image: bonusReportImg,
  },

];

const capabilities = [
  {
    icon: Sparkles,
    title: "Payroll Automation",
    desc: "Run error-free monthly payroll in under 10 minutes.",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    desc: "Biometric, GPS, selfie & geo-fenced check-ins.",
  },
  {
    icon: Calendar,
    title: "Leave Management",
    desc: "Configurable policies, accruals & auto approvals.",
  },
  {
    icon: Users,
    title: "Employee Management",
    desc: "Complete lifecycle from hiring to retirement.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    desc: "Enterprise security with PF, ESI, PT, TDS.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboards",
    desc: "60+ pre-built reports & custom analytics.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Integration",
    desc: "Works with eSSL, ZKTeco, Matrix & Realtime.",
  },
  {
    icon: FileCheck2,
    title: "Performance Management",
    desc: "Goals, reviews, appraisals & tracking.",
  },
  { icon: Clock, title: "OT Report", desc: "Track overtime hours and costs across employees." },
  {
    icon: FileText,
    title: "Time Card Report",
    desc: "Detailed time card summaries for payroll processing.",
  },
  { icon: Gift, title: "Bonus Report", desc: "Performance & bonus disbursement tracking." },
  {
    icon: Printer,
    title: "Payslip Generation",
    desc: "Auto-generate and email payslips to employees.",
  },
];

const industries = [
  { icon: Utensils, name: "Restaurants", to: "/payroll-for-restaurants" },
  { icon: ShoppingBag, name: "Retail", to: "/payroll-for-retail" },
  { icon: Factory, name: "Manufacturing", to: "/payroll-for-manufacturing" },
  { icon: Stethoscope, name: "Healthcare", to: "/payroll-for-healthcare" },
  { icon: Hotel, name: "Hotels", to: "/payroll-for-hotels" },
  { icon: GraduationCap, name: "Schools", to: "/payroll-for-schools" },
  { icon: Truck, name: "Logistics", to: "/payroll-for-logistics" },
  { icon: Briefcase, name: "Startups", to: "/payroll-for-startups" },
];



const testimonials = [
  {
    name: "Priya Sharma",
    role: "HR Head, Spice Route Restaurants",
    quote:
      "We cut payroll processing from 3 days to 45 minutes. The compliance side alone is worth the price.",
    rating: 5,
  },
  {
    name: "Rohit Mehta",
    role: "Founder, Northstar Apparel",
    quote:
      "Across 17 stores in 4 states, GSHRM is the first system that handles state-wise PT and shift differentials correctly.",
    rating: 5,
  },
  {
    name: "Anita Rao",
    role: "CFO, MediCare Hospitals",
    quote:
      "Our auditors love the audit trail. Our employees love the app. As a CFO I love that PF returns just file themselves.",
    rating: 5,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Smart Payroll & HRMS Software India` },
      {
        name: "description",
        content:
          "GSHRM is India's smart payroll & HRMS software. Automate salary, attendance, PF, ESI, PT and TDS in one platform. Trusted by 5,000+ businesses. Book a free demo.",
      },
      {
        name: "keywords",
        content:
          "payroll software india, hrms software, attendance management, payroll automation, pf esi software, best payroll software for sme",
      },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema([...homeFaqs])) }],
  }),
  component: Home,
});

function useCounter(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          setValue(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, value };
}

function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* HERO — Great Supports Emerald Wave Style */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 bg-gradient-to-b from-[#f3faf7] via-[#ffffff] to-[#eef8f4]">
        
        {/* Ambient Luminous Emerald Waves in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-right glow orb */}
          <div className="absolute -top-24 right-0 w-[600px] h-[500px] bg-gradient-to-bl from-[#34d399]/20 via-[#059669]/10 to-transparent blur-3xl rounded-full" />
          {/* Bottom-left flowing wave glow */}
          <div className="absolute -bottom-32 -left-20 w-[650px] h-[550px] bg-gradient-to-tr from-[#008269]/15 via-[#00c48c]/10 to-transparent blur-3xl rounded-full" />
          
          {/* Abstract SVG Flowing Wave Ribbons matching the template image */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[380px] opacity-25"
            viewBox="0 0 1440 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-100 280 C300 120, 600 360, 950 180 C1200 60, 1400 200, 1600 140 L1600 400 L-100 400 Z"
              fill="url(#wave-gradient-1)"
            />
            <path
              d="M-50 320 C250 180, 550 340, 850 220 C1150 100, 1350 240, 1550 190 L1550 400 L-50 400 Z"
              fill="url(#wave-gradient-2)"
              opacity="0.7"
            />
            <defs>
              <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00b884" />
                <stop offset="50%" stopColor="#008269" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>
              <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#008269" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container-px mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Hero Text & Dual CTAs */}
            <div className="lg:col-span-6 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d7f7ee] text-[#007357] text-xs font-bold border border-[#99ebd6]/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#009b77]" />
                <span className="tracking-wide">All-in-One Payroll & HRMS</span>
              </div>

              {/* Main Headline */}
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] leading-[1.08] font-black text-slate-900 tracking-tight">
                Experience the <br />
                <span className="bg-gradient-to-r from-[#008269] via-[#00a87d] to-[#00c98f] bg-clip-text text-transparent">
                  future of payroll
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                See how India's smart payroll & HRMS platform can help you run payroll in under 3 minutes, eliminate errors, and automate tax calculations.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#006e5b] via-[#008a6e] to-[#00a87d] shadow-lg shadow-[#008a6e]/30 hover:shadow-xl hover:shadow-[#008a6e]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span>Book a Live Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-bold text-base text-[#006e5b] bg-white/95 hover:bg-white border border-[#00a87d]/40 shadow-sm hover:shadow-md hover:border-[#00a87d] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#009b77] text-white grid place-items-center">
                    <PlayCircle className="w-4 h-4 fill-white text-[#009b77]" />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Highlights below buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00a87d]" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00a87d]" /> 14-day free trial
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00a87d]" /> Setup in 48 hrs
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Laptop Dashboard Mockup */}
            <div className="lg:col-span-6 relative animate-fade-in-up">
              <HeroLaptopMockup />
            </div>
          </div>

          {/* Bottom 4 Feature Cards (Frosted Glass / Emerald Badges) */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {/* Card 1: 15-Minute Walkthrough */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100/80 shadow-[0_10px_30px_-10px_rgba(0,130,105,0.08)] hover:shadow-[0_15px_35px_-10px_rgba(0,130,105,0.18)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a87d] to-[#005f4d] text-white grid place-items-center shrink-0 shadow-md shadow-[#00a87d]/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base tracking-tight">15-Minute Walkthrough</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Quick, customized product tour matching your industry's exact pay slabs.
                </p>
              </div>
            </div>

            {/* Card 2: Compliances Handled */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100/80 shadow-[0_10px_30px_-10px_rgba(0,130,105,0.08)] hover:shadow-[0_15px_35px_-10px_rgba(0,130,105,0.18)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a87d] to-[#005f4d] text-white grid place-items-center shrink-0 shadow-md shadow-[#00a87d]/20">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base tracking-tight">Compliances Handled</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  See automatic generation of ready-to-file PF, ESI, PT, and TDS challans.
                </p>
              </div>
            </div>

            {/* Card 3: Automate Payroll */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100/80 shadow-[0_10px_30px_-10px_rgba(0,130,105,0.08)] hover:shadow-[0_15px_35px_-10px_rgba(0,130,105,0.18)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a87d] to-[#005f4d] text-white grid place-items-center shrink-0 shadow-md shadow-[#00a87d]/20">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base tracking-tight">Automate Payroll</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Eliminate manual errors and save hours with automated calculations.
                </p>
              </div>
            </div>

            {/* Card 4: Real-Time Reports */}
            <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-100/80 shadow-[0_10px_30px_-10px_rgba(0,130,105,0.08)] hover:shadow-[0_15px_35px_-10px_rgba(0,130,105,0.18)] hover:-translate-y-1 transition-all flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a87d] to-[#005f4d] text-white grid place-items-center shrink-0 shadow-md shadow-[#00a87d]/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm md:text-base tracking-tight">Real-Time Reports</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Get instant insights with powerful and customizable reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Tour Modal */}
        {videoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in-up">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl">
              <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-bold text-white text-sm">Great Supports GSHRM Product Walkthrough</span>
                </div>
                <button
                  type="button"
                  onClick={() => setVideoOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center p-8 text-center text-white">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00a87d]/20 text-[#00d099] grid place-items-center mx-auto border border-[#00a87d]/40">
                    <PlayCircle className="w-8 h-8 fill-[#00a87d] text-black" />
                  </div>
                  <h3 className="text-xl font-bold">Watch Great Supports 3-Minute Interactive Tour</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Experience automated Indian statutory payroll processing, one-click bank payouts, and smart attendance.
                  </p>
                  <Link
                    to="/book-demo"
                    onClick={() => setVideoOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#008269] hover:bg-[#009b77]"
                  >
                    Schedule Live Interactive Demo <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CAPABILITIES GRID */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Everything you need"
            title={
              <>
                One platform. <span className="text-gradient">Every HR workflow.</span>
              </>
            }
            subtitle="From the moment you hire to the moment you run final settlement — GSHRM automates every step."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {capabilities.map((f) => (
              <div key={f.title} className="surface-card hover-lift p-6">
                <div className="w-11 h-11 rounded-xl grid place-items-center bg-primary/10 text-primary">
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="mt-4 font-semibold">{f.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALTERNATING FEATURE BLOCKS with product screenshots */}
      <section className="bg-surface-elevated overflow-hidden">
        <div className="container-px mx-auto max-w-7xl py-16 md:py-24 space-y-24 md:space-y-32">
          {featureBlocks.map((b, i) => (
            <div
              key={i}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${b.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {b.tag}
                </div>
                <h3 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">{b.title}</h3>
                <p className="mt-4 text-muted-foreground text-lg">{b.desc}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {b.bullets.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />{" "}
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact-us"
                  className="mt-7 inline-flex items-center gap-1.5 font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 via-primary-glow/10 to-transparent blur-2xl" />
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  width={1600}
                  height={1104}
                  className="relative rounded-2xl border border-border shadow-[var(--shadow-lg)] w-full h-auto bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* INDUSTRIES */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Industries"
            title={
              <>
                Built for <span className="text-gradient">every industry</span>
              </>
            }
            subtitle="Pre-configured shift rules, wage codes and compliance settings for your sector."
          />
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map((i) => (
              <Link
                key={i.name}
                to={i.to}
                className="surface-card hover-lift p-6 text-center group bg-surface"
              >
                <div className="mx-auto w-12 h-12 rounded-xl grid place-items-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <i.icon className="w-6 h-6" />
                </div>
                <div className="mt-4 font-semibold">{i.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Payroll for {i.name.toLowerCase()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <RoiCalculator />

      {/* TESTIMONIALS */}
      <section className="section-y">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Loved by HR leaders"
            title={
              <>
                4.8/5 across <span className="text-gradient">1,240+ reviews</span>
              </>
            }
          />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="surface-card p-7">
                <Quote className="w-8 h-8 text-primary/30" />
                <p className="mt-3 text-base leading-relaxed">{t.quote}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE GSHRM */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Choose GSHRM"
            title={
              <>
                Enterprise HR platform <span className="text-gradient">built for India</span>
              </>
            }
            subtitle="Trusted by leading Indian companies for payroll, compliance, and workforce management."
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "☁️",
                title: "Cloud-Based Platform",
                desc: "Access from anywhere, anytime on any device.",
              },
              {
                icon: "⚡",
                title: "Fast Payroll Processing",
                desc: "Process payroll for 1000s in under 10 minutes.",
              },
              {
                icon: "🛡️",
                title: "99.9% System Uptime",
                desc: "Enterprise-grade reliability and performance.",
              },
              {
                icon: "🔒",
                title: "Enterprise Security",
                desc: "ISO 27001 aligned, AES-256 encryption.",
              },
              {
                icon: "⚖️",
                title: "Statutory Compliance",
                desc: "Auto PF, ESI, PT, TDS, and statutory filings.",
              },

              {
                icon: "📊",
                title: "Real-Time Dashboards",
                desc: "Live insights with 60+ pre-built reports.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="surface-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-surface-elevated">
        <div className="container-px mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="FAQs"
            title={
              <>
                Questions, <span className="text-gradient">answered</span>
              </>
            }
          />
          <div className="mt-12">
            <FAQ items={[...homeFaqs]} />
          </div>
        </div>
      </section>

      {/* DEMO CTA */}
      <DemoSection />
    </>
  );
}



function Stat({
  target,
  staticValue,
  suffix = "",
  label,
}: {
  target?: number;
  staticValue?: string;
  suffix?: string;
  label: string;
}) {
  const { ref, value } = useCounter(target ?? 0);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-display font-bold text-gradient">
        {staticValue ?? `${value.toLocaleString()}${suffix}`}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function RoiCalculator() {
  const [employees, setEmployees] = useState(50);
  const [hours, setHours] = useState(20);
  const [hrCost, setHrCost] = useState(800);

  const monthly = Math.round(hours * hrCost * 0.85);
  const annual = monthly * 12 + employees * 200;

  return (
    <section className="section-y bg-surface-elevated">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="ROI Calculator"
          title={
            <>
              See how much <span className="text-gradient">GSHRM saves you</span>
            </>
          }
          subtitle="Most teams recover their subscription cost in the first month."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-8 surface-card p-6 md:p-10">
          <div className="space-y-6">
            <Field
              label="Number of employees"
              value={employees}
              setValue={setEmployees}
              min={5}
              max={1000}
              step={5}
            />
            <Field
              label="Hours spent on payroll / month"
              value={hours}
              setValue={setHours}
              min={2}
              max={120}
              step={1}
              suffix=" hrs"
            />
            <Field
              label="Hourly cost of HR / payroll staff"
              value={hrCost}
              setValue={setHrCost}
              min={200}
              max={3000}
              step={50}
              prefix="₹"
            />
          </div>
          <div
            className="rounded-2xl p-8 text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="text-sm uppercase tracking-wider opacity-80">Estimated savings</div>
            <div className="mt-6">
              <div className="text-sm opacity-80">Monthly</div>
              <div className="text-4xl font-bold">₹{monthly.toLocaleString("en-IN")}</div>
            </div>
            <div className="mt-6">
              <div className="text-sm opacity-80">Annual</div>
              <div className="text-5xl font-bold">₹{annual.toLocaleString("en-IN")}</div>
            </div>
            <Link
              to="/contact-us"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary font-semibold hover:scale-[1.02] transition-transform"
            >
              Get my custom report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  setValue,
  min,
  max,
  step,
  prefix = "",
  suffix = "",
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium">{label}</label>
        <span className="font-semibold text-primary">
          {prefix}
          {value.toLocaleString("en-IN")}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-3 w-full accent-[oklch(0.42_0.18_264)]"
      />
    </div>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="section-y">
      <div className="container-px mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-white"
          style={{ background: "var(--gradient-hero-dark)" }}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" /> Free 30-min demo
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                See GSHRM run your payroll, live.
              </h2>
              <p className="mt-3 text-white/80">
                Tell us a bit about your team. We'll show you an actual payroll cycle on your data.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live walkthrough on your
                  data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No-obligation custom quote
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Migration plan from your
                  current tool
                </li>
              </ul>
            </div>
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}


