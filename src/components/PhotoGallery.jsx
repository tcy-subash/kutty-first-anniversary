import { useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Camera, ChevronLeft, ChevronRight,
  Filter, Heart, ImagePlus, LockKeyhole, Maximize2, Play, Sparkles, X
} from "lucide-react";
import { soundEffects } from "../utils/audioEffects.js";

export default function PhotoGallery({
  media,
  onUploadMedia,
  onRemoveTemporary,
  onNextSlide,
}) {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const fileInputRef = useRef(null);

  // Filter items
  const filteredMedia = useMemo(() => {
    if (filter === "all") return media;
    if (filter === "photos") return media.filter((m) => m.type !== "video");
    if (filter === "videos") return media.filter((m) => m.type === "video");
    if (filter === "special") return media.filter((m) => m.category === "special" || m.temporary);
    return media;
  }, [media, filter]);

  const activeLightboxItem = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  function openLightbox(index) {
    setLightboxIndex(index);
    soundEffects.playPop();
  }

  function closeLightbox() {
    setLightboxIndex(null);
    soundEffects.playPop();
  }

  function nextLightbox() {
    if (lightboxIndex !== null && filteredMedia.length > 0) {
      setLightboxIndex((prev) => (prev + 1) % filteredMedia.length);
      soundEffects.playPop();
    }
  }

  function prevLightbox() {
    if (lightboxIndex !== null && filteredMedia.length > 0) {
      setLightboxIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
      soundEffects.playPop();
    }
  }

  return (
    <div className="content-slide memories-slide">
      <div className="eyebrow">
        <Camera size={14} /> THE KUTTY CINEMATIC UNIVERSE
      </div>
      <h2>
        Little moments,<br />
        <em>big feelings.</em>
      </h2>
      {/* <p className="section-intro">
        Our personalized scrapbook. Browse through our favourite snapshots, videos, and uploaded memories.
      </p> */}

      {/* Action Row & Filters */}
      <div className="gallery-toolbar">
        <div className="filter-pills" role="tablist" aria-label="Filter media types">
          {[
            { id: "all", label: "All Memories" },
            { id: "photos", label: "Photos" },
            { id: "videos", label: "Videos" },
            { id: "special", label: "Special Moments" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={filter === tab.id}
              className={`filter-btn ${filter === tab.id ? "active" : ""}`}
              onClick={() => {
                setFilter(tab.id);
                soundEffects.playPop();
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="upload-controls">
          <button
            type="button"
            className="secondary-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus size={16} /> Add photos/videos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={onUploadMedia}
          />
        </div>
      </div>

      {/* Counter */}
      <div className="gallery-counter">
        <Sparkles size={13} />
        <span>
          Showing {filteredMedia.length} of {media.length} sweet memories
        </span>
      </div>

      {/* Scrapbook Grid */}
      {filteredMedia.length === 0 ? (
        <div className="gallery-empty-state animate-in">
          <Heart size={44} strokeWidth={1.2} />
          <h3>No memories in this view yet!</h3>
          <p>Tap "Add photos/videos" to preview photos right here in your browser.</p>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setFilter("all")}
          >
            Reset filter to All
          </button>
        </div>
      ) : (
        <div className="scrapbook-grid">
          {filteredMedia.map((item, index) => {
            const rotationDegree = item.rotation || (index % 2 === 0 ? "-1.5deg" : "1.8deg");
            return (
              <article
                key={`${item.src}-${index}`}
                className="scrapbook-card animate-in"
                style={{ transform: `rotate(${rotationDegree})` }}
              >
                <div className="scrapbook-media-wrap">
                  {item.type === "video" ? (
                    <div className="scrapbook-video">
                      <video src={item.src} controls playsInline preload="metadata" />
                    </div>
                  ) : (
                    <div
                      className="scrapbook-image"
                      onClick={() => openLightbox(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && openLightbox(index)}
                      title="Click to expand full screen"
                    >
                      <img
                        src={item.src}
                        alt={item.caption || `Memory ${index + 1}`}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.add("show-fallback");
                        }}
                      />
                      <div className="memory-fallback">
                        <Heart size={28} />
                        <span>Add photo in public/media</span>
                      </div>
                      <div className="media-zoom-overlay">
                        <Maximize2 size={16} />
                        <span>Enlarge</span>
                      </div>
                    </div>
                  )}

                  {/* Badges for Temporary vs Permanent */}
                  <div className="media-status-badge">
                    {item.temporary ? (
                      <span className="badge-temp">Local Preview</span>
                    ) : (
                      <span className="badge-perm">Permanent</span>
                    )}
                  </div>

                  {item.temporary && (
                    <button
                      type="button"
                      className="remove-memory"
                      onClick={() => onRemoveTemporary(index)}
                      aria-label="Remove uploaded memory"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="scrapbook-info">
                  <div className="scrapbook-meta">
                    <span className="scrapbook-idx">
                      MEMORY {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.date && <span className="scrapbook-date">{item.date}</span>}
                  </div>
                  {item.location && (
                    <span className="scrapbook-location">📍 {item.location}</span>
                  )}
                  <p className="scrapbook-caption">{item.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Explanatory footnote */}
      <p className="upload-footnote">
        <LockKeyhole size={13} /> Browser uploads stay local to this device. For permanent media visible to everyone, add files to <code>public/media</code> and edit <code>src/content.js</code>.
      </p>

      {/* Proceed to Next Slide Button */}
      <div className="slide-footer-action">
        <button className="primary-button" onClick={onNextSlide}>
          Next: Catch Some Hearts Mini-Game <ArrowRight size={16} />
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && activeLightboxItem && (
        <div
          className="lightbox-overlay animate-in"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div
            className="lightbox-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="lightbox-content">
              {activeLightboxItem.type === "video" ? (
                <video
                  src={activeLightboxItem.src}
                  controls
                  autoPlay
                  playsInline
                  className="lightbox-media"
                />
              ) : (
                <img
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.caption || "Enlarged Memory"}
                  className="lightbox-media"
                />
              )}
            </div>

            <div className="lightbox-footer">
              <div className="lightbox-details">
                <span className="lightbox-counter">
                  Memory {lightboxIndex + 1} of {filteredMedia.length}
                </span>
                {activeLightboxItem.date && (
                  <span className="lightbox-date"> • {activeLightboxItem.date}</span>
                )}
                {activeLightboxItem.location && (
                  <span className="lightbox-loc"> • 📍 {activeLightboxItem.location}</span>
                )}
                <p className="lightbox-caption">{activeLightboxItem.caption}</p>
              </div>

              {filteredMedia.length > 1 && (
                <div className="lightbox-nav">
                  <button
                    type="button"
                    className="lightbox-nav-btn"
                    onClick={prevLightbox}
                    aria-label="Previous memory"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    className="lightbox-nav-btn"
                    onClick={nextLightbox}
                    aria-label="Next memory"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
