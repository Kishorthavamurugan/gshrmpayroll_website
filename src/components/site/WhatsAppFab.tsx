import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("Hi GSHRM, I'd like a demo of your payroll software.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full text-white font-semibold shadow-[var(--shadow-glow)] hover:scale-105 transition-transform"
      style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden md:inline text-sm">Chat with us</span>
    </a>
  );
}
