import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CalendarDays,
  Check,
  Laptop,
  PartyPopper,
  Trophy
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import CourseExplorer from "@/components/CourseExplorer";
import { getPublishedClasses } from "@/lib/classes";

export const metadata = {
  title: "Classes",
  description:
    "Explore drawing, painting, craft, hobby and portfolio classes for children, teens and adults."
};

const programmes = [
  {
    icon: CalendarDays,
    title: "Weekend batches",
    text: "Steady weekly learning for children, teens and adults."
  },
  {
    icon: PartyPopper,
    title: "Holiday art camps",
    text: "Immersive multi-day making during school breaks."
  },
  {
    icon: Laptop,
    title: "Online classes",
    text: "Guided practice and feedback from wherever you are."
  },
  {
    icon: Trophy,
    title: "Portfolio & competitions",
    text: "Focused mentoring for briefs, selections and presentation."
  }
];

export const dynamic = "force-dynamic";

export default async function ClassesPage() {
  const classes = await getPublishedClasses();
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Classes & programmes"
        title="Find the class that fits your"
        highlight="curiosity."
        text="Start with age, interest or experience. Every path is designed to build real skills through projects you’ll enjoy making."
        tone="sky"
        image="/images/student-art-flatlay.webp"
        imageAlt="A table filled with colourful student paintings and drawings"
        cta={{ label: "Book a trial", href: "/registration/" }}
      />

      <section className="section class-listing" id="page-content">
        <div className="container">
          <div className="section-heading-row listing-heading">
            <SectionHeader
              eyebrow="Explore classes"
              title="A starting point for every artist."
              text="Filter by medium or age, then open registration from any class card."
            />
            <div className="preview-label">
              <span />
              Preview fees & schedules
            </div>
          </div>
          <CourseExplorer classes={classes} />
        </div>
      </section>

      <section className="section programmes-section">
        <div className="container">
          <SectionHeader
            eyebrow="Special programmes"
            title="More ways to make art part of life."
            text="From one-day experiences to focused portfolio mentoring."
            align="center"
          />
          <div className="programme-grid">
            {programmes.map((programme) => (
              <article className="programme-card" key={programme.title}>
                <programme.icon size={25} aria-hidden="true" />
                <h3>{programme.title}</h3>
                <p>{programme.text}</p>
              </article>
            ))}
          </div>
          <div className="programme-list">
            <span>Kids’ weekend batches</span>
            <span>Adult hobby classes</span>
            <span>Summer art camps</span>
            <span>One-day workshops</span>
            <span>Birthday art parties</span>
            <span>Online mentoring</span>
          </div>
        </div>
      </section>

      <section className="section materials-section" id="fees">
        <div className="container materials-grid">
          <div className="materials-visual">
            <img
              src="/images/clay-workshop.webp"
              alt="Colourful clay craft materials on an art studio table"
              loading="lazy"
            />
            <span className="materials-badge">
              <Boxes size={23} aria-hidden="true" />
              Materials made simple
            </span>
          </div>
          <div className="materials-copy">
            <p className="eyebrow">Fees & materials</p>
            <h2>Know what to bring before you begin.</h2>
            <p>
              Class cards clearly state whether materials are included, shared
              in the studio or purchased as a personal kit. No surprise supply
              list after registration.
            </p>
            <ul className="check-list">
              <li>
                <Check size={17} aria-hidden="true" /> Course fee and duration
              </li>
              <li>
                <Check size={17} aria-hidden="true" /> Batch day and time
              </li>
              <li>
                <Check size={17} aria-hidden="true" /> Materials guidance
              </li>
              <li>
                <Check size={17} aria-hidden="true" /> Available-seat indicator
              </li>
            </ul>
            <div className="content-note">
              <strong>Before publishing</strong>
              <span>
                Replace the preview prices and batch timings with verified
                school information.
              </span>
            </div>
            <Link className="btn btn-dark" href="/registration/">
              Ask for a recommendation <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
