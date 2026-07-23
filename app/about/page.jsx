import Link from "next/link";
import {
  ArrowRight,
  Brush,
  Eye,
  Heart,
  Lightbulb,
  Palette,
  Sparkles,
  Target
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "About",
  description:
    "Learn about Sri School of Art’s warm, practical teaching philosophy and learner-first approach."
};

const values = [
  {
    icon: Eye,
    title: "Learn to notice",
    text: "Observation comes before technique. We help learners slow down, look closely and see with intention."
  },
  {
    icon: Brush,
    title: "Learn by making",
    text: "Every class turns a clear idea into a practical project, with just enough guidance to keep moving."
  },
  {
    icon: Heart,
    title: "Grow with confidence",
    text: "Kind feedback, patient repetition and personal choice help learners trust their own creative voice."
  }
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About Sri School of Art"
        title="A place where making feels"
        highlight="possible."
        text="We believe strong art foundations and joyful self-expression belong in the same classroom."
        tone="yellow"
        image="/images/hero-classroom.webp"
        imageAlt="Children learning to paint in a bright art classroom"
        cta={{ label: "Explore classes", href: "/classes/" }}
      />

      <section className="section story-section" id="page-content">
        <div className="container story-grid">
          <div className="story-heading">
            <p className="eyebrow">Our story</p>
            <h2>Creativity has no age limit.</h2>
          </div>
          <div className="story-copy">
            <p className="large-copy">
              Sri School of Art exists to make drawing, painting and craft feel
              welcoming — whether it is a child’s first crayon study or an
              adult’s first canvas in years.
            </p>
            <p>
              Our classes combine clear demonstrations, thoughtful practice and
              room for individual ideas. Learners develop technique through
              projects they can understand, enjoy and feel proud of.
            </p>
            <p>
              This first website version keeps founder names, dates and formal
              achievements open for the school to add accurately before launch.
              The structure is ready for that real story.
            </p>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <SectionHeader
            eyebrow="Teaching philosophy"
            title="Skills for the hand. Confidence for the mind."
            text="We teach technique as a tool for expression — never as a reason to make every learner’s work look the same."
            align="center"
          />
          <div className="value-grid">
            {values.map((value, index) => (
              <article className="value-card" key={value.title}>
                <span className="value-number">0{index + 1}</span>
                <span className="value-icon">
                  <value.icon size={26} aria-hidden="true" />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container mission-grid">
          <article className="mission-card mission-card-dark">
            <span className="mission-icon">
              <Target size={26} aria-hidden="true" />
            </span>
            <p className="eyebrow">Our mission</p>
            <h2>Make quality art learning feel accessible, practical and inspiring.</h2>
            <p>
              Give every learner the foundations, encouragement and space to
              keep creating beyond the classroom.
            </p>
          </article>
          <article className="mission-card mission-card-light">
            <span className="mission-icon">
              <Lightbulb size={26} aria-hidden="true" />
            </span>
            <p className="eyebrow">Our vision</p>
            <h2>A community where curiosity keeps growing at every age.</h2>
            <p>
              A studio shaped by brave beginnings, thoughtful practice and work
              that feels unmistakably personal.
            </p>
          </article>
        </div>
      </section>

      <section className="section instructor-section">
        <div className="container instructor-grid">
          <div className="instructor-photo paper-frame">
            <img
              src="/images/adult-watercolour.webp"
              alt="An adult learner painting a botanical watercolour in the studio"
              loading="lazy"
            />
            <span className="paper-tape" aria-hidden="true" />
          </div>
          <div className="instructor-copy">
            <p className="eyebrow">Meet the instructor</p>
            <h2>A founder story, ready for the real details.</h2>
            <p className="large-copy">
              Add the founder’s name, portrait, training, teaching experience
              and personal reason for starting Sri School of Art here.
            </p>
            <p>
              The strongest introduction will sound human: what they love
              teaching, how they help nervous beginners and what they hope each
              learner carries home.
            </p>
            <div className="instructor-tags">
              <span>
                <Palette size={17} aria-hidden="true" /> Drawing & painting
              </span>
              <span>
                <Sparkles size={17} aria-hidden="true" /> Beginner guidance
              </span>
            </div>
            <Link className="text-link" href="/registration/">
              Learn with us <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section photo-band">
        <div className="container photo-band-grid">
          <img
            src="/images/clay-workshop.webp"
            alt="Children and an instructor making small clay figures"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">Inside the classroom</p>
            <h2>Hands busy. Minds open.</h2>
            <p>
              Painting, drawing, folding, shaping and trying again — all in a
              warm environment made for focused, joyful learning.
            </p>
            <Link className="btn btn-primary" href="/gallery/">
              See student work <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
