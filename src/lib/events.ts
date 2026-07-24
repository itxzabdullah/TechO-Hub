import type { EventFilters, TechEvent } from "@/types/event";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseEventDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatEventDate(dateStr: string) {
  const date = parseEventDate(dateStr);
  return {
    day: date.getDate(),
    month: MONTHS[date.getMonth()],
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}

function startOfDay(date: Date): Date {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function isToday(date: Date): boolean {
  return date.toDateString() === new Date().toDateString();
}

export function isThisWeek(date: Date): boolean {
  const now = startOfDay(new Date());
  const end = new Date(now);
  end.setDate(end.getDate() + 7);
  return date >= now && date < end;
}

export function isThisMonth(date: Date): boolean {
  const now = new Date();
  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

export function filterEvents(events: TechEvent[], filters: EventFilters): TechEvent[] {
  const search = filters.search.trim().toLowerCase();

  return events
    .filter((event) => {
      const eventDate = parseEventDate(event.date);

      if (filters.category !== "all" && event.category !== filters.category) {
        return false;
      }

      if (filters.price !== "all" && event.price !== filters.price) {
        return false;
      }

      if (filters.time === "today" && !isToday(eventDate)) return false;
      if (filters.time === "week" && !isThisWeek(eventDate)) return false;
      if (filters.time === "month" && !isThisMonth(eventDate)) return false;

      if (search) {
        const haystack = [
          event.title,
          event.venue,
          event.organizer,
          event.description,
          ...event.tags,
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(search)) return false;
      }

      return true;
    })
    .sort(
      (a, b) =>
        parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime()
    );
}

export function getEventStats(events: TechEvent[]) {
  const today = startOfDay(new Date());
  const upcoming = events.filter(
    (event) => parseEventDate(event.date) >= today
  );

  return {
    total: upcoming.length,
    thisMonth: upcoming.filter((event) =>
      isThisMonth(parseEventDate(event.date))
    ).length,
    free: upcoming.filter((event) => event.price === "free").length,
  };
}

export const DEFAULT_FILTERS: EventFilters = {
  search: "",
  category: "all",
  time: "all",
  price: "all",
};

export function getEventKey(event: TechEvent): string {
  return `${event.url || "local"}-${event.date}-${event.title}`;
}
