import { useState } from "react";
import {
  ArrowRight, Check, ChevronRight, RotateCcw,
  Sparkles, Swords, Trophy, Heart
} from "lucide-react";
import { challengeQuestions, getChallengeVerdict } from "../data/challengeQuestions.js";
import { soundEffects } from "../utils/audioEffects.js";

export default function WhoRemembersBetter({ onNextSlide }) {
  // state: 'intro' | 'round1' | 'round1_complete' | 'round2' | 'finished'
  const [stage, setStage] = useState("intro");
  const [qIndex, setQIndex] = useState(0);

  // Special romantic popup when "Me (🤍)" is clicked
  const [showMePopup, setShowMePopup] = useState(false);

  // Scores
  const [youScore, setYouScore] = useState(0);
  const [meScore, setMeScore] = useState(0);

  // Current question selection in current round
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQ = challengeQuestions[qIndex];

  function startRound1() {
    setStage("round1");
    setQIndex(0);
    setYouScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    soundEffects.playPop();
  }

  function checkIsCorrect(optIdx) {
    if (!currentQ) return false;
    if (typeof currentQ.correctIndex === "number" && optIdx === currentQ.correctIndex) {
      return true;
    }
    if (currentQ.correctAnswer && currentQ.options[optIdx] === currentQ.correctAnswer) {
      return true;
    }
    return false;
  }

  function handleYouAnswer(optIdx) {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);
    if (checkIsCorrect(optIdx)) {
      setYouScore((s) => s + 1);
      soundEffects.playSuccess();
    } else {
      soundEffects.playPop();
    }
  }

  function nextYouQuestion() {
    if (qIndex < challengeQuestions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      soundEffects.playPop();
    } else {
      setStage("round1_complete");
      soundEffects.playSparkle();
    }
  }

  function startRound2() {
    setStage("round2");
    setQIndex(0);
    setMeScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    soundEffects.playPop();
  }

  function handleMeAnswer(optIdx) {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
    setIsAnswered(true);
    if (checkIsCorrect(optIdx)) {
      setMeScore((s) => s + 1);
      soundEffects.playSuccess();
    } else {
      soundEffects.playPop();
    }
  }

  function nextMeQuestion() {
    if (qIndex < challengeQuestions.length - 1) {
      setQIndex((i) => i + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
      soundEffects.playPop();
    } else {
      setStage("finished");
      soundEffects.playSuccess();
    }
  }

  function restartGame() {
    setStage("intro");
    setQIndex(0);
    setYouScore(0);
    setMeScore(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setShowMePopup(false);
    soundEffects.playPop();
  }

  const verdict = getChallengeVerdict(youScore, meScore);

  return (
    <div className="content-slide challenge-container">
      <div className="eyebrow">
        <Swords size={14} /> COUPLE SHOWDOWN
      </div>
      <h2>
        Who Remembers<br />
        <em>Better?</em> 🥊
      </h2>
      <p className="section-intro">
        A hilarious memory duel between <strong>You (🧡)</strong> and <strong>Me (🤍)</strong>. Who holds the ultimate bragging rights?
      </p>

      {/* Intro / Player Selection Screen */}
      {stage === "intro" && (
        <div className="challenge-card challenge-intro-card animate-in">
          <div className="matchup-banner">
            <button
              type="button"
              className="player-badge player-badge-btn you-badge-btn"
              onClick={startRound1}
              aria-label="Select You (🧡) to play"
            >
              <span className="player-avatar">
                <img
                  src="/photos/Slide5gameyou.png"
                  alt="You"
                  className="player-avatar-photo"
                />
              </span>
              <strong>You (🧡)</strong>
              <small>Reigning Champion</small>
            </button>
            <div className="vs-circle">VS</div>
            <button
              type="button"
              className="player-badge player-badge-btn me-badge-btn"
              onClick={() => {
                setShowMePopup(true);
                soundEffects.playPop();
              }}
              aria-label="Select Me (🤍)"
            >
              <span className="player-avatar">
                <img
                  src="/photos/Slide5gameme.jpeg"
                  alt="Me"
                  className="player-avatar-photo"
                />
              </span>
              <strong>Me (🤍)</strong>
              <small>Fighting for his life</small>
            </button>
          </div>

          <div className="challenge-instructions">
            <h4>How it works:</h4>
            <ul>
              <li><strong>Round 1:</strong> You (🧡) answers the memory questions.</li>
              <li><strong>Round 2:</strong> Me (🤍) answers the exact same questions.</li>
              <li><strong>End:</strong> Compare our scores & reveal the official verdict!</li>
            </ul>
          </div>

          <div className="challenge-actions">
            <button
              type="button"
              className="primary-button"
              onClick={startRound1}
            >
              Start as You (🧡) 🌸
            </button>
            <button
              type="button"
              className="text-button"
              onClick={onNextSlide}
            >
              Skip this challenge <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Special Popup Modal when "Me (🤍)" is clicked */}
      {showMePopup && (
        <div className="me-popup-overlay animate-in" onClick={() => setShowMePopup(false)}>
          <div
            className="me-popup-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="me-popup-heading"
          >
            <div className="me-popup-heart-halo">
              <img
                src="/photos/Slide5gameme.jpeg"
                alt="Me"
                className="me-popup-avatar-photo"
              />
              <Sparkles size={20} className="me-popup-sparkle" />
            </div>
            <h3 id="me-popup-heading" className="me-popup-title">A Message From Me 💌</h3>
            <p className="me-popup-message">
              “Babbee, I remember you more than anything… yet still mining 😜😝😝”
            </p>
            <button
              type="button"
              className="primary-button me-popup-btn"
              onClick={() => {
                setShowMePopup(false);
                soundEffects.playPop();
              }}
            >
              Hehe, go back 💕
            </button>
          </div>
        </div>
      )}

      {/* Round 1: You's Turn */}
      {stage === "round1" && currentQ && (
        <div className="challenge-card animate-in" key={`y-${currentQ.id}`}>
          <div className="round-badge-bar">
            <span className="badge-round-indicator you-round-indicator">ROUND 1: YOU (🧡)'S TURN 🌸</span>
            <span>Question {qIndex + 1} of {challengeQuestions.length}</span>
          </div>

          <h3 className="challenge-q-title">{currentQ.question}</h3>
          {currentQ.hint && <p className="challenge-hint">💡 Hint: {currentQ.hint}</p>}

          <div className={`challenge-opts-list opts-count-${currentQ.options.length}`}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isThisCorrect = checkIsCorrect(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`challenge-opt-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => handleYouAnswer(idx)}
                  disabled={isAnswered}
                >
                  <span>{opt}</span>
                  {isAnswered && isThisCorrect && (
                    <Check size={16} className="check-icon" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="round-next-bar animate-in">
              <button
                type="button"
                className="primary-button"
                onClick={nextYouQuestion}
              >
                {qIndex < challengeQuestions.length - 1 ? "Next Question" : "Finish Round 1"} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Round 1 Completed Transition */}
      {stage === "round1_complete" && (
        <div className="challenge-card round-transition-card animate-in">
          <div className="transition-icon">👑</div>
          <h3>Round 1 Complete!</h3>
          <p>You (🧡) scored a fabulous <strong>{youScore} / {challengeQuestions.length}</strong>!</p>
          <p className="sub-instruction">
            Now hand the phone to me (or test together) to see if I can keep up!
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={startRound2}
          >
            Start Round 2: Me (🤍)'s Turn! 🕺
          </button>
        </div>
      )}

      {/* Round 2: Me's Turn */}
      {stage === "round2" && currentQ && (
        <div className="challenge-card animate-in" key={`m-${currentQ.id}`}>
          <div className="round-badge-bar me-round-bar">
            <span className="badge-round-indicator me-round-indicator">ROUND 2: ME (🤍)'S TURN 🕺</span>
            <span>Question {qIndex + 1} of {challengeQuestions.length}</span>
          </div>

          <h3 className="challenge-q-title">{currentQ.question}</h3>
          {currentQ.hint && <p className="challenge-hint">💡 Hint: {currentQ.hint}</p>}

          <div className={`challenge-opts-list opts-count-${currentQ.options.length}`}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isThisCorrect = checkIsCorrect(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  className={`challenge-opt-btn ${isSelected ? "selected" : ""}`}
                  onClick={() => handleMeAnswer(idx)}
                  disabled={isAnswered}
                >
                  <span>{opt}</span>
                  {isAnswered && isThisCorrect && (
                    <Check size={16} className="check-icon" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="round-next-bar animate-in">
              <button
                type="button"
                className="primary-button"
                onClick={nextMeQuestion}
              >
                {qIndex < challengeQuestions.length - 1 ? "Next Question" : "Reveal Final Verdict!"} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Final Showdown Comparison */}
      {stage === "finished" && (
        <div className="challenge-card verdict-card animate-in">
          <div className="trophy-wrap">
            <Trophy size={48} color="#e56792" />
          </div>

          <h3 className="verdict-headline">{verdict.title}</h3>
          <p className="verdict-tagline">{verdict.tagline}</p>

          <div className="score-comparison-board">
            <div className="score-box kutty-box">
              <span className="score-avatar">
                <img
                  src="/photos/Slide5gameyou.png"
                  alt="You"
                  className="score-avatar-photo"
                />
              </span>
              <span className="score-player">You (🧡)</span>
              <strong className="score-number">{youScore}</strong>
              <small>/ {challengeQuestions.length} points</small>
            </div>
            <div className="score-divider">VS</div>
            <div className="score-box bf-box">
              <span className="score-avatar">
                <img
                  src="/photos/Slide5gameme.jpeg"
                  alt="Me"
                  className="score-avatar-photo"
                />
              </span>
              <span className="score-player">Me (🤍)</span>
              <strong className="score-number">{meScore}</strong>
              <small>/ {challengeQuestions.length} points</small>
            </div>
          </div>

          <div className="verdict-statement">
            <Heart size={16} fill="currentColor" />
            <p>{verdict.verdict}</p>
          </div>

          <div className="challenge-card-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={restartGame}
            >
              <RotateCcw size={15} /> Play Again
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={onNextSlide}
            >
              Next: Choose Our Next Memory <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
