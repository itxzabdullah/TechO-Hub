import type { TechEvent } from "@/types/event";
import { fetchEventbriteEvents } from "./eventbrite-api";
import { fetchMeetupEvents } from "./meetup-api";
import { getCache, setCache } from "./cache";

const MAX_AGG_EVENTS = 24;
const AGG_CACHE_KEY = "aggregated-events";
const AGG_CACHE_TTL = 35 * 60 * 1000; // 35 minutes

export async function fetchAggregatedEvents(): Promise<TechEvent[]> {
  // Check cache first
  const cached = getCache<TechEvent[]>(AGG_CACHE_KEY);
  if (cached) {
    console.log("✓ Aggregated events (cached)");
    return cached;
  }

  console.log("Fetching events from multiple sources...");

  // Fetch from all sources in parallel
  const results = await Promise.allSettled([
    fetchEventbriteEvents(),
    fetchMeetupEvents(),
  ]);

  const allEvents: TechEvent[] = [];

  for (const result of results) {
    if (result.status === "fulfilled") {
      allEvents.push(...(Array.isArray(result.value) ? result.value : []));
    }
  }

  // Dedupe by URL, then title+date
  const deduped = new Map<string, TechEvent>();
  for (const event of allEvents) {
    const key = event.url || `${event.title}-${event.date}`;
    if (!deduped.has(key)) {
      deduped.set(key, event);
    }
  }

  // Sort by date, limit to MAX_AGG_EVENTS
  const sorted = Array.from(deduped.values())
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    })
    .slice(0, MAX_AGG_EVENTS);

  // Cache the result
  setCache(AGG_CACHE_KEY, sorted, AGG_CACHE_TTL);

  console.log(`✓ Aggregated ${sorted.length} unique events from all sources`);
  return sorted;
}
