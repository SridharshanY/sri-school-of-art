"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/contact";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-success compact-success" role="status">
        <CheckCircle2 size={34} aria-hidden="true" />
        <h3>Your message is ready.</h3>
        <p>
          The website form endpoint is not connected yet. You can send the
          enquiry directly to the school on WhatsApp.
        </p>
        <a
          className="btn btn-dark"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} aria-hidden="true" /> Continue on WhatsApp
        </a>
        <button className="text-link button-link" type="button" onClick={() => setSent(false)}>
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your full name" autoComplete="name" required />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            minLength="8"
            required
          />
        </label>
        <label className="span-2">
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>
        <label className="span-2">
          <span>How can we help?</span>
          <select name="topic" required defaultValue="">
            <option value="" disabled>
              Choose a topic
            </option>
            <option>Class enquiry</option>
            <option>Trial class</option>
            <option>Workshop or camp</option>
            <option>Birthday art party</option>
            <option>Online class</option>
            <option>Something else</option>
          </select>
        </label>
        <label className="span-2">
          <span>Message</span>
          <textarea
            name="message"
            rows="5"
            placeholder="Tell us what you would like to know..."
            required
          />
        </label>
      </div>
      <button className="btn btn-dark form-submit" type="submit">
        Send enquiry <ArrowRight size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
