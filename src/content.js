/**
 * Central Content Configuration for Kutty's 1st Anniversary Website
 * 
 * You can edit your memories, relationship stats, and love letter here!
 * Dedicated files are also available in `src/data/`:
 * - `src/data/relationshipTimeline.js` -> 8-part story timeline & first kiss details
 * - `src/data/quizQuestions.js`        -> Couple memory quiz & scoring
 * - `src/data/challengeQuestions.js`   -> Two-round "Who Remembers Better?" game
 * - `src/data/dateIdeas.js`            -> "Choose Our Next Memory" options
 * - `src/data/loveNotes.js`            -> 12+ hidden reasons why I love you
 */

export { milestones, firstKissDetails } from "./data/relationshipTimeline.js";
export { quizQuestions, quizScoreTiers, quizSecretMessage } from "./data/quizQuestions.js";
export { challengeQuestions, getChallengeVerdict } from "./data/challengeQuestions.js";
export { dateIdeas } from "./data/dateIdeas.js";
export { loveNotes } from "./data/loveNotes.js";
export { ANNIVERSARY_DATE, ACCEPTED_NAMES } from "./data/authConfig.js";

/**
 * Permanent Photo & Video Memories
 * Place files in `public/media/` and add/edit entries here.
 * Supported categories for filtering: "all", "photos", "videos", "special"
 */
export const memories = [
  {
    id: "mem-1",
    type: "image",
    src: "/photos/Slide4.1.jpg",
    caption: "One of my favourite humans and brightest smiles. 💗",
    date: "Special Memory",
    location: "With You",
    category: "photos",
    rotation: "-2deg",
    permanent: true,
  },
  {
    id: "mem-2",
    type: "image",
    src: "/photos/Slide4.2.png",
    caption: "A little moment I wish I could replay over and over again.",
    date: "Golden Hour",
    location: "Our special getaway",
    category: "photos",
    rotation: "1.5deg",
    permanent: true,
  },
  {
    id: "mem-3",
    type: "image",
    src: "/photos/Slide4.3.jpg",
    caption: "Every second beside you feels like home.",
    date: "Sweet Days",
    location: "Together",
    category: "special",
    rotation: "-1deg",
    permanent: true,
  },
  {
    id: "mem-4",
    type: "image",
    src: "/photos/Slide4.4.jpg",
    caption: "Looking at you and smiling like an idiot — my favourite routine. ✨",
    date: "Precious Smiles",
    location: "Memories with Kutty",
    category: "photos",
    rotation: "2deg",
    permanent: true,
  },
  {
    id: "mem-5",
    type: "image",
    src: "/photos/Slide4.5.jpg",
    caption: "No matter where we go, having you beside me makes it magical.",
    date: "Adventure Time",
    location: "Our Happy Place",
    category: "photos",
    rotation: "-1.5deg",
    permanent: true,
  },
  {
    id: "mem-6",
    type: "video",
    src: "/videos/Slide4.6.mp4",
    caption: "Official evidence of our shared chaos and pure laughter 😂",
    date: "Peak Chaos",
    location: "Giggling somewhere",
    category: "videos",
    rotation: "1deg",
    permanent: true,
  },
  {
    id: "mem-7",
    type: "image",
    src: "/photos/Slide4.7.png",
    caption: "Holding your hand will never stop giving me butterflies. 🌸",
    date: "Pure Love",
    location: "Always Us",
    category: "special",
    rotation: "-2deg",
    permanent: true,
  },
];

export const relationshipStats = [
  { label: "Times you stole my attention", value: "∞", note: "Yet still loking for yeahh 😭" },
  { label: "Sandaigal you won ", value: "99.9%", note: "Indeed here is were i want myself to be 🙃" },
  { label: "Times we chose us", value: "Every time", note: "Yes, Every Time Literallyyyy" },
  { label: "Me when i Think About You ", value: "404", note: "Completely Losted in ur Eyes " },
];

export const loveLetter = `Happy first Year Anniversary Karthi maa 

Entha day unmaikume namakku avlo special aana oru day laa daa, Chaa we've been waiting for this day for this whole year, and ippo finally namma first anniversary vandhuruchu nu nenacha romba santhoshama irukku laaaaa.

Indha one year la evlo happy ahh erunthoomoo , konjam days hard ahh vum face pannirukom. sandhoshama sirichirukom , sila neroom aluthum irukoom, sanda potrukoom, but ellathayum thaandi innaiku varaikum namma love ah hold panni vachirukom , Thats why we were not like others . we are spl breed , honestly 😭🤧 Adhu dhaan enakku romba special.

Un kooda irukura ovvoru moment um enakku precious rhaaaa . Namma relationship perfect ah illanaalum, enakku nee ennaikum perfect tha daa . Un kooda innum neraya memories create pannanum entha life full ahhh, neraya birthdays, anniversaries, happy moments ellam serndhu celebrate pannanum. Life la evlo problems vandhaalum, un kaiya pudichikittu ellathayum face pannanum nu dhaan dii aasa.

Thank you maa, en life la vandhadhukku, enna love pandrathuku, en kooda indha one year journey la irundhadhukku . Not to over react rhaa but this feels soo much light for me to with you , you made me feel loved the most . Ennaikum un kooda thaa en life uhhh cheloooo. I love youuuuu the mooosttttt, Karthi maa. Happy first anniversary, my kutty Kolanthaaa 🧡🤍`;