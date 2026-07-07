import EventCard from "@/components/EventCard";
import type { TechEvent, ViewMode } from "@/types/event";

interface EventListProps {
  events: TechEvent[];
  view: ViewMode;
  onReset: () => void;
}

export default function EventList({ events, view, onReset }: EventListProps) {
  const hasResults = events.length > 0;
  const label =
    events.length === 1 ? "1 event" : `${events.length} events`;

  return (
    <section className="events-section container">
      <div className="events-header">
        <h2>Upcoming events</h2>
        {hasResults && (
          <p className="results-count">Showing {label}</p>
        )}
      </div>

      {hasResults ? (
        <div className={`events-grid${view === "list" ? " events-grid--list" : ""}`}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} view={view} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No events found</h3>
          <p>Try adjusting your filters or search terms.</p>
          <button className="btn btn-primary" type="button" onClick={onReset}>
            Show all events
          </button>
        </div>
      )}
    </section>
  );
}
