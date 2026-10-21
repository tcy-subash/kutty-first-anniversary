/**
 * Secret Gate Authentication Configuration for Subash & Karthi 💗
 * 
 * ⚠️ REPLACE YOUR_ANNIVERSARY_DATE:
 * Change ANNIVERSARY_DATE below to your real anniversary date in "YYYY-MM-DD" format.
 * Example: "2023-10-11" for October 11, 2023.
 */

// 👇👇👇 CONFIGURE YOUR REAL ANNIVERSARY DATE HERE 👇👇👇
export const ANNIVERSARY_DATE = "2025-10-21"; // Format: YYYY-MM-DD
// 👆👆👆 REPLACE "2023-10-11" WITH YOUR REAL ANNIVERSARY DATE 👆👆👆

/**
 * Validated names (compared in lowercase without spaces)
 */
export const ACCEPTED_NAMES = [
  "subash",
  "karthi",
  "karthisri",
  "subashkarthi",
  "karthisubash",
];


export function validateAndFormatName(rawInput) {
  if (!rawInput) return { valid: false, formatted: "", isBlank: true };
  const cleaned = rawInput.trim().replace(/\s+/g, "").toLowerCase();

  const isAccepted = ACCEPTED_NAMES.includes(cleaned);

  if (!isAccepted) {
    return { valid: false, formatted: "", isBlank: false };
  }

  // Format a sweet display name based on who logged in
  if (cleaned.includes("subash") && cleaned.includes("karthi")) {
    return { valid: true, formatted: "Subash & Karthi", isBlank: false };
  }
  if (cleaned.includes("subash")) {
    return { valid: true, formatted: "Subash", isBlank: false };
  }
  return { valid: true, formatted: "Karthi", isBlank: false };
}

/**
 * Funny messages when the name is accepted but the date is wrong
 */
export const WRONG_DATE_MESSAGES = [
  "BROOO 😭 THAT IS NOT OUR SPECIAL DAY!",
  "Kutty, even the calendar is judging you rn 💀",
  "Access denied! Love is real, but your date is suspicious 😂",
  "Wrong date, baby. Our memories deserve better than this 😤💗",
  "The heart is offended. Please consult your memory, madam. 😭",
];

/**
 * Playful hints that do NOT reveal the actual date
 */
export const DATE_HINTS = [
  "Hint: It’s the day our little story became official 💌",
  "Think about the date that made us *us* 🥹",
  "The answer is hiding in one of our favourite memories 💕",
  "Hint: 365 days ago, something magical started ✨",
];

/**
 * Cute angry toddler / pouting GIF URL
 * (Tenor / Giphy CDN reliable URL, backed up by an inline SVG/CSS illustration)
 */
export const ANGRY_CHILD_GIF_URL = "https://media.giphy.com/media/l1J9u3TZfpmeDLkD6/giphy.gif";
