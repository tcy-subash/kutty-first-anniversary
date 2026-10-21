# For Kutty 💗 — First Anniversary Website

A personalized, interactive React/Vite anniversary website made with love for Kutty to celebrate our **first anniversary**.

---

## 🌟 The 11 Chapters of Our Story

1. **Welcome Surprise** (`welcome`) — The grand anniversary announcement with polaroids, stickers, floating hearts, and playful headlines.
2. **Relationship Performance Review** (`roast`) — Playful statistics and the official romantic couple audit.
3. **Our Little Love Story Timeline** (`timeline`) — An 8-milestone animated journey from the day we met to our first anniversary, with progress stepper, expandable stories, and custom photos.
4. **Our First Kiss Spotlight 💋** (`first-kiss`) — A dedicated magical sealed envelope with burst sparkles and hearts revealing date, location, and the sweet story.
5. **Photo & Video Scrapbook** (`memories`) — Scrapbook gallery with tilt angles, filters (All, Photos, Videos, Special Moments), video controls, memory counter, and a full-screen lightbox.
6. **How Well Do You Know Us? Quiz 😂** (`quiz`) — 10 questions with immediate affectionate feedback, celebration hearts, playful teasing, score breakdown, and an unlockable secret note.
7. **Who Remembers Better? Challenge 🥊** (`remembers-better`) — Two-round mini-game (Round 1: Kutty, Round 2: Boyfriend) with a hilarious score showdown and verdict.
8. **Choose Our Next Memory 🌷** (`next-memory`) — Interactive card selection where Kutty picks our next adventure (date night, sunset walk, movie night, etc.) with personalized boyfriend reactions.
9. **Reasons I Love My Kutty ❤️** (`reasons`) — Grid of 12 hidden love notes that unfold upon tapping, tracking opened count.
10. **Heart-Catching Mini-Game 🎮** (`game`) — Catch floating hearts to unlock a sweet relationship truth.
11. **Final Love Letter 💌** (`letter`) — Wax-sealed envelope revealing the heartfelt anniversary letter.

---

## 🚀 Quick Start (Local Development)

In your terminal inside `kutty-first-anniversary`:

```bash
# 1. Install dependencies
npm install

# 2. Start the Vite dev server
npm run dev

# 3. Build for production (verifies zero errors)
npm run build
```

Open `http://localhost:5173` in your browser.

---

## 💌 The Secret Gate (Login Screen)

