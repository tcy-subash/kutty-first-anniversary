import { useState } from "react";
import {
  ArrowRight, Camera, CheckCircle2, Coffee, Film,
  Gift, Heart, PenTool, RotateCcw, Sparkles, Sunset, Utensils
} from "lucide-react";
import { dateIdeas } from "../data/dateIdeas.js";
import { soundEffects } from "../utils/audioEffects.js";

// Helper map for lucide icon rendering
const iconMap = {
  Coffee: Coffee,
  Sunset: Sunset,
  Film: Film,
  Camera: Camera,
  Utensils: Utensils,
  PenTool: PenTool,
  Gift: Gift,
  Sparkles: Sparkles,
};

export default function NextMemoryPicker({ onNextSlide }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedIdea = dateIdeas.find((idea) => idea.id === selectedId);

  function handleSelect(id) {
    setSelectedId(id);
    soundEffects.playSuccess();
  }

  function handleReset() {
    setSelectedId(null);
    soundEffects.playPop();
  }

  return (
    <div className="content-slide next-memory-container">
      <div className="eyebrow">
        <Sparkles size={14} /> CHAPTER TWO PLANNING
      </div>
      <h2>
        Choose Our<br />
        <em>Next Memory.</em> 🌷
      </h2>
      <p className="section-intro">
        Pick whichever activity your heart desires most right now. Consider this a blank check for your boyfriend!
      </p>

      {/* Date Idea Cards Grid */}
      <div className="date-ideas-grid">
        {dateIdeas.map((idea) => {
          const IconComponent = iconMap[idea.icon] || Heart;
          const isChosen = selectedId === idea.id;

          return (
            <button
              key={idea.id}
              type="button"
              className={`date-idea-card ${isChosen ? "chosen-card" : ""}`}
              onClick={() => handleSelect(idea.id)}
            >
              <div className="idea-card-top">
                <span className="idea-badge">{idea.badge}</span>
                <span className="idea-icon-circle">
                  <IconComponent size={18} />
                </span>
              </div>

              <h3 className="idea-title">{idea.title}</h3>
              <p className="idea-description">{idea.description}</p>

              <div className="idea-select-indicator">
                {isChosen ? (
                  <span className="chosen-pill">
                    <CheckCircle2 size={13} /> Kutty's Choice!
                  </span>
                ) : (
                  <span className="tap-hint">Tap to choose</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Adventure Reveal Box */}
      {selectedIdea && (
        <section className="chosen-adventure-box animate-in">
          <div className="adventure-header">
            <Heart size={16} fill="currentColor" />
            <span>OUR NEXT OFFICIAL ADVENTURE</span>
          </div>

          <h4 className="adventure-title">"{selectedIdea.title}"</h4>
          <p className="adventure-response">{selectedIdea.response}</p>

          <p className="adventure-disclaimer">
            *Official boyfriend contract: not automatically booked by this website, but immediately promised in spirit! 💖
          </p>

          <div className="adventure-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleReset}
            >
              <RotateCcw size={14} /> Choose a different date
            </button>
          </div>
        </section>
      )}

      {/* Proceed Button */}
      <div className="slide-footer-action">
        <button className="primary-button" onClick={onNextSlide}>
          Next: Reasons I Love My Kutty <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
