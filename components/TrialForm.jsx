"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { classes, events } from "@/lib/data";
import { createWhatsAppUrl } from "@/lib/contact";

const initialShort = {
  studentName: "",
  ageGroup: "",
  interest: "",
  mode: "",
  phone: ""
};

const initialFull = {
  studentName: "",
  age: "",
  guardianName: "",
  phone: "",
  email: "",
  selectedClass: "",
  preferredBatch: "",
  mode: "",
  experience: "",
  message: ""
};

export default function TrialForm({ variant = "short" }) {
  const full = variant === "full";
  const [values, setValues] = useState(full ? initialFull : initialShort);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!full) return;
    const search = new URLSearchParams(window.location.search);
    const classId = search.get("class");
    const workshopId = search.get("workshop");
    if (classId) {
      const match = classes.find((item) => item.id === classId);
      if (match) {
        setValues((current) => ({
          ...current,
          selectedClass: match.title
        }));
      }
    } else if (workshopId) {
      const match = events.find((item) => item.id === workshopId);
      if (match) {
        setValues((current) => ({
          ...current,
          selectedClass: `Workshop: ${match.title}`
        }));
      }
    }
  }, [full]);

  function update(event) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  }

  function submit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  const message = full
    ? [
        "Hello Sri School of Art, I’d like to request a class.",
        `Student: ${values.studentName}`,
        `Age: ${values.age}`,
        values.guardianName ? `Parent/guardian: ${values.guardianName}` : "",
        values.email ? `Email: ${values.email}` : "",
        `Class: ${values.selectedClass}`,
        `Preferred batch: ${values.preferredBatch}`,
        `Mode: ${values.mode}`,
        `Experience: ${values.experience}`,
        values.message ? `Message: ${values.message}` : ""
      ]
        .filter(Boolean)
        .join("\n")
    : [
        "Hello Sri School of Art, I’d like to request a trial class.",
        `Name: ${values.studentName}`,
        `Age group: ${values.ageGroup}`,
        `Interest: ${values.interest}`,
        `Mode: ${values.mode}`
      ].join("\n");
  const whatsappLink = createWhatsAppUrl(message);

  if (submitted) {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <span className="success-icon">
          <CheckCircle2 size={30} aria-hidden="true" />
        </span>
        <p className="eyebrow">Request prepared</p>
        <h3>Thank you, {values.studentName.split(" ")[0] || "artist"}!</h3>
        <p>
          Your details are ready. Continue on WhatsApp to send this request
          directly to Sri School of Art.
        </p>
        <div className="success-actions">
          <button
            className="btn btn-dark"
            type="button"
            onClick={() => setSubmitted(false)}
          >
            Edit request
          </button>
          <a
            className="btn btn-outline"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" /> Continue on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className={`trial-form ${full ? "full-form" : ""}`} onSubmit={submit}>
      <div className="form-grid">
        <label className={full ? "" : "span-2"}>
          <span>{full ? "Student name" : "Your or student’s name"}</span>
          <input
            name="studentName"
            placeholder="Enter full name"
            value={values.studentName}
            onChange={update}
            autoComplete="name"
            required
          />
        </label>

        {full ? (
          <>
            <label>
              <span>Age</span>
              <input
                name="age"
                type="number"
                min="4"
                max="100"
                placeholder="e.g. 9"
                value={values.age}
                onChange={update}
                required
              />
            </label>
            <label>
              <span>Parent or guardian name</span>
              <input
                name="guardianName"
                placeholder="For learners under 18"
                value={values.guardianName}
                onChange={update}
              />
            </label>
            <label>
              <span>Phone / WhatsApp</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={update}
                autoComplete="tel"
                minLength="8"
                required
              />
            </label>
            <label>
              <span>Email address</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={update}
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Selected class</span>
              <select
                name="selectedClass"
                value={values.selectedClass}
                onChange={update}
                required
              >
                <option value="">Choose a class</option>
                {classes.map((course) => (
                  <option value={course.title} key={course.id}>
                    {course.title}
                  </option>
                ))}
                {events.map((event) => (
                  <option value={`Workshop: ${event.title}`} key={event.id}>
                    Workshop: {event.title}
                  </option>
                ))}
                <option value="Not sure yet">Not sure — recommend one</option>
              </select>
            </label>
            <label>
              <span>Preferred batch</span>
              <select
                name="preferredBatch"
                value={values.preferredBatch}
                onChange={update}
                required
              >
                <option value="">Choose a time</option>
                <option>Weekday evenings</option>
                <option>Saturday morning</option>
                <option>Saturday afternoon</option>
                <option>Sunday morning</option>
                <option>Sunday afternoon</option>
                <option>Flexible</option>
              </select>
            </label>
            <label>
              <span>Learning mode</span>
              <select name="mode" value={values.mode} onChange={update} required>
                <option value="">Choose a mode</option>
                <option>Studio / offline</option>
                <option>Online</option>
                <option>Open to either</option>
              </select>
            </label>
            <label>
              <span>Previous art experience</span>
              <select
                name="experience"
                value={values.experience}
                onChange={update}
                required
              >
                <option value="">Choose an option</option>
                <option>Complete beginner</option>
                <option>Some school or hobby experience</option>
                <option>Regular learner</option>
                <option>Advanced / portfolio learner</option>
              </select>
            </label>
            <label className="span-2">
              <span>Anything else we should know?</span>
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about interests, goals, accessibility needs, or any questions..."
                value={values.message}
                onChange={update}
              />
            </label>
          </>
        ) : (
          <>
            <label>
              <span>Age group</span>
              <select
                name="ageGroup"
                value={values.ageGroup}
                onChange={update}
                required
              >
                <option value="">Choose age</option>
                <option>Ages 5–8</option>
                <option>Ages 9–13</option>
                <option>Ages 14–17</option>
                <option>Ages 18+</option>
              </select>
            </label>
            <label>
              <span>Area of interest</span>
              <select
                name="interest"
                value={values.interest}
                onChange={update}
                required
              >
                <option value="">Choose interest</option>
                <option>Drawing</option>
                <option>Painting</option>
                <option>Craft & clay</option>
                <option>Portfolio development</option>
                <option>Not sure yet</option>
              </select>
            </label>
            <label>
              <span>Preferred mode</span>
              <select name="mode" value={values.mode} onChange={update} required>
                <option value="">Choose mode</option>
                <option>Studio / offline</option>
                <option>Online</option>
                <option>Open to either</option>
              </select>
            </label>
            <label>
              <span>Phone / WhatsApp</span>
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="+91 98765 43210"
                value={values.phone}
                onChange={update}
                minLength="8"
                required
              />
            </label>
          </>
        )}
      </div>
      <button className="btn btn-dark form-submit" type="submit">
        {full ? "Send registration request" : "Request a trial class"}
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="form-note">
        No previous art experience needed. Fields marked by the browser are
        required.
      </p>
    </form>
  );
}
