import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  UsersRound,
  Boxes,
  MonitorSmartphone
} from "lucide-react";

export default function CourseCard({ course, compact = false }) {
  return (
    <article className={`course-card tone-${course.tone} ${compact ? "compact" : ""}`}>
      <div className="course-topline">
        <span>{course.category}</span>
        <span className={course.seats === 0 ? "seat-status full" : "seat-status"}>
          {course.seats === 0
            ? "Batch full"
            : course.seats <= 3
              ? `Only ${course.seats} seats`
              : `${course.seats} seats`}
        </span>
      </div>
      <h3>{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-meta">
        <span>
          <UsersRound size={16} aria-hidden="true" /> {course.age} · {course.level}
        </span>
        <span>
          <Clock3 size={16} aria-hidden="true" /> {course.schedule}
        </span>
        {!compact && (
          <>
            <span>
              <MonitorSmartphone size={16} aria-hidden="true" /> {course.mode}
            </span>
            <span>
              <Boxes size={16} aria-hidden="true" /> {course.materials}
            </span>
          </>
        )}
      </div>
      <div className="course-footer">
        <div>
          <small>{course.duration}</small>
          <strong>{course.fee}</strong>
        </div>
        <Link
          href={`/registration/?class=${course.id}`}
          className="circle-link"
          aria-label={`${course.seats === 0 ? "Join the waitlist for" : "Register for"} ${course.title}`}
        >
          <ArrowUpRight size={21} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
