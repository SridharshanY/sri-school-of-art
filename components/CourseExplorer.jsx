"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { classes } from "@/lib/data";

const categories = ["All", "Drawing", "Painting", "Craft", "Special"];
const ages = ["All ages", "Kids", "Teens", "Adults"];

export default function CourseExplorer() {
  const [category, setCategory] = useState("All");
  const [age, setAge] = useState("All ages");

  const results = useMemo(
    () =>
      classes.filter(
        (course) =>
          (category === "All" || course.category === category) &&
          (age === "All ages" || course.ageGroup === age)
      ),
    [category, age]
  );

  return (
    <div className="course-explorer">
      <div className="filter-bar" aria-label="Filter classes">
        <div className="filter-title">
          <SlidersHorizontal size={18} aria-hidden="true" />
          Find your class
        </div>
        <div className="filter-group" aria-label="Filter by category">
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
        <label className="age-filter">
          <span className="sr-only">Filter by age</span>
          <select value={age} onChange={(event) => setAge(event.target.value)}>
            {ages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="results-count" aria-live="polite">
        Showing {results.length} {results.length === 1 ? "class" : "classes"}
      </p>
      <div className="course-grid">
        {results.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">
          <h3>No exact match — yet.</h3>
          <p>Try another filter or ask us to recommend the closest batch.</p>
        </div>
      )}
    </div>
  );
}
