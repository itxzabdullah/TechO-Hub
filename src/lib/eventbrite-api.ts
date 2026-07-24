import type { TechEvent } from "@/types/event";
import { hashEventId, parseEventCategory } from "./event-category";
import { getCache, setCache } from "./cache";

const API_KEY = process.env.EVENTBRITE_API_KEY;
const CACHE_KEY = "eventbrite-events";
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

export async function fetchEventbriteEvents(): Promise<TechEvent[]> {
  if (!API_KEY) {
    console.warn("EVENTBRITE_API_KEY not set; skipping Eventbrite API");
    return [];
  }

  // Check cache first
  const cached = getCache<TechEvent[]>(CACHE_KEY);
  if (cached) {
    console.log("✓ Eventbrite events (cached)");
    return cached;
  }

  try {
    // Search for tech events in Karachi
    const searchUrl = new URL("https://www.eventbriteapi.com/v3/events/search/");
    searchUrl.searchParams.append("location.address", "Karachi, Pakistan");
    searchUrl.searchParams.append("categories", "104,119,107"); // Tech, Business, Community (category IDs)
    searchUrl.searchParams.append("status", "live");
    searchUrl.searchParams.append("token", API_KEY);
    searchUrl.searchParams.append("expand", "venue");

    const response = await fetch(searchUrl.toString(), { cache: "no-store" });

    if (!response.ok) {
      console.error("Eventbrite API error:", response.status, await response.text());
      return [];
    }

    const data = (await response.json()) as {
      events?: Array<{
        id: string;
        name: string;
        summary?: string;
        description?: {
          text?: string;
        };
        start: {
          local: string; // "2026-07-15T18:00:00"
          timezone: string;
        };
        end?: {
          local: string;
        };
        url: string;
        logo?: {
          url?: string;
        };
        venue?: {
          address?: {
            address_1?: string;
            city?: string;
            region?: string;
          };
        };
        organizer?: {
          name?: string;
        };
        status?: string;
        ticket_classes?: Array<{
          free?: boolean;
          cost?: {
            major_value?: number;
          };
        }>;
      }>;
    };

    const events: TechEvent[] = (data.events || [])
      .map((event) => {
        const startDate = event.start?.local || new Date().toISOString();
        const date = startDate.slice(0, 10);
        const time = new Date(startDate).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        const venue =
          event.venue?.address?.address_1 || event.venue?.address?.city || "Karachi";
        const organizer = event.organizer?.name || "Eventbrite";
        const description = event.summary || event.description?.text || event.name;

        const isFree =
          !event.ticket_classes ||
          event.ticket_classes.some((tc) => tc.free || (tc.cost?.major_value || 0) === 0);

        const categoryText = `${event.name} ${description}`;

        return {
          id: hashEventId(event.id || `${event.name}-${date}`),
          title: event.name,
          date,
          time,
          venue,
          organizer,
          category: parseEventCategory(categoryText),
          price: isFree ? ("free" as const) : ("paid" as const),
          tags: ["Eventbrite"],
          description,
          url: event.url,
        };
      })
      .slice(0, 20); // Limit to 20 events

    setCache(CACHE_KEY, events, CACHE_TTL);
    console.log(`✓ Eventbrite API: fetched ${events.length} events`);
    return events;
  } catch (error) {
    console.error("Eventbrite API fetch failed:", error);
    return [];
  }
}
