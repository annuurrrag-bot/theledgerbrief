import type { Metadata } from "next";
import SubscribeForm from "@/components/SubscribeForm";

export const metadata: Metadata = {
  title: "Privacy — The Ledger Brief",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="eyebrow mono">
            <span>Privacy</span>
          </div>
          <h1>Your data, plainly explained.</h1>
          <p>
            This page describes what we collect, why, and what we never do
            with it.
          </p>
        </div>
      </section>

      <div className="ledger-rule">
        <div className="thick"></div>
        <div className="thin"></div>
      </div>

      <section className="content-block">
        <h2>What we collect</h2>
        <p>
          When you subscribe, we collect your email address so we can send
          you the weekly Brief. If you interact with our emails or website,
          we may collect basic engagement data — such as whether an issue
          was opened — to understand what&apos;s useful to readers and
          improve future issues.
        </p>

        <h2>What we don&apos;t do</h2>
        <p>
          We do not sell, rent, or share your email address or personal
          data with third parties for their own marketing purposes. Any
          sponsor content in the Brief is clearly marked as sponsored;
          sponsors do not receive your personal data as part of that
          arrangement.
        </p>

        <h2>Cookies and tracking</h2>
        <p>
          Our website may use minimal, standard analytics to understand
          overall traffic patterns. We do not use this data to build
          individual profiles for advertising purposes outside of this
          newsletter.
        </p>

        <h2>Your choices</h2>
        <p>
          You can unsubscribe from The Ledger Brief at any time using the
          link included in every email — no explanation required, and it
          takes effect immediately. If you&apos;d like your data removed
          from our systems entirely, contact us and we&apos;ll process that
          request promptly.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll note it
          here with an updated date. Continuing to subscribe after a change
          means you accept the updated terms.
        </p>

        <p
          style={{
            marginTop: "36px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            color: "var(--charcoal-soft)",
          }}
        >
          Last updated: July 2026
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
