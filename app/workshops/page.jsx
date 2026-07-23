import Link from "next/link";
import {
  ArrowRight,
  CakeSlice,
  CalendarHeart,
  Flower2,
  PaintBucket,
  Sparkles
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import EventCard from "@/components/EventCard";
import { events } from "@/lib/data";

export const metadata = {
  title: "Workshops & Events",
  description:
    "Discover one-day art workshops, holiday camps, festival craft sessions and special creative events."
};

const workshopTypes = [
  {
    icon: PaintBucket,
    title: "Weekend workshops",
    text: "Try a focused technique in one friendly session.",
    tone: "coral"
  },
  {
    icon: Flower2,
    title: "Festival crafts",
    text: "Make thoughtful, colourful décor for special days.",
    tone: "yellow"
  },
  {
    icon: CalendarHeart,
    title: "School holiday camps",
    text: "Several days of painting, making and new friendships.",
    tone: "sky"
  },
  {
    icon: CakeSlice,
    title: "Birthday art parties",
    text: "A guided creative celebration with a project to take home.",
    tone: "purple"
  }
];

export default function WorkshopsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Workshops & events"
        title="A few hours. A whole new"
        highlight="idea."
        text="Explore one-day workshops, holiday camps and creative gatherings designed to make art easy to begin."
        tone="purple"
        image="/images/paper-lanterns.webp"
        imageAlt="Children enjoying a colourful paper lantern workshop"
        cta={{ label: "Reserve a seat", href: "/registration/" }}
      />

      <section className="section workshops-listing" id="page-content">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeader
              eyebrow="Coming up"
              title="Choose your next creative day."
              text="Each listing includes the date, time, age group, fee and remaining seats."
            />
            <span className="preview-label">
              <span />
              Provisional event details
            </span>
          </div>
          <div className="event-list event-list-large">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
          <p className="content-disclaimer">
            These workshop dates and fees are sample content for the first
            design version. Confirm them before accepting registrations.
          </p>
        </div>
      </section>

      <section className="section workshop-types-section">
        <div className="container">
          <SectionHeader
            eyebrow="All year round"
            title="There’s always another way to make."
            align="center"
          />
          <div className="workshop-type-grid">
            {workshopTypes.map((type) => (
              <article className={`workshop-type tone-${type.tone}`} key={type.title}>
                <type.icon size={26} aria-hidden="true" />
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section host-workshop">
        <div className="container host-workshop-grid">
          <div>
            <span className="host-icon">
              <Sparkles size={24} aria-hidden="true" />
            </span>
            <p className="eyebrow">Create together</p>
            <h2>Planning a school, community or birthday art session?</h2>
            <p>
              Share the group size, ages and occasion. We’ll shape a guided
              project that fits your time and setting.
            </p>
          </div>
          <Link className="btn btn-primary" href="/contact/">
            Plan a private workshop <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
