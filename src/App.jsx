import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, ChevronRight, Compass, Gamepad2, Heart, Lock,
  RotateCcw, Sparkles, Volume2, VolumeX
} from "lucide-react";
import { memories as starterMemories, relationshipStats, loveLetter } from "./content.js";
import RelationshipTimeline from "./components/RelationshipTimeline.jsx";
// import FirstKissMilestone from "./components/FirstKissMilestone.jsx";
import PhotoGallery from "./components/PhotoGallery.jsx";
import QuizGame from "./components/QuizGame.jsx";
import WhoRemembersBetter from "./components/WhoRemembersBetter.jsx";
// import NextMemoryPicker from "./components/NextMemoryPicker.jsx";
// import ReasonsLoveNotes from "./components/ReasonsLoveNotes.jsx";
import JumpMenu from "./components/JumpMenu.jsx";
import AnniversaryLogin from "./components/AnniversaryLogin.jsx";
import { soundEffects } from "./utils/audioEffects.js";

const slides = [
  { id: "welcome", label: "The beginning", title: "Welcome Surprise" },
  { id: "roast", label: "Official report", title: "Relationship Roast" },
  { id: "timeline", label: "Our story", title: "Love Story Timeline" },
  // { id: "first-kiss", label: "First kiss", title: "Our First Kiss 💋" },
  { id: "memories", label: "Photo scrapbook", title: "Memories Gallery" },
  // { id: "quiz", label: "Couple quiz", title: "How Well Do You Know Us?" },
  // { id: "remembers-better", label: "Showdown", title: "Who Remembers Better?" },
  // { id: "next-memory", label: "Next date", title: "Choose Our Next Memory" },
  // { id: "reasons", label: "Love notes", title: "Reasons I Love You" },
  { id: "game", label: "Catch hearts", title: "Heart-Catching Game" },
  { id: "letter", label: "Love letter", title: "Final Love Letter" },
];

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 7) % 100}%`,
  delay: `${(i % 6) * -1.7}s`,
  duration: `${10 + (i % 7) * 2}s`,
  size: `${12 + (i % 4) * 7}px`,
}));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem("kutty_auth") === "true";
    } catch {
      return false;
    }
  });
  const [visitorName, setVisitorName] = useState(() => {
    try {
      return sessionStorage.getItem("kutty_user") || "Karthi";
    } catch {
      return "Karthi";
    }
  });
  const [active, setActive] = useState(0);
  const [activeMiniGame, setActiveMiniGame] = useState(null); // null | "quiz" | "remembers-better"
  const [showOtherGames, setShowOtherGames] = useState(false);
  const [media, setMedia] = useState(starterMemories);
  const [letterOpen, setLetterOpen] = useState(false);
  const [caught, setCaught] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTransitionLoader, setShowTransitionLoader] = useState(false);

  function handleExploreLoveStory() {
    soundEffects.playSparkle();
    setShowTransitionLoader(true);
    setTimeout(() => {
      next();
      setTimeout(() => {
        setShowTransitionLoader(false);
      }, 350);
    }, 750);
  }

  const touchStartRef = useRef(null);
  const activeSlide = slides[active];

  // Reset active mini-game & games hub if user changes slide
  useEffect(() => {
    setActiveMiniGame(null);
    setShowOtherGames(false);
  }, [active]);

  // Sync sound effects enabled state
  useEffect(() => {
    soundEffects.setEnabled(soundOn);
  }, [soundOn]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (event) => {
      // Don't intercept arrows when typing in input
      if (["INPUT", "TEXTAREA"].includes(event.target.tagName)) return;

      if (event.key === "ArrowRight") {
        setActive((n) => Math.min(n + 1, slides.length - 1));
      }
      if (event.key === "ArrowLeft") {
        setActive((n) => Math.max(n - 1, 0));
      }
      if (event.key === "Escape") {
        setLetterOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 3800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const progress = useMemo(() => ((active + 1) / slides.length) * 100, [active]);

  function next() {
    setActive((n) => Math.min(n + 1, slides.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previous() {
    setActive((n) => Math.max(n - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpToSlide(index) {
    setActive(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Mobile swipe gestures (clean and safe)
  function handleTouchStart(e) {
    const targetTag = e.target.tagName.toLowerCase();
    const isInteractive =
      ["button", "input", "video", "select", "a"].includes(targetTag) ||
      e.target.closest("button") ||
      e.target.closest(".lightbox-overlay") ||
      e.target.closest(".quiz-options-grid") ||
      e.target.closest(".floating-game-heart");

    if (isInteractive) {
      touchStartRef.current = null;
      return;
    }
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(e) {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const diffX = touchStartRef.current.x - touch.clientX;
    const diffY = touchStartRef.current.y - touch.clientY;

    // Must be predominantly horizontal swipe > 55px
    if (Math.abs(diffX) > 55 && Math.abs(diffX) > Math.abs(diffY) * 1.8) {
      if (diffX > 0) {
        next();
      } else {
        previous();
      }
    }
    touchStartRef.current = null;
  }

  function uploadMedia(event) {
    const files = Array.from(event.target.files ?? []);
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
    if (!validFiles.length) {
      setNotice("Pick image or video files, Kutty's unofficial media department. 📸");
      return;
    }
    const added = validFiles.map((file, i) => ({
      id: `local-${Date.now()}-${i}`,
      type: file.type.startsWith("video/") ? "video" : "image",
      src: URL.createObjectURL(file),
      caption: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
      date: "Recent Upload",
      category: file.type.startsWith("video/") ? "videos" : "photos",
      temporary: true,
    }));
    setMedia((current) => [...current, ...added]);
    setNotice(
      `${added.length} memory ${added.length === 1 ? "added" : "memories added"}! Previewed on this browser. 💗`
    );
    event.target.value = "";
  }

  function removeTemporary(itemIndex) {
    setMedia((current) => {
      const item = current[itemIndex];
      if (item?.temporary) URL.revokeObjectURL(item.src);
      return current.filter((_, index) => index !== itemIndex);
    });
    setNotice("Removed previewed memory.");
  }

  function catchHeart() {
    setCaught((n) => n + 1);
    soundEffects.playPop();
    if (caught + 1 >= 4) {
      soundEffects.playSuccess();
      setNotice("! : Vaa Machaaan Vaaa Machaaan ");
    }
  }

  function toggleSound() {
    const nextState = !soundOn;
    setSoundOn(nextState);
    if (nextState) {
      soundEffects.setEnabled(true);
      soundEffects.playPop();
      setNotice("Sound effects turned on! Cute audio enabled. 🎵");
    } else {
      soundEffects.setEnabled(false);
      setNotice("Sound effects muted.");
    }
  }

  if (!isAuthenticated) {
    return (
      <AnniversaryLogin
        onLoginSuccess={(userName) => {
          try {
            sessionStorage.setItem("kutty_auth", "true");
            sessionStorage.setItem("kutty_user", userName);
          } catch { }
          setVisitorName(userName);
          setIsAuthenticated(true);
          setNotice(`Welcome back, ${userName}! 💗`);
        }}
      />
    );
  }

  return (
    <main
      className="app-shell"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="heart-sky" aria-hidden="true">
        {floatingHearts.map((heart, i) => (
          <span
            key={i}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
              fontSize: heart.size,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActive(0);
          }}
        >
          <span className="brand-mark">
            <Heart size={17} fill="currentColor" />
          </span>
          <span>For You Cheloooom 😚😋</span>
        </a>
        <div className="topbar-right">
          <span className="year-pill">
            <Sparkles size={13} /> YEAR ONE
          </span>

          <button
            className="icon-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open jump to memory menu"
            title="Jump to a memory"
          >
            <Compass size={18} />
          </button>

          <button
            className="icon-button"
            onClick={() => {
              setActive(0);
              setNotice("Restarted from the beginning! 💗");
            }}
            aria-label="Restart experience"
            title="Replay from start"
          >
            <RotateCcw size={16} />
          </button>

          <button
            className="icon-button"
            onClick={() => {
              try {
                sessionStorage.removeItem("kutty_auth");
              } catch { }
              setIsAuthenticated(false);
              setNotice("Secret gate locked! 💌");
            }}
            aria-label="Lock secret gate"
            title="Lock secret gate"
          >
            <Lock size={16} />
          </button>

          <button
            className="icon-button"
            onClick={toggleSound}
            aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
            title={soundOn ? "Mute sounds" : "Enable cute sounds"}
          >
            {soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>

      {/* Slide Progress Indicator */}
      <div
        className="progress-wrap"
        aria-label={`Slide ${active + 1} of ${slides.length}: ${activeSlide.title}`}
      >
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span>
          {String(active + 1).padStart(2, "0")}{" "}
          <span className="muted">/ {String(slides.length).padStart(2, "0")}</span>
        </span>
      </div>

      <section className="stage" id="top">
        <div key={activeSlide.id} className="slide animate-in">
          {/* Slide 1: Welcome */}
          {activeSlide.id === "welcome" && (
            <div className="welcome-layout">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="pulse-dot" /> A Sculptured History
                </div>
                <h1>
                  One year of<br />
                  <em>you & me,</em><br />
                  Kutty. <span className="heart-doodle">♡</span>
                </h1>
                <p className="hero-description">
                  Remember :That night when we confessed our love to each other in person will always be special to me. If I could relive one moment, I’d choose that night with you all over again and again ....
                </p>
                <div className="button-row">
                  <button className="primary-button" onClick={next}>
                    Open your surprise <Heart size={17} fill="currentColor" />
                  </button>
                  <span className="tiny-note">C'mon Chelooo</span>
                </div>
                <div className="scroll-hint">
                  <ArrowDown size={15} /> Keep going Gawrl
                </div>
              </div>
              <div className="hero-art">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="photo-polaroid">
                  <img
                    src="/photos/Slide1.jpeg"
                    alt="Our favourite photo"
                    className="photo-polaroid-img"
                  />
                  <div className="polaroid-caption">Love Youuuuuuuuuuu ♡</div>
                </div>
                <div className="sticker sticker-top">1 YEAR!!</div>
                <div className="sticker sticker-bottom">
                  still crushing<br />on you ✿
                </div>
                <span className="sparkle sparkle-a">✦</span>
                <span className="sparkle sparkle-b">✧</span>
              </div>
            </div>
          )}

          {/* Slide 2: Roast Audit */}
          {activeSlide.id === "roast" && (
            <div className="content-slide">
              <div className="eyebrow">Lets Calculate</div>
              <h2>
                Something<br />
                <em>About Us 😅</em>
              </h2>
              <p className="section-intro">
                After 365-ish days of research, this is what the totally unbiased committee (me) found.
              </p>
              <div className="stats-grid">
                {relationshipStats.map((stat, index) => (
                  <article className={`stat-card stat-${index}`} key={stat.label}>
                    <div className="stat-top">
                      <span>CASE FILE 0{index + 1}</span>
                      <Heart size={16} />
                    </div>
                    <strong>{stat.value}</strong>
                    <h3>{stat.label}</h3>
                    <p>{stat.note}</p>
                  </article>
                ))}
              </div>
              <div className="verdict">
                <span>FINAL VERDICT</span>
                <strong>Annoying? Absolutely. My person? Also absolutely. 💗</strong>
              </div>
              <button className="primary-button" onClick={handleExploreLoveStory}>
                Explore our love story <ArrowRight size={17} />
              </button>
            </div>
          )}

          {/* Slide 3: Our Little Love Story Timeline */}
          {activeSlide.id === "timeline" && (
            <RelationshipTimeline
              onNextSlide={next}
            /* onJumpToKiss={() => {
              const kissIndex = slides.findIndex((s) => s.id === "first-kiss");
              if (kissIndex !== -1) setActive(kissIndex);
            }} */
            />
          )}

          {/* Slide: Our First Kiss Special Spotlight (Commented Out) */}
          {/* {activeSlide.id === "first-kiss" && (
            <FirstKissMilestone onNextSlide={next} />
          )} */}

          {/* Slide 4: Photo & Video Scrapbook */}
          {activeSlide.id === "memories" && (
            <PhotoGallery
              media={media}
              onUploadMedia={uploadMedia}
              onRemoveTemporary={removeTemporary}
              onNextSlide={next}
            />
          )}

          {/* Slide: How Well Do You Know Us? Quiz (Moved into Heart Game) */}
          {/* {activeSlide.id === "quiz" && (
            <QuizGame onNextSlide={next} />
          )} */}

          {/* Slide: Who Remembers Better? Challenge (Moved into Heart Game) */}
          {/* {activeSlide.id === "remembers-better" && (
            <WhoRemembersBetter onNextSlide={next} />
          )} */}

          {/* Slide: Choose Our Next Memory (Commented Out) */}
          {/* {activeSlide.id === "next-memory" && (
            <NextMemoryPicker onNextSlide={next} />
          )} */}

          {/* Slide: Reasons I Love My Kutty (Commented Out) */}
          {/* {activeSlide.id === "reasons" && (
            <ReasonsLoveNotes onNextSlide={next} />
          )} */}

          {/* Slide 10: Heart-Catching Game & Other Games Hub */}
          {activeSlide.id === "game" && (
            <>
              {activeMiniGame === null ? (
                <>
                  <div className="game-layout">
                    <div className="game-copy">
                      <div className="eyebrow">A VERY SCIENTIFIC TEST</div>
                      <h2>
                        Catch 4 hearts<br />
                        <em>to unlock a truth.</em>
                      </h2>
                      <p className="section-intro">
                        The truth is that you already stole my heart, but let's make it official for the records.
                      </p>
                      <div className="game-score">
                        <span>HEARTS COLLECTED</span>
                        <strong>
                          {Math.min(caught, 4)} <small>/ 4</small>
                        </strong>
                        <div className="score-dots">
                          {[0, 1, 2, 3].map((n) => (
                            <Heart
                              key={n}
                              size={19}
                              fill={caught > n ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      {caught >= 4 ? (
                        <div className="unlocked-message">
                          <Sparkles size={18} /> Unlocked: Oru Valiya Kandu Puduchutta 🤣
                        </div>
                      ) : (
                        <p className="tiny-note">
                          Tap the floating heart. It's easier than getting you to pick what to eat.
                        </p>
                      )}
                      <div className="button-row">
                        <button className="primary-button" onClick={catchHeart}>
                          {caught >= 4 ? "Steal another one" : "Catch this heart"}{" "}
                          <Heart size={17} fill="currentColor" />
                        </button>
                        <button className="text-button" onClick={() => setCaught(0)}>
                          <RotateCcw size={14} /> Reset count
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className={`wanna-play-chip-btn ${showOtherGames ? "active" : ""}`}
                          onClick={() => {
                            setShowOtherGames((prev) => {
                              const nextVal = !prev;
                              if (nextVal) {
                                soundEffects.playPop();
                                setTimeout(() => {
                                  const hub = document.getElementById("other-games-hub");
                                  if (hub) hub.scrollIntoView({ behavior: "smooth", block: "nearest" });
                                }, 100);
                              }
                              return nextVal;
                            });
                          }}
                        >
                          <Gamepad2 size={15} /> {showOtherGames ? "hide other games ▲" : "wanna play other games? ▼"}
                        </button>
                      </div>

                      <div style={{ marginTop: "20px" }}>
                        <button className="secondary-button" onClick={next}>
                          Next: Final Love Letter <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                    <div className="game-scene">
                      <div className="game-cloud cloud-a" />
                      <div className="game-cloud cloud-b" />
                      <button
                        type="button"
                        className="floating-game-heart"
                        onClick={catchHeart}
                        aria-label="Catch a heart"
                      >
                        <Heart size={72} fill="currentColor" strokeWidth={1} />
                      </button>
                      <div className="game-platform">
                        <span>YOU + ME</span>
                        <Heart size={20} fill="currentColor" />
                      </div>
                      <span className="game-sparkle gs-a">✦</span>
                      <span className="game-sparkle gs-b">✧</span>
                    </div>
                  </div>

                  {/* Section: Wanna play other games (Hidden until clicked) */}
                  {showOtherGames && (
                    <div className="other-games-hub animate-in" id="other-games-hub">
                      <div className="other-games-tag">
                        <Gamepad2 size={14} /> wanna play other games
                      </div>
                      <h3 className="other-games-title">Ready yaaa 😏</h3>
                      {/* <p className="other-games-subtitle">
                        Test our shared memories with a playful trivia quiz, or duel it out to see who remembers our relationship best!
                      </p> */}
                      <div className="other-games-grid">
                        <div className="other-game-card">
                          <div className="og-card-top">
                            <span className="og-card-icon">😂</span>
                            <div>
                              <span className="og-tag">COUPLE TOURNAMENT 😂</span>
                              <h4>How Well Do You Know Us?</h4>
                            </div>
                          </div>
                          <div className="og-card-body">
                            <p>A 100% playful, affectionate test of our shared inside jokes, moments, and relationship lore.</p>
                          </div>
                          <button
                            type="button"
                            className="primary-button og-play-btn"
                            onClick={() => {
                              setActiveMiniGame("quiz");
                              soundEffects.playPop();
                            }}
                          >
                            Play Couple Quiz <ChevronRight size={15} />
                          </button>
                        </div>

                        <div className="other-game-card">
                          <div className="og-card-top">
                            <span className="og-card-icon">🥊</span>
                            <div>
                              <span className="og-tag">COUPLE SHOWDOWN</span>
                              <h4>Who Remembers Better?</h4>
                            </div>
                          </div>
                          <div className="og-card-body">
                            <p>A hilarious two-round memory duel: Kutty plays Round 1, Boyfriend plays Round 2. Who wins?</p>
                          </div>
                          <button
                            type="button"
                            className="primary-button og-play-btn"
                            onClick={() => {
                              setActiveMiniGame("remembers-better");
                              soundEffects.playPop();
                            }}
                          >
                            Play Showdown Duel <ChevronRight size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="mini-game-active-container animate-in">
                  <div className="mini-game-nav-bar">
                    <button
                      type="button"
                      className="back-to-heart-btn"
                      onClick={() => {
                        setActiveMiniGame(null);
                        soundEffects.playPop();
                      }}
                    >
                      <ArrowLeft size={16} /> Back to Catch Hearts
                    </button>
                    <div className="other-games-tag">
                      <Sparkles size={13} /> wanna play other games
                    </div>
                    {activeMiniGame === "quiz" ? (
                      <button
                        type="button"
                        className="switch-game-btn"
                        onClick={() => {
                          setActiveMiniGame("remembers-better");
                          soundEffects.playPop();
                        }}
                      >
                        Play Who Remembers Better? 🥊 <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="switch-game-btn"
                        onClick={() => {
                          setActiveMiniGame("quiz");
                          soundEffects.playPop();
                        }}
                      >
                        Play Couple Quiz 😂 <ChevronRight size={14} />
                      </button>
                    )}
                  </div>

                  <div className="mini-game-viewport">
                    {activeMiniGame === "quiz" && (
                      <QuizGame onNextSlide={() => setActiveMiniGame("remembers-better")} />
                    )}
                    {activeMiniGame === "remembers-better" && (
                      <WhoRemembersBetter onNextSlide={() => setActiveMiniGame(null)} />
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Slide 11: Final Love Letter */}
          {activeSlide.id === "letter" && (
            <div className="letter-layout">
              <div className="letter-decor">
                <span>✿</span>
                <Heart size={45} fill="currentColor" />
                <span>♡</span>
              </div>
              <div className="eyebrow">OKAY, ONE SERIOUS MINUTE</div>
              <h2>
                Jokes aside babeeee,<br />
                <em>Come around </em>
              </h2>
              {/* <p className="section-intro">
                The teasing is mandatory. Loving you is the easiest part.
              </p> */}
              {!letterOpen ? (
                <button
                  type="button"
                  className="letter-envelope"
                  onClick={() => {
                    setLetterOpen(true);
                    soundEffects.playSparkle();
                  }}
                >
                  <div className="envelope-heart">
                    <Heart size={34} fill="currentColor" />
                  </div>
                  <span>For You Chelooom 😚😋</span>
                  <small>tap to open your letter</small>
                  <div className="envelope-flap" />
                </button>
              ) : (
                <article className="love-letter animate-in">
                  <div className="letter-header">
                    <Heart size={17} fill="currentColor" /> TO MY KUTTY, WITH ALL MY HEART
                  </div>
                  {loveLetter.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <div className="letter-signoff">
                    It's You always 😚<Heart size={18} fill="currentColor" />
                  </div>
                </article>
              )}
              {/* <div className="end-note">
                HAPPY FIRST ANNIVERSARY, MY LOVE <span>♡</span>
              </div> */}
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setActive(0);
                  setLetterOpen(false);
                  soundEffects.playPop();
                }}
              >
                <RotateCcw size={14} /> Relive our little story from start
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom slide navigation */}
      <footer className="navigation">
        <button
          type="button"
          className="nav-button"
          onClick={previous}
          disabled={active === 0}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <nav className="slide-dots" aria-label="Choose a slide">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`slide-dot ${index === active ? "active" : ""}`}
              onClick={() => jumpToSlide(index)}
              aria-label={slide.title}
              title={`${index + 1}. ${slide.title}`}
            />
          ))}
        </nav>
        <button
          type="button"
          className="nav-button next-nav"
          onClick={next}
          disabled={active === slides.length - 1}
        >
          Next <ArrowRight size={16} />
        </button>
      </footer>

      {/* Jump to Memory Drawer */}
      <JumpMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        slides={slides}
        activeSlideIndex={active}
        onSelectSlide={jumpToSlide}
      />

      {/* Toast Notification */}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {/* Slide 2 to 3 Transition Loading Screen */}
      {showTransitionLoader && (
        <div className="transition-loader-overlay animate-in" role="status" aria-live="polite">
          <div className="transition-loader-card">
            <img
              src="/photos/Slide2to3.jpg"
              alt="Loading our story..."
              className="transition-loader-img"
            />
            <div className="transition-loader-text">
              <Sparkles size={16} className="loader-sparkle" />
              <span>Loading our story... 💗</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;