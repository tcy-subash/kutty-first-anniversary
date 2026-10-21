import { useMemo, useState } from "react";
import {
  ArrowRight, Award, CheckCircle2, ChevronRight, HelpCircle,
  PartyPopper, RefreshCw, RotateCcw, Sparkles, XCircle, Heart
} from "lucide-react";
import { quizQuestions, quizScoreTiers, quizSecretMessage } from "../data/quizQuestions.js";
import { soundEffects } from "../utils/audioEffects.js";

export default function QuizGame({ onNextSlide }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const q = quizQuestions[currentIdx];

  const currentTier = useMemo(() => {
    return (
      quizScoreTiers.find((tier) => score >= tier.minScore) ||
      quizScoreTiers[quizScoreTiers.length - 1]
    );
  }, [score]);

  function handleSelect(optionIdx) {
    if (hasAnswered) return;
    setSelectedOption(optionIdx);
    setHasAnswered(true);

    const isCorrect = optionIdx === q.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      soundEffects.playSuccess();
    } else {
      soundEffects.playPop();
    }
  }

  function handleNextQuestion() {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      soundEffects.playPop();
    } else {
      setIsFinished(true);
      soundEffects.playSuccess();
    }
  }

  function handleRestart() {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
    setSecretUnlocked(false);
    soundEffects.playPop();
  }

  return (
    <div className="content-slide quiz-slide-container">
      <div className="eyebrow">
        <HelpCircle size={14} /> COUPLE TRIVIA TOURNAMENT
      </div>
      <h2>
        How Well Do You<br />
        <em>Know Us?</em> 😂
      </h2>
      {/* <p className="section-intro">
        A 100% playful, affectionate test of our shared lore. No stress — wrong answers just mean more cuddles later!
      </p> */}

      {!isFinished ? (
        <div className="quiz-card animate-in" key={q.id}>
          {/* Progress Header */}
          <div className="quiz-header">
            <span className="quiz-progress-text">
              Question {currentIdx + 1} of {quizQuestions.length}
            </span>
            <div className="quiz-progress-bar">
              <div
                className="quiz-progress-fill"
                style={{
                  width: `${((currentIdx + 1) / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
            <span className="quiz-score-badge">Score: {score}</span>
          </div>

          <h3 className="quiz-question-title">{q.question}</h3>

          {/* Options Grid */}
          <div className="quiz-options-grid">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectAnswer = idx === q.correctIndex;

              let btnClass = "quiz-opt-btn";
              if (hasAnswered) {
                if (isSelected && isCorrectAnswer) btnClass += " opt-correct";
                else if (isSelected && !isCorrectAnswer) btnClass += " opt-wrong";
                else if (isCorrectAnswer) btnClass += " opt-highlight-correct";
                else btnClass += " opt-dimmed";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  className={btnClass}
                  onClick={() => handleSelect(idx)}
                  disabled={hasAnswered}
                >
                  <span className="opt-letter">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="opt-text">{opt}</span>
                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 size={18} className="opt-status-icon success" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle size={18} className="opt-status-icon error" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Feedback Box */}
          {hasAnswered && (
            <div className="quiz-feedback-box animate-in">
              {selectedOption === q.correctIndex ? (
                <div className="feedback-content correct">
                  <div className="feedback-tag">
                    <Sparkles size={14} /> SPOT ON! 🥹
                  </div>
                  <p className="feedback-message">{q.correctFeedback}</p>
                </div>
              ) : (
                <div className="feedback-content wrong">
                  <div className="feedback-tag">
                    <Heart size={14} fill="currentColor" /> BUSTED! 😂
                  </div>
                  <p className="feedback-message">{q.wrongFeedback}</p>
                </div>
              )}

              {q.funFact && <p className="feedback-fun-fact">💡 {q.funFact}</p>}

              <button
                type="button"
                className="primary-button quiz-next-btn"
                onClick={handleNextQuestion}
              >
                {currentIdx < quizQuestions.length - 1 ? (
                  <>
                    Next Question <ChevronRight size={16} />
                  </>
                ) : (
                  <>
                    See My Results! <PartyPopper size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="quiz-results-card animate-in">
          <div className="results-trophy">
            <Award size={46} color="#d95d88" />
          </div>

          <span className="results-badge">{currentTier.badge}</span>
          <h3 className="results-title">{currentTier.title}</h3>

          <div className="results-score-display">
            <strong>{score}</strong>
            <span>out of {quizQuestions.length} correct</span>
          </div>

          <p className="results-message">{currentTier.message}</p>

          <p className="results-disclaimer">
            Remember: this score is just for fun! You're still 100% the love of my life regardless. 💗
          </p>

          {/* Secret Message Unlock */}
          <div className="secret-unlock-section">
            {!secretUnlocked ? (
              <button
                type="button"
                className="secondary-button unlock-btn"
                onClick={() => {
                  setSecretUnlocked(true);
                  soundEffects.playSparkle();
                }}
              >
                <Sparkles size={16} /> Unlock your special secret note 💌
              </button>
            ) : (
              <div className="secret-note-card animate-in">
                <div className="secret-header">
                  <Heart size={16} fill="currentColor" />
                  <h4>{quizSecretMessage.heading}</h4>
                </div>
                <p>{quizSecretMessage.body}</p>
                <small>{quizSecretMessage.ps}</small>
              </div>
            )}
          </div>

          <div className="results-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleRestart}
            >
              <RotateCcw size={15} /> Play Again
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={onNextSlide}
            >
              Next: Who Remembers Better? Challenge <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
