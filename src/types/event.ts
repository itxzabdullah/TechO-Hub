export type EventCategory =
  | "meetup"
  | "hackathon"
  | "conference"
  | "workshop"
  | "networking";

export type EventPrice = "free" | "paid";

export type TimeFilter = "all" | "today" | "week" | "month";

export type PriceFilter = "all" | "free" | "paid";

export type ViewMode = "grid" | "list";

export interface TechEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: EventCategory;
  price: EventPrice;
  tags: string[];
  description: string;
  url: string;
}

export interface EventFilters {
  search: string;
  category: EventCategory | "all";
  time: TimeFilter;
  price: PriceFilter;
}
