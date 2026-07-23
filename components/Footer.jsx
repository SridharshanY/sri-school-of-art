import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  UsersRound,
  Play,
  MessageCircle,
  MapPin
} from "lucide-react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-stroke" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-intro">
          <Link href="/" className="brand brand-light" aria-label="Sri School of Art home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-copy">
              <strong>Sri</strong>
              <span>School of Art</span>
            </span>
          </Link>
          <h2>A welcoming place to draw, paint, make and grow.</h2>
          <p>
            Friendly, hands-on art learning for children, teens and adults — at
            every stage of their creative journey.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <Link href="/about/">About us</Link>
            <Link href="/classes/">Classes</Link>
            <Link href="/gallery/">Gallery</Link>
            <Link href="/workshops/">Workshops</Link>
          </div>
          <div>
            <h3>Start here</h3>
            <Link href="/registration/">Book a trial</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/classes/#fees">Fees & batches</Link>
            <Link href="/contact/#faq">FAQs</Link>
          </div>
        </div>

        <div className="footer-contact">
          <h3>Let’s make something</h3>
          <Link href="/contact/" className="footer-contact-row">
            <MapPin size={18} aria-hidden="true" />
            <span>
              Chennai, Tamil Nadu
              <small>Full studio address to be confirmed</small>
            </span>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="footer-contact-row"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>
              WhatsApp the school
              <small>{WHATSAPP_DISPLAY}</small>
            </span>
          </a>
          <Link className="footer-big-link" href="/registration/">
            Request a trial <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Sri School of Art. All creative rights reserved.</p>
        <div className="social-links" aria-label="Social media links">
          <span>Social links coming soon</span>
          <a href="#instagram" aria-label="Instagram (link to be added)">
            <Camera size={18} />
          </a>
          <a href="#facebook" aria-label="Facebook (link to be added)">
            <UsersRound size={18} />
          </a>
          <a href="#youtube" aria-label="YouTube (link to be added)">
            <Play size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
