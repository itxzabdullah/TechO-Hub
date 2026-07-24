import { EVENTS } from "@/data/events";
import { fetchAggregatedEvents } from "@/lib/event-sources";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const liveEvents = await fetchAggregatedEvents();

  return NextResponse.json({
    events: liveEvents.length > 0 ? liveEvents : EVENTS,
    source: liveEvents.length > 0 ? "aggregated" : "fallback",
    updatedAt: new Date().toISOString(),
  });
}