import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Ask about classes on WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}
