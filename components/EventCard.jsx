import Link from "next/link";
import { ArrowRight, Clock3, UsersRound, Ticket } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <article className={`event-card tone-${event.tone}`}>
      <div className="event-date" aria-label={event.fullDate}>
        <strong>{event.date}</strong>
        <span>{event.month}</span>
      </div>
      <div className="event-content">
        <p className="eyebrow">{event.category} workshop</p>
        <h3>{event.title}</h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <span>
            <Clock3 size={16} aria-hidden="true" /> {event.time}
          </span>
          <span>
            <UsersRound size={16} aria-hidden="true" /> {event.age}
          </span>
          <span>
            <Ticket size={16} aria-hidden="true" /> {event.fee}
          </span>
        </div>
      </div>
      <div className="event-action">
        <span>{event.seats} seats left</span>
        <Link href={`/registration/?workshop=${event.id}`}>
          Register <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
