import { useState } from "react";
import {
  ArrowRight, Check, Eye, EyeOff, Heart, Mail, MailOpen,
  RotateCcw, Sparkles
} from "lucide-react";
import { loveNotes } from "../data/loveNotes.js";
import { soundEffects } from "../utils/audioEffects.js";

export default function ReasonsLoveNotes({ onNextSlide }) {
  const [openedSet, setOpenedSet] = useState(new Set([1])); // First note open by default as a preview hint

  function toggleNote(id) {
    setOpenedSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        soundEffects.playPop();
      } else {
        next.add(id);
        soundEffects.playChime();
      }
      return next;
    });
  }

  function openAll() {
    setOpenedSet(new Set(loveNotes.map((n) => n.id)));
    soundEffects.playSparkle();
  }

  function closeAll() {
    setOpenedSet(new Set());
    soundEffects.playPop();
  }

  const openedCount = openedSet.size;

  return (
    <div className="content-slide reasons-slide-container">
      <div className="eyebrow">
        <Heart size={14} fill="currentColor" /> CONFIDENTIAL LOVE DOSSIER
      </div>
      <h2>
        Reasons I Love<br />
        <em>My Kutty.</em> ❤️
      </h2>
      <p className="section-intro">
        A grid of hidden notes. Tap each envelope to uncover just a few of the million reasons my heart beats for you.
      </p>

      {/* Progress & Controls Header */}
      <div className="reasons-controls-bar">
        <div className="reasons-progress-badge">
          <Sparkles size={14} />
          <span>
            Notes opened: <strong>{openedCount}</strong> / {loveNotes.length}
          </span>
        </div>

        <div className="reasons-toggle-btns">
          {openedCount < loveNotes.length ? (
            <button type="button" className="secondary-button small-btn" onClick={openAll}>
              <Eye size={13} /> Open all notes
            </button>
          ) : (
            <button type="button" className="secondary-button small-btn" onClick={closeAll}>
              <EyeOff size={13} /> Fold all back
            </button>
          )}
        </div>
      </div>

      {/* Love Notes Grid */}
      <div className="love-notes-grid">
        {loveNotes.map((note) => {
          const isOpen = openedSet.has(note.id);

          return (
            <article
              key={note.id}
              className={`note-card ${isOpen ? "note-revealed" : "note-sealed"}`}
              onClick={() => toggleNote(note.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleNote(note.id)}
              aria-expanded={isOpen}
            >
              <div className="note-card-inner">
                {/* Header with badge */}
                <div className="note-top">
                  <span className="note-badge">{note.badge}</span>
                  <span className="note-icon-seal">
                    {isOpen ? (
                      <MailOpen size={16} color="#d95d88" />
                    ) : (
                      <Mail size={16} color="#b27f94" />
                    )}
                  </span>
                </div>

                <h3 className="note-title">{note.title}</h3>
                <span className="note-subtitle">{note.subtitle}</span>

                {/* Secret message content */}
                <div className="note-message-box">
                  {isOpen ? (
                    <p className="note-text animate-in">"{note.message}"</p>
                  ) : (
                    <div className="note-sealed-hint">
                      <Heart size={20} className="pulse-heart" />
                      <span>Tap to reveal reason</span>
                    </div>
                  )}
                </div>

                {isOpen && (
                  <div className="note-stamp">
                    <span>100% TRUE ♡</span>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Completion milestone message */}
      {openedCount === loveNotes.length && (
        <div className="all-opened-banner animate-in">
          <Sparkles size={18} />
          <span>
            You opened all 12 reasons! And honestly? I could write 12,000 more and still not be finished loving you. 🥹💗
          </span>
        </div>
      )}

      {/* Slide footer action */}
      <div className="slide-footer-action">
        <button className="primary-button" onClick={onNextSlide}>
          Next: Catch Some Hearts Mini-Game <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
