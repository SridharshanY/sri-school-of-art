import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <Link
      className="floating-whatsapp"
      href="/contact/#whatsapp"
      aria-label="Ask about classes on WhatsApp"
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span>WhatsApp</span>
    </Link>
  );
}
