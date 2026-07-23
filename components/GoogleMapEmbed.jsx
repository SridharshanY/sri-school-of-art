import { Navigation } from "lucide-react";

const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d131.32450326291348!2d77.43991021002283!3d11.457126428321008!2m3!1f0!2f4.608245454645342!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x3ba93dbded9d1a03%3A0x7a40b7b77e85c04a!2sSRI%20SCHOOL%20OF%20ARTS!5e1!3m2!1sen!2sin!4v1784805006518!5m2!1sen!2sin";
const GOOGLE_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=11.457126428321008%2C77.43991021002283";

export default function GoogleMapEmbed({ large = false }) {
  return (
    <div className={`google-map${large ? " google-map-large" : ""}`}>
      <iframe
        className="google-map-frame"
        src={GOOGLE_MAPS_EMBED_URL}
        title="Sri School of Arts location on Google Maps"
        width="600"
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        className="google-map-directions"
        href={GOOGLE_MAPS_DIRECTIONS_URL}
        target="_blank"
        rel="noreferrer"
      >
        <Navigation size={17} aria-hidden="true" />
        Get directions
      </a>
    </div>
  );
}
