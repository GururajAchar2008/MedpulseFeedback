import { useState } from "react";
import "./App.css";

const ratingLabels = {
  1: "Needs polish",
  2: "Room to improve",
  3: "Solid",
  4: "Very good",
  5: "Outstanding",
};

const recommendationOptions = ["Yes", "Maybe", "No"];

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [recommend, setRecommend] = useState("");


  const activeRating = hover || rating;
  const ratingText = rating
    ? `${rating} / 5 stars · ${ratingLabels[rating]}`
    : "Tap a star to rate your visit";

  return (
    <div className="page">
      <div className="page__blob page__blob--one" />
      <div className="page__blob page__blob--two" />

      <main className="shell">
        <section className="brandPanel">
          <div className="brandPanel__badge">
            <span className="brandPanel__badgeMark">MP</span>
            <span>MedPulse</span>
          </div>

          <div>
            <p className="brandPanel__eyebrow">project feedback</p>
            <h1>Help us shape a more polished MedPulse experience.</h1>
            <p className="brandPanel__lead">
              Share what felt memorable, what could be refined, and whether
              you&apos;d recommend us to others.
            </p>
          </div>

          <div className="brandPanel__metrics">
            <article className="metric">
              <strong>1 minute</strong>
              <span>Quick to complete</span>
            </article>
            <article className="metric">
              <strong>Honest</strong>
              <span>Useful, candid feedback</span>
            </article>
            <article className="metric">
              <strong>Actionable</strong>
              <span>Helps us improve fast</span>
            </article>
          </div>

          <p className="brandPanel__footer">
            Every response is reviewed with care and helps us elevate the next
            version of the Project.
          </p>
        </section>

        <section className="formCard">
          <div className="formCard__top">
            <div>
              <p className="formCard__eyebrow">Feedback form</p>
              <h2>
                {submitted
                  ? "We have your response."
                  : "Tell us what stood out."}
              </h2>
            </div>
            <div className="formCard__pill">Secure response</div>
          </div>

          {submitted ? (
            <div className="successState">
              <div className="successState__icon">✓</div>
              <p className="successState__eyebrow">Thank you</p>
              <h3>Your feedback has been submitted.</h3>
              <p className="successState__copy">
                We appreciate the time you took to share your thoughts. They
                help us create a more thoughtful, premium experience.
              </p>
              <button
                type="button"
                className="button button--secondary"
                onClick={() => setSubmitted(false)}
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form
              className="form"
              action="https://formspree.io/f/mwvwrqly"
              method="POST"
            >
              <div className="field">
                <label className="label" htmlFor="name">
                  Your name <span className="required">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="input"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="input"
                />
              </div>

              <div className="field">
                <label className="label">
                  How would you rate our Project?{" "}
                  <span className="required">*</span>
                </label>
                <div className="ratingRow">
                  <div
                    className="stars"
                    role="group"
                    aria-label="Rate the project from one to five stars"
                    onMouseLeave={() => setHover(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`starButton ${
                          n <= activeRating ? "starButton--active" : ""
                        }`}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHover(n)}
                        aria-label={`${n} star${n === 1 ? "" : "s"}`}
                        aria-pressed={rating === n}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <span className="ratingCopy">{ratingText}</span>
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="liked">
                  What did you like about our Project?
                </label>
                <textarea
                  id="liked"
                  name="liked"
                  placeholder="Tell us what impressed you..."
                  rows={4}
                  className="textarea"
                />
              </div>

              <div className="field">
                <label className="label" htmlFor="suggestions">
                  Any suggestions for us?
                </label>
                <textarea
                  id="suggestions"
                  name="suggestions"
                  placeholder="We'd love to improve..."
                  rows={4}
                  className="textarea"
                />
              </div>

              <div className="field">
                <label className="label">
                  Would you recommend MedPulse to others?
                </label>
                <div
                  className="choices"
                  role="radiogroup"
                  aria-label="Recommendation choice"
                >
                  {recommendationOptions.map((option) => (
                    <label
                      key={option}
                      className={`choiceChip ${
                        recommend === option ? "choiceChip--active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="recommend"
                        value={option}
                        checked={recommend === option}
                        onChange={() => setRecommend(option)}
                        className="choiceChip__input"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="actions">
                <button type="submit" className="button button--primary">
                  Submit feedback
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
