"use client";

import Categories from "@/components/Categories";
import EventFiltersBar from "@/components/EventFiltersBar";
import EventList from "@/components/EventList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SubmitSection from "@/components/SubmitSection";
import { EVENTS } from "@/data/events";
import {
  DEFAULT_FILTERS,
  filterEvents,
  getEventStats,
} from "@/lib/events";
import type { EventCategory, EventFilters, TechEvent, ViewMode } from "@/types/event";
import { useEffect, useMemo, useState } from "react";

interface HomePageProps {
  initialEvents: TechEvent[];
}

export default function HomePage({ initialEvents }: HomePageProps) {
  const [filters, setFilters] = useState<EventFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewMode>("grid");
  const [events, setEvents] = useState<TechEvent[]>(
    initialEvents.length > 0 ? initialEvents : EVENTS
  );

  useEffect(() => {
    let active = true;

    async function loadLiveEvents() {
      try {
        const response = await fetch("/api/events", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { events?: TechEvent[] };

        if (active && Array.isArray(payload.events) && payload.events.length > 0) {
          setEvents(payload.events);
        }
      } catch {
        // Keep the seeded data if the live feed is unavailable.
      }
    }

    loadLiveEvents();
    const intervalId = window.setInterval(loadLiveEvents, 5 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const stats = useMemo(() => getEventStats(events), [events]);
  const filteredEvents = useMemo(
    () => filterEvents(events, filters),
    [events, filters]
  );

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function selectCategory(category: EventCategory) {
    setFilters((current) => ({ ...current, category }));
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero
          filters={filters}
          onSearchChange={(search) =>
            setFilters((current) => ({ ...current, search }))
          }
          stats={stats}
        />
        <EventFiltersBar
          filters={filters}
          view={view}
          onFiltersChange={setFilters}
          onViewChange={setView}
          onClear={clearFilters}
        />
        <EventList
          events={filteredEvents}
          view={view}
          onReset={clearFilters}
        />
        <Categories onSelectCategory={selectCategory} />
        <SubmitSection />
      </main>
      <Footer />
    </>
  );
}
