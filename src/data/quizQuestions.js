/**
 * "How Well Do You Know Us?" Quiz Questions
 * 
 * 10 couple trivia questions with 4 options each, correct answer mapping,
 * and playful custom feedback reactions.
 */

export const quizQuestions = [
  {
    id: 1,
    question: "When did You propose to me?",
    options: [
      "14-10",
      "21-10",
      "28-10",
      "07-11",
    ],
    correctIndex: 1,
    correctFeedback: "YES! 21-10, the most special date ever! 💍💖",
    wrongFeedback: "Aiyoo! How could you forget 21-10?! 😭💔",
    funFact: "The butterflies I felt on 21-10 are still fluttering in my heart today.",
  },
  {
    id: 2,
    question: "Which dress you wore when we had our first video call?",
    options: [
      "Pink Kurti",
      "Black Top & Jeans",
      "Blue Saree",
      "Yellow Chudidhar",
    ],
    correctIndex: 2,
    correctFeedback: "Spot on! Blue Saree! You looked completely breathtaking on that screen! 💙✨",
    wrongFeedback: "Aiyoo no! You wore that gorgeous Blue Saree! How could you forget?! 🙈💙",
    funFact: "I still remember staring at my screen because you looked so angelic in that Blue Saree.",
  },
  {
    id: 3,
    question: "What drinks did we have on our first date?",
    options: [
      "Milk and Tea",
      "Cold Coffee & Badam Milk",
      "Lemon Tea & Cappuccino",
      "Rose Milk & Filter Coffee",
    ],
    correctIndex: 0,
    correctFeedback: "Awww yes! Milk and Tea — the sweetest, most innocent combo! ☕🥛",
    wrongFeedback: "Wrong drink order! We had Milk and Tea daa! 😂🍵",
    funFact: "Who goes on a date and drinks Milk and Tea? Only us, and that's why we're iconic!",
  },
  {
    id: 4,
    question: "Who gave the first hug? 😭",
    options: [
      "Me (I couldn't resist)",
      "Both of us at the exact same second",
      "Neither, we just awkwardly high-fived",
      "You",
    ],
    correctIndex: 3,
    correctFeedback: "YES, YOU! And that hug was literally heaven on earth! 😭🫂",
    wrongFeedback: "Nooo! It was YOU who gave the first hug, don't pretend otherwise! 🥺",
    funFact: "That hug under the street light is forever etched in my memory.",
  },
  {
    id: 5,
    question: "Who gifted whom first?",
    options: [
      "I gifted you a cute keychain & chocolate",
      "I gifted you a handwritten letter & hoodie",
      "You gifted me that Bella Vita perfume.",
      "You gifted me a customized watch",
    ],
    correctIndex: 2,
    correctFeedback: "100% correct! That Bella Vita perfume still smells like pure love. 🌸✨",
    wrongFeedback: "Nope! You gifted me that Bella Vita perfume first, remember?! 🎁😭",
    funFact: "Every time I spray that perfume, I instantly think of you.",
  },
  {
    id: 6,
    question: "What movie did we watch when we went out together for the first time?",
    options: [
      "Mummy",
      "SIrai",
      "Vaa Vaathiyaar",
      "Avatar",
    ],
    correctIndex: 1,
    correctFeedback: "SIrai! Though let's be honest, we were barely watching the screen! 🍿🎬",
    wrongFeedback: "Kuttyyy no! It was SIrai! How could you forget our first movie?! 😭",
    funFact: "Matching dress and first movie together — cinematic romance at its peak!",
  },
  {
    id: 7,
    question: "The day you came to my home whats the best moment (still the best first private time we spent 😭)",
    options: [
      "Hickey",
      "Had food",
      "Played",
      "Had a chit-chat",
    ],
    correctIndex: 0,
    correctFeedback: "Hickey 😏🔥 You definitely weren't letting me leave without a mark! 🙈❤️",
    wrongFeedback: "Aiyoo no! You know very well what the best moment was... that hickey! 😭😂",
    funFact: "Still the best and most unforgettable private time we ever spent together.",
  },
  {
    id: 8,
    question: "😏😅 Which bike did we ride to Kodaikanal?",
    options: [
      "R15 V3",
      "Duke 200",
      "FZ-S",
      "Royal Enfield Classic 350",
    ],
    correctIndex: 2,
    correctFeedback: "FZ-S! That trusty beast carried us all the way up the misty hills! 🏍️💨",
    wrongFeedback: "Wrong bike! Our legendary FZ-S took us up Kodai, don't disrespect it! 😂",
    funFact: "That long Kodai ride on the FZ-S will forever be our most epic adventure.",
  },
  {
    id: 9,
    question: "Who is the dumbest between us? 😂",
    options: [
      "Only you",
      "Only me",
      "Neither of us",
      "We both",
    ],
    correctIndex: 3,
    correctFeedback: "Haha YES! We both share the exact same single brain cell! 🧠🤝😂",
    wrongFeedback: "Nice try shifting blame! The official answer is WE BOTH! 🤣",
    funFact: "Two clowns in love, running on zero common sense and infinite affection.",
  },
  {
    id: 10,
    question: "The first person you introduced to your family 🥰",
    options: [
      "Maami",
      "Divya",
      "Paapi",
      "Chitthi",
    ],
    correctIndex: 1,
    correctFeedback: "Divya! Such a special and big milestone for us! 🥰✨",
    wrongFeedback: "Nope! It was Divya! She was the first one! 🫶",
    funFact: "That moment meant the world to me — knowing I was becoming part of your circle.",
  },
];

/**
 * Fun endings based on score
 */
export const quizScoreTiers = [
  {
    minScore: 9,
    title: "Official Relationship Scholar 🎓💗",
    badge: "Lore Master",
    message: "Kutty, you remember literally EVERYTHING! My heart is bursting. You pay attention to the tiniest details and it shows how much you love us.",
  },
  {
    minScore: 7,
    title: "Certified Sweetheart 🥹✨",
    badge: "99% Attentive",
    message: "You know us so well! A couple of funny slip-ups, but let's be real: you have my heart completely wrapped around your finger.",
  },
  {
    minScore: 4,
    title: "Chaotic Memory Queen 👑😂",
    badge: "Cute & Selective",
    message: "You remember the vibes more than the specifics, and honestly? That is why I love you so much. We make memories faster than our brains can log them!",
  },
  {
    minScore: 0,
    title: "Too Busy Being Pretty To Take Notes 💅💖",
    badge: "Selective Amnesia",
    message: "Don't worry Kutty! The score is just for fun. You don't have to remember every test question because I will spend the rest of my life reminding you how much I adore you.",
  },
];

export const quizSecretMessage = {
  heading: "A Secret Note Unlocked for Kutty 💌",
  body: "Whether you scored 10/10 or guessed half of them, you are the easiest person to love. Thank you for filling this first year with so much warmth, inside jokes, and gentle comfort. You're my person, always and forever.",
  ps: "P.S. You still owe me half the snacks you took from my plate this year! 🍟❤️",
};
