import { createFileRoute } from "@tanstack/react-router";
import { ProductPage, buildFaqHead } from "@/components/site/PageTemplates";

const faqs = [
  { q: "How does GSHRM attendance work?", a: "Employees mark attendance via biometric devices, mobile app (GPS + selfie), web kiosks or RFID. GSHRM auto-syncs every check-in to the payroll and compliance engines in real-time." },
  { q: "Which biometric devices are supported?", a: "GSHRM supports eSSL, ZKTeco, Matrix, Realtime, Mantra and all standard push/pull APIs. New devices can be added in under an hour." },
  { q: "Does it support geo-fencing for field staff?", a: "Yes. Define geo-fences around stores, sites or client locations. Field employees check in with a selfie that is GPS-stamped and time-stamped." },
  { q: "Can it handle rotational and night shifts?", a: "Yes — rotational, split, night-differential and 24×7 shifts are all configurable with overtime, late-coming and short-leave rules." },
];

export const Route = createFileRoute("/attendance-management")({
  head: () => buildFaqHead(faqs, {
    title: "Attendance Management Software — Biometric, GPS & Geo-fence | GSHRM",
    description: "Track attendance with biometric devices, GPS, geo-fenced selfies and shifts. Real-time sync to payroll. Trusted by 5,000+ Indian businesses.",
    path: "/attendance-management",
  }),
  component: () => (
    <ProductPage
      eyebrow="Attendance Management"
      title={<>Accurate attendance, <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #7DD3FC, #34D399)" }}>everywhere your team is</span></>}
      subtitle="Biometric, GPS, geo-fenced selfies and shift schedules — all flowing straight into payroll."
      intro="GSHRM Attendance Management captures every check-in across biometric devices, mobile GPS, geo-fenced selfies and web kiosks. Data flows into the payroll engine in real-time so overtime, LOP and late-coming are reflected instantly."
      features={[
        { title: "Biometric integration", desc: "eSSL, ZKTeco, Matrix, Realtime and more." },
        { title: "GPS & selfie", desc: "Mobile check-in with location and live photo." },
        { title: "Geo-fencing", desc: "Site-based attendance for field and retail staff." },
        { title: "Shift scheduling", desc: "Drag-drop rosters, rotational & night shifts." },
        { title: "Overtime engine", desc: "Configurable OT, double-time and comp-off rules." },
        { title: "Regularisation", desc: "Employees raise & managers approve in one tap." },
        { title: "Real-time dashboards", desc: "Live presence, absenteeism and late-coming." },
        { title: "Visitor & contractor", desc: "Track non-employees on the same system." },
        { title: "Payroll sync", desc: "Variable inputs flow to payroll automatically." },
      ]}
      bullets={[
        "All-in-one for biometric, GPS, RFID and kiosk",
        "Geo-fencing for retail, field and project sites",
        "Rotational, split and night shift support",
        "Real-time payroll sync — no exports needed",
        "One-tap regularisation & approval flows",
        "Visitor and contractor management included",
        "Works offline; syncs when network returns",
        "Audit-grade logs for every check-in",
      ]}
      faqs={faqs}
    />
  ),
});
