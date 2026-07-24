import type { EventCategory } from "@/types/event";

export function parseEventCategory(text: string): EventCategory {
  const haystack = text.toLowerCase();

  if (/hackathon|hack fest|buildathon|codefest/.test(haystack)) {
    return "hackathon";
  }

  if (/conference|summit|fest|expo|forum/.test(haystack)) {
    return "conference";
  }

  if (/workshop|bootcamp|study jam|training/.test(haystack)) {
    return "workshop";
  }

  if (/network|meetup|mixer|social|fireside/.test(haystack)) {
    return "meetup";
  }

  return "networking";
}

export function hashEventId(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}
