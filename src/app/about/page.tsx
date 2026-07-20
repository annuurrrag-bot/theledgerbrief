import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "About — The Ledger Brief",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="eyebrow mono">
            <span>About</span>
          </div>
          <h1>Where finance and AI actually meet — verified, not guessed.</h1>
          <p>
            Finance is changing faster than most coverage of it. The Ledger
            Brief exists to track that change carefully, sourcing everything
            from where it actually happened.
          </p>
        </div>
      </section>

      <div className="ledger-rule">
        <div className="thick"></div>
        <div className="thin"></div>
      </div>

      <section className="content-block">
        <h2>Why this exists</h2>
        <p>
          AI is no longer a side story in finance — it&apos;s rewriting how
          capital is allocated, how risk is modeled, how reporting gets
          done, and how decisions get made inside banks, funds, and finance
          teams. Most coverage of this either overhypes every product
          announcement or ignores the space entirely. We wanted something
          in between: a clear, weekly account of what&apos;s actually
          happening, written for people who need to act on it.
        </p>

        <h2>How the Brief works</h2>
        <p>
          Every Tuesday, one brief goes out covering three consistent
          threads: capital markets, applied AI inside finance and the
          enterprise, and the infrastructure quietly becoming standard
          behind both. Each issue is built the same way — a close read of
          what changed, why it matters, and what to watch next. No filler
          sections, no recycled press releases.
        </p>

        <h2>Verified sources, every issue</h2>
        <p>
          Every claim, statistic, and case study in The Ledger Brief is
          checked against a primary source — company filings, direct
          interviews, regulatory documents, or original survey data we
          collect ourselves — before it&apos;s published. Where we
          can&apos;t verify something to that standard, we don&apos;t run
          it. If a claim&apos;s origin is ever unclear, we say so plainly
          rather than presenting it as settled.
        </p>

        <h2>Who writes it</h2>
        <p>
          The Brief is written and edited by people who follow finance and
          AI closely, cross-check what they publish, and would rather send
          a shorter issue than a padded one. We correct errors publicly and
          quickly when we get something wrong.
        </p>
      </section>

      <section className="final-cta">
        <h2>Get the next Brief.</h2>
        <p>
          One email a week. No noise, no filler — just where finance, AI,
          and infrastructure actually meet.
        </p>
        <SubscribeForm />
      </section>
    </>
  );
}
