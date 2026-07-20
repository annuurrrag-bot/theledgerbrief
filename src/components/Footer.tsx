import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-copy">
          <p>© 2026 The Ledger Brief. All rights reserved.</p>
          <span>
            Weekly Intelligence on Finance · AI · Infrastructure
          </span>
        </div>

        <div className="footer-links">
          <Link href="/#coverage">Coverage</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}