import React, { useState, useEffect, useRef } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';
import { VisualVariant } from '../components/LessonVisual';
// Removed LessonBackground import as requested to remove the coffee background

// -- GAMIFICATION TYPES --
type StepType = 'content' | 'quiz';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface LessonStep {
  type: StepType;
  // Content props
  sectionTitle?: string;
  sectionSubtitle?: string;
  label?: string;
  content?: string | string[];
  theme?: string;
  vocab?: VocabItem[];
  visualVariant?: VisualVariant; 
  videoUrl?: string;
  bgVariant?: any; // Kept in type definition to avoid breaking existing data structure, but unused in render
  // Quiz props
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

// -- DATA BUILDER --
const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];
  // Helper
  const addContent = (data: any) => steps.push({ type: 'content', ...data });
  const addQuiz = (data: any) => steps.push({ type: 'quiz', ...data });

  // PAGE 0: Lead-In
  addContent({
    sectionTitle: "Lead-In",
    sectionSubtitle: "Visualizing the Conflict",
    label: "Scenario",
    visualVariant: "coffee-cup",
    content: "Imagine your favorite local coffee spot. Now imagine it turned into a generic chain store. This transformation is happening globally, sparking a debate about **identity** versus **convenience**.",
    theme: "indigo",
    vocab: [
      { term: "identity", ru: "идентичность / самобытность", uz: "o'zlik / shaxsiyat" },
      { term: "convenience", ru: "удобство", uz: "qulaylik" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What transformation is described in the scenario?",
    options: ["Local spots becoming chains", "Chains becoming local", "Coffee becoming tea"],
    correctAnswer: 0,
    explanation: "The scenario asks you to imagine a local spot turning into a generic chain store."
  });
  addQuiz({
    question: "What two concepts are in conflict?",
    options: ["Tea vs Coffee", "Identity vs Convenience", "Day vs Night"],
    correctAnswer: 1,
    explanation: "The text explicitly mentions the debate about 'identity versus convenience'."
  });
  // Vocab Quizzes
  addQuiz({
    question: "What does 'identity' refer to in this context?",
    options: ["A passport number", "The unique character or soul of a place", "A password"],
    correctAnswer: 1,
    explanation: "Here, identity refers to the unique 'soul' or character of the local cafe that makes it special."
  });
  addQuiz({
    question: "What implies 'convenience'?",
    options: ["Something difficult", "The quality of being easy to use or access", "Something expensive"],
    correctAnswer: 1,
    explanation: "Chains are often preferred because they are convenient (predictable, fast, and easy to find)."
  });

  // PAGE 1: Intro
  addContent({
    sectionTitle: "Mission Start",
    sectionSubtitle: "The Coffee Wars",
    label: "Task 2 Analysis",
    visualVariant: "blueprint",
    videoUrl: "https://cdn.notebooklm.google.com/notebooklm-generated-audio-video/18a0030a-2487-4d7a-8531-18e3848b8989.mp4",
    content: "Welcome, Agent. Your target is a Band 9 Essay regarding the threat of global coffee chains. We will **deconstruct** the argument piece by piece to understand its **structure**.",
    theme: "indigo",
    vocab: [
      { term: "deconstruct", ru: "деконструировать", uz: "tarkibiy qismlarga ajratmoq" },
      { term: "structure", ru: "структура", uz: "tuzilish" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the main goal of this mission?",
    options: ["To learn how to brew coffee", "To analyze a Band 9 essay structure", "To open a coffee shop"],
    correctAnswer: 1,
    explanation: "The lesson focuses on deconstructing an essay to understand how high-scoring arguments are built."
  });
  addQuiz({
    question: "Why do we 'deconstruct' the argument?",
    options: ["To confuse the reader", "To copy it exactly", "To understand how the pieces fit together"],
    correctAnswer: 2,
    explanation: "Deconstruction allows us to see the internal logic and framework of the essay."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What does 'deconstruct' mean in an academic context?",
    options: ["To destroy completely", "To analyze by breaking into parts", "To build something new"],
    correctAnswer: 1,
    explanation: "To deconstruct an essay means to break it down into its components (intro, body, etc.) to understand how it works."
  });
  // Quiz for Word 2
  addQuiz({
    question: "Why is 'structure' critical for Band 9?",
    options: ["It makes the essay longer", "It organizes ideas logically (Coherence)", "It uses more paper"],
    correctAnswer: 1,
    explanation: "Structure refers to the logical organization. Without it, even good ideas are confusing."
  });

  // PAGE 2: Context
  addContent({
    sectionTitle: "Introduction",
    sectionSubtitle: "Setting the Scene",
    label: "Global Context",
    visualVariant: "radar",
    content: [
      "The **proliferation** of global coffee chains has transformed city landscapes.",
      "It is **undeniable** that they create jobs, but at what cost?"
    ],
    theme: "blue",
    vocab: [
      { term: "proliferation", ru: "распространение (быстрый рост)", uz: "tez ko'payish / keng tarqalish" },
      { term: "undeniable", ru: "неоспоримый", uz: "inkor etib bo'lmaydigan" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What phenomenon has transformed city landscapes?",
    options: ["The decrease in coffee drinking", "The rapid spread of global coffee chains", "The ban on coffee"],
    correctAnswer: 1,
    explanation: "The text mentions the 'proliferation' (rapid spread) of chains like Starbucks as the transformative force."
  });
  addQuiz({
    question: "Does the writer admit any positive aspects of chains?",
    options: ["No, they are 100% bad", "Yes, they undeniably create jobs", "The writer is unsure"],
    correctAnswer: 1,
    explanation: "The phrase 'It is undeniable that they create jobs' is a concession—admitting a positive point before arguing against it."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What is 'proliferation'?",
    options: ["A slow decline", "A rapid increase in numbers", "A type of coffee"],
    correctAnswer: 1,
    explanation: "Proliferation refers to rapid multiplication or spread, like Starbucks popping up on every corner."
  });
  // Quiz for Word 2
  addQuiz({
    question: "If something is 'undeniable', it is...",
    options: ["Open to debate", "True and impossible to argue against", "False"],
    correctAnswer: 1,
    explanation: "Using 'undeniable' is a strong way to state a fact or concession."
  });

  // PAGE 3: Visual Concept
  addContent({
    sectionTitle: "Concept Map",
    sectionSubtitle: "Local vs Global",
    label: "The Contrast",
    visualVariant: "clones",
    content: [
      "**Local**: Unique, soulful, community hub.",
      "**Global**: **Standardized**, **efficient**, impersonal."
    ],
    theme: "purple",
    vocab: [
      { term: "standardized", ru: "стандартизированный", uz: "standartlashtirilgan" },
      { term: "efficient", ru: "эффективный", uz: "samarali" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "How are Global chains described in this contrast?",
    options: ["Unique and soulful", "Standardized and impersonal", "Slow and messy"],
    correctAnswer: 1,
    explanation: "Global chains focus on efficiency and standardization, often sacrificing unique character."
  });
  addQuiz({
    question: "What is a key characteristic of Local cafes mentioned here?",
    options: ["They are efficient", "They are community hubs", "They are impersonal"],
    correctAnswer: 1,
    explanation: "Local cafes are highlighted as 'community hubs', serving a social function beyond just selling coffee."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What is the key feature of a 'standardized' business?",
    options: ["Every shop is different", "Every shop follows the exact same rules/design", "It is messy"],
    correctAnswer: 1,
    explanation: "Standardization means uniformity. A Big Mac tastes the same in London and Tokyo."
  });
  // Quiz for Word 2
  addQuiz({
    question: "Why is 'efficient' usually positive in business?",
    options: ["It wastes time", "It achieves maximum productivity with minimum wasted effort", "It is slow"],
    correctAnswer: 1,
    explanation: "Chains are successful because they are efficient—they serve many customers quickly."
  });

  // PAGE 4: Thesis
  addContent({
    sectionTitle: "Critical Hit",
    sectionSubtitle: "The Thesis",
    label: "Strong Opinion",
    visualVariant: "target",
    content: "**I strongly agree** that their **aggressive** market presence poses a **profound** threat.",
    theme: "red",
    vocab: [
      { term: "profound", ru: "глубокий / серьезный", uz: "chuqur / jiddiy" },
      { term: "aggressive", ru: "агрессивный / напористый", uz: "tajovuzkor / shiddatli" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the writer's position?",
    options: ["Neutral", "Strongly Agree", "Strongly Disagree"],
    correctAnswer: 1,
    explanation: "The text explicitly states 'I strongly agree' that chains are a threat."
  });
  addQuiz({
    question: "How is the market presence of chains described?",
    options: ["Passive", "Aggressive", "Friendly"],
    correctAnswer: 1,
    explanation: "The writer characterizes their expansion as 'aggressive', implying forceful competition."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What does a 'profound' threat imply?",
    options: ["A shallow, minor problem", "A deep, intense, and far-reaching problem", "A funny problem"],
    correctAnswer: 1,
    explanation: "Profound means going far beneath the surface. It is a 'Level 10' word for seriousness."
  });
  // Quiz for Word 2
  addQuiz({
    question: "What does 'aggressive' market presence mean?",
    options: ["They are polite", "They expand forcefully and competitively", "They are shy"],
    correctAnswer: 1,
    explanation: "Aggressive in business means pushing hard to win, often crushing competitors."
  });

  // PAGE 5: BP1 Start
  addContent({
    sectionTitle: "Battleground 1",
    sectionSubtitle: "Economic Scale",
    label: "Unfair Fight",
    visualVariant: "scale",
    content: "The **economic scale** of chains creates an **unfair competitive advantage**.",
    theme: "red",
    vocab: [
      { term: "competitive advantage", ru: "конкурентное преимущество", uz: "raqobat ustunligi" },
      { term: "economic scale", ru: "экономический масштаб", uz: "iqtisodiy miqyos" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the primary economic issue identified?",
    options: ["Bad coffee", "Unfair competitive advantage due to scale", "Lack of customers"],
    correctAnswer: 1,
    explanation: "The sheer size (scale) of the chains gives them an advantage that small shops cannot match fairly."
  });
  addQuiz({
    question: "Why is this considered an 'unfair fight'?",
    options: ["Because chains cheat", "Because the difference in economic power is too vast", "Because locals are lazy"],
    correctAnswer: 1,
    explanation: "The structural advantage of 'economic scale' makes the competition inherently unbalanced."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What is a 'competitive advantage'?",
    options: ["Something that helps you lose", "A condition that puts a company in a superior position", "A fair game"],
    correctAnswer: 1,
    explanation: "It is the 'edge' that allows one company to beat another (e.g., lower prices)."
  });
  // Quiz for Word 2
  addQuiz({
    question: "What does 'economic scale' refer to?",
    options: ["The weight of money", "The massive size and financial power of a company", "A weighing machine"],
    correctAnswer: 1,
    explanation: "Large scale allows for efficiencies (Economies of Scale) that small shops cannot match."
  });

  // PAGE 6: Evidence
  addContent({
    sectionTitle: "Evidence",
    sectionSubtitle: "Bulk Buying",
    label: "The Mechanism",
    visualVariant: "crate",
    content: "Chains buy in **bulk**, lowering costs. This **drastically** lowers their operational costs compared to small cafes.",
    theme: "red",
    vocab: [
      { term: "bulk", ru: "опт / большой объем", uz: "ulgurji / katta hajm" },
      { term: "drastically", ru: "радикально / резко", uz: "keskin / tubdan" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "How do chains lower their costs?",
    options: ["By stealing ingredients", "By buying in bulk", "By selling less coffee"],
    correctAnswer: 1,
    explanation: "Bulk purchasing (buying huge amounts at once) allows them to negotiate much lower prices per unit."
  });
  addQuiz({
    question: "What is the impact on operational costs?",
    options: ["They increase slightly", "They decrease drastically", "They stay the same"],
    correctAnswer: 1,
    explanation: "The text states that bulk buying 'drastically lowers' operational costs."
  });
  // Quiz for Word 1
  addQuiz({
    question: "Buying in 'bulk' means...",
    options: ["Buying one item at a time", "Buying huge quantities at once", "Buying expensive things"],
    correctAnswer: 1,
    explanation: "Bulk buying is the secret to low prices. It's cheaper to buy 1 million cups than 100 cups."
  });
  // Quiz for Word 2
  addQuiz({
    question: "What is the synonym for 'drastically'?",
    options: ["Slightly", "Severely / Extremely", "Slowly"],
    correctAnswer: 1,
    explanation: "Drastically indicates a very strong, noticeable change."
  });

  // PAGE 7: Result
  addContent({
    sectionTitle: "Consequence",
    sectionSubtitle: "Price Wars",
    label: "Thin Margins",
    visualVariant: "coins",
    content: "With **thin profit margins**, locals cannot match the prices. The **financial power** of giants wins.",
    theme: "red",
    vocab: [
      { term: "thin profit margins", ru: "низкая маржа прибыли", uz: "kichik foyda marjasi" },
      { term: "financial power", ru: "финансовая мощь", uz: "moliyaviy qudrat" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "Why can't local cafes match the prices?",
    options: ["They don't want to", "They have thin profit margins", "They prefer charging more"],
    correctAnswer: 1,
    explanation: "Locals make very little profit per cup (thin margins), so they cannot afford to lower prices like chains can."
  });
  addQuiz({
    question: "What ultimately decides the winner in this scenario?",
    options: ["The quality of coffee", "Financial power", "Customer loyalty"],
    correctAnswer: 1,
    explanation: "The essay argues that the 'financial power' of the giants is the deciding factor in forcing locals out."
  });
  // Quiz for Word 1
  addQuiz({
    question: "If margins are 'thin', what does it mean?",
    options: ["You are making a lot of money", "You make very little profit on each item sold", "You are losing weight"],
    correctAnswer: 1,
    explanation: "Thin margins mean you are fragile. One bad month can destroy your business."
  });
  // Quiz for Word 2
  addQuiz({
    question: "Financial power refers to...",
    options: ["Physical strength", "Access to large amounts of money/capital", "Political voting"],
    correctAnswer: 1,
    explanation: "Starbucks has billions in the bank; a local shop has thousands. That is the power gap."
  });

  // PAGE 8: BP2 Start
  addContent({
    sectionTitle: "Battleground 2",
    sectionSubtitle: "Culture",
    label: "Homogenization",
    visualVariant: "gray-wash",
    content: "Dominance leads to **homogenization**, **eroding** the unique character of cities.",
    theme: "green",
    vocab: [
      { term: "homogenization", ru: "однородность (устранение различий)", uz: "bir xillashtirish" },
      { term: "eroding", ru: "разрушающий / размывающий", uz: "yemiruvchi" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the cultural consequence of chain dominance?",
    options: ["Increased diversity", "Homogenization", "Better architecture"],
    correctAnswer: 1,
    explanation: "Dominance leads to everything looking the same, which is called homogenization."
  });
  addQuiz({
    question: "What happens to the 'unique character' of cities?",
    options: ["It is enhanced", "It is preserved", "It is eroded"],
    correctAnswer: 2,
    explanation: "The unique character is slowly worn away or destroyed (eroded) by the uniform chains."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What does 'homogenization' resulting from chains mean?",
    options: ["Making cities diverse", "Making all cities look the same", "Making milk"],
    correctAnswer: 1,
    explanation: "In culture, it means the loss of unique local differences. Everything becomes uniform."
  });
  // Quiz for Word 2
  addQuiz({
    question: "What does 'eroding' imply?",
    options: ["Building up", "Slowly wearing away or destroying", "Painting"],
    correctAnswer: 1,
    explanation: "Like water erodes rock, corporate chains slowly wear away local culture."
  });

  // PAGE 9: DNA
  addContent({
    sectionTitle: "Metaphor",
    sectionSubtitle: "City DNA",
    label: "Identity",
    visualVariant: "dna",
    content: "Chains are **uniform**; locals reflect the **distinct flavour** of the neighborhood.",
    theme: "green",
    vocab: [
      { term: "distinct flavour", ru: "особый колорит / вкус", uz: "o'ziga xos ta'm / muhit" },
      { term: "uniform", ru: "единообразный", uz: "bir xil / yagona shakldagi" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "How are chains described in terms of appearance/experience?",
    options: ["Distinct", "Uniform", "Random"],
    correctAnswer: 1,
    explanation: "Chains are 'uniform', meaning they are the same everywhere."
  });
  addQuiz({
    question: "What do local cafes reflect?",
    options: ["Corporate guidelines", "The distinct flavour of the neighborhood", "Global trends"],
    correctAnswer: 1,
    explanation: "Locals are unique; they mirror the specific culture and vibe of their specific location."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What does 'distinct flavour' mean metaphorically?",
    options: ["The taste of the coffee", "The unique atmosphere or character of a place", "A bad smell"],
    correctAnswer: 1,
    explanation: "It refers to the special 'vibe' or character that makes Paris feel different from New York."
  });
  // Quiz for Word 2
  addQuiz({
    question: "If something is 'uniform', it is...",
    options: ["Different every time", "The same everywhere", "Clothing"],
    correctAnswer: 1,
    explanation: "Uniformity is the opposite of uniqueness."
  });

  // PAGE 10: Social
  addContent({
    sectionTitle: "Social Impact",
    sectionSubtitle: "Community Hubs",
    label: "Loss of Connection",
    visualVariant: "hub",
    content: "Locals act as a **community hub**; Chains are designed for **efficient turnover**.",
    theme: "green",
    vocab: [
      { term: "turnover", ru: "оборот (сменяемость клиентов)", uz: "mijozlar almashinuvi" },
      { term: "community hub", ru: "центр сообщества", uz: "jamiyat markazi" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What function do local cafes often serve?",
    options: ["Just a shop", "A community hub", "A factory"],
    correctAnswer: 1,
    explanation: "They act as gathering places where people connect, serving a social function."
  });
  addQuiz({
    question: "What are chains primarily designed for?",
    options: ["Socializing", "Efficient turnover", "Hosting events"],
    correctAnswer: 1,
    explanation: "Their design goal is speed—getting customers in and out (turnover) to maximize profit."
  });
  // Quiz for Word 1
  addQuiz({
    question: "What is 'turnover' in a cafe context?",
    options: ["A pastry", "The rate at which customers enter, buy, and leave", "Turning around"],
    correctAnswer: 1,
    explanation: "High turnover means getting people in and out fast to make more money."
  });
  // Quiz for Word 2
  addQuiz({
    question: "A 'community hub' is...",
    options: ["A place where people gather and connect", "A tire shop", "A quiet place"],
    correctAnswer: 0,
    explanation: "Hubs are central points of connection. Local cafes often host the social life of a neighborhood."
  });

  // PAGE 11: Conclusion
  addContent({
    sectionTitle: "The Verdict",
    sectionSubtitle: "Final Judgment",
    label: "Guilty",
    visualVariant: "gavel",
    content: "The threat is **harmful**. We must **justify** protecting local diversity.",
    theme: "yellow",
    vocab: [
      { term: "harmful", ru: "вредный / пагубный", uz: "zararli" },
      { term: "justify", ru: "оправдывать / обосновывать", uz: "oqlamoq / asoslamoq" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the final verdict on the threat?",
    options: ["It is beneficial", "It is harmful", "It is negligible"],
    correctAnswer: 1,
    explanation: "The conclusion clearly states that the threat posed by chains is 'harmful'."
  });
  addQuiz({
    question: "What action is necessary according to the text?",
    options: ["Ignoring the problem", "Justifying the protection of local diversity", "Helping chains grow"],
    correctAnswer: 1,
    explanation: "We need to provide reasons (justify) for why preserving local cafes matters."
  });
  // Quiz for Word 1
  addQuiz({
    question: "Synonym for 'harmful'?",
    options: ["Beneficial", "Damaging / Detrimental", "Neutral"],
    correctAnswer: 1,
    explanation: "Harmful means causing injury, in this case to the economy and culture."
  });
  // Quiz for Word 2
  addQuiz({
    question: "To 'justify' means to...",
    options: ["Apologize", "Provide a valid reason or explanation", "Ignore"],
    correctAnswer: 1,
    explanation: "In an essay, you must justify your opinion with reasons."
  });

  // PAGE 12: Future
  addContent({
    sectionTitle: "Final Thought",
    sectionSubtitle: "Prediction",
    label: "The Future",
    visualVariant: "horizon",
    content: "If unchecked, we face the **consequence** of losing our cities' **character**.",
    theme: "purple",
    vocab: [
      { term: "consequence", ru: "последствие", uz: "oqibat" },
      { term: "character", ru: "характер / индивидуальность", uz: "xarakter / o'ziga xoslik" }
    ]
  });
  // Content Quizzes
  addQuiz({
    question: "What is the condition for this negative future?",
    options: ["If we stop drinking coffee", "If the trend goes unchecked", "If we build more parks"],
    correctAnswer: 1,
    explanation: "The negative outcome will happen if we do nothing ('if unchecked')."
  });
  addQuiz({
    question: "What are we at risk of losing?",
    options: ["Our money", "The city's character", "Our time"],
    correctAnswer: 1,
    explanation: "The ultimate risk is the loss of the unique personality or 'character' of our urban environments."
  });
  // Quiz for Word 1
  addQuiz({
    question: "A 'consequence' is...",
    options: ["A result or effect of an action", "A cause", "A beginning"],
    correctAnswer: 0,
    explanation: "The consequence is what happens *because* of the action (e.g., losing culture because of chains)."
  });
  // Quiz for Word 2
  addQuiz({
    question: "When a city has 'character', it has...",
    options: ["Many letters", "A distinctive and interesting personality", "Actors"],
    correctAnswer: 1,
    explanation: "Character refers to the unique qualities that make a place special."
  });

  // --- PRACTICE PHASE ---

  // 1. INTRO WRITING LAB (3 Pages)
  addQuiz({
    question: "Writing Lab (Intro): Which is the best paraphrase of 'The rapid spread of coffee chains'?",
    options: ["Coffee shops are everywhere", "The proliferation of multinational coffee corporations", "There are too many Starbucks"],
    correctAnswer: 1,
    explanation: "Band 9 requires academic vocabulary. 'Proliferation' and 'Multinational corporations' are precise terms that elevate the tone immediately."
  });
  addQuiz({
    question: "Writing Lab (Intro): Select the strongest Thesis Statement for this essay.",
    options: ["I agree they are bad.", "I strongly agree that their aggressive market dominance poses a significant threat to local culture.", "They are good for jobs but bad for culture."],
    correctAnswer: 1,
    explanation: "Option B is nuanced, strong, and clearly answers the 'To what extent' part of the prompt with specific reasons (market dominance, threat)."
  });
  addQuiz({
    question: "Writing Lab (Intro): What is the correct order for an Introduction?",
    options: ["Thesis -> Roadmap -> Hook", "Hook (Context) -> Thesis (Opinion) -> Roadmap (Outline)", "Roadmap -> Thesis -> Hook"],
    correctAnswer: 1,
    explanation: "Start broad with the context (Hook), state your position clearly (Thesis), and then tell the reader what the essay will cover (Roadmap)."
  });

  // 2. VOCABULARY DRILL (3 Pages)
  addQuiz({
    question: "Vocab Drill: Choose the correct sentence using 'Homogenization'.",
    options: ["The homogenization of the milk was tasty.", "The homogenization of city centers leads to a loss of cultural identity.", "I want to homogenization my coffee."],
    correctAnswer: 1,
    explanation: "In an essay context, homogenization refers to the process of making things uniform or identical, often used negatively regarding culture."
  });
  addQuiz({
    question: "Vocab Drill: Which word pairs best with 'Competitive'?",
    options: ["Competitive help", "Competitive advantage", "Competitive kindness"],
    correctAnswer: 1,
    explanation: "'Competitive advantage' is a standard business collocation describing a condition that puts a company in a superior position."
  });
  addQuiz({
    question: "Vocab Drill: Select the synonym for 'Undeniable'.",
    options: ["Debatable", "Indisputable", "Possible"],
    correctAnswer: 1,
    explanation: "Undeniable means it cannot be questioned. 'Indisputable' is a high-level academic synonym perfect for essay writing."
  });

  // 3. BODY PARAGRAPH WORKSHOP (3 Pages)
  addQuiz({
    question: "Paragraph Workshop: Choose the best Topic Sentence for the paragraph about Economic Scale.",
    options: ["Starbucks is rich.", "The economic scale of international chains creates an unfair competitive advantage.", "Money is the problem."],
    correctAnswer: 1,
    explanation: "A good Topic Sentence introduces the main idea (Economic Scale) and the specific argument (Unfair Advantage) clearly and formally."
  });
  addQuiz({
    question: "Paragraph Workshop: Which sentence provides the best 'Explanation' (PEEL)?",
    options: ["They buy in bulk.", "This is because bulk purchasing allows them to lower operational costs drastically.", "Coffee beans are cheap."],
    correctAnswer: 1,
    explanation: "Option B explains the 'Why' and the 'How'. It connects the cause (bulk purchasing) to the effect (lower costs) using cohesive language."
  });
  addQuiz({
    question: "Paragraph Workshop: Select the transition word to introduce a contrasting point.",
    options: ["Furthermore", "However", "Therefore"],
    correctAnswer: 1,
    explanation: "'However' signals a shift in direction or a contrast. 'Furthermore' adds to the same point, and 'Therefore' concludes it."
  });

  // 4. GRAMMAR DOJO (3 Pages)
  addQuiz({
    question: "Grammar Dojo: Convert to Passive Voice for objectivity: 'Chains destroy local culture'.",
    options: ["Local culture is eroded by the dominance of chains.", "Chains are destroying culture.", "Culture is bad."],
    correctAnswer: 0,
    explanation: "Passive voice ('is eroded by') places the focus on the victim (culture) rather than the actor (chains), sounding more academic and objective."
  });
  addQuiz({
    question: "Grammar Dojo: Which sentence uses Nominalization (turning verbs into nouns) correctly?",
    options: ["Cities are becoming the same.", "The homogenization of urban environments is a concern.", "It is concerning that cities homogenize."],
    correctAnswer: 1,
    explanation: "Nominalization ('The homogenization') makes writing more dense and academic than using simple verbs ('becoming the same')."
  });
  addQuiz({
    question: "Grammar Dojo: Fix the reference. 'Chains are big. This makes them powerful.' -> ?",
    options: ["Chains are big and powerful.", "The immense scale of these corporations grants them significant power.", "This is power."],
    correctAnswer: 1,
    explanation: "Option B replaces simple pronouns ('This', 'them') with specific nouns ('immense scale', 'corporations'), improving clarity and cohesion."
  });

  // --- NEW SECTION: 2023-2024 EXAM TOPICS ---

  addContent({
    sectionTitle: "New Challenge",
    sectionSubtitle: "2023-2024 Exam Topics",
    label: "Surgical Analysis",
    visualVariant: "target", 
    content: "We will now apply the **Invisible Step** to recent exam questions. Identify the **trap** in the prompt before writing.",
    theme: "red"
  });

  // TOPIC 1: MEDIA & NEWS
  addContent({
    sectionTitle: "Topic: Media (April 2024)",
    sectionSubtitle: "The Invisible Step",
    label: "Analysis",
    visualVariant: "radar",
    content: "**Question:** Some think national news is **more important** than international news... Discuss both sides.\n\n**The Trap:** The comparison word '**more important**'. You cannot just list benefits; you must compare values.",
    theme: "blue",
    vocab: [
      { term: "prioritize", ru: "расставлять приоритеты", uz: "ustuvor qo'ymoq" },
      { term: "interconnected", ru: "взаимосвязанный", uz: "o'zaro bog'liq" }
    ]
  });

  // Ex 1
  addQuiz({
    question: "Vocab: Which verb collocations with 'local issues'?",
    options: ["Impact local issues", "Cover local issues", "Broaden local issues"],
    correctAnswer: 1,
    explanation: "Journalists 'cover' (report on) issues. This is a standard media collocation."
  });
  // Ex 2
  addQuiz({
    question: "Trap Check: Is this a good plan? 'Para 1: National news is good. Para 2: International news is good.'",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. The prompt asks which is *more* important. You must argue relative value (e.g., X is crucial for Y, while Z is crucial for Q)."
  });
  // Ex 3
  addQuiz({
    question: "Planning: Which structure is best?",
    options: ["List random facts about news", "Body 1: Why some prioritize National. Body 2: Why others value International. Conclusion: Weighted opinion."],
    correctAnswer: 1,
    explanation: "This structure ensures you cover 'Discuss Both Sides' and clearly present the conflict before giving your opinion."
  });
  // Ex 4
  addQuiz({
    question: "Ideation: Which argument is IRRELEVANT to 'Importance'?",
    options: ["International news is often depressing.", "National news impacts daily laws/taxes.", "Global pandemics affect local safety."],
    correctAnswer: 0,
    explanation: "Whether news is sad or happy doesn't make it less 'important'. Focus on impact/necessity."
  });
  // Ex 5
  addQuiz({
    question: "Thesis: 'This essay will argue that domestic and global affairs are _________.'",
    options: ["mutually exclusive", "interdependent / equally vital", "boring"],
    correctAnswer: 1,
    explanation: "A strong Band 9 thesis often finds the synthesis. In a global world, local and global affect each other."
  });

  // TOPIC 2: UNIFORMS
  addContent({
    sectionTitle: "Topic: Uniforms (Jan 2024)",
    sectionSubtitle: "The Invisible Step",
    label: "Analysis",
    visualVariant: "clones",
    content: "**Question:** Mandatory uniforms. Do advantages **outweigh** disadvantages?\n\n**The Trap:** '**Outweigh**'. You must explicitly state if benefits are *stronger* than drawbacks, not just list them.",
    theme: "indigo",
    vocab: [
      { term: "mandatory", ru: "обязательный", uz: "majburiy" },
      { term: "suppress", ru: "подавлять", uz: "bostirmoq" }
    ]
  });
  // Ex 1
  addQuiz({
    question: "Vocab: Which is NOT a correct synonym for 'mandatory' in this context?",
    options: ["Compulsory", "Obligatory", "Essential"],
    correctAnswer: 2,
    explanation: "'Essential' means needed/important. 'Mandatory' means required by rule/law. They are not the same."
  });
  // Ex 2
  addQuiz({
    question: "Ideation: 'Suppresses individuality and self-expression' is an...",
    options: ["Advantage", "Disadvantage", "Neutral fact"],
    correctAnswer: 1,
    explanation: "This is the primary argument against uniforms."
  });
  // Ex 3
  addQuiz({
    question: "Structure: Which conclusion is better?",
    options: ["There are pros and cons.", "While loss of expression is a drawback, the social equality provided is far more significant."],
    correctAnswer: 1,
    explanation: "You must weigh the sides. 'More significant' directly answers the 'Outweigh' instruction."
  });
  // Ex 4
  addQuiz({
    question: "Result Link: 'Uniforms remove visible economic differences...' -> Result?",
    options: ["...therefore children can express themselves.", "...consequently, bullying based on clothing brands is reduced.", "...so it is cheaper."],
    correctAnswer: 1,
    explanation: "The logical result of removing visible wealth markers is a reduction in discrimination/bullying."
  });
  // Ex 5
  addQuiz({
    question: "Cohesion: 'Critics argue uniforms limit expression. _____, proponents claim school is for learning.'",
    options: ["Furthermore", "However", "Therefore"],
    correctAnswer: 1,
    explanation: "You need a contrast marker to switch from Critics (Con) to Proponents (Pro)."
  });

  // TOPIC 3: AMBITION
  addContent({
    sectionTitle: "Topic: Ambition (Jan 2024)",
    sectionSubtitle: "The Invisible Step",
    label: "Analysis",
    visualVariant: "scale",
    content: "**Question:** 1) How important is it? 2) Is it positive or negative?\n\n**The Trap:** This is a **Two-Part Question**. You MUST answer both. Missing one limits you to Band 5.",
    theme: "yellow",
    vocab: [
      { term: "prerequisite", ru: "предпосылка / необходимое условие", uz: "zaruriy shart" },
      { term: "drive", ru: "стремление / драйв", uz: "intilish" }
    ]
  });
  // Ex 1
  addQuiz({
    question: "Vocab: What does 'Ambition' mean here?",
    options: ["Greed for money", "A strong desire and determination to achieve success", "Working overtime"],
    correctAnswer: 1,
    explanation: "Ambition is the internal drive, not just the act of working."
  });
  // Ex 2
  addQuiz({
    question: "Planning: How to structure the body paragraphs?",
    options: ["BP1: Pros/Cons. BP2: Conclusion.", "BP1: Answer 'How important?'. BP2: Answer 'Positive or Negative?'."],
    correctAnswer: 1,
    explanation: "Address each question in the prompt in its own dedicated section for clarity."
  });
  // Ex 3
  addQuiz({
    question: "Ideation: Which word implies the STRONGEST level of importance?",
    options: ["Optional", "Beneficial", "Prerequisite"],
    correctAnswer: 2,
    explanation: "A prerequisite is something that *must* happen. It is stronger than just 'beneficial'."
  });
  // Ex 4
  addQuiz({
    question: "Ideation: Valid negative argument?",
    options: ["It makes people lazy.", "It can lead to burnout, unethical behavior, and neglect of relationships."],
    correctAnswer: 1,
    explanation: "Unchecked ambition often comes at a personal or ethical cost."
  });
  // Ex 5
  addQuiz({
    question: "Thesis: Select the best Two-Part thesis.",
    options: ["Ambition is good.", "I believe ambition is a prerequisite for success, and fundamentally positive despite risks of burnout."],
    correctAnswer: 1,
    explanation: "This answers Q1 (Prerequisite/Important) and Q2 (Positive) clearly."
  });

  // TOPIC 4: HOLIDAYS
  addContent({
    sectionTitle: "Topic: Holidays (Feb 2023)",
    sectionSubtitle: "The Invisible Step",
    label: "Analysis",
    visualVariant: "coins", 
    content: "**Question:** 4 weeks holiday to make employees **better at work**.\n\n**The Trap:** The Reason. You must discuss if holidays improve **productivity/performance**, not just if they are fun.",
    theme: "green",
    vocab: [
      { term: "productivity", ru: "продуктивность", uz: "ish unumdorligi" },
      { term: "burnout", ru: "выгорание", uz: "holdan toyish" }
    ]
  });
  // Ex 1
  addQuiz({
    question: "Vocab: Specific term for 'better at work'?",
    options: ["Happier", "Increased Productivity / Efficiency", "Richer"],
    correctAnswer: 1,
    explanation: "Use business terminology like 'productivity' or 'performance' to show Lexical Resource."
  });
  // Ex 2
  addQuiz({
    question: "Relevance: Which argument supports the prompt's specific goal?",
    options: ["Travel widens horizons.", "Rest allows the brain to recharge, resulting in higher focus and fewer errors."],
    correctAnswer: 1,
    explanation: "This directly links 'holiday' to 'work performance' (fewer errors)."
  });
  // Ex 3
  addQuiz({
    question: "Gap Fill: 'Mandating exactly four weeks may be _____ for small businesses.'",
    options: ["wonderful", "financially unsustainable / impractical", "easy"],
    correctAnswer: 1,
    explanation: "This introduces a nuanced disagreement based on economic reality."
  });
  // Ex 4
  addQuiz({
    question: "Counter-Argument: Why might long holidays be bad for work?",
    options: ["Employees get a tan.", "It creates a 'backlog' of work, causing stress before and after the break."],
    correctAnswer: 1,
    explanation: "If you come back to 1000 emails, your performance might actually drop due to stress."
  });
  // Ex 5
  addQuiz({
    question: "Structure: What should BP1 focus on?",
    options: ["The history of holidays.", "The psychological link between Rest and Performance (Burnout prevention)."],
    correctAnswer: 1,
    explanation: "Start with the core agreement: Rest is generally good for work."
  });

  // TOPIC 5: WATER
  addContent({
    sectionTitle: "Topic: Water (Feb 2023)",
    sectionSubtitle: "The Invisible Step",
    label: "Analysis",
    visualVariant: "plant", 
    content: "**Question:** Right to use vs Government control (Limited Resource).\n\n**The Trap:** The Clash. Individual Liberty (I pay, I use) vs Collective Survival (Finite Resource).",
    theme: "blue",
    vocab: [
      { term: "finite resource", ru: "исчерпаемый ресурс", uz: "cheklangan resurs" },
      { term: "commodity", ru: "товар", uz: "tovar" }
    ]
  });
  // Ex 1
  addQuiz({
    question: "Vocab: Complete the collocation 'Water ______'.",
    options: ["Money", "Scarcity", "Fun"],
    correctAnswer: 1,
    explanation: "'Water Scarcity' is the standard term for lack of water."
  });
  // Ex 2
  addQuiz({
    question: "Ideation: What is the logic for 'Right to use'?",
    options: ["People like swimming.", "If citizens pay for a commodity, they should have freedom to use it."],
    correctAnswer: 1,
    explanation: "The libertarian view treats water as a product you buy, not a shared gift."
  });
  // Ex 3
  addQuiz({
    question: "Ideation: What is the logic for 'Government Control'?",
    options: ["Government likes power.", "Water is a shared survival necessity, not a luxury; unchecked use harms the community."],
    correctAnswer: 1,
    explanation: "The environmental view prioritizes collective survival over individual freedom."
  });
  // Ex 4
  addQuiz({
    question: "Conclusion: Is 'Water is important' a good conclusion?",
    options: ["Yes", "No. It must resolve the 'Right vs Control' debate."],
    correctAnswer: 1,
    explanation: "You must decide: Does the government have the right to restrict freedom? (Yes, because survival supersedes liberty)."
  });
  // Ex 5
  addQuiz({
    question: "Cohesion: 'Some argue for liberty. ______, others insist on regulation.'",
    options: ["Also", "In contrast / Conversely", "So"],
    correctAnswer: 1,
    explanation: "You need a strong contrast connector between the two opposing views."
  });

  return steps;
};

const STEPS = buildSteps();

const Lesson1: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);

  const activeData = STEPS[currentStep];

  // Victory Sound Generator
  const playVictorySound = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i === 3 ? 'triangle' : 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 1.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 1.5);
    });
  };

  useEffect(() => {
    if (showLevelUp) {
      playVictorySound();
    }
  }, [showLevelUp]);

  // Badge Tilt Effect
  const handleBadgeMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    const { left, top, width, height } = badgeRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const rotateX = (0.5 - y) * 30;
    const rotateY = (x - 0.5) * 30;
    
    badgeRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
  };

  const handleBadgeLeave = () => {
    if (!badgeRef.current) return;
    badgeRef.current.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  // Game Logic
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setXp(prev => prev + 5);
      setCurrentStep(prev => prev + 1);
    } else {
      setShowLevelUp(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setXp(prev => prev + 50 + (streak * 10)); // Combo Bonus
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleVocabLearned = () => {
    setXp(prev => prev + 15);
  };

  if (showLevelUp) {
    return (
      <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0F172A] relative text-white perspective-container z-[60]">
        <div className="sunburst-ray"></div>
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              backgroundColor: ['#FFD700', '#C0C0C0', '#ffffff', '#FDB931'][Math.floor(Math.random() * 4)],
              animation: `confetti ${2 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}

        <div className="relative z-10 text-center animate-pop-in">
          <h2 className="text-2xl font-bold text-gray-400 tracking-[0.5em] uppercase mb-8">Mission Accomplished</h2>
          <div 
            className="badge-container w-80 h-96 mx-auto mb-10 cursor-pointer"
            onMouseMove={handleBadgeMove}
            onMouseLeave={handleBadgeLeave}
          >
            <div ref={badgeRef} className="w-full h-full relative transition-transform duration-100 ease-out">
              <div className="absolute inset-0 holographic-bg rounded-[40px] border-4 border-[#FDB931]/30 flex flex-col items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2.5s_infinite]"></div>
                <div className="text-center">
                  <h1 className="text-5xl font-black mb-1 diamond-text tracking-tighter">BAND 9</h1>
                  <p className="text-sm font-bold text-[#FDB931] tracking-widest uppercase">Certified Master</p>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase">XP</div>
                    <div className="text-xl font-bold text-white">{xp}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase">Streak</div>
                    <div className="text-xl font-bold text-[#FFD700]">{streak}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="group relative px-10 py-4 bg-white text-gray-900 rounded-full font-black text-lg tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              CLAIM REWARD <span className="text-xl">🏆</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen overflow-hidden font-sans bg-gray-900">
      
      {/* Background Color Base */}
      <div className={`absolute inset-0 w-full h-full transition-colors duration-1000 ${
        activeData.theme === 'red' ? 'bg-[#2A1010]' : 
        activeData.theme === 'green' ? 'bg-[#0F2A15]' : 
        activeData.theme === 'indigo' ? 'bg-[#151730]' : 
        activeData.theme === 'yellow' ? 'bg-[#2A2310]' : 'bg-[#1F2937]'
      }`}></div>

      {/* HUD (Heads Up Display) */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-white/95 backdrop-blur-md border-b border-gray-200/50 px-4 py-2 shadow-sm z-50 flex items-center">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-8 h-8 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300">
               <div 
                 className="absolute bottom-0 left-0 w-full bg-indigo-600 transition-all duration-500 liquid-wave"
                 style={{ height: `${((currentStep + 1) / STEPS.length) * 100}%` }}
               ></div>
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-gray-400 uppercase leading-none">Progress</p>
              <p className="text-sm font-black text-gray-800 leading-none">{Math.round(((currentStep + 1) / STEPS.length) * 100)}%</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase leading-none">XP</p>
              <p className="text-lg font-black text-indigo-600 leading-none">{xp}</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-gray-400 uppercase leading-none">Streak</p>
              <p className={`text-lg font-black leading-none ${streak > 2 ? 'text-orange-500 animate-pulse' : 'text-gray-600'}`}>
                {streak}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stage */}
      <div className="absolute top-[60px] bottom-[80px] left-0 right-0 flex items-center justify-center p-2 sm:p-4 z-20 overflow-hidden">
        <div className="w-full max-w-7xl h-full flex flex-col justify-center relative">
          <div key={currentStep} className="w-full h-full flex flex-col justify-center">
            {activeData.type === 'content' ? (
              <FocusSlide 
                {...activeData}
                label={activeData.label || ""}
                sectionTitle={activeData.sectionTitle || ""}
                content={activeData.content || ""}
                theme={activeData.theme || "indigo"}
                animated={true}
                visualVariant={activeData.visualVariant}
                videoUrl={activeData.videoUrl}
                onVocabLearned={handleVocabLearned}
              />
            ) : (
              <QuizSlide 
                {...activeData}
                question={activeData.question || ""}
                options={activeData.options || []}
                correctAnswer={activeData.correctAnswer || 0}
                explanation={activeData.explanation || ""}
                animated={true}
                onAnswer={handleQuizAnswer}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 w-full h-[80px] bg-white border-t border-gray-200 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-4 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${
              currentStep === 0 
                ? 'opacity-0 pointer-events-none' 
                : 'text-gray-600 hover:bg-gray-100 active:scale-95'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={handleNext}
            className="group relative px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto min-w-[120px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer-text"></div>
            <span className="relative z-10 font-bold text-base tracking-widest uppercase flex items-center justify-center gap-2">
              {currentStep === STEPS.length - 1 ? 'Finish' : 'Next'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Lesson1;