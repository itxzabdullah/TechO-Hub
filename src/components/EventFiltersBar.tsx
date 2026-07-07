import { CATEGORY_OPTIONS } from "@/data/events";
import type {
  EventCategory,
  EventFilters,
  PriceFilter,
  TimeFilter,
  ViewMode,
} from "@/types/event";

interface EventFiltersProps {
  filters: EventFilters;
  view: ViewMode;
  onFiltersChange: (filters: EventFilters) => void;
  onViewChange: (view: ViewMode) => void;
  onClear: () => void;
}

export default function EventFiltersBar({
  filters,
  view,
  onFiltersChange,
  onViewChange,
  onClear,
}: EventFiltersProps) {
  return (
    <section className="filters-section container" id="events">
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                category: event.target.value as EventCategory | "all",
              })
            }
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="time-filter">When</label>
          <select
            id="time-filter"
            value={filters.time}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                time: event.target.value as TimeFilter,
              })
            }
          >
            <option value="all">Any time</option>
            <option value="today">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="price-filter">Price</label>
          <select
            id="price-filter"
            value={filters.price}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                price: event.target.value as PriceFilter,
              })
            }
          >
            <option value="all">Any price</option>
            <option value="free">Free only</option>
            <option value="paid">Paid events</option>
          </select>
        </div>

        <button className="btn btn-ghost" type="button" onClick={onClear}>
          Clear filters
        </button>
      </div>

      <div className="view-toggle" role="group" aria-label="View mode">
        <button
          className={`view-btn${view === "grid" ? " active" : ""}`}
          type="button"
          aria-pressed={view === "grid"}
          onClick={() => onViewChange("grid")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Grid
        </button>
        <button
          className={`view-btn${view === "list" ? " active" : ""}`}
          type="button"
          aria-pressed={view === "list"}
          onClick={() => onViewChange("list")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <circle cx="4" cy="6" r="1" fill="currentColor" />
            <circle cx="4" cy="12" r="1" fill="currentColor" />
            <circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>
          List
        </button>
      </div>
    </section>
  );
}
