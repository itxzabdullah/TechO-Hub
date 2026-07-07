# Karachi Tech Events

A Next.js frontend for discovering tech events in Karachi, Pakistan — meetups, hackathons, workshops, conferences, and networking nights.

## Tech stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- Custom CSS (no Tailwind)

## Features

- Event listings with search, category/time/price filters
- Grid and list views
- Category browse shortcuts
- Event submission form (demo)
- Responsive layout with the same dark teal design

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build     |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint              |

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout + fonts
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # UI components
├── data/events.ts      # Sample event data
├── lib/events.ts       # Filter & date utilities
└── types/event.ts      # TypeScript types
```

## Customization

- **Add events:** Edit `src/data/events.ts`
- **Styling:** CSS variables in `src/app/globals.css`
- **Real data:** Replace static data with API routes or external services

## Deploy

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js:

```bash
npm run build
```

---

Built as a demo site. Event data is illustrative, not live.
