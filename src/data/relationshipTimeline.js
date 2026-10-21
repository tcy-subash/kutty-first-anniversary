/**
 * Relationship Timeline Milestones
 * 
 * Customize each milestone with your own dates, stories, photos, and locations.
 * To use your real photos or videos:
 * 1. Place your file in public/media/ (e.g. public/media/first-met.jpg)
 * 2. Set mediaSrc: "/media/first-met.jpg" and mediaType: "image" (or "video")
 */

export const milestones = [
  {
    id: "first-met",
    number: "01",
    tag: "THE PROLOGUE",
    title: "The day you first Confessed",
    date: "A Day That Changed Everything", // e.g. "October 11, 2023"
    location: "Where our paths crossed",
    shortDescription: "Still cant believe i got those words from you on that night 😭😭😭.",
    fullStory: "Looking back at that moment under those street light in our clg, it feels like the universe was quietly putting all the pieces in place.That hug we had, That feels like a dream which i have been manifesting ☁️.",
    badge: "Chapter 1",
    mediaSrc: "/photos/Slide3.1.png",
    mediaType: "image",
    mediaCaption: "The moment the universe decided to bless me.",
    showOnExpand: false,
  },
  {
    id: "first-conversation",
    number: "02",
    tag: "THE SPARK",
    title: "The First Date we had",
    date: "Those Bike Rides and Long Chats",
    location: "Lost in our own little world",
    shortDescription: "Minutes turned into hours, and I realized I never wanted the ride to end.",
    fullStory: "Our first bike ride together was a mix of excitement and nervousness, but it turned into one of the most beautiful memories of my life. Riding beside you, feeling the breeze, sharing little laughs, and stealing glances at you made even the simplest moments feel magical. Somewhere along that ride, I realized that it wasn’t about the destination — it was about having you beside me.",
    badge: "Endless Talks",
    mediaSrc: "/photos/Slide3.2.jpeg",
    mediaType: "image",
    mediaCaption: "When chatting with you became my favourite routine.",
    showOnExpand: true,
  },
  {
    id: "falling-for-her",
    number: "03",
    tag: "THE REALIZATION",
    title: "When I realized I was falling for you",
    date: "The Moment My Heart Decided",
    location: "Everywhere you were",
    shortDescription: "It wasn't one giant movie scene — it was a thousand little moments showing me nobody else compares.",
    fullStory: "I fell for the way you put your family first, care a little too much, make me laugh effortlessly, the way you cared about little things, and how just seeing your name pop up on my phone could completely reset a bad day. My heart had already decided long before my brain caught up: yep, I'm completely gone for her.",
    badge: "Heart Stolen",
    mediaSrc: "/photos/Slide3.3.jpg",
    mediaType: "image",
    mediaCaption: "Completely and utterly helpless against your charm.",
    showOnExpand: true,
  },
  {
    id: "first-date",
    number: "04",
    tag: "OUR OUTING",
    title: "Our first Official Outing",
    date: "Butterflies & Big Smiles",
    location: "Our special spot",
    shortDescription: "Even its Completely New for both of Us we managed to had that looong Drive to Kodai with a lot of Memories ",
    fullStory: "Our Kodaikanal trip was a beautiful mix of excitement, little nervous moments, endless laughter, and memories I'll always carry in my heart. Being there with you, surrounded by the hills and cool breeze, made everything feel magical. Having you beside me made it unforgettable.",
    badge: "Official Date",
    mediaSrc: "/photos/Slide3.4.jpg",
    mediaType: "image",
    mediaCaption: "Look at us, being all cute and special.",
    showOnExpand: false,
  },
  {
    id: "first-kiss",
    number: "05",
    tag: "THE MAGIC",
    title: "The first time we kissed",
    date: "When Fireworks Went Off",
    location: "Our magical little corner",
    shortDescription: "The world went completely silent, and every single butterfly in my stomach started cheering.",
    fullStory: "That moment in the theatre was unforgettable—we were wearing the same dress color and pattern without even planning it. Neither of us really knew what we were doing, but the moment I touched your lips, I felt goosebumps all over. And you? You were scared as hell, yet somehow that made the moment even more special. We were nervous, clueless, and a little crazy, but it's a memory my heart still replays with the same butterflies.",
    badge: "Pure Magic",
    mediaSrc: "/photos/Slide3.5.jpg",
    mediaType: "image",
    mediaCaption: "The moment my brain decided to replay for eternity.",
    showOnExpand: true,
  },
  {
    id: "funniest-memory",
    number: "06",
    tag: "CHAOS & GIGGLES",
    title: "Happiest memory for me",
    date: "Most Memorable Movie Date",
    location: "Laughing till our stomachs hurt",
    fullStory: "That thrilling ride down the Kodaikanal hills, our little stops, laughing uncontrollably, and forgetting the world around us. Just you and me, making the simplest moments unforgettable.",
    badge: "Brain Cell: Shared",
    mediaSrc: "/videos/Slide3.6.mp4",
    mediaType: "video",
    mediaCaption: "Certified evidence of our shared chaos.",
    showOnExpand: false,
  },
  {
    id: "wholesome-moment",
    number: "07",
    tag: "SOFT COMFORT",
    title: "Most wholesome moment with You ",
    date: "A Day That Felt Like Family",
    location: "Our Graduation Day",
    shortDescription: "Both our families, all our friends, and a moment that felt bigger than graduation.",
    fullStory: "Our graduation was more than just a celebration. We both met our Mathajis 😭🧡 and I even got a photo with Maami. With all our friends together and our families around, everything felt so warm and real. For a moment, it wasn't just about graduating — it felt like we were already a little family🎓",
    badge: "Safe Place",
    mediaSrc: "/photos/Slide3.7.jpeg",
    mediaType: "image",
    mediaCaption: "Peace, love, and my favourite girl.",
    showOnExpand: true,
  },
  {
    id: "first-anniversary",
    number: "08",
    tag: "365 DAYS OF US",
    title: "Our first anniversary",
    date: "365 Days Later",
    location: "Right here, loving you even more nd more nd more",
    shortDescription: "One full year and we are here, a lifetime of memories yet to live every sec wid Youuuuu .",
    fullStory: "Happy first anniversary, Kutty maaa. We’ve survived so many hard days, shed tears, faced challenges, and still found our way back to each other. No matter how difficult life gets, I’ll always be grateful that I get to face it with you by my side. One year down, forever to go, because through every storm, you’re still the girl my heart chooses, over and over again... 🤧🫂",
    badge: "Year One ♡",
    mediaSrc: "",
    mediaType: "image",
    mediaCaption: "Here's to us, today and forever.",
    showOnExpand: false,
  },
];

/**
 * Dedicated data for the "Our First Kiss" special reveal interaction
 */
export const firstKissDetails = {
  envelopePrompt: "Psst, Kutty… remember the moment everything became a little more magical? 💌",
  buttonText: "Open our first kiss memory",
  date: "That Unforgettable Evening", // e.g. "December 14, 2023"
  location: "Under the stars, right where we stood", // e.g. "By the quiet lake garden"
  title: "The Moment Time Stood Still 💋",
  story: "I remember looking into your eyes right before, wondering if you could hear my heart beating through my chest. Then you leaned in, and everything went silent. Soft, sweet, and utterly unforgettable. The world has never looked quite the same since.",
  sweetNote: "Not to be dramatic, but my brain has replayed this moment approximately a million times. ❤️",
  photoSrc: "/media/first-kiss.jpg", // Add this photo to public/media/ or use starter placeholder
  photoCaption: "The moment everything became magic.",
};
