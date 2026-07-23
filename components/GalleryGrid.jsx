"use client";

import { useEffect, useRef, useState } from "react";
import { galleryItems } from "@/lib/data";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

const categories = [
  "All",
  "Kids’ artwork",
  "Paintings",
  "Pencil sketches",
  "Craft projects",
  "Workshop photos",
  "Classroom activities"
];

export default function GalleryGrid({ limit }) {
  const [category, setCategory] = useState("All");
  const [activeId, setActiveId] = useState(null);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const filtered = galleryItems
    .filter((item) => category === "All" || item.category === category)
    .slice(0, limit || galleryItems.length);
  const activeIndex = galleryItems.findIndex((item) => item.id === activeId);
  const active = galleryItems[activeIndex];

  function open(item, event) {
    triggerRef.current = event.currentTarget;
    setActiveId(item.id);
  }

  function close() {
    setActiveId(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function step(direction) {
    const next =
      (activeIndex + direction + galleryItems.length) % galleryItems.length;
    setActiveId(galleryItems[next].id);
  }

  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(event) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeId]);

  return (
    <>
      {!limit && (
        <div className="gallery-filters" aria-label="Filter gallery">
          {categories.map((item) => (
            <button
              type="button"
              className={category === item ? "active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      <div className={`gallery-grid ${limit ? "gallery-preview" : ""}`}>
        {filtered.map((item, index) => (
          <button
            className={`gallery-item gallery-item-${index + 1}`}
            type="button"
            onClick={(event) => open(item, event)}
            aria-label={`Open ${item.title} in gallery viewer`}
            key={item.id}
          >
            <img src={item.image} alt={item.alt} loading="lazy" />
            <span className="gallery-overlay">
              <span>
                <small>{item.category}</small>
                <strong>{item.title}</strong>
              </span>
              <span className="gallery-expand">
                <Expand size={18} aria-hidden="true" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Artwork viewer: ${active.title}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={close}
            ref={closeRef}
            aria-label="Close artwork viewer"
          >
            <X size={24} />
          </button>
          <button
            className="lightbox-arrow previous"
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous artwork"
          >
            <ArrowLeft size={24} />
          </button>
          <figure>
            <img src={active.image} alt={active.alt} />
            <figcaption>
              <small>{active.category}</small>
              <strong>{active.title}</strong>
            </figcaption>
          </figure>
          <button
            className="lightbox-arrow next"
            type="button"
            onClick={() => step(1)}
            aria-label="Next artwork"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
