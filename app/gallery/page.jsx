import Link from "next/link";
import { ArrowRight, Image as ImageIcon, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeader from "@/components/SectionHeader";

export const metadata = {
  title: "Gallery",
  description:
    "Browse paintings, pencil sketches, craft projects, workshops and classroom moments from Sri School of Art."
};

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Student artwork gallery"
        title="Every piece has a"
        highlight="point of view."
        text="A growing collection of paintings, sketches, craft projects and joyful classroom moments."
        tone="coral"
        cta={{ label: "Join a class", href: "/registration/" }}
      />

      <section className="section full-gallery" id="page-content">
        <div className="container">
          <div className="section-heading-row gallery-heading">
            <SectionHeader
              eyebrow="Browse the collection"
              title="Made by hands. Shaped by imagination."
              text="Filter by category and open any image for a larger, keyboard-friendly view."
            />
            <div className="gallery-count">
              <ImageIcon size={19} aria-hidden="true" />
              6 featured moments
            </div>
          </div>
          <GalleryGrid />
        </div>
      </section>

      <section className="section gallery-consent">
        <div className="container consent-grid">
          <span className="consent-icon">
            <ShieldCheck size={27} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Thoughtful sharing</p>
            <h2>Art first. Privacy always.</h2>
            <p>
              Student names should only be displayed with recorded permission,
              and classroom photos should be published only after consent is
              confirmed.
            </p>
          </div>
          <Link className="btn btn-outline" href="/contact/">
            Ask a gallery question <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
