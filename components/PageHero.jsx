import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  text,
  tone = "yellow",
  image,
  imageAlt,
  cta
}) {
  return (
    <section className={`page-hero tone-${tone}`}>
      <div className={`container page-hero-grid ${image ? "with-image" : ""}`}>
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>
            {title} {highlight && <em>{highlight}</em>}
          </h1>
          <p>{text}</p>
          <div className="page-hero-actions">
            {cta && (
              <Link className="btn btn-dark" href={cta.href}>
                {cta.label} <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            )}
            <a className="round-down" href="#page-content" aria-label="Continue to page content">
              <ArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
        {image && (
          <div className="page-hero-image paper-frame">
            <img src={image} alt={imageAlt} />
            <span className="paper-tape" aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
