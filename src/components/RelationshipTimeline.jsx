import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Heart, MapPin, Sparkles, Video } from "lucide-react";
import { milestones } from "../data/relationshipTimeline.js";
import { soundEffects } from "../utils/audioEffects.js";

export default function RelationshipTimeline({ onNextSlide, onJumpToKiss }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const current = milestones[currentIndex];

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setExpanded(false);
      soundEffects.playPop();
    }
  }

  function handleNext() {
    if (currentIndex < milestones.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setExpanded(false);
      soundEffects.playPop();
    }
  }

  function toggleExpand() {
    setExpanded((prev) => !prev);
    soundEffects.playChime();
  }

  return (
    <div className="content-slide timeline-container">
      <div className="eyebrow">
        <Sparkles size={14} /> CHAPTER BY CHAPTER
      </div>
      <h2>
        Our Little<br />
        <em>Love Story.</em>
      </h2>
      <p className="section-intro">
        From strangers to each other's favourite thought. Follow the trail of our sweetest milestones together.
      </p>

      {/* Visual Timeline Stepper */}
      <div className="timeline-stepper" role="tablist" aria-label="Milestone Progress">
        <div className="stepper-track">
          <div
            className="stepper-fill"
            style={{ width: `${(currentIndex / (milestones.length - 1)) * 100}%` }}
          />
        </div>
        <div className="stepper-dots">
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={idx === currentIndex}
              className={`stepper-node ${idx === currentIndex ? "active" : ""} ${idx < currentIndex ? "completed" : ""}`}
              onClick={() => {
                setCurrentIndex(idx);
                setExpanded(false);
                soundEffects.playPop();
              }}
              title={m.title}
            >
              <span>{m.number}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Milestone Card */}
      <div className="milestone-card-wrap">
        <article className="milestone-card animate-in" key={current.id}>
          <div className="milestone-header">
            <div className="milestone-tag">
              <span className="pulse-dot" />
              <span>{current.tag} • {current.number} / 08</span>
            </div>
            <span className="milestone-badge">{current.badge}</span>
          </div>

          <h3 className="milestone-title">{current.title}</h3>

          <div className="milestone-meta">
            <span className="meta-item">
              <Calendar size={13} /> {current.date}
            </span>
            {current.location && (
              <span className="meta-item">
                <MapPin size={13} /> {current.location}
              </span>
            )}
          </div>

          <p className="milestone-short">{current.shortDescription}</p>

          {/* Optional Media Preview */}
          {current.mediaSrc && (!current.showOnExpand || expanded) && (
            <div className="milestone-media animate-in">
              {current.mediaType === "video" ? (
                <div className="media-box video-box">
                  <video src={current.mediaSrc} controls playsInline preload="metadata" />
                </div>
              ) : (
                <div className="media-box">
                  <img
                    src={current.mediaSrc}
                    alt={current.mediaCaption || current.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.add("show-fallback");
                    }}
                  />
                  <div className="media-fallback">
                    <Heart size={28} />
                    <span>Photo placeholder: Add to public/media</span>
                  </div>
                </div>
              )}
              {current.mediaCaption && <p className="media-caption">{current.mediaCaption}</p>}
            </div>
          )}

          {/* Special Kiss Highlight Link (Commented Out) */}
          {/* {current.isKissMilestone && (
            <div className="kiss-banner-prompt">
              <div className="kiss-banner-icon">💋</div>
              <div className="kiss-banner-text">
                <strong>Our First Kiss Memory</strong>
                <span>Experience the magical envelope reveal in the next slide!</span>
              </div>
              <button
                type="button"
                className="kiss-banner-button"
                onClick={onJumpToKiss}
              >
                Relive it now ›
              </button>
            </div>
          )} */}

          {/* Expanded Full Story */}
          {expanded && (
            <div className="milestone-full-story animate-in">
              <div className="story-divider">
                <span>The Full Memory</span>
              </div>
              <p>{current.fullStory}</p>
            </div>
          )}

          {/* Milestone Action Buttons */}
          <div className="milestone-card-actions">
            <button
              type="button"
              className="read-memory-btn"
              onClick={toggleExpand}
              aria-expanded={expanded}
            >
              <BookOpen size={15} />
              {expanded ? "Hide memory" : "Read our memory"}
            </button>

            <div className="milestone-nav-buttons">
              <button
                type="button"
                className="step-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous milestone"
              >
                <ArrowLeft size={15} />
              </button>
              <span className="step-counter">
                {currentIndex + 1} of {milestones.length}
              </span>
              <button
                type="button"
                className="step-btn"
                onClick={handleNext}
                disabled={currentIndex === milestones.length - 1}
                aria-label="Next milestone"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Bottom slide action */}
      <div className="slide-footer-action">
        <button className="primary-button" onClick={onNextSlide}>
          Next: Our First Kiss Spotlight <Heart size={16} fill="currentColor" />
        </button>
      </div>
    </div>
  );
}
