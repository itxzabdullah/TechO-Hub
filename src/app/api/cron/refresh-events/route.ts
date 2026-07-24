// Vercel Cron: refresh event caches (see vercel.json)

import { NextRequest, NextResponse } from "next/server";
import { fetchAggregatedEvents } from "@/lib/event-sources";
import { clearCache } from "@/lib/cache";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction && !cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET must be set in production" },
      { status: 503 }
    );
  }

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🔄 Cron: Starting event refresh...");

    // Clear cache to force a fresh fetch
    clearCache("aggregated-events");
    clearCache("eventbrite-events");
    clearCache("meetup-events");

    // Fetch fresh events
    const events = await fetchAggregatedEvents();

    console.log(`✓ Cron: Refreshed ${events.length} events`);

    return NextResponse.json({
      success: true,
      message: `Refreshed ${events.length} events`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("✗ Cron: Event refresh failed:", error);
    return NextResponse.json(
      { error: "Failed to refresh events", details: String(error) },
      { status: 500 }
    );
  }
}
