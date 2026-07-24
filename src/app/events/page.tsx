import EventList from "@/components/EventList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { EVENTS } from "@/data/events";
import { fetchAggregatedEvents } from "@/lib/event-sources";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const liveEvents = await fetchAggregatedEvents();
  const events = liveEvents.length > 0 ? liveEvents : EVENTS;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <section className="events-page-hero container">
          <p className="hero-eyebrow">Live Karachi events</p>
          <h1 className="events-page-title">Current tech events in Karachi</h1>
          <p className="events-page-copy">
            Aggregated from Eventbrite and Karachi tech Meetup groups, with
            server-side refresh on each visit and a cached background sync on
            Vercel.
          </p>
        </section>

        <EventList events={events} view="grid" />
      </main>
      <Footer />
    </>
  );
}