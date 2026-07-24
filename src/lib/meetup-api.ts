import type { TechEvent } from "@/types/event";
import { hashEventId } from "./event-category";
import { getCache, setCache } from "./cache";

const CLIENT_ID = process.env.MEETUP_CLIENT_ID;
const CLIENT_SECRET = process.env.MEETUP_CLIENT_SECRET;
const CACHE_KEY = "meetup-events";
const CACHE_TTL = 45 * 60 * 1000; // 45 minutes (Meetup rate limit is more generous)

// Hardcoded list of known Karachi tech groups (you can add more)
const KARACHI_TECH_GROUPS = [
  "gdg-karachi", // Google Developer Group
  "python-karachi", // Python Karachi
  "react-karachi", // React Karachi
  "aws-user-group-karachi", // AWS User Group
  "karachi-ai-community", // Karachi AI Meetup
];

export async function fetchMeetupEvents(): Promise<TechEvent[]> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.warn("MEETUP_CLIENT_ID or MEETUP_CLIENT_SECRET not set; skipping Meetup");
    return [];
  }

  // Check cache first
  const cached = getCache<TechEvent[]>(CACHE_KEY);
  if (cached) {
    console.log("✓ Meetup events (cached)");
    return cached;
  }

  try {
    // Get access token
    const tokenUrl = new URL("https://secure.meetup.com/oauth2/access");
    tokenUrl.searchParams.append("grant_type", "client_credentials");
    tokenUrl.searchParams.append("client_id", CLIENT_ID);
    tokenUrl.searchParams.append("client_secret", CLIENT_SECRET);

    const tokenRes = await fetch(tokenUrl.toString(), { method: "POST", cache: "no-store" });
    if (!tokenRes.ok) {
      console.error("Meetup token fetch failed:", tokenRes.status);
      return [];
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      console.error("No access token from Meetup");
      return [];
    }

    const events: TechEvent[] = [];

    const groupResults = await Promise.allSettled(
      KARACHI_TECH_GROUPS.map(async (groupUrlName) => {
        const eventsUrl = new URL(`https://api.meetup.com/${groupUrlName}/events`);
        eventsUrl.searchParams.append("status", "upcoming");
        eventsUrl.searchParams.append("access_token", accessToken);

        const eventsRes = await fetch(eventsUrl.toString(), { cache: "no-store" });
        if (!eventsRes.ok) {
          return [] as TechEvent[];
        }

        const groupEvents = (await eventsRes.json()) as Array<{
          id: string;
          title: string;
          description?: string;
          local_date?: string;
          local_time?: string;
          event_url?: string;
          venue?: {
            name?: string;
            city?: string;
          };
          group?: {
            name?: string;
          };
          fee?: {
            amount?: number;
          };
        }>;

        if (!Array.isArray(groupEvents)) {
          return [] as TechEvent[];
        }

        return groupEvents.slice(0, 5).map((event) => {
          const date = event.local_date || new Date().toISOString().slice(0, 10);
          const time = event.local_time || "6:00 PM";
          const venue = event.venue?.name || event.venue?.city || "Karachi";
          const organizer = event.group?.name || "Meetup";

          return {
            id: hashEventId(event.id || `${event.title}-${date}`),
            title: event.title,
            date,
            time,
            venue,
            organizer,
            category: "meetup" as const,
            price: (event.fee?.amount || 0) === 0 ? ("free" as const) : ("paid" as const),
            tags: ["Meetup"],
            description: event.description || event.title,
            url: event.event_url || "https://www.meetup.com",
          };
        });
      })
    );

    for (const result of groupResults) {
      if (result.status === "fulfilled") {
        events.push(...result.value);
      }
    }

    setCache(CACHE_KEY, events, CACHE_TTL);
    console.log(`✓ Meetup API: fetched ${events.length} events`);
    return events;
  } catch (error) {
    console.error("Meetup API fetch failed:", error);
    return [];
  }
}
