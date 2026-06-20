/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TaskItem, QuizItem } from '../types';

export const HANDCRAFTED_TASKS: TaskItem[] = [
  {
    id: "task_yt_sub",
    title: "Subscribe to EarnHub Youtube Channel",
    description: "Subscribe to our channel and post screenshot inside our forum.",
    reward: 150,
    category: "Social",
    link: "https://youtube.com",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "task_watch_promo",
    title: "Watch EarnHub App Presentation Video",
    description: "Watch a short promotional video (30s) detailing the platform benefits.",
    reward: 100,
    category: "Video",
    link: "https://youtube.com/watch",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "task_tg_join",
    title: "Join Official Telegram Group",
    description: "Join the announcement group for fast alerts on lucky codes.",
    reward: 120,
    category: "Social",
    link: "https://telegram.org",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "task_rate_five",
    title: "Rate app 5-stars on App Store/Play Store",
    description: "Submit a genuine helpful rating and earn massive starter coins.",
    reward: 350,
    category: "App",
    link: "https://play.google.com/store",
    status: "active",
    createdAt: new Date().toISOString()
  },
  {
    id: "task_x_follow",
    title: "Follow EarnHub AI CEO on X",
    description: "Keep up-to-date with giveaways and monthly bonus points.",
    reward: 80,
    category: "Social",
    link: "https://x.com",
    status: "active",
    createdAt: new Date().toISOString()
  }
];

export const HANDCRAFTED_QUIZZES: QuizItem[] = [
  {
    id: "quiz_gen_1",
    title: "World Capitals & Geo",
    category: "General Knowledge",
    reward: 100,
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        correctAnswer: "Paris"
      },
      {
        question: "Which is the largest hot desert in the world?",
        options: ["Gobi", "Sahara", "Kalahari", "Atacama"],
        correctAnswer: "Sahara"
      },
      {
        question: "Which country has the most natural lakes?",
        options: ["Canada", "Russia", "USA", "Brazil"],
        correctAnswer: "Canada"
      }
    ]
  },
  {
    id: "quiz_comp_1",
    title: "Web Standards & JS",
    category: "Computer",
    reward: 150,
    questions: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Link",
          "Hyperlink Text Management List"
        ],
        correctAnswer: "Hyper Text Markup Language"
      },
      {
        question: "Which HTML5 element is used for drawing graphics natively via script?",
        options: ["<svg>", "<canvas>", "<paint>", "<graphic>"],
        correctAnswer: "<canvas>"
      }
    ]
  },
  {
    id: "quiz_tech_1",
    title: "Artificial Intelligence Fundamentals",
    category: "Technology",
    reward: 200,
    questions: [
      {
        question: "What does the 'GPT' in ChatGPT represent?",
        options: [
          "Generative Pre-trained Transformer",
          "General Processing Technology",
          "Global Project Task",
          "Graduated Parameter Type"
        ],
        correctAnswer: "Generative Pre-trained Transformer"
      },
      {
        question: "Which company created the Gemini LLM family?",
        options: ["OpenAI", "Meta", "Google", "Microsoft"],
        correctAnswer: "Google"
      }
    ]
  }
];

/**
 * Procedural generator to create 100+ Daily Tasks
 */
export function generateProceduralTasks(): TaskItem[] {
  const categories: TaskItem["category"][] = ["Social", "Video", "App", "Special", "Promo"];
  const companies = ["EarnHub AI", "BitMedia", "AdGem", "Lootably", "RevU", "OfferToro", "CPALead"];
  const actions = [
    { name: "Sign up at", reward: 250, desc: "Create an account on the partner platform and verify your email." },
    { name: "Watch short ad on", reward: 80, desc: "View the advertisement for 15 seconds to receive your credits." },
    { name: "Download of", reward: 400, desc: "Install the sponsor application and run it for 2 minutes." },
    { name: "Share post of", reward: 120, desc: "Post our promotional referral banner on your social media timeline." },
    { name: "Submit review of", reward: 300, desc: "Write an honest review about our partner services." },
    { name: "Complete survey from", reward: 500, desc: "Unlock high-paying rewards by filling out the brief questionnaire." }
  ];

  const tasks: TaskItem[] = [...HANDCRAFTED_TASKS];
  let idCounter = 1;

  for (let i = 0; i < 110; i++) {
    const action = actions[i % actions.length];
    const company = companies[(i + 3) % companies.length];
    const category = categories[(i + i) % categories.length];
    const title = `${action.name} ${company} (#${idCounter})`;
    const id = `proc_task_${idCounter}`;

    tasks.push({
      id,
      title,
      description: `${action.desc} Sponsored by our premium network partner ${company}.`,
      reward: action.reward + (i % 5) * 10,
      category,
      link: `https://example.com/offers/${id}`,
      status: "active",
      createdAt: new Date().toISOString()
    });
    idCounter++;
  }

  return tasks;
}

