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
import type { EventCategory, EventFilters, ViewMode } from "@/types/event";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<EventFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewMode>("grid");

  const stats = useMemo(() => getEventStats(EVENTS), []);
  const filteredEvents = useMemo(
    () => filterEvents(EVENTS, filters),
    [filters]
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
