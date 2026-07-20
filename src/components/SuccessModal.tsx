"use client";

import { useEffect } from "react";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessModal({
  open,
  onClose,
}: SuccessModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div
        className="success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-check">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
</div>

  <h2>Almost There</h2>

<p className="welcome">
  <strong>Your subscription is almost complete.</strong>
</p>

<p>
  We've sent a verification email to your inbox.
</p>

<p>
  Click the link in that email to verify your address and activate your subscription to <strong>The Ledger Brief</strong>.
</p>

<span>
  If it doesn't appear within a minute, please check your Spam or Promotions folder.
</span>

<button onClick={onClose}>
  Okay
</button>
      </div>
    </div>
  );
}