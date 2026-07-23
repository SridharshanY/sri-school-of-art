import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Brush,
  CalendarDays,
  Check,
  Clock3,
  Heart,
  MapPin,
  MonitorSmartphone,
  Palette,
  Pencil,
  Quote,
  Sparkles,
  Star,
  UsersRound
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CourseCard from "@/components/CourseCard";
import EventCard from "@/components/EventCard";
import GalleryGrid from "@/components/GalleryGrid";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import TrialForm from "@/components/TrialForm";
import {
  classCategories,
  classes,
  events,
  testimonials
} from "@/lib/data";

const categoryIcons = {
  spark: Sparkles,
  pencil: Pencil,
  palette: Palette,
  heart: Heart
};

const reasons = [
  {
    icon: Pencil,
    title: "Clear, step-by-step teaching",
    text: "Build real skills without feeling rushed or overwhelmed."
  },
  {
    icon: BadgeCheck,
    title: "Projects with purpose",
    text: "Learn technique while creating artwork worth keeping."
  },
  {
    icon: UsersRound,
    title: "Friendly, focused batches",
    text: "Age-appropriate groups with room to ask, practise and experiment."
  },
  {
    icon: MonitorSmartphone,
    title: "Flexible ways to learn",
    text: "Choose weekday, weekend, online or studio options."
  }
];

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="hero-doodle hero-doodle-one" aria-hidden="true" />
        <div className="hero-doodle hero-doodle-two" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <p className="eyebrow">
              <span aria-hidden="true">✦</span> Art classes for every age and stage
            </p>
            <h1>
              Discover your <em>creativity.</em>
            </h1>
            <p className="hero-lede">
              Creativity has no age limit. Explore drawing, painting and crafts
              through friendly, hands-on classes for children, teens and adults.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/classes/">
                Explore classes <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="btn btn-outline" href="/registration/">
                Book a trial class
              </Link>
            </div>
            <div className="hero-points">
              <span>
                <Check size={15} aria-hidden="true" /> Beginner friendly
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Online + studio
              </span>
              <span>
                <Check size={15} aria-hidden="true" /> Weekend batches
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-paint-shape" aria-hidden="true" />
            <div className="hero-image-frame">
              <img
                src="/images/hero-classroom.webp"
                alt="Children painting together while their art instructor offers guidance"
              />
            </div>
            <div className="hero-badge hero-badge-top">
              <span className="badge-icon">
                <Palette size={20} aria-hidden="true" />
              </span>
              <div>
                <strong>20+ techniques</strong>
                <small>Drawing · painting · craft</small>
              </div>
            </div>
            <div className="hero-badge hero-badge-bottom">
              <span className="avatar-stack" aria-hidden="true">
                <i>5+</i>
                <i>18+</i>
                <i>∞</i>
              </span>
              <div>
                <strong>Made for every learner</strong>
                <small>Start exactly where you are</small>
              </div>
            </div>
            <div className="hero-star" aria-hidden="true">
              <Star size={24} fill="currentColor" />
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Class highlights">
        <div className="container proof-grid">
          <div>
            <strong>Ages 5+</strong>
            <span>Young artists to adults</span>
          </div>
          <div>
            <strong>20+ techniques</strong>
            <span>From pencil to canvas</span>
          </div>
          <div>
            <strong>Online + studio</strong>
            <span>Learn your way</span>
          </div>
          <div>
            <strong>Weekday + weekend</strong>
            <span>Flexible batch timings</span>
          </div>
        </div>
      </section>

      <section className="section age-section">
        <div className="container">
          <SectionHeader
            eyebrow="Find your starting point"
            title="A creative space for every age."
            text="Choose a learning path that feels right today. We’ll help you grow from there."
            align="center"
          />
          <div className="age-grid">
            {classCategories.map((category) => {
              const Icon = categoryIcons[category.icon];
              return (
                <Link
                  href={`/classes/?age=${encodeURIComponent(category.title)}`}
                  className={`age-card tone-${category.tone}`}
                  key={category.title}
                >
                  <span className="age-icon">
                    <Icon size={25} aria-hidden="true" />
                  </span>
                  <small>{category.age}</small>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <span className="age-link">
                    View classes <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container about-preview-grid">
          <div className="about-collage">
            <div className="collage-main">
              <img
                src="/images/student-art-flatlay.webp"
                alt="Colourful student paintings and pencil drawings"
                loading="lazy"
              />
            </div>
            <div className="collage-note">
              <Brush size={23} aria-hidden="true" />
              <strong>Make. Learn. Grow.</strong>
              <span>One joyful project at a time.</span>
            </div>
            <div className="collage-scribble" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="about-preview-copy">
            <p className="eyebrow">About our school</p>
            <h2>
              Where curiosity becomes <em>craft.</em>
            </h2>
            <p className="large-copy">
              At Sri School of Art, lessons are practical, encouraging and
              adapted to each learner.
            </p>
            <p>
              We build strong foundations in observation, line, colour and
              composition — then create space for personal expression. The goal
              is not to make every artwork look the same. It is to help every
              learner see more, try bravely and make with confidence.
            </p>
            <div className="mini-values">
              <span>
                <i>01</i> Kind guidance
              </span>
              <span>
                <i>02</i> Practical learning
              </span>
              <span>
                <i>03</i> Personal growth
              </span>
            </div>
            <Link className="text-link" href="/about/">
              Meet our teaching approach <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section courses-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeader
              eyebrow="Popular classes"
              title="Choose what you’d love to make."
              text="Beginner-friendly foundations, focused skill building and joyful projects — all in small, supportive batches."
            />
            <Link className="btn btn-outline" href="/classes/">
              View all classes <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="course-grid course-preview-grid">
            {classes.slice(0, 3).map((course) => (
              <CourseCard course={course} compact key={course.id} />
            ))}
          </div>
          <p className="content-disclaimer">
            Preview schedules and fees are shown for layout. Please confirm
            current batches before publishing.
          </p>
        </div>
      </section>

      <section className="section why-section">
        <div className="why-paint" aria-hidden="true" />
        <div className="container why-grid">
          <div>
            <SectionHeader
              eyebrow="Why learn with us"
              title="Serious about skills. Light-hearted about learning."
              text="A thoughtful art education can be warm, playful and rigorous at the same time."
            />
            <Link className="btn btn-dark" href="/registration/">
              Find your first class <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="reason-grid">
            {reasons.map((reason, index) => (
              <article className="reason-card" key={reason.title}>
                <span className="reason-number">0{index + 1}</span>
                <reason.icon size={24} aria-hidden="true" />
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeader
              eyebrow="Student gallery"
              title="Made with imagination."
              text="Every artwork begins with a new way of seeing. Tap any piece for a closer look."
            />
            <Link className="text-link" href="/gallery/">
              Explore the gallery <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <GalleryGrid limit={4} />
        </div>
      </section>

      <section className="section events-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeader
              eyebrow="Upcoming workshops"
              title="Make something memorable this month."
              text="One-day experiences for curious beginners, creative families and returning artists."
            />
            <Link className="btn btn-outline" href="/workshops/">
              View all workshops <CalendarDays size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="event-list">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
          <p className="content-disclaimer">
            Workshop details are provisional sample content and should be
            confirmed before launch.
          </p>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <SectionHeader
            eyebrow="Kind words"
            title="Growing confidence, one class at a time."
            align="center"
          />
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className={`testimonial-card tone-${item.tone}`} key={item.name}>
                <Quote size={30} aria-hidden="true" />
                <blockquote>“{item.quote}”</blockquote>
                <footer>
                  <span className="testimonial-avatar" aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                  </span>
                </footer>
              </article>
            ))}
          </div>
          <p className="content-disclaimer center-note">
            Illustrative review copy — replace with verified, consented
            testimonials before publishing.
          </p>
        </div>
      </section>

      <section className="section trial-section">
        <div className="container trial-grid">
          <div className="trial-copy">
            <span className="trial-icon">
              <Sparkles size={25} aria-hidden="true" />
            </span>
            <p className="eyebrow">Your first step</p>
            <h2>Not sure where to begin?</h2>
            <p>
              Tell us the learner’s age, interests and experience. We’ll
              recommend a suitable class and available batch.
            </p>
            <ul>
              <li>
                <Check size={16} aria-hidden="true" /> No experience needed
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> Friendly class recommendation
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> Online or studio options
              </li>
            </ul>
          </div>
          <div className="trial-form-card">
            <TrialForm />
          </div>
        </div>
      </section>

      <section className="section contact-preview">
        <div className="container contact-preview-grid">
          <div className="contact-preview-copy">
            <p className="eyebrow">Visit our creative space</p>
            <h2>Come by. Look around. Make yourself at home.</h2>
            <p>
              The studio location is pinned below. Send a trial request and
              the school can follow up with the right class information and
              visit details.
            </p>
            <div className="contact-preview-meta">
              <span>
                <MapPin size={20} aria-hidden="true" />
                <span>
                  <small>Location</small>
                  View the map pin
                </span>
              </span>
              <span>
                <Clock3 size={20} aria-hidden="true" />
                <span>
                  <small>Typical class days</small>
                  Wednesday–Sunday
                </span>
              </span>
            </div>
            <Link className="btn btn-dark" href="/contact/">
              See contact options <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <GoogleMapEmbed />
        </div>
      </section>
    </main>
  );
}
