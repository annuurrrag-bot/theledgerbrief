import Link from "next/link";

export default function NotFound() {
  return (
    <section className="content-block" style={{ textAlign: "center" }}>
      <h1>Brief not found.</h1>
      <p>That issue doesn&apos;t exist, or hasn&apos;t been published yet.</p>
      <p>
        <Link href="/" style={{ color: "var(--brass)" }}>
          Back to The Ledger Brief
        </Link>
      </p>
    </section>
  );
}
