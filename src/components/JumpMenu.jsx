import { Heart, Sparkles, X } from "lucide-react";

export default function JumpMenu({
  isOpen,
  onClose,
  slides,
  activeSlideIndex,
  onSelectSlide,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="jump-menu-backdrop animate-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Jump to a memory menu"
    >
      <div
        className="jump-menu-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="jump-menu-header">
          <div className="jump-title-wrap">
            <Sparkles size={16} />
            <h3>Jump to a Memory</h3>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <p className="jump-menu-subtitle">
          Pick any chapter of our first anniversary story to revisit instantly:
        </p>

        <div className="jump-list">
          {slides.map((s, idx) => {
            const isActive = idx === activeSlideIndex;
            return (
              <button
                key={s.id}
                type="button"
                className={`jump-item ${isActive ? "active-jump" : ""}`}
                onClick={() => {
                  onSelectSlide(idx);
                  onClose();
                }}
              >
                <div className="jump-item-left">
                  <span className="jump-number">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="jump-text">
                    <strong>{s.title}</strong>
                    <small>{s.label}</small>
                  </div>
                </div>
                {isActive ? (
                  <span className="current-badge">Here</span>
                ) : (
                  <Heart size={14} className="jump-heart" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
