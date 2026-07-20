"use client";

import { useEffect } from "react";

/**
 * Ports the original static site's inline <script> that drove the
 * scroll-triggered fade-in on .scroll-reveal elements. Runs once on
 * mount on every page that renders it.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      const revealEls = document.querySelectorAll(".scroll-reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
              setTimeout(
                () => entry.target.classList.add("in-view"),
                idx * 60
              );
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => io.observe(el));

      return () => io.disconnect();
    } else {
      document
        .querySelectorAll(".scroll-reveal")
        .forEach((el) => el.classList.add("in-view"));
    }
  }, []);

  return null;
}
