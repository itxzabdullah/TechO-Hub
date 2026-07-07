import type { EventFilters as Filters } from "@/types/event";

interface HeroProps {
  filters: Filters;
  onSearchChange: (search: string) => void;
  stats: {
    total: number;
    thisMonth: number;
    free: number;
  };
}

export default function Hero({ filters, onSearchChange, stats }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-content">
        <p className="hero-eyebrow">Karachi&apos;s tech community calendar</p>
        <h1 className="hero-title">
          Every tech event in
          <br />
          <em>Karachi</em>, in one place
        </h1>
        <p className="hero-subtitle">
          Meetups, hackathons, workshops, and conferences — curated for
          developers, founders, designers, and anyone building in Pakistan&apos;s
          largest city.
        </p>

        <div className="search-bar">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search events, venues, or organizers…"
            autoComplete="off"
          />
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Upcoming events</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.thisMonth}</span>
            <span className="stat-label">This month</span>
          </div>
          <div className="stat">
            <span className="stat-number">{stats.free}</span>
            <span className="stat-label">Free to attend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
