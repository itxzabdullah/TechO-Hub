"use client";

import { FormEvent, useState } from "react";

export default function SubmitSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="submit-section" id="submit">
      <div className="container submit-inner">
        <div className="submit-content">
          <h2>Know an event we&apos;re missing?</h2>
          <p>
            Help the community stay in the loop. Submit tech events happening in
            Karachi and we&apos;ll add them to the calendar.
          </p>
        </div>

        {submitted ? (
          <p className="submit-note">
            Thanks! Your event has been noted for review.
          </p>
        ) : (
          <form className="submit-form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Event title" required />
            <input type="date" name="date" required />
            <input type="url" name="url" placeholder="Event link (optional)" />
            <button className="btn btn-primary" type="submit">
              Submit event
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
