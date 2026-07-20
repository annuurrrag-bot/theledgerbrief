/**
 * Beehiiv API client.
 *
 * Reads BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID from environment
 * variables. These are server-only (no NEXT_PUBLIC_ prefix) so the API
 * key is never sent to the browser — this module must only be imported
 * from Server Components, Route Handlers, or other server-side code.
 */

const BEEHIIV_API_BASE = "https://api.beehiiv.com/v2";

export type BeehiivPost = {
  id: string;
  title: string;
  subtitle: string | null;
  authors?: string[];
  created: number;
  status: "draft" | "confirmed" | "archived";
  slug: string;
  thumbnail_url: string | null;
  web_url: string;
  audience: "free" | "premium";
  platform: "web" | "email" | "both";
  content_tags?: string[];
  publish_date: number | null;
  displayed_date: number | null;
  meta_default_description: string | null;
  meta_default_title: string | null;
  content?: {
    free?: {
      web?: string;
      email?: string;
      rss?: string;
    };
    premium?: {
      web?: string;
      email?: string;
    };
  };
};

export type BeehiivPostsResponse = {
  data: BeehiivPost[];
  limit: number;
  page: number;
  total_results: number;
  total_pages: number;
};

function getCredentials() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    throw new Error(
      "Missing Beehiiv credentials. Set BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID in your .env.local file."
    );
  }

  return { apiKey, publicationId };
}

/**
 * Fetch published posts.
 */
export async function getPublishedPosts(options?: {
  limit?: number;
  page?: number;
}): Promise<BeehiivPostsResponse> {
  const { apiKey, publicationId } = getCredentials();

  const params = new URLSearchParams({
    status: "confirmed",
    order_by: "publish_date",
    direction: "desc",
    limit: String(options?.limit ?? 50),
    page: String(options?.page ?? 1),
  });

  const res = await fetch(
    `${BEEHIIV_API_BASE}/publications/${publicationId}/posts?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");

    throw new Error(
      `Beehiiv API error (${res.status}): ${res.statusText}. ${body}`
    );
  }

  const json: BeehiivPostsResponse = await res.json();

  // Beehiiv publish_date is Unix time in seconds.
  const now = Math.floor(Date.now() / 1000);

  json.data = json.data
    .filter((post) => {
      if (post.publish_date === null) return false;
      return post.publish_date <= now;
    })
    .sort((a, b) => (b.publish_date ?? 0) - (a.publish_date ?? 0));

  return json;
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(
  slug: string
): Promise<BeehiivPost | null> {
  const { apiKey, publicationId } = getCredentials();

  const params = new URLSearchParams({
    status: "confirmed",
  });

  params.append("slugs[]", slug);
  params.append("expand[]", "free_web_content");

  const res = await fetch(
    `${BEEHIIV_API_BASE}/publications/${publicationId}/posts?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");

    throw new Error(
      `Beehiiv API error (${res.status}): ${res.statusText}. ${body}`
    );
  }

  const json: BeehiivPostsResponse = await res.json();

  return json.data[0] ?? null;
}