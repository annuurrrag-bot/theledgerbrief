# The Ledger Brief — Next.js site

This is the Next.js (App Router) rewrite of the static HTML site, with the
homepage's "Latest brief" section and each `/brief/[slug]` page pulling
live content from the Beehiiv API instead of hardcoded HTML.

The visual design — colors, type, layout, the ledger-rule dividers, the
logo mark — is unchanged from the static version. All of it lives in
`src/app/globals.css`, copied over as-is.

## Project structure

```
src/
  app/
    layout.tsx          → root layout: fonts, <Header/>, <Footer/>
    page.tsx             → homepage (Server Component, fetches Beehiiv posts)
    globals.css          → all site styling (ported unchanged)
    not-found.tsx         → 404 page for invalid /brief/[slug] routes
    about/page.tsx
    privacy/page.tsx
    brief/[slug]/page.tsx → dynamic route, one per Beehiiv post
  components/
    Header.tsx
    Footer.tsx
    SubscribeForm.tsx     → client component (form needs interactivity)
    ScrollReveal.tsx      → client component (ports the old inline <script>)
  lib/
    beehiiv.ts            → the Beehiiv API client — all fetch logic lives here
    format.ts              → date formatting helper
public/
  logo.svg
  thumbnails/
```

## Setting up the Beehiiv API

1. **Get your API key**: Beehiiv dashboard → Settings → Workspace → API.
   Docs: https://developers.beehiiv.com/welcome/create-an-api-key
2. **Get your Publication ID**: it's the `pub_...` ID shown in your
   publication's settings or returned from the
   [List Publications](https://developers.beehiiv.com/api-reference/publications/index)
   endpoint.
3. Copy `.env.example` to `.env.local` and fill in both values:

   ```
   cp .env.example .env.local
   ```

   ```
   BEEHIIV_API_KEY=your_real_key
   BEEHIIV_PUBLICATION_ID=pub_xxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Important:** these variables are intentionally *not* prefixed with
`NEXT_PUBLIC_`. Next.js only exposes `NEXT_PUBLIC_*` variables to the
browser — everything else stays server-only. Since `lib/beehiiv.ts` is
only ever called from Server Components (`page.tsx` files) and
`generateStaticParams`/`generateMetadata`, your API key never reaches the
client bundle. Don't rename these to add the `NEXT_PUBLIC_` prefix, or
your key will be exposed to anyone who views your site's source.

`.env.local` is already listed in `.gitignore` — never commit real
credentials to git.

## Running locally

```
npm install
npm run dev
```

Visit `http://localhost:3000`.

If the env vars are missing, the homepage will render everything except
the "Latest brief" section, which shows a friendly fallback message
instead of crashing the page (see the try/catch in `src/app/page.tsx`).

## How the data flows

- `getPublishedPosts()` in `lib/beehiiv.ts` calls
  `GET /v2/publications/:publicationId/posts` with `status=confirmed`
  (Beehiiv's term for "published"), sorted newest-first.
- The homepage (`src/app/page.tsx`) calls this to populate the "Latest
  brief" section — the 5 most recent posts, each linking to its own page.
- `getPostBySlug()` calls the same endpoint filtered by `slugs[]`, with
  `expand[]=free_web_content` so the actual post HTML comes back in the
  response — that's what renders on `/brief/[slug]`.
- `generateStaticParams()` in `brief/[slug]/page.tsx` pre-builds a page
  for every currently published post at build time. Anything published
  after that gets rendered on-demand on first visit, then cached.
- Both fetches use `next: { revalidate: 300 }` (5 minutes), so new issues
  show up without needing a full redeploy — Next.js will re-fetch and
  refresh the cache automatically in the background.

## Wiring up the actual subscribe form

`SubscribeForm.tsx` currently just flips its button text to "Subscribed"
on submit — same placeholder behavior as the static site. To make it
actually subscribe people, either:

- Replace the `handleSubmit` logic with a `fetch()` call to Beehiiv's
  [Create Subscription](https://developers.beehiiv.com/api-reference/subscriptions/create)
  endpoint via a Next.js Route Handler (so the API key stays server-side), or
- Swap the form out entirely for Beehiiv's own hosted embed/subscribe
  widget (found in your Beehiiv dashboard under Publication → Subscribe
  Forms).

## Deploying

This is a standard Next.js app — deploys cleanly to Vercel, Netlify, or
any Node host. Whichever you use, set `BEEHIIV_API_KEY` and
`BEEHIIV_PUBLICATION_ID` as environment variables in that platform's
dashboard (not in a committed file).
