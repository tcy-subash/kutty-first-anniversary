/**
 * "Who Remembers Better? 🥊" Challenge Questions
 * 
 * Round 1: You (🧡) plays
 * Round 2: Me (🤍) plays
 * Compare scores and get the verdict!
 */

export const challengeQuestions = [
  {
    id: 1,
    question: "Where was the very first place we went together?",
    options: [
      "Nandhini Bakery",
      "Hot Spot Cafe",
      "Royal Bakes & Tea",
      "Sri Krishna Sweets",
    ],
    correctAnswer: "Nandhini Bakery",
    correctIndex: 0,
    hint: "Think about our very first outing together!",
  },
  {
    id: 2,
    question: "Who is more likely to say “I'm not hungry” and then eat the other's food?",
    options: [
      "You",
      "Me",
    ],
    correctAnswer: "Me",
    correctIndex: 1,
    hint: "Every single food order confirms this truth 😂",
  },
  {
    id: 3,
    question: "Who is more invested in Instagram Reels and sends more DMs?",
    options: [
      "You",
      "Me",
    ],
    correctAnswer: "You",
    correctIndex: 0,
    hint: "Check your DMs right now for 1:00 AM evidence!",
  },
  {
    id: 4,
    question: "What was the weather like on our first big, special outing?",
    options: [
      "Sunny",
      "Breezy",
      "Rainy",
      "Cold",
      "All sorts of weather",
    ],
    correctAnswer: "All sorts of weather",
    correctIndex: 4,
    hint: "Nature decided to give us the complete package in one single day!",
  },
  {
    id: 5,
    question: "Who fell in love first vs. who fell harder? 🥹❤️",
    options: [
      "I fell in love first, and you fell harder.",
      "You fell in love first, and I fell harder.",
      "We both fell at the exact same second.",
      "You fell in love first, and you fell harder.",
    ],
    correctAnswer: "I fell in love first, and you fell harder.",
    correctIndex: 0,
    hint: "There is zero doubt on who fell first and who fell harder!",
  },
];

export function getChallengeVerdict(youScore, meScore) {
  if (youScore > meScore) {
    return {
      title: "You Know The Lore! 👑💅",
      tagline: "Me is fighting for his life in the comment section.",
      verdict: "You dominated the memory test! You remember every little detail so beautifully, though my devotion to you remains 100%.",
    };
  } else if (meScore > youScore) {
    return {
      title: "I Took Detailed Notes! 📝🕺",
      tagline: "Either I studied all night, or I genuinely never forget a moment.",
      verdict: "I edged ahead! But let's be honest, I only remember because looking at you is my favourite hobby.",
    };
  } else if (youScore >= 4) {
    return {
      title: "Perfect Match: Soulmates With High-Res Memories! 🥹💗",
      tagline: "Both remember the important little things that make us US.",
      verdict: "Tie game at peak perfection! Both of us cherish the story we've built over 365 days. Absolutely wholesome.",
    };
  } else {
    return {
      title: "Both Share One Brain Cell! 🧠✨",
      tagline: "It is working overtime and doing its absolute best.",
      verdict: "A tie! We both remember the vibes and feelings rather than the trivia. As long as you're holding my hand, the lore takes care of itself!",
    };
  }
}