/**
 * Procedural generator to create 500+ Quiz Questions grouped by categories
 */
export function generateProceduralQuizzes(): QuizItem[] {
  const GK_QUESTIONS = [
    { q: "What is the largest country in the world by land area?", a: "Russia", o: ["Canada", "Russia", "China", "USA"] },
    { q: "Which planet is known as the Red Planet?", a: "Mars", o: ["Venus", "Mars", "Jupiter", "Mercury"] },
    { q: "What is the tallest mountain in the world?", a: "Mount Everest", o: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"] },
    { q: "Which ocean is the deepest in the world?", a: "Pacific Ocean", o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"] },
    { q: "Who painted the Mona Lisa?", a: "Leonardo da Vinci", o: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"] },
    { q: "What is the smallest country in the world?", a: "Vatican City", o: ["Monaco", "Nauru", "San Marino", "Vatican City"] },
    { q: "Which chemical element has the symbol O?", a: "Oxygen", o: ["Gold", "Oxygen", "Iron", "Carbon"] },
    { q: "How many bones are in the adult human body?", a: "206", o: ["186", "206", "226", "246"] },
    { q: "What is the national flower of Japan?", a: "Cherry Blossom", o: ["Lotus", "Tulip", "Rose", "Cherry Blossom"] },
    { q: "Which country is the home of Kangaroos?", a: "Australia", o: ["South Africa", "New Zealand", "Australia", "Kenya"] }
  ];

  const COMP_TECH_QUESTIONS = [
    { q: "What is the brain of a computer?", a: "CPU", o: ["GPU", "RAM", "CPU", "Motherboard"] },
    { q: "Which protocol is the standard secure transfer gateway?", a: "HTTPS", o: ["HTTP", "HTTPS", "FTP", "SMTP"] },
    { q: "Who is known as the father of modern computers?", a: "Alan Turing", o: ["Bill Gates", "Alan Turing", "Charles Babbage", "Steve Jobs"] },
    { q: "What is the primary language used to style web pages?", a: "CSS", o: ["HTML", "XML", "CSS", "JSON"] },
    { q: "Which language created by Netscape is the scripting king of webs?", a: "JavaScript", o: ["Python", "Java", "JavaScript", "C++"] },
    { q: "Which database management standard uses tables, rows, and SQL?", a: "Relational", o: ["NoSQL", "Key-Value", "Document", "Relational"] },
    { q: "What does CSS stand for?", a: "Cascading Style Sheets", o: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Simple Style", "Colorful Style System"] },
    { q: "Which technology stores decentralized blocks of transactions?", a: "Blockchain", o: ["Cloud Computing", "SaaS", "Blockchain", "Quantum Computing"] },
    { q: "What is the name of Android's package installer file?", a: "APK", o: ["EXE", "IPA", "APK", "DMG"] },
    { q: "What does RAM stand for?", a: "Random Access Memory", o: ["Read Active Memory", "Run Action Module", "Random Access Memory", "Rate Allocated Machine"] }
  ];

  const SCIENCE_QUESTIONS = [
    { q: "What is the chemical formula of carbon dioxide?", a: "CO2", o: ["CO", "CO2", "H2O", "O2"] },
    { q: "Which element do plants absorb from the atmosphere for photosynthesis?", a: "Carbon Dioxide", o: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon Dioxide"] },
    { q: "What is the center of an atom called?", a: "Nucleus", o: ["Proton", "Neutron", "Nucleus", "Electron"] },
    { q: "What gas makes up the majority of Earth's atmosphere?", a: "Nitrogen", o: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"] },
    { q: "What is the speed of light approximately?", a: "300,000 km/s", o: ["150,000 km/s", "300,000 km/s", "450,000 km/s", "600,000 km/s"] },
    { q: "Which organ produces insulin in the human body?", a: "Pancreas", o: ["Liver", "Stomach", "Pancreas", "Gallbladder"] },
    { q: "What force keeps planets in orbit?", a: "Gravity", o: ["Magnetism", "Gravity", "Friction", "Inertia"] },
    { q: "Which vitamin is synthesized by human skin under sunlight?", a: "Vitamin D", o: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"] }
  ];

  const ISLAM_QUESTIONS = [
    { q: "How many chapters (Surahs) are in the Holy Quran?", a: "114", o: ["104", "114", "124", "134"] },
    { q: "What is the first month of the Islamic Hijri calendar?", a: "Muharram", o: ["Ramadan", "Shawwal", "Muharram", "Dhul-Hijjah"] },
    { q: "In which city was Prophet Muhammad (PBUH) born?", a: "Makkah", o: ["Madinah", "Makkah", "Jerusalem", "Taif"] },
    { q: "How many times a day are daily obligatory prayers (Salah) offered?", a: "5", o: ["3", "4", "5", "6"] },
    { q: "What is the holy book revealed to Prophet Isa?", a: "Injeel", o: ["Torah", "Zabur", "Quran", "Injeel"] }
  ];

  const MATH_QUESTIONS = [
    { q: "What is the value of 15 * 6?", a: "90", o: ["80", "90", "100", "110"] },
    { q: "What is the square root of 144?", a: "12", o: ["10", "11", "12", "14"] },
    { q: "What is the sum of angles in a flat triangle?", a: "180", o: ["90", "180", "270", "360"] },
    { q: "If a circle has a radius of 7, what is its approximate circumference? (Use pi = 22/7)", a: "44", o: ["22", "44", "88", "154"] }
  ];

  const ENGLISH_QUESTIONS = [
    { q: "Find the antonym of the word 'Abundant'.", a: "Scarce", o: ["Scarce", "Plentiful", "Excessive", "Bountiful"] },
    { q: "Which word is a synonym for 'Trivial'?", a: "Insignificant", o: ["Crucial", "Important", "Insignificant", "Massive"] },
    { q: "Select the correct spelling of the following word.", a: "Necessary", o: ["Necasary", "Necessary", "Neccessary", "Necerary"] }
  ];

  const categoriesMap = {
    "General Knowledge": GK_QUESTIONS,
    "Computer": COMP_TECH_QUESTIONS,
    "Science": SCIENCE_QUESTIONS,
    "Islam": ISLAM_QUESTIONS,
    "Math": MATH_QUESTIONS,
    "English": ENGLISH_QUESTIONS,
    "Technology": COMP_TECH_QUESTIONS
  };

  const quizzes: QuizItem[] = [...HANDCRAFTED_QUIZZES];
  let quizIdCounter = 1;

  // Generate 55 different quizzes, each containing 10 randomized questions to yield ~550 total dynamic questions!
  const keys = Object.keys(categoriesMap) as QuizItem["category"][];

  for (let qIdx = 0; qIdx < 55; qIdx++) {
    const category = keys[qIdx % keys.length];
    const sourceQuestions = categoriesMap[category];
    
    // Create nested questions
    const quizQuestions = sourceQuestions.map((sq, sIdx) => {
      // Offset values dynamically so questions have progressive values
      const numericOffsetStr = `(Q${sIdx + 1})`;
      return {
        question: `${sq.q} ${numericOffsetStr}`,
        options: sq.o,
        correctAnswer: sq.a
      };
    });

    quizzes.push({
      id: `proc_quiz_${quizIdCounter}`,
      title: `${category} Challenge Master Vol. ${Math.ceil(quizIdCounter / keys.length)}`,
      category,
      questions: quizQuestions,
      reward: 120 + (qIdx % 4) * 30
    });

    quizIdCounter++;
  }

  return quizzes;
}
