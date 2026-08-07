import Link from "next/link";
import {
  Check,
  Clock3,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import PageHero from "@/components/PageHero";
import TrialForm from "@/components/TrialForm";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { getPublishedClasses } from "@/lib/classes";

export const metadata = {
  title: "Registration",
  description:
    "Request a trial class or register your interest in an art class or workshop at Sri School of Art."
};

export const dynamic = "force-dynamic";

export default async function RegistrationPage() {
  const classes = await getPublishedClasses();
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Trial class registration"
        title="Your creative journey can start"
        highlight="here."
        text="Tell us a little about the learner and what they would like to explore. We’ll help match the right class and batch."
        tone="yellow"
      />

      <section className="section registration-section" id="page-content">
        <div className="container registration-grid">
          <aside className="registration-aside">
            <p className="eyebrow">What happens next</p>
            <h2>Simple, friendly and pressure-free.</h2>
            <ol className="registration-steps">
              <li>
                <span>01</span>
                <div>
                  <strong>Share your interests</strong>
                  <p>Tell us the learner’s age, experience and preferred mode.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Get a recommendation</strong>
                  <p>We’ll suggest the most suitable class and available batch.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Try the class</strong>
                  <p>Meet the teaching style before choosing a longer course.</p>
                </div>
              </li>
            </ol>
            <div className="registration-reassurance">
              <span>
                <HeartHandshake size={21} aria-hidden="true" />
                Beginner friendly
              </span>
              <span>
                <Clock3 size={21} aria-hidden="true" />
                Flexible batches
              </span>
              <span>
                <ShieldCheck size={21} aria-hidden="true" />
                No payment on this form
              </span>
            </div>
            <div className="whatsapp-note">
              <MessageCircle size={23} aria-hidden="true" />
              <div>
                <strong>Prefer WhatsApp?</strong>
                <p>
                  Send a direct message to{" "}
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    {WHATSAPP_DISPLAY}
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          <div className="registration-form-wrap">
            <div className="form-heading">
              <span className="form-heading-icon">
                <Sparkles size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Tell us about the learner</p>
                <h2>Request a class</h2>
              </div>
            </div>
            <TrialForm variant="full" classOptions={classes} />
            <div className="privacy-line">
              <Check size={16} aria-hidden="true" />
              Form data should be connected to the school’s secure email or
              database before going live.
            </div>
          </div>
        </div>
      </section>

      <section className="section registration-bottom">
        <div className="container registration-bottom-inner">
          <div>
            <p className="eyebrow">Want to look around first?</p>
            <h2>See what learners make in class.</h2>
          </div>
          <Link className="btn btn-outline" href="/gallery/">
            Browse the gallery
          </Link>
        </div>
      </section>
    </main>
  );
}
