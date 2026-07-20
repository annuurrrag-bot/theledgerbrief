"use client";

import SuccessModal from "./SuccessModal";
import { FormEvent, useState } from "react";

export default function SubscribeForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [showSuccessModal, setShowSuccessModal] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Subscription failed.");
      }

setMessage("");
setShowSuccessModal(true);
setEmail("");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        id={id}
        className="subscribe-line"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
        />

        <button
  type="submit"
  className="subscribe-button"
  disabled={loading}
>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "12px",
            fontSize: "14px",
            opacity: 0.9,
          }}
        >
          {message}
        </p>
      )}
      <SuccessModal
  open={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
/>
    </>
  );
}