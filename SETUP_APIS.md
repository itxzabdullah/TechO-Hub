# Setup Guide: Real-Time Event APIs

This guide walks you through setting up Eventbrite and Meetup APIs so your app shows real live events instead of demo data.

## **Step 1: Get Eventbrite API Key**

1. Go to https://www.eventbrite.com/platform/api/
2. Sign in to your Eventbrite account (or create one)
3. Click "Create App" and fill in the details
4. Copy your **API Key**
5. Add it to `.env.local`:
   ```env
   EVENTBRITE_API_KEY=your_api_key_here
   ```

**Rate limit:** ~1,000 requests/month (free tier). Refreshing every 30 min uses ~48 requests/month. ✓ Plenty

**What you get:** Real Karachi tech events from Eventbrite's listing

---

## **Step 2: Get Meetup API Credentials**

1. Go to https://secure.meetup.com/meetup_api/console/
2. Sign in with your Meetup account (or create one)
3. Click "Create an OAuth app"
4. Fill in the app details
5. Copy your **Client ID** and **Client Secret**
6. Add them to `.env.local`:
   ```env
   MEETUP_CLIENT_ID=your_client_id_here
   MEETUP_CLIENT_SECRET=your_client_secret_here
   ```

**Rate limit:** ~200 requests/hour (free tier). Refreshing every 30 min uses ~48 requests/month. ✓ Plenty

**What you get:** Events from Karachi tech meetup groups (GDG, Python Karachi, React Karachi, AWS User Group, etc.)

---

## **Step 3: Local Testing**

1. **Add your API keys to `.env.local`:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and fill in your API keys
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Visit the homepage:**
   - Open http://localhost:3000
   - You should see real events from Eventbrite + Meetup
   - Check browser console for logs showing which sources returned data

4. **Test the API endpoint:**
   ```bash
   curl http://localhost:3000/api/events | jq
   ```
   Expected response: JSON with `events` array, `source: "aggregated"`, and `updatedAt` timestamp

5. **Test the manual refresh endpoint (useful for testing cron):**
   ```bash
   curl http://localhost:3000/api/cron/refresh-events \
     -H "Authorization: Bearer your_cron_secret_here"
   ```

---

## **Step 4: Deploy to Vercel**

### **A. Set Environment Variables in Vercel**

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   EVENTBRITE_API_KEY = your_api_key_here
   MEETUP_CLIENT_ID = your_client_id_here
   MEETUP_CLIENT_SECRET = your_client_secret_here
   CRON_SECRET = (generate a random string, e.g., `openssl rand -base64 32`)
   ```

### **B. Enable Vercel Crons**

The app comes with `vercel.json` configured to refresh events every 30 minutes.

**Cron setup:**
- Endpoint: `/api/cron/refresh-events`
- Schedule: `*/30 * * * *` (every 30 minutes)
- Vercel will automatically call this to keep events fresh

Verify it's working:
- In Vercel dashboard, go to your project → **Deployments** → click a deployment → **Logs**
- Look for logs from `/api/cron/refresh-events`

### **C. Push to GitHub and Deploy**

```bash
git add .
git commit -m "feat: Add Eventbrite + Meetup APIs with caching and cron jobs"
git push origin main
```

Vercel will auto-deploy. In a few seconds:
- Your homepage will pull from real APIs
- Events will refresh every 30 minutes via cron
- No more demo data (unless APIs fail, then it falls back to seeded events)

---

## **How It Works**

1. **On each request:** The app checks an in-memory cache (30 min TTL)
2. **If cache expired:** The app fetches from Eventbrite API + Meetup API in parallel
3. **Deduplication:** Removes duplicate events
4. **Sorting:** Shows events by date (upcoming first)
5. **Limit:** Shows up to 24 unique events
6. **Fallback:** If APIs fail, shows the seeded demo events

**Homepage flow:**
- Server fetches live events → passes to client on page load
- Client also fetches `/api/events` every 5 min for live updates

**Events page (`/events`):**
- Server-side only, always fetches fresh on page load

---

## **Troubleshooting**

### **Events not showing (showing demo data)?**
- Check `.env.local` has correct API keys
- Check browser console for errors
- Check network tab for `/api/events` response

### **API errors in logs?**
- **"API key not set":** Add `EVENTBRITE_API_KEY` to `.env.local` or Vercel env vars
- **"Token fetch failed":** Check Meetup credentials are correct
- **"Unauthorized 401":** API credentials are wrong or expired

### **Cron job not running on Vercel?**
- Make sure `vercel.json` is committed and pushed
- Crons only work on Pro plan or higher on Vercel (free tier may not support it)
- Check Vercel logs for `/api/cron/refresh-events`

### **Performance slow?**
- API calls are cached for 30–35 minutes, so first request after cache expiry will be slow
- This is normal; subsequent requests within 30 min are instant
- On Vercel, you can upgrade to use Vercel KV (distributed cache) for better multi-region performance

---

## **Next Steps (Optional)**

### **Add More Sources**
Edit `src/lib/meetup-api.ts` and add more Meetup groups to `KARACHI_TECH_GROUPS`:
```typescript
const KARACHI_TECH_GROUPS = [
  "gdg-karachi",
  "python-karachi",
  "react-karachi",
  // Add more here:
  "your-new-group-url-name",
];
```

### **Switch to Vercel KV (Distributed Cache)**
For production with multiple Vercel regions:
1. Add Vercel KV to your project
2. Update `src/lib/cache.ts` to use `@vercel/kv` instead of in-memory cache
3. This gives you shared caching across all edge locations

### **Add More APIs**
The structure is set up to add more sources (e.g., Google Calendar, LinkedIn, custom JSON feeds). Each new source goes in `src/lib/` as a new fetcher function.

---

## **Files Changed**

- `src/lib/cache.ts` — In-memory cache with TTL
- `src/lib/eventbrite-api.ts` — Eventbrite API client
- `src/lib/meetup-api.ts` — Meetup API client
- `src/lib/event-sources.ts` — Aggregator (replaced scraper)
- `src/app/api/events/route.ts` — Already updated to use new aggregator
- `src/app/api/cron/refresh-events/route.ts` — Cron endpoint
- `src/app/page.tsx` — Already updated to fetch events server-side
- `src/components/HomePage.tsx` — Already updated to accept initial events
- `.env.local` — Your local API keys (git-ignored)
- `.env.example` — Template for setup
- `vercel.json` — Cron configuration

---

## **Support**

If you get stuck:
1. Check the API documentation links in `.env.example`
2. Verify API keys are correct and not expired
3. Check Vercel logs for detailed error messages
4. Check the console/network tab in your browser devtools

Good luck! 🚀
