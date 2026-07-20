import Link from "next/link";
import { getPublishedPosts } from "@/lib/beehiiv";
import { formatBriefDate } from "@/lib/format";
import SubscribeForm from "@/components/SubscribeForm";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 300; // matches the fetch-level cache in lib/beehiiv.ts

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPublishedPosts>>["data"] = [];
  let fetchError: string | null = null;

  try {
    const result = await getPublishedPosts({ limit: 5 });

console.log("POSTS RECEIVED:");
console.log(
  result.data.map((p) => ({
    title: p.title,
    status: p.status,
    publish_date: p.publish_date,
    displayed_date: p.displayed_date,
  }))
);

posts = result.data;
  } catch (err) {
    // Don't let a Beehiiv outage or missing env vars take the whole
    // homepage down — degrade gracefully and show a message instead.
    fetchError = err instanceof Error ? err.message : "Unknown error";
  }

  const latestPost = posts[0];

  return (
    <>
      <ScrollReveal />

      <section className="hero" id="top">
        <div className="hero-inner">
          <div className="eyebrow mono">
            <span>Finance</span>
            <span>AI</span>
            <span>Technology</span>
            <span>Weekly, Tuesdays</span>
          </div>
          <h1 className="masthead reveal">
            Finance, intelligence,
            <br />
            and infrastructure — <em>read in that order.</em>
          </h1>
          <p className="hero-sub reveal d1">
            A weekly briefing for operators, allocators, and builders who
            want to know where capital, AI, and technology actually
            intersect — before it&apos;s consensus.
          </p>

          <SubscribeForm />
          <p className="subscribe-note">
            No spam. One issue a week. Unsubscribe in one click.
          </p>
        </div>
      </section>

      <section id="coverage">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="section-label mono">What&apos;s covered</div>
              <h2>Three ledgers, kept in parallel.</h2>
            </div>
            <p className="section-desc">
              Each issue moves between where money is going, what the
              machines are actually doing with it, and the systems quietly
              holding it all together.
            </p>
          </div>

          <div className="entries">
            <div className="entry scroll-reveal">
              <div className="entry-no mono">01</div>
              <h3>Capital Markets</h3>
              <p>
                Where allocations are actually moving — deals, spreads, and
                the positioning worth reading twice before the headline
                catches up.
              </p>
            </div>
            <div className="entry scroll-reveal">
              <div className="entry-no mono">02</div>
              <h3>Applied Intelligence</h3>
              <p>
                AI inside finance and the enterprise, past the product
                demos — adoption, budget, and what&apos;s actually changing
                the P&amp;L.
              </p>
            </div>
            <div className="entry scroll-reveal">
              <div className="entry-no mono">03</div>
              <h3>Infrastructure</h3>
              <p>
                The technology finance teams are quietly standardizing on —
                and the vendors, tools, and decisions behind that shift.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-inner">
        <div className="ledger-rule">
          <div className="thick"></div>
          <div className="thin"></div>
        </div>
      </div>

      {/* ---- Latest brief: live from Beehiiv ---- */}
      <section id="issue">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="section-label mono">Latest brief</div>
              <h2>In this week&apos;s Brief.</h2>
            </div>
            <p className="section-desc">
  Updated every Tuesday.
</p>
          </div>

          {fetchError && (
            <div className="issue-panel scroll-reveal">
              <p style={{ margin: 0 }}>
                Couldn&apos;t load the latest brief right now
                {process.env.NODE_ENV === "development" ? `: ${fetchError}` : "."}
              </p>
            </div>
          )}

          {!fetchError && posts.length === 0 && (
            <div className="issue-panel scroll-reveal">
              <p style={{ margin: 0 }}>
                No published briefs yet — check back soon.
              </p>
            </div>
          )}

          {!fetchError && latestPost && (
            <div className="issue-panel scroll-reveal">
              <div className="issue-panel-head">
                <h3>{latestPost.title}</h3>
                <span className="issue-date mono">
                  {formatBriefDate(
                    latestPost.displayed_date ?? latestPost.publish_date
                  )}
                </span>
              </div>
              <ul className="toc">
                {posts.map((post, i) => (
                  <li key={post.id}>
                    <span className="toc-no mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="toc-text">
                      <Link
                        href={`/brief/${post.slug}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {post.title}
                      </Link>
                      {post.subtitle && <small>{post.subtitle}</small>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <div className="section-inner">
        <div className="ledger-rule">
          <div className="thick"></div>
          <div className="thin"></div>
        </div>
      </div>

      <section id="readers">
        <div className="section-inner">
          <div className="section-head">
            <div>
              <div className="section-label mono">Who reads it</div>
              <h2>Built for people who decide, not just follow.</h2>
            </div>
          </div>
          <div className="who-grid">
            <div className="who-card scroll-reveal">
              <h4>Finance Leaders</h4>
              <p>
                CFOs, controllers, and FP&amp;A teams evaluating
                what&apos;s worth adopting.
              </p>
            </div>
            <div className="who-card scroll-reveal">
              <h4>Allocators</h4>
              <p>Investors and analysts tracking where capital and AI actually meet.</p>
            </div>
            <div className="who-card scroll-reveal">
              <h4>Operators</h4>
              <p>
                Founders and fintech builders shipping the tools this
                newsletter covers.
              </p>
            </div>
            <div className="who-card scroll-reveal">
              <h4>Vendors &amp; Partners</h4>
              <p id="sponsors">
                Sponsors reaching a precise, high-intent finance and tech
                audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Read it before it&apos;s consensus.</h2>
        <p>
          One issue a week. No noise, no filler — just where finance, AI,
          and infrastructure actually meet.
        </p>
        <SubscribeForm />
      </section>
    </>
  );
}
