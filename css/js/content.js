/* =====================================================
   GAME CONTENT
   Edit this file to change questions, answers and the letter.
   In each question the FIRST option is the correct one;
   options get shuffled when the game runs.
   ===================================================== */
window.GAME_CONTENT = {

  RIGHT: [
    "Correct! Someone's been paying attention 😌",
    "YESSS! 💙",
    "Look at you go, wifeey! ✨",
    "Obviously. Genius behaviour 🌙",
    "That's my girl! 🥰"
  ],

  WRONG: [
    "Hehe, nope! But I still love you 💙",
    "Plot twist: wrong! No penalty, only cuddles 🫶",
    "Oof! I forgive you instantly 😌",
    "Wrong, but you're cute so it's fine ✨",
    "Not this time, but I'm not mad 🥺"
  ],

  LEVELS: [
    { name:"Remember When?", icon:"🌧️", sub:"Back to where it all began…",
      done:["Flawless memory! 😍","Not bad at all, wifeey 😌","Cute attempt! The story's still ours 💙"],
      qs:[
        { q:"When did our little story officially begin?",
          o:["November 26, 2024","February 14, 2025","December 25, 2024","The day GTA 6 comes out"],
          right:"November 26, 2024. The best date ever 💙",
          wrong:"It was November 26, 2024. Remember that date, wifeey! 😌" },
        { q:"What was the weather like on the day we first met?",
          o:["Rainy and cold 🌧️","Burning hot ☀️","Snowing ❄️","A full tornado 🌪️"],
          right:"Rainy and cold. Basically a movie scene 🌧️🎬",
          wrong:"Rainy and cold! Very cinematic 🌧️" },
        { q:"What colour were our school uniforms when we met?",
          o:["Brown 🤎","Pink","Neon green","Full Batman suit"],
          right:"Brown uniforms, forever 🤎",
          wrong:"Brown! Cutest uniforms ever 🤎" },
        { q:"Who said \"I like u\" first?",
          o:["You did, wifeey 😌","Me","A random pigeon","Both at the exact same time"],
          right:"You did! The brave one 😌 I'm still blushing",
          wrong:"It was YOU! Brave wifeey made the first move 😌" }
      ]},

    { name:"Only We Know", icon:"🌙", sub:"Inside jokes, midnight calls and questionable violence.",
      done:["Okay you really know us 😭💙","Pretty good, wifeey! 😌","Some of these were tricky… I still love you 💙"],
      qs:[
        { q:"When you said \"I like u\", what did I reply?",
          o:["Me too","Who is this?","Let me think about it","Sorry, wrong number"],
          right:"\"Me too.\" Best two words I ever said 💙",
          wrong:"It was \"me too\"! Obviously 🥰" },
        { q:"What was the first thing I said when I saw you in that yellow dress?",
          o:["Wow","Nice weather today","Did you eat?","Hello, madam"],
          right:"WOW. And I'd say it again 💛",
          wrong:"It was \"wow\"! I was speechless 💛" },
        { q:"Our midnight calls started at 10 PM. When did they end?",
          o:["5 in the morning","11 PM","Midnight sharp","Next day noon"],
          right:"5 AM! Who needs sleep 😴🌙",
          wrong:"5 AM! We were absolute legends 🌙" },
        { q:"Who discovered our secret midnight calls and ended that era?",
          o:["Your parents 😭","My parents","The network","A ghost"],
          right:"Your parents! The end of an era 😭🕊️",
          wrong:"Your parents! RIP midnight calls 😭" },
        { q:"After I rage baited you SO badly, what did you throw at me?",
          o:["A pouch","A slipper","A pillow","Your whole bag"],
          right:"A POUCH! Direct hit 🎯😭",
          wrong:"A pouch! I still remember it 🎯😭" },
        { q:"When wifeey is annoyed, what does she say?",
          o:["\"i hate u\"","\"Please excuse me, sir\"","\"I'm so proud of you\"","\"Have a nice day\""],
          right:"\"i hate u\". Classic 😌",
          wrong:"It's always \"i hate u\" 😂💙" }
      ]},

    { name:"Guess What I'm Thinking", icon:"💭", sub:"A peek inside my brain. It's a little chaotic in here.",
      done:["You can read my mind 🔮","Good guessing, wifeey 😌","My brain is confusing, I get it 😅"],
      qs:[
        { q:"What's my favourite song?",
          o:["Annul Melae (Harris Jayaraj)","Why This Kolaveri Di","Happy Birthday","Baby Shark"],
          right:"\"Annul Melae\" 🎶 Perfect taste",
          wrong:"\"Annul Melae\" by Harris Jayaraj 🎶 Go listen right now" },
        { q:"What's my favourite video game?",
          o:["GTA 6","Minecraft","Subway Surfers","Among Us"],
          right:"GTA 6! Obviously 🎮",
          wrong:"GTA 6! Come on, wifeey 🎮😂" },
        { q:"What's my dream car?",
          o:["Mercedes-Benz G63","Auto rickshaw","Tata Nano","A bicycle with a basket"],
          right:"The G63! One day, wifeey 🚙✨",
          wrong:"The G63! One day you'll ride in it 🚙✨" },
        { q:"What's my favourite thing to do with wifeey?",
          o:["Getting beaten up by her 😭","Long peaceful walks","Cooking together","Studying quietly"],
          right:"Facts. I literally enjoy it 😭",
          wrong:"Getting beaten up by you. Yes, really 😭" }
      ]},

    { name:"How Well Do You Know Me?", icon:"🪞", sub:"Things only my wifeey should know.",
      done:["You know me better than I do 💙","Solid! Almost there 😌","I'll teach you the rest, don't worry 😘"],
      qs:[
        { q:"What's my nickname?",
          o:["Slave","Boss","Prince","King Kong"],
          right:"Slave! Reporting for duty 🫡",
          wrong:"It's \"slave\". Say it with love 😌" },
        { q:"What's my favourite thing about you?",
          o:["You're sweet and caring to me","Your cooking","How fast you walk","Your Wi-Fi password"],
          right:"Sweet and caring 🥹 Still my favourite",
          wrong:"How sweet and caring you are to me 🥹💙" },
        { q:"What do you like most about the way I am with you?",
          o:["Gentle and mature","Loud and chaotic","Extremely lazy","Rage baiting you all day"],
          right:"Gentle and mature (when I'm not rage baiting you 😅)",
          wrong:"Gentle and mature! I try 😅💙" },
        { q:"Which of these does wifeey NEVER say?",
          o:["\"Good evening sir, how may I assist you?\"","\"i love you sm\"","\"u so hott\"","\"ur the best hon\""],
          right:"Correct! The others? 100% you 😌",
          wrong:"That one's real! The formal line is the fake 😂" }
      ]},

    { name:"The Final Challenge", icon:"💫", sub:"The ones that matter most.",
      done:["You passed with love 💙","Beautiful, wifeey 🥹","Every answer was perfect to me 💙"],
      qs:[
        { q:"Every time I felt low, got scolded by my parents or felt ignored by my friends, who stayed with me?",
          o:["You, wifeey 💙","A random pigeon","My G63 (in my dreams)","Harris Jayaraj"],
          right:"You. Only you. Thank you for always staying 💙",
          wrong:"It was YOU. You stayed every single time 🥹💙" },
        { q:"Today is our ___ anniversary!",
          o:["2nd 🎉","1st","50th","Wait, we have an anniversary?!"],
          right:"Two years, wifeey! 🎉💙",
          wrong:"Two years today! 🎉💙" },
        { q:"In every version of this little game, who would I choose?",
          o:["You","Wifeey","My girlfriend","The one who threw the pouch"],
          all:true,
          right:"Every answer is correct. It's always you 💙" }
      ]}
  ],

  /* ===== YOUR SECRET LETTER ===== */
  LETTER: {
    title: "Happy 2nd Anniversary, wifeey 💙",
    date: "November 26, 2024 → forever",
    paras: [
      "It started on a rainy, cold day at school, both of us in our brown uniforms. You were the brave one. You said \"I like u\" first, and I said \"me too.\" I've meant it every single day since.",
      "Then came the yellow dress. One look and all I could say was \"wow.\" (Still the right word, by the way.)",
      "Then the midnight calls, from 10 at night until 5 in the morning, for two whole weeks, until your parents found out. Worth every sleepless minute. 😌",
      "Thank you for every \"aww\" and every \"i love you sm\". And yes, even for the \"i hate u\", the \"eruma maadu\", and the pouch you threw at me. I rage baited you, I had it coming. And honestly, getting beaten up by you is still my favourite thing to do. 😭",
      "But what I'll never forget is this: every time I felt low, every time my parents scolded me, every time my friends ignored me, you were the only one who stayed. That's why your sweetness and care is my favourite thing about you. I'll keep trying to be the gentle, mature one you like.",
      "So no matter what your score was today, here's the truth:"
    ],
    key: "I'd still choose you in every version of this little game.",
    sign: "Happy anniversary, wifeey. I love you. 💙<br>Your slave"
  }
};
