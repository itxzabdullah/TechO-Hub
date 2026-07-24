import type { TechEvent } from "@/types/event";

export const EVENTBRITE_KARACHI_URL =
  "https://www.eventbrite.com/d/pakistan--karachi/events/";

export const EVENTS: TechEvent[] = [
  {
    id: 1,
    title: "GDG Karachi — Android Study Jam",
    date: "2026-07-05",
    time: "3:00 PM – 6:00 PM",
    venue: "National Incubation Center, Karachi",
    organizer: "Google Developer Groups Karachi",
    category: "workshop",
    price: "free",
    tags: ["Android", "Mobile", "Google"],
    description:
      "Hands-on Android development workshop covering Jetpack Compose and Material Design 3.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 2,
    title: "Karachi AI Meetup — LLMs in Production",
    date: "2026-07-08",
    time: "6:30 PM – 9:00 PM",
    venue: "The Nest I/O, Shahrah-e-Faisal",
    organizer: "Karachi AI Community",
    category: "meetup",
    price: "free",
    tags: ["AI", "Machine Learning", "LLM"],
    description:
      "Lightning talks on deploying LLMs locally and in the cloud, with demos from local startups.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 3,
    title: "DevFest Karachi 2026",
    date: "2026-07-12",
    time: "9:00 AM – 6:00 PM",
    venue: "Marriott Hotel, Clifton",
    organizer: "GDG Karachi & WTM",
    category: "conference",
    price: "paid",
    tags: ["Google", "Cloud", "Web"],
    description:
      "Pakistan's largest community-led developer conference with 20+ sessions and workshops.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 4,
    title: "Hackathon PK — Karachi Edition",
    date: "2026-07-18",
    time: "10:00 AM – 10:00 PM (2 days)",
    venue: "IBA Main Campus, Karachi",
    organizer: "Hackathon PK",
    category: "hackathon",
    price: "free",
    tags: ["Hackathon", "Startups", "Fintech"],
    description:
      "48-hour hackathon focused on fintech and financial inclusion solutions for Pakistan.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 5,
    title: "P@SHA IT Industry Networking Night",
    date: "2026-07-22",
    time: "7:00 PM – 10:00 PM",
    venue: "Mövenpick Hotel, Karachi",
    organizer: "P@SHA",
    category: "networking",
    price: "paid",
    tags: ["Industry", "Networking", "Software"],
    description:
      "Connect with IT leaders, CEOs, and hiring managers from Pakistan's software industry.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 6,
    title: "React Karachi — Server Components Deep Dive",
    date: "2026-07-25",
    time: "5:00 PM – 8:00 PM",
    venue: "Co-working space, DHA Phase 6",
    organizer: "React Karachi",
    category: "meetup",
    price: "free",
    tags: ["React", "Next.js", "Frontend"],
    description:
      "Monthly meetup exploring React Server Components, streaming, and performance patterns.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 7,
    title: "AWS User Group Karachi — Cloud Security",
    date: "2026-07-28",
    time: "6:00 PM – 8:30 PM",
    venue: "Systems Limited Office, PECHS",
    organizer: "AWS User Group Karachi",
    category: "workshop",
    price: "free",
    tags: ["AWS", "Cloud", "Security"],
    description:
      "Workshop on IAM best practices, VPC security, and incident response on AWS.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 8,
    title: "NED University Tech Fest 2026",
    date: "2026-08-02",
    time: "10:00 AM – 5:00 PM",
    venue: "NED University of Engineering",
    organizer: "NED CS Society",
    category: "conference",
    price: "free",
    tags: ["University", "Robotics", "CS"],
    description:
      "Annual tech fest featuring project exhibitions, coding competitions, and career fair.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 9,
    title: "Women in Tech Karachi — Leadership Panel",
    date: "2026-08-08",
    time: "4:00 PM – 7:00 PM",
    venue: "The Second Floor (T2F), Clifton",
    organizer: "Women in Tech Pakistan",
    category: "networking",
    price: "free",
    tags: ["Diversity", "Leadership", "Careers"],
    description:
      "Panel discussion with women leaders in Pakistan's tech industry, followed by networking.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 10,
    title: "Karachi Blockchain & Web3 Summit",
    date: "2026-08-15",
    time: "9:00 AM – 4:00 PM",
    venue: "Movenpick Hotel, Karachi",
    organizer: "BlockChain Pakistan",
    category: "conference",
    price: "paid",
    tags: ["Blockchain", "Web3", "Crypto"],
    description:
      "Full-day summit on blockchain adoption, DeFi, and regulatory landscape in Pakistan.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 11,
    title: "Python Karachi — Data Engineering 101",
    date: "2026-08-20",
    time: "6:00 PM – 9:00 PM",
    venue: "10Pearls Office, Shahrah-e-Faisal",
    organizer: "Python Karachi",
    category: "workshop",
    price: "free",
    tags: ["Python", "Data", "ETL"],
    description:
      "Introductory workshop on building data pipelines with Python, Airflow, and dbt.",
    url: EVENTBRITE_KARACHI_URL,
  },
  {
    id: 12,
    title: "Startup Grind Karachi — Founder Fireside",
    date: "2026-08-28",
    time: "7:00 PM – 9:30 PM",
    venue: "The Garage, Karachi",
    organizer: "Startup Grind Karachi",
    category: "networking",
    price: "free",
    tags: ["Startups", "Founders", "VC"],
    description:
      "Fireside chat with a Karachi-based unicorn founder on scaling from zero to Series B.",
    url: EVENTBRITE_KARACHI_URL,
  },
];

export const CATEGORY_LABELS: Record<TechEvent["category"], string> = {
  meetup: "Meetup",
  hackathon: "Hackathon",
  conference: "Conference",
  workshop: "Workshop",
  networking: "Networking",
};

export const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  { value: "meetup", label: "Meetups" },
  { value: "hackathon", label: "Hackathons" },
  { value: "conference", label: "Conferences" },
  { value: "workshop", label: "Workshops" },
  { value: "networking", label: "Networking" },
] as const;

export const CATEGORY_CARDS = [
  {
    category: "meetup" as const,
    icon: "🤝",
    title: "Meetups",
    description: "Community gatherings for devs, designers & founders",
  },
  {
    category: "hackathon" as const,
    icon: "💻",
    title: "Hackathons",
    description: "Build, compete, and ship in 24–48 hours",
  },
  {
    category: "conference" as const,
    icon: "🎤",
    title: "Conferences",
    description: "Talks, panels, and industry insights",
  },
  {
    category: "workshop" as const,
    icon: "🛠️",
    title: "Workshops",
    description: "Hands-on learning sessions",
  },
  {
    category: "networking" as const,
    icon: "🌐",
    title: "Networking",
    description: "Connect with Karachi's tech ecosystem",
  },
];
