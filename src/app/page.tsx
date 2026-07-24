import HomePage from "@/components/HomePage";
import { EVENTS } from "@/data/events";
import { fetchAggregatedEvents } from "@/lib/event-sources";

export const dynamic = "force-dynamic";

export default async function Page() {
  const liveEvents = await fetchAggregatedEvents();

  return <HomePage initialEvents={liveEvents.length > 0 ? liveEvents : EVENTS} />;
}
