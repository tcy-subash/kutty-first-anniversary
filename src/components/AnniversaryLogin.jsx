import { useState, useRef, useEffect, useId, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Calendar, Heart, Lock, Sparkles, CheckCircle2, ShieldAlert
} from "lucide-react";
import {
  ANNIVERSARY_DATE,
  validateAndFormatName,
  WRONG_DATE_MESSAGES,
  DATE_HINTS,
  ANGRY_CHILD_GIF_URL,
} from "../data/authConfig.js";
import { soundEffects } from "../utils/audioEffects.js";

const TOTAL_DODGES = 7; // Needs 7 chases to be caught (satisfies 6-8 range)

const CHASE_MESSAGES = [
  "HEHE, TOO SLOW! 😂",
  "YOU CAN'T CATCH LOVE THAT EASILY 💨",
  "MISS ME AGAIN, KUTTY 😭",
  "BROOO, ALMOST! 💀",
  "OKAY, THAT WAS CLOSE 👀",
  "CATCH ME IF YOU CAN, BABY 💗",
];

export default function AnniversaryLogin({ onLoginSuccess }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [dodgeCount, setDodgeCount] = useState(0);
  const [chaseMessage, setChaseMessage] = useState("");
  const [errorState, setErrorState] = useState(null); // { type: 'name' | 'date', message: string, hint?: string }
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [gifFailed, setGifFailed] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  // Screen heart position { x, y } in viewport coordinates
  const [heartPos, setHeartPos] = useState(null);
  const [heartAngle, setHeartAngle] = useState(0);
  const [lastZone, setLastZone] = useState(-1);
  const [sparkleKey, setSparkleKey] = useState(0);

  const cardRef = useRef(null);
  const initialHeartRef = useRef(null);
  const nameInputId = useId();
  const dateInputId = useId();

  const isCaught = dodgeCount >= TOTAL_DODGES;
  const isEscaped = dodgeCount > 0;

  // Format date preview for human readability
  const formattedDatePreview = date
    ? (() => {
      try {
        const [y, m, d] = date.split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        return dt.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return date;
      }
    })()
    : "";

  // Helper to calculate a safe, unpredictable random position across the viewport
  const getRandomViewportPosition = useCallback(() => {
    if (typeof window === "undefined") return { x: 100, y: 100 };

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const heartWidth = 84;
    const heartHeight = 84;
    const margin = 20;

    const minX = margin;
    const maxX = Math.max(margin, vw - heartWidth - margin);
    const minY = margin;
    const maxY = Math.max(margin, vh - heartHeight - margin);

    const cardRect = cardRef.current?.getBoundingClientRect();

    // 8 distinct zones across the entire screen:
    // 0: Top-Left, 1: Top-Center, 2: Top-Right
    // 3: Mid-Right, 4: Bottom-Right, 5: Bottom-Center
    // 6: Bottom-Left, 7: Mid-Left
    const zones = [
      { xRange: [minX, minX + (maxX - minX) * 0.28], yRange: [minY, minY + (maxY - minY) * 0.28] },
      { xRange: [minX + (maxX - minX) * 0.35, minX + (maxX - minX) * 0.65], yRange: [minY, minY + (maxY - minY) * 0.2] },
      { xRange: [maxX - (maxX - minX) * 0.28, maxX], yRange: [minY, minY + (maxY - minY) * 0.28] },
      { xRange: [maxX - (maxX - minX) * 0.25, maxX], yRange: [minY + (maxY - minY) * 0.35, minY + (maxY - minY) * 0.65] },
      { xRange: [maxX - (maxX - minX) * 0.28, maxX], yRange: [maxY - (maxY - minY) * 0.28, maxY] },
      { xRange: [minX + (maxX - minX) * 0.35, minX + (maxX - minX) * 0.65], yRange: [maxY - (maxY - minY) * 0.2, maxY] },
      { xRange: [minX, minX + (maxX - minX) * 0.28], yRange: [maxY - (maxY - minY) * 0.28, maxY] },
      { xRange: [minX, minX + (maxX - minX) * 0.25], yRange: [minY + (maxY - minY) * 0.35, minY + (maxY - minY) * 0.65] },
    ];

    // Pick a zone different from the previous one
    let targetZone = Math.floor(Math.random() * zones.length);
    if (targetZone === lastZone) {
      targetZone = (targetZone + 2 + Math.floor(Math.random() * 3)) % zones.length;
    }
    setLastZone(targetZone);

    const zone = zones[targetZone];
    let newX = zone.xRange[0] + Math.random() * (zone.xRange[1] - zone.xRange[0]);
    let newY = zone.yRange[0] + Math.random() * (zone.yRange[1] - zone.yRange[0]);

    // Avoid directly covering the input boxes inside the card
    if (cardRect) {
      const inputsArea = {
        top: cardRect.top + 80,
        bottom: cardRect.top + 280,
        left: cardRect.left + 20,
        right: cardRect.right - 20,
      };

      const overlapsInputs =
        newX + heartWidth > inputsArea.left &&
        newX < inputsArea.right &&
        newY + heartHeight > inputsArea.top &&
        newY < inputsArea.bottom;

      if (overlapsInputs) {
        // Push safely to one side of the card
        if (newX < vw / 2) {
          newX = Math.max(minX, cardRect.left - heartWidth - 15);
        } else {
          newX = Math.min(maxX, cardRect.right + 15);
        }
      }
    }

    return {
      x: Math.round(Math.max(minX, Math.min(newX, maxX))),
      y: Math.round(Math.max(minY, Math.min(newY, maxY))),
    };
  }, [lastZone]);

  // Keep heart safely within screen if window resizes
  useEffect(() => {
    function handleResize() {
      if (!heartPos) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const heartSize = 84;
      const margin = 20;

      setHeartPos((prev) => {
        if (!prev) return null;
        return {
          x: Math.max(margin, Math.min(prev.x, vw - heartSize - margin)),
          y: Math.max(margin, Math.min(prev.y, vh - heartSize - margin)),
        };
      });
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [heartPos]);

  // Escape & Dodge handler
  function triggerDodge(e) {
    if (e) {
      // Prevent scrolling or unwanted default gestures on mobile
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
    }

    if (isCaught || isSuccess) return;

    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);
    soundEffects.playPop();
    setSparkleKey((k) => k + 1);

    // Pick a new unpredictable screen position
    const nextPos = getRandomViewportPosition();
    setHeartPos(nextPos);
    setHeartAngle((Math.random() - 0.5) * 36); // Playful tilt angle

    // Rotate tease messages
    const msg = CHASE_MESSAGES[Math.floor(Math.random() * CHASE_MESSAGES.length)];
    setChaseMessage(msg);

    // If reached catch limit
    if (nextCount >= TOTAL_DODGES) {
      soundEffects.playSparkle();
    }
  }

  // Handle successful click on the caught heart
  function handleHeartClick(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // If still in dodging phase, dodge!
    if (!isCaught) {
      triggerDodge(e);
      return;
    }

    // When caught, execute login validation!
    validateCredentials();
  }

  function validateCredentials() {
    // 1. Validate Name
    const nameCheck = validateAndFormatName(name);

    if (nameCheck.isBlank) {
      triggerError("name", "Excuse me?! Yaaaruuu phaa neee ? 😂");
      return;
    }

    if (!nameCheck.valid) {
      triggerError("name", "Name not found in the love database. Yaaaaar rhaaaa Neeee");
      return;
    }

    // 2. Validate Date
    if (!date) {
      triggerError("date", "You forgot the date too?! The heart is disappointed 💔");
      return;
    }

    // Compare date string "YYYY-MM-DD"
    if (date.trim() !== ANNIVERSARY_DATE.trim()) {
      const randomMsg =
        WRONG_DATE_MESSAGES[Math.floor(Math.random() * WRONG_DATE_MESSAGES.length)];
      const randomHint =
        DATE_HINTS[Math.floor(Math.random() * DATE_HINTS.length)];
      triggerError("date", randomMsg, randomHint);
      return;
    }

    // 3. Success!
    setErrorState(null);
    setIsSuccess(true);
    setShowBurst(true);
    soundEffects.playSuccess();

    setWelcomeText(`Vaaa Thangooooooo Vaaa Thangoooooo 🤭, ${nameCheck.formatted} 💗`);

    // Smooth transition into existing website after animation
    setTimeout(() => {
      onLoginSuccess(nameCheck.formatted);
    }, 1400);
  }

  function triggerError(type, message, hint) {
    setIsShaking(true);
    soundEffects.playPop();
    setErrorState({ type, message, hint });

    setTimeout(() => {
      setIsShaking(false);
    }, 650);
  }

  // Bypass for keyboard accessibility (<kbd>Space</kbd> or <kbd>Enter</kbd>)
  function handleKeyboardBypass() {
    setDodgeCount(TOTAL_DODGES);
    soundEffects.playSparkle();
    validateCredentials();
  }

  return (
    <div className="login-backdrop">
      {/* Floating background ambient elements */}
      <div className="login-ambient login-ambient-one" />
      <div className="login-ambient login-ambient-two" />

      {/* Floating Hearts in Sky */}
      <div className="login-floating-hearts" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="floating-heart-particle"
            style={{
              left: `${(i * 31 + 9) % 100}%`,
              animationDelay: `${(i % 5) * -1.5}s`,
              animationDuration: `${9 + (i % 4) * 2.5}s`,
              fontSize: `${13 + (i % 3) * 6}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Success Heart Burst */}
      {showBurst && (
        <div className="login-burst-overlay" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="burst-particle"
              style={{
                "--angle": `${(i * 360) / 22}deg`,
                "--distance": `${95 + (i % 4) * 35}px`,
                "--delay": `${(i % 6) * 0.04}s`,
              }}
            >
              {i % 2 === 0 ? "♥" : "✦"}
            </span>
          ))}
        </div>
      )}

      {/* Main Login Card */}
      <main
        ref={cardRef}
        className={`login-card ${isShaking ? "card-shake" : ""} ${isSuccess ? "card-success" : ""
          } animate-in`}
        role="dialog"
        aria-labelledby="login-heading"
      >
        <div className="login-card-header">
          <div className="login-badge">
            <Lock size={12} />
            <span>TOP SECRET ACCESS</span>
          </div>
          <h1 id="login-heading">
            A Little Secret<br />
            <em>Gate 💌</em>
          </h1>
          <p className="login-subtitle">
            Only two silly people are allowed in here…
          </p>
        </div>

        {/* Input Fields Form */}
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            validateCredentials();
          }}
        >
          {/* Name Field */}
          <div className="login-field-group">
            <label htmlFor={nameInputId} className="login-label">
              <span>Who goes there?</span>
              <small></small>
            </label>
            <div className="login-input-wrap">
              <input
                id={nameInputId}
                type="text"
                className={`login-input ${errorState?.type === "name" ? "input-error" : ""
                  }`}
                placeholder="..... Me & You 🙃 ......"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorState?.type === "name") setErrorState(null);
                }}
                disabled={isSuccess}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Anniversary Date Field */}
          <div className="login-field-group">
            <label htmlFor={dateInputId} className="login-label">
              <span>Secret Password</span>
              <small>You know 😋</small>
            </label>
            <div className="login-input-wrap">
              <div className="date-input-container">
                <input
                  id={dateInputId}
                  type="date"
                  className={`login-input login-date-input ${errorState?.type === "date" ? "input-error" : ""
                    }`}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (errorState?.type === "date") setErrorState(null);
                  }}
                  disabled={isSuccess}
                />
                <Calendar size={18} className="date-field-icon" />
              </div>
            </div>
            {formattedDatePreview && (
              <span className="date-pretty-preview">
                📅 {formattedDatePreview}
              </span>
            )}
          </div>

          {/* Chase Status Board on the Card */}
          <div className="chase-status-board">
            {!isEscaped ? (
              /* Initial Docked State */
              <div className="docked-heart-zone" ref={initialHeartRef}>
                <button
                  type="button"
                  className="mischievous-heart-btn initial-heart-btn"
                  onClick={triggerDodge}
                  onPointerEnter={triggerDodge}
                  onTouchStart={triggerDodge}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleKeyboardBypass();
                    }
                  }}
                  aria-label="Catch my heart to enter"
                >
                  <Heart
                    size={56}
                    fill="currentColor"
                    strokeWidth={1}
                    className="heart-icon-svg"
                  />
                </button>
                <span className="heart-caption">
                  Catch Me Mavaleyyy💘
                </span>
                <small className="chase-hint">
                  ( You Must be Fast Bruhhh 🏃‍♀️💨)
                </small>
              </div>
            ) : isCaught ? (
              /* Caught State */
              <div className="caught-status-banner animate-in">
                <div className="caught-tag">
                  <Sparkles size={15} /> YOU CAUGHT IT!
                </div>
                <p className="caught-prompt">
                  “Okay okay, you caught my heart! Now prove it's really you 💘”
                </p>
                <button
                  type="button"
                  className="primary-button enter-site-btn"
                  onClick={() => validateCredentials()}
                >
                  Come Inside <Heart size={16} fill="currentColor" />
                </button>
              </div>
            ) : (
              /* Active Chase State */
              <div className="active-chase-box animate-in">
                <div className="chase-counter-bar">
                  <span className="chase-badge">
                    🏃‍♀️ CHASE IN PROGRESS
                  </span>
                  <span className="chase-count-text">
                    Dodged: <strong>{dodgeCount}</strong> / {TOTAL_DODGES}
                  </span>
                </div>

                <div className="chase-live-message animate-in" key={dodgeCount}>
                  <p>{chaseMessage || "Catch me if you can, baby 💗"}</p>
                </div>

                <p className="chase-sub-hint">
                  Look around the screen! Tap the flying heart before it escapes! 👀
                </p>

                <button
                  type="button"
                  className="text-button bypass-link"
                  onClick={handleKeyboardBypass}
                >
                  Too fast? Click here to freeze the heart ❄️
                </button>
              </div>
            )}
          </div>
        </form>

        {/* Wrong-date / Error Reactions Box */}
        {errorState && !isSuccess && (
          <div className="login-error-card animate-in" role="alert">
            <div className="error-header">
              <ShieldAlert size={16} className="error-icon" />
              <strong>{errorState.message}</strong>
            </div>

            {errorState.hint && (
              <p className="error-hint-text">
                💡 {errorState.hint}
              </p>
            )}

            {/* Cute Angry-Child GIF / Illustration Reaction for Date Errors */}
            {errorState.type === "date" && (
              <div className="angry-child-container">
                {!gifFailed ? (
                  <img
                    src={ANGRY_CHILD_GIF_URL}
                    alt="Cute angry baby pouting dramatically"
                    className="angry-child-gif"
                    onError={() => setGifFailed(true)}
                    loading="lazy"
                  />
                ) : (
                  /* Adorable SVG/CSS fallback illustration if external GIF fails */
                  <div className="angry-child-illustration">
                    <div className="angry-baby-face">
                      <div className="baby-eyes">
                        <span>&gt;</span>
                        <span>&lt;</span>
                      </div>
                      <div className="baby-cheeks">
                        <span className="cheek left" />
                        <span className="cheek right" />
                      </div>
                      <div className="baby-pout">3</div>
                    </div>
                    <div className="angry-fume">💢</div>
                    <small>Madam is extremely offended</small>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Success Announcement */}
        {isSuccess && (
          <div className="login-success-banner animate-in">
            <CheckCircle2 size={20} className="success-check-icon" />
            <div>
              <p className="success-quote">
                “Identity confirmed. Love level: dangerously high 💗”
              </p>
              <h2 className="success-welcome">{welcomeText}</h2>
            </div>
          </div>
        )}
      </main>

      {/* FULL-SCREEN ESCAPED HEART PORTAL (Attached to document.body) */}
      {isEscaped &&
        !isSuccess &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`fullscreen-heart-portal ${isCaught ? "heart-is-caught" : "heart-is-flying"}`}
            style={{
              position: "fixed",
              left: `${heartPos?.x ?? 80}px`,
              top: `${heartPos?.y ?? 80}px`,
              zIndex: 99999,
              transform: `rotate(${heartAngle}deg)`,
              transition: isCaught
                ? "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "all 0.38s cubic-bezier(0.25, 1.4, 0.5, 1)",
            }}
          >
            {/* Sparkle puff animation when dodging */}
            <span key={sparkleKey} className="dodge-puff-sparkle" aria-hidden="true">
              ✨
            </span>

            <button
              type="button"
              className={`escaped-screen-heart-btn ${isCaught ? "caught-glow" : "flying-bob"}`}
              onClick={handleHeartClick}
              onPointerEnter={triggerDodge}
              onTouchStart={triggerDodge}
              aria-label={
                isCaught
                  ? "You caught my heart! Tap to enter"
                  : "Catch my heart to enter"
              }
            >
              <Heart
                size={isCaught ? 68 : 58}
                fill="currentColor"
                strokeWidth={1}
                className="heart-icon-svg"
              />
              {isCaught && (
                <span className="caught-halo-star">
                  ⭐
                </span>
              )}
            </button>

            {/* Teasing Bubble or Caught Badge floating near the screen heart */}
            <div className="heart-floating-bubble animate-in">
              {isCaught ? (
                <span className="caught-bubble-text">
                  Ulla Vaanga 🧡🤍
                </span>
              ) : (
                <span className="chasing-bubble-text">
                  Pudi Pakalaam🏃‍♀️
                </span>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
