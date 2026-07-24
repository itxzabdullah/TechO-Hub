import { EVENTBRITE_KARACHI_URL, CATEGORY_LABELS } from "@/data/events";
import { formatEventDate } from "@/lib/events";
import type { TechEvent, ViewMode } from "@/types/event";

interface EventCardProps {
  event: TechEvent;
  view: ViewMode;
}

export default function EventCard({ event, view }: EventCardProps) {
  const { day, month, weekday } = formatEventDate(event.date);
  const priceLabel = event.price === "free" ? "Free" : "Paid";
  const href =
    event.url && event.url !== "#" ? event.url : EVENTBRITE_KARACHI_URL;
  const isExternal = /^https?:\/\//i.test(href);

  return (
    <a
      className={`event-card${view === "list" ? " event-card--list" : ""}`}
      href={href}
      aria-label={`View ${event.title}`}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      <div className="event-date">
        <span className="event-month">{month}</span>
        <span className="event-day">{day}</span>
        <span className="event-weekday">{weekday}</span>
      </div>

      <div className="event-body">
        <div className="event-meta">
          <span className={`badge badge-${event.category}`}>
            {CATEGORY_LABELS[event.category]}
          </span>
          <span className={`badge badge-price badge-${event.price}`}>
            {priceLabel}
          </span>
        </div>

        <h3 className="event-title">{event.title}</h3>

        <p className="event-desc">{event.description}</p>

        <div className="event-details">
          <span className="event-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {event.time}
          </span>
          <span className="event-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.venue}
          </span>
          <span className="event-detail">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {event.organizer}
          </span>
        </div>

        <div className="event-tags">
          {event.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <span className="event-cta" aria-hidden="true">
        →
      </span>
    </a>
  );
}