Before entering the website, visitors are greeted by **“A Little Secret Gate 💌”**:
- **Name Input**: Accepts `Subash`, `Karthi`, `Karthisri`, `SubashKarthi`, `KarthiSubash` (case-insensitive & trims accidental spaces).
- **Password Input**: A cute date picker requiring our special anniversary date.
- **The Mischievous Escaped Heart Chase 💘**:
  - The heart button breaks free from the login card and **escapes across the entire browser viewport**!
  - It leaps to unpredictable positions: top, bottom, corners, and around the login card with smooth, playful spring transitions.
  - Live chase commentary rotates funny lines (*“HEHE, TOO SLOW! 😂”*, *“YOU CAN'T CATCH LOVE THAT EASILY 💨”*, *“MISS ME AGAIN, KUTTY 😭”*, *“BROOO, ALMOST! 💀”*).
  - Keeps safe margins within the screen boundaries and recalculates on resize/orientation change.
  - After 7 dodges (around 6–8 attempts), it stops running and surrenders:
    *“Okay okay, you caught my heart! Now prove it's really you 💘”*
  - Clicking the caught heart triggers the login verification!
  - Touch-friendly on mobile, preventing accidental page scrolling while chasing.
  - Accessible: includes a keyboard bypass (<kbd>Enter</kbd>/<kbd>Space</kbd> or "Freeze the heart" link).
- **Wrong Date Reaction 😭**:
  - Shakes the card and shows a hilarious message (*“BROOO 😭 THAT IS NOT OUR SPECIAL DAY!”*, *“Kutty, even the calendar is judging you rn 💀”*).
  - Displays a cute animated angry-child GIF / illustration.
  - Gives a gentle romantic hint without giving away the date.
- **Success Transition 💗**:
  - Heart burst animation, personalized welcome message, and smooth transition into the 11-chapter anniversary website.
- **Lock Gate Button (🔒)**: Located in the top-right header so you can lock the gate and replay the full-screen chase anytime.

---

## 🎨 How to Personalize Your Content

All relationship lore, stories, questions, and notes are neatly separated into dedicated files inside `src/data/` and `src/content.js`. You do **not** need to touch any React components!

### 0. Anniversary Date & Login Config (`src/data/authConfig.js`)
- **Set your real anniversary date**:
  Open [src/data/authConfig.js](file:///e:/kutty-first-anniversary/kutty-first-anniversary/src/data/authConfig.js) and change:
  ```js
  export const ANNIVERSARY_DATE = "2023-10-11"; // Format: YYYY-MM-DD
  ```
- Change or add accepted nicknames in `ACCEPTED_NAMES` if you like.

### 1. Relationship Timeline & First Kiss (`src/data/relationshipTimeline.js`)
- Edit the 8 milestone entries (`milestones` array):
  - `date`: e.g. `"October 11, 2023"`
  - `location`: e.g. `"At the bookstore café"`
  - `shortDescription` and `fullStory`
  - `mediaSrc`: path to your photo in `public/media/`
- Edit `firstKissDetails` for the magical envelope reveal:
  - `date`, `location`, `story`, and `sweetNote`.

### 2. Couple Trivia Quiz (`src/data/quizQuestions.js`)
- Customize the 10 questions in `quizQuestions`:
  - `question`: the trivia question text
  - `options`: 4 multiple-choice answers
  - `correctIndex`: 0, 1, 2, or 3 (0 = option A, 1 = option B, etc.)
  - `correctFeedback`: congratulatory message
  - `wrongFeedback`: playful teasing message
  - `funFact`: bonus couple commentary
- Customize `quizSecretMessage`: the secret love letter that unlocks after Kutty finishes the quiz.

### 3. "Who Remembers Better?" Showdown (`src/data/challengeQuestions.js`)
- Edit the 5 questions in `challengeQuestions` and their correct answers.
- The scoring engine automatically gives a playful verdict comparing Kutty vs. Boyfriend.

### 4. Next Date Ideas (`src/data/dateIdeas.js`)
- Edit or add activity ideas in `dateIdeas`:
  - `title`: e.g. `"A Sunset Walk"`
  - `description`: activity description
  - `response`: the boyfriend's cute promise when Kutty picks it.

### 5. Reasons I Love My Kutty (`src/data/loveNotes.js`)
- Edit the 12+ notes in `loveNotes`:
  - `title`, `subtitle`, and `message` (e.g. `"Because your smile is genuinely one of my favourite things."`).

### 6. Scrapbook Media, Roast Stats & Love Letter (`src/content.js`)
- `memories`: list of permanent photos and videos (with captions, dates, and locations).
- `relationshipStats`: playful cases for the relationship performance review.
- `loveLetter`: the final anniversary letter displayed in Chapter 11.

---

## 📸 Adding Real Photos and Videos

### Option A: Permanent Media (Visible to everyone online)
1. Copy your photos (`.jpg`, `.png`, `.webp`) or videos (`.mp4`, `.webm`) into `public/media/`:
   - `public/media/our-first-photo.jpg`
   - `public/media/first-kiss.jpg`
   - `public/media/our-favourite-memory.jpg`
   - `public/media/our-funny-video.mp4`
2. Open `src/content.js` or `src/data/relationshipTimeline.js` and specify `src: "/media/your-file-name.jpg"`.
3. Commit and deploy.

### Option B: Quick Local Browser Preview
- On Slide 5 (Memories Gallery), click **"Add photos/videos"** to preview files directly from your computer without uploading them anywhere. (A badge will mark them as local previews).

---

## 🕹️ Interactive Features & Navigation

- **Jump to a Memory (🧭 Menu)**: Click the compass icon in the top header to open a quick drawer and jump directly to any of the 11 slides.
- **Cute Synthesizer Audio (🔊 / 🔇)**: Toggle sound in the top bar to enable gentle pops, chimes, and celebration sparkles via the Web Audio API (no external MP3 downloads required). Muted by default.
- **Keyboard Navigation**: Press <kbd>→</kbd> / <kbd>←</kbd> to move forward or back. Press <kbd>Esc</kbd> to close lightboxes or the jump menu.
- **Mobile Swipe**: Swipe left or right on mobile to change slides smoothly.
- **Image Lightbox**: Click any photo in the scrapbook to view it full screen with previous/next controls.
- **Motion Accessibility**: Fully respects `prefers-reduced-motion`.

---

## 🚀 Deploying to Vercel

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Upgrade Kutty anniversary experience"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your custom anniversary website will be live in seconds!
