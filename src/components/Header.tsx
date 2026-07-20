import Link from "next/link";

export default function Header() {
  return (
    <header className="masthead-nav">
      <div className="nav-inner">
        <Link href="/" className="brand" style={{ textDecoration: "none" }}>
          <svg
            className="seal"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="9.5" y="11" width="21" height="7" rx="2" fill="#FAFAF8" />
            <rect
              x="9.5"
              y="28.5"
              width="32"
              height="7"
              rx="2"
              fill="#FAFAF8"
            />
            <rect x="9.5" y="46" width="43.5" height="7" rx="2" fill="#D6303F" />
          </svg>
          <span className="brand-name-plain">The Ledger Brief</span>
        </Link>
        <nav className="links">
          <Link href="/#coverage">Coverage</Link>
          <Link href="/#issue">Latest Brief</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link href="/#top" className="nav-cta">
          Subscribe
        </Link>
        <button className="menu-toggle" aria-label="Open menu">
          ☰
        </button>
      </div>
      <div className="ledger-rule on-ink">
        <div className="thick"></div>
        <div className="thin"></div>
      </div>
    </header>
  );
}
