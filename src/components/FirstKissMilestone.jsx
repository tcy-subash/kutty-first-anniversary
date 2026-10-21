import { useState } from "react";
import { ArrowRight, Calendar, Heart, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { firstKissDetails } from "../data/relationshipTimeline.js";
import { soundEffects } from "../utils/audioEffects.js";

export default function FirstKissMilestone({ onNextSlide }) {
  const [isOpen, setIsOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  function handleOpen() {
    setIsOpen(true);
    setBurstKey((prev) => prev + 1);
    soundEffects.playSparkle();
  }

  function handleReset() {
    setIsOpen(false);
    soundEffects.playPop();
  }

  return (
    <div className="content-slide first-kiss-container">
      <div className="eyebrow">
        <Sparkles size={14} /> A VERY SPECIAL SPOTLIGHT
      </div>
      <h2>
        The First Time<br />
        <em>We Kissed.</em> 💋
      </h2>
      <p className="section-intro">
        A moment locked forever in time, wrapped with butterflies and pure magic.
      </p>

      {/* Floating Sparkles Burst (triggers on reveal) */}
      {isOpen && (
        <div key={burstKey} className="kiss-burst-particles" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="burst-heart"
              style={{
                "--angle": `${(i * 360) / 14}deg`,
                "--distance": `${75 + (i % 4) * 25}px`,
                "--delay": `${(i % 5) * 0.06}s`,
              }}
            >
              {i % 2 === 0 ? "♥" : "✦"}
            </span>
          ))}
        </div>
      )}

      <div className="kiss-stage">
        {!isOpen ? (
          /* Closed Magical Envelope */
          <div className="kiss-closed-card animate-in">
            <div className="kiss-envelope-decor">
              <span className="envelope-stamp">SEALED WITH LOVE</span>
              <div className="envelope-heart-icon">
                <Heart size={44} fill="#e56f96" color="#e56f96" />
              </div>
            </div>
            <p className="kiss-envelope-prompt">
              "{firstKissDetails.envelopePrompt}"
            </p>
            <button
              type="button"
              className="primary-button kiss-open-button"
              onClick={handleOpen}
            >
              <Heart size={18} fill="currentColor" />
              {firstKissDetails.buttonText}
            </button>
            <span className="tiny-note">warning: may cause excessive blushing</span>
          </div>
        ) : (
          /* Revealed Memory Card */
          <article className="kiss-revealed-card animate-in">
            <div className="kiss-card-ribbon">
              <Sparkles size={14} /> OUR MAGICAL MOMENT
            </div>

            <h3 className="kiss-revealed-title">{firstKissDetails.title}</h3>

            <div className="kiss-revealed-meta">
              <span className="meta-pill">
                <Calendar size={13} /> {firstKissDetails.date}
              </span>
              <span className="meta-pill">
                <MapPin size={13} /> {firstKissDetails.location}
              </span>
            </div>

            {/* Optional Photo */}
            {firstKissDetails.photoSrc && (
              <div className="kiss-photo-frame">
                <img
                  src={firstKissDetails.photoSrc}
                  alt={firstKissDetails.photoCaption || "Our first kiss"}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.add("show-fallback");
                  }}
                />
                <div className="kiss-photo-fallback">
                  <Heart size={36} fill="#f49cb8" strokeWidth={0} />
                  <span>Your first kiss photo goes here</span>
                  <small>Add to public/media/first-kiss.jpg</small>
                </div>
                {firstKissDetails.photoCaption && (
                  <p className="kiss-photo-caption">
                    {firstKissDetails.photoCaption}
                  </p>
                )}
              </div>
            )}

            <div className="kiss-revealed-story">
              <p>{firstKissDetails.story}</p>
            </div>

            {/* Ending note requested by user */}
            <div className="kiss-ending-quote">
              <div className="quote-heart">♥</div>
              <p>"{firstKissDetails.sweetNote}"</p>
            </div>

            <div className="kiss-card-controls">
              <button
                type="button"
                className="text-button"
                onClick={handleReset}
              >
                <RotateCcw size={14} /> Re-seal memory
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={onNextSlide}
              >
                Next: Memory Gallery <ArrowRight size={16} />
              </button>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
