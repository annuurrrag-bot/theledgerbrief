import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPublishedPosts } from "@/lib/beehiiv";
import { formatBriefDate } from "@/lib/format";

export const revalidate = 300;

type Props = {
  params: { slug: string };
};

/**
 * Pre-render a page for every currently published post at build time.
 * Beehiiv posts published after the last build/revalidation window will
 * still work via on-demand rendering (Next.js falls back to rendering
 * on first request for slugs not returned here), then get cached.
 */
export async function generateStaticParams() {
  try {
    const { data } = await getPublishedPosts({ limit: 100 });
    return data.map((post) => ({ slug: post.slug }));
  } catch {
    // If Beehiiv is unreachable at build time, fall back to on-demand
    // rendering for every slug rather than failing the whole build.
    return [];
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.meta_default_title || post.title,
    description: post.meta_default_description || post.subtitle || undefined,
    openGraph: {
      title: post.meta_default_title || post.title,
      description: post.meta_default_description || post.subtitle || undefined,
      images: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    },
  };
}

export default async function BriefPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const html = post.content?.free?.web;

  return (
    <section className="content-block" style={{ paddingTop: "64px" }}>
      <div className="eyebrow mono" style={{ marginBottom: "20px" }}>
        <span>
          {formatBriefDate(post.displayed_date ?? post.publish_date)}
        </span>
        {post.authors && post.authors.length > 0 && (
          <span>{post.authors.join(", ")}</span>
        )}
      </div>

      <h1 style={{ marginBottom: "12px" }}>{post.title}</h1>
      {post.subtitle && (
        <p style={{ fontSize: "18px", color: "var(--charcoal-soft)" }}>
          {post.subtitle}
        </p>
      )}

      <div className="ledger-rule" style={{ margin: "32px 0" }}>
        <div className="thick"></div>
        <div className="thin"></div>
      </div>

      {html ? (
        // Beehiiv's post content comes back as sanitized HTML from their
        // API — safe to render directly. See getPostBySlug in lib/beehiiv.ts,
        // which requests the `free_web_content` expansion.
        <div
          className="beehiiv-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p>
          This brief doesn&apos;t have web content available yet.{" "}
          <a href={post.web_url} target="_blank" rel="noopener noreferrer">
            Read it on Beehiiv instead.
          </a>
        </p>
      )}
    </section>
  );
}
