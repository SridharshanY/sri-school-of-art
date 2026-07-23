import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contact Sri School of Art about classes, trial sessions, workshops, camps and creative events."
};

const contactItems = [
  {
    icon: MapPin,
    label: "Studio location",
    value: "Chennai, Tamil Nadu",
    note: "Full street address to be confirmed",
    tone: "yellow"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "Number to be added",
    note: "Add a verified click-to-call number",
    tone: "coral"
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Number to be added",
    note: "Add a verified WhatsApp Business link",
    tone: "mint",
    id: "whatsapp"
  },
  {
    icon: Mail,
    label: "Email",
    value: "Email to be added",
    note: "Add the school’s monitored inbox",
    tone: "sky"
  }
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact Sri School of Art"
        title="Questions are welcome. Curiosity is"
        highlight="encouraged."
        text="Ask about a class, workshop, trial session or creative event. We’ll point you in the right direction."
        tone="sky"
        cta={{ label: "Book a trial", href: "/registration/" }}
      />

      <section className="section contact-options" id="page-content">
        <div className="container">
          <div className="contact-card-grid">
            {contactItems.map((item) => (
              <article
                className={`contact-card tone-${item.tone}`}
                key={item.label}
                id={item.id}
              >
                <item.icon size={24} aria-hidden="true" />
                <small>{item.label}</small>
                <strong>{item.value}</strong>
                <span>{item.note}</span>
              </article>
            ))}
          </div>
          <p className="content-disclaimer">
            Contact details are intentionally left unverified in this first
            version. Add the school’s real phone, WhatsApp, email and full
            address before publishing.
          </p>
        </div>
      </section>

      <section className="section contact-main-section">
        <div className="container contact-main-grid">
          <div className="contact-form-panel">
            <p className="eyebrow">Send an enquiry</p>
            <h2>Tell us how we can help.</h2>
            <p>
              Share a few details and the school can respond with the right
              class, timing or workshop information.
            </p>
            <ContactForm />
          </div>
          <div className="contact-side">
            <div className="map-placeholder map-placeholder-large" aria-label="Map placeholder">
              <div className="map-grid" aria-hidden="true" />
              <span className="map-pin">
                <MapPin size={26} fill="currentColor" aria-hidden="true" />
              </span>
              <div className="map-card">
                <strong>Sri School of Art</strong>
                <span>Connect the verified Google Maps location here</span>
              </div>
            </div>
            <div className="hours-card">
              <div className="hours-heading">
                <Clock3 size={22} aria-hidden="true" />
                <div>
                  <small>Typical working hours</small>
                  <strong>Confirm before launch</strong>
                </div>
              </div>
              <dl>
                <div>
                  <dt>Monday–Tuesday</dt>
                  <dd>Closed / planning</dd>
                </div>
                <div>
                  <dt>Wednesday–Friday</dt>
                  <dd>3:00 PM–7:00 PM</dd>
                </div>
                <div>
                  <dt>Saturday–Sunday</dt>
                  <dd>9:00 AM–7:00 PM</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container faq-grid">
          <div>
            <p className="eyebrow">Common questions</p>
            <h2>A few things learners often ask.</h2>
            <p>
              Still unsure? Send an enquiry and we’ll help you choose without
              pressure.
            </p>
          </div>
          <div className="faq-list">
            <details>
              <summary>Do I need previous art experience?</summary>
              <p>
                No. Several classes are designed for complete beginners, and we
                recommend a starting level based on age and goals.
              </p>
            </details>
            <details>
              <summary>Are materials included?</summary>
              <p>
                It depends on the class. Every course card states whether
                materials are included, shared or purchased separately.
              </p>
            </details>
            <details>
              <summary>Can adults join as beginners?</summary>
              <p>
                Absolutely. Adult hobby classes are paced for relaxed learning
                and do not assume prior training.
              </p>
            </details>
            <details>
              <summary>Are online classes available?</summary>
              <p>
                Selected programmes can be offered online. Confirm the current
                schedule and materials setup when registering.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="section social-band">
        <div className="container social-band-inner">
          <div>
            <p className="eyebrow">Follow the making</p>
            <h2>New artwork, workshops and studio moments.</h2>
          </div>
          <div className="social-band-links">
            <a href="#instagram">
              <Camera size={19} aria-hidden="true" /> Instagram
            </a>
            <a href="#youtube">
              <Play size={19} aria-hidden="true" /> YouTube
            </a>
            <Link href="/gallery/">
              Gallery <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
