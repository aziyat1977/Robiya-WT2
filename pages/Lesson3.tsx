import React, { useState, useEffect } from 'react';
import FocusSlide from '../components/FocusSlide';
import QuizSlide from '../components/QuizSlide';

// -- Types --

type StepType = 'content' | 'quiz';

interface VocabItem {
  term: string;
  ru: string;
  uz: string;
}

interface BaseStep {
  type: StepType;
}

interface ContentStep extends BaseStep {
  type: 'content';
  sectionTitle: string;
  sectionSubtitle?: string;
  label: string;
  content: string | string[];
  theme: string;
  vocab?: VocabItem[];
}

interface QuizStep extends BaseStep {
  type: 'quiz';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

type LessonStep = ContentStep | QuizStep;

// -- Lesson Data Construction --

const buildSteps = (): LessonStep[] => {
  const steps: LessonStep[] = [];

  // Helper to push a content slide followed immediately by its quizzes
  const addSlide = (
    contentSlide: Omit<ContentStep, 'type'>, 
    quizzes: { q: string, opts: string[], ans: number, expl: string }[]
  ) => {
    // Add Content
    steps.push({ type: 'content', ...contentSlide });
    
    // Add Quizzes
    quizzes.forEach(quiz => {
      steps.push({
        type: 'quiz',
        question: quiz.q,
        options: quiz.opts,
        correctAnswer: quiz.ans,
        explanation: quiz.expl
      });
    });
  };

  // -- 1. Introduction: Context & Grammar --
  addSlide({
    sectionTitle: "Introduction",
    sectionSubtitle: "The Setup",
    label: "Grammar & Precision",
    content: [
      "The shift toward **decentralized employment** is arguably the most significant change in modern professional life.",
      "**Analysis:** Use of the passive voice ('is arguably...') and complex noun phrases ('decentralized employment') demonstrates **Grammatical Range and Accuracy**."
    ],
    theme: "indigo",
    vocab: [
      { term: "decentralized", ru: "децентрализованный", uz: "markazlashmagan" },
      { term: "employment", ru: "занятость", uz: "bandlik" }
    ]
  }, [
    {
      q: "Why use 'decentralized employment' instead of 'working from home'?",
      opts: ["It sounds harder", "It is precise academic vocabulary (Band 9 Lexical Resource)", "It takes up more space"],
      ans: 1,
      expl: "Band 9 requires specific, academic vocabulary. 'Decentralized employment' describes the *nature* of the work structure, not just the location."
    },
    {
      q: "What is the effect of 'is arguably the most significant change'?",
      opts: ["It makes the statement softer and more academic", "It makes it a fact", "It shows uncertainty"],
      ans: 0,
      expl: "Using qualifiers like 'arguably' shows nuance and academic tone. It avoids making absolute statements that can be easily disproven."
    }
  ]);

  // -- 2. Introduction: Thesis & Roadmap --
  addSlide({
    sectionTitle: "Introduction",
    sectionSubtitle: "The Thesis",
    label: "Task Response",
    content: [
      "While the argument persists that this distance **impairs** general work habits, I believe it **fosters** superior self-management.",
      "**Analysis:** The thesis uses strong, opposing vocabulary ('impairs' vs 'fosters') to state a nuanced position immediately."
    ],
    theme: "indigo",
    vocab: [
      { term: "impairs", ru: "ухудшает / ослабляет", uz: "yomonlashtiradi / pasaytiradi" },
      { term: "fosters", ru: "способствует / воспитывает", uz: "rivojlantiradi" }
    ]
  }, [
    {
      q: "What is the 'Cullen Rule' for the introduction?",
      opts: ["Keep it a secret", "Provide a clear 'Roadmap' and Thesis immediately", "Write 100 words"],
      ans: 1,
      expl: "Pauline Cullen emphasizes that the introduction must act as a roadmap. The examiner should know exactly what your position is before they read the body."
    },
    {
      q: "Why is 'fosters superior self-management' better than 'is better'?",
      opts: ["It is longer", "It is specific colocation", "It is slang"],
      ans: 1,
      expl: "'Fosters' collocated with 'self-management' shows precise control of vocabulary. It explains *how* it is better, not just *that* it is better."
    }
  ]);

  // -- 3. BP1: The Concession Setup --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "The Counter-Argument",
    label: "Defining the Problem",
    content: [
      "It is necessary to **acknowledge** that, initially, the **erosion of the spatial boundary** between personal and professional life can lead to **fragmented** attention.",
      "**Analysis:** 'Erosion of the spatial boundary' is high-level vocabulary for 'no separation between work and home'."
    ],
    theme: "red",
    vocab: [
      { term: "erosion", ru: "разрушение / эрозия", uz: "yemirilish" },
      { term: "fragmented", ru: "фрагментированный / раздробленный", uz: "bo'lingan" }
    ]
  }, [
    {
      q: "What is the function of 'It is necessary to acknowledge'?",
      opts: ["To Concede", "To Refute", "To Conclude"],
      ans: 0,
      expl: "This phrase signals a Concession. You are admitting the other side has a point. This 'balance' is critical for a high Task Response score."
    },
    {
      q: "What does 'erosion of the spatial boundary' mean?",
      opts: ["The walls falling down", "The disappearance of the physical line between home and office", "Soil erosion"],
      ans: 1,
      expl: "This complex noun phrase perfectly describes the psychological issue of working where you sleep. It is Band 9 Lexical Resource."
    }
  ]);

  // -- 4. BP1: Development & Link --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Cohesion & Detail",
    label: "The Social Cost",
    content: [
      "**Furthermore**, the lack of **incidental** social interaction **impedes** spontaneous collaboration. **Therefore**, the transition phase presents a risk to habits.",
      "**Analysis:** Uses 'Furthermore' to add a point and 'Therefore' to link back to the main topic (risk to habits)."
    ],
    theme: "red",
    vocab: [
      { term: "incidental", ru: "случайный / попутный", uz: "tasodifiy" },
      { term: "impedes", ru: "препятствует / затрудняет", uz: "to'sqinlik qiladi" }
    ]
  }, [
    {
      q: "Why does the writer limit the damage to 'spontaneous' collaboration?",
      opts: ["They forgot other types", "To show nuance (Accuracy)", "To sound smart"],
      ans: 1,
      expl: "Planned collaboration works fine remotely. Only 'spontaneous' (water-cooler) chats are lost. Identifying this distinction shows deep task understanding."
    },
    {
      q: "What cohesive device signals the summary of the paragraph?",
      opts: ["Furthermore", "Therefore", "Incidental"],
      ans: 1,
      expl: "'Therefore' is a cause-effect linker. It tells the reader 'Because of X and Y, the result is Z', closing the logical loop of the paragraph."
    }
  ]);

  // -- 5. BP2: The Turn --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "The Core Argument",
    label: "The Pivot",
    content: [
      "**Despite** these transitional issues, remote work **ultimately** improves habits. The primary benefit is the **elimination** of non-productive activities.",
      "**Analysis:** 'Despite' creates a strong shift from Concession to Argument. 'Elimination of non-productive activities' is precise vocabulary."
    ],
    theme: "green",
    vocab: [
      { term: "elimination", ru: "устранение", uz: "bartaraf etish" },
      { term: "ultimately", ru: "в конечном счете", uz: "oxir-oqibat" }
    ]
  }, [
    {
      q: "What is 'non-productive activities' a synonym for?",
      opts: ["Sleeping", "Wasting time (commuting, gossip)", "Working hard"],
      ans: 1,
      expl: "Instead of saying 'wasting time', the writer uses 'non-productive activities'. This is formal, objective, and academic."
    },
    {
      q: "How does 'Despite' function here?",
      opts: ["It adds information", "It contrasts with the previous paragraph", "It gives an example"],
      ans: 1,
      expl: "It bridges BP1 and BP2. It says 'Even though BP1 is true, BP2 is MORE true'. This connection is vital for Coherence & Cohesion."
    }
  ]);

  // -- 6. BP2: Evidence --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Specific Evidence",
    label: "Measurable Outcomes",
    content: [
      "The focus shifts from **presenteeism** (simply being visible at a desk) to achieving **measurable outcomes**. This encourages **self-discipline**.",
      "**Analysis:** Uses field-specific terms ('presenteeism') and links the benefit directly to 'self-discipline' (the prompt's topic)."
    ],
    theme: "green",
    vocab: [
      { term: "presenteeism", ru: "презентеизм (сидение на работе)", uz: "ishda shunchaki bo'lish" },
      { term: "self-discipline", ru: "самодисциплина", uz: "o'z-o'zini intizomlash" }
    ]
  }, [
    {
      q: "What is 'presenteeism'?",
      opts: ["Giving presents", "The practice of being at work just to be seen, not to work", "Presenting slides"],
      ans: 1,
      expl: "Using a specific business term like 'presenteeism' demonstrates high lexical awareness and fits the topic of 'Work Habits' perfectly."
    },
    {
      q: "How does this prove the thesis?",
      opts: ["It shows work is harder", "It argues that results matter more than time, which requires better habits", "It doesn't"],
      ans: 1,
      expl: "The argument is that you can't fake working at home; you have to produce results. This *requires* the improved habit of self-discipline."
    }
  ]);

  // -- 7. BP3: Deepening --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Mechanism",
    label: "Autonomy & Accountability",
    content: [
      "The strongest counter-argument lies in the link between **autonomy** and **accountability**. The problem is not the location but the individual’s lack of skills.",
      "**Analysis:** Deepens the argument by identifying the mechanism of change (autonomy) and refuting the prompt's assumption."
    ],
    theme: "yellow",
    vocab: [
      { term: "autonomy", ru: "автономия / независимость", uz: "muxtoriyat / mustaqillik" },
      { term: "accountability", ru: "подотчетность / ответственность", uz: "javobgarlik" }
    ]
  }, [
    {
      q: "What is the 'Refutation' technique used here?",
      opts: ["Agreeing with everyone", "Redefining the problem (It's not location, it's skill)", "Ignoring the question"],
      ans: 1,
      expl: "The writer attacks the premise of the question. They argue that if you have bad habits at home, it's YOUR fault, not the home's fault. This is critical thinking."
    },
    {
      q: "Why are 'autonomy' and 'accountability' linked?",
      opts: ["They start with A", "With freedom (autonomy) comes the need to be responsible (accountability)", "They are opposites"],
      ans: 1,
      expl: "This pair of concepts is central to modern management theory. Using them together shows you understand the deeper concepts of the topic."
    }
  ]);

  // -- 8. BP3: Final Distinction --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "Comparison",
    label: "Active vs. Passive",
    content: [
      "**Crucially**, successful remote arrangements force individuals to develop **active, self-directed** professional habits rather than passive ones.",
      "**Analysis:** Uses 'Crucially' to signal the most important point. Contrasts 'Active' vs 'Passive' habits."
    ],
    theme: "yellow",
    vocab: [
      { term: "crucially", ru: "что особенно важно", uz: "eng muhimi" },
      { term: "self-directed", ru: "самостоятельный", uz: "o'zini o'zi boshqaradigan" }
    ]
  }, [
    {
      q: "What is a 'passive' work habit described here?",
      opts: ["Sleeping", "Being dictated by the clock (doing things just because it's 9am)", "Working hard"],
      ans: 1,
      expl: "The essay argues that office work can be passive (just following rules), whereas remote work requires you to actively manage your time."
    },
    {
      q: "Why is 'Crucially' a good connector here?",
      opts: ["It sounds cool", "It signals that this is the main point / climax of the argument", "It means 'cruel'"],
      ans: 1,
      expl: "Use 'Crucially' only for your most important point. It wakes the examiner up and says 'Pay attention, this is the core idea'."
    }
  ]);

  // -- 9. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "The Final Verdict",
    label: "Future Demands",
    content: [
      "I maintain that this trend does not impair habits. The future of work demands greater autonomy, **compelling** professionals to cultivate these **vulnerabilities** into strengths.",
      "**Analysis:** Restates thesis ('maintain'). Ends with a powerful forward-looking statement."
    ],
    theme: "purple",
    vocab: [
      { term: "compelling", ru: "принуждающий / заставляющий", uz: "majbur qiluvchi" },
      { term: "vulnerabilities", ru: "уязвимости / слабости", uz: "zaifliklar" }
    ]
  }, [
    {
      q: "What does 'compelling' mean in this context?",
      opts: ["Interesting", "Forcing / Obliging", "Selling"],
      ans: 1,
      expl: "Here, 'compelling' means the situation is *forcing* people to change. It is a strong verb indicating inevitable change."
    },
    {
      q: "What is the final impression left on the examiner?",
      opts: ["Remote work is easy", "Remote work is a difficult but necessary evolution of professional skills", "Remote work is bad"],
      ans: 1,
      expl: "The conclusion frames remote work not just as 'convenient', but as an evolutionary step in professional discipline. This is a very strong Band 9 ending."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson3: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const activeData = STEPS[currentStep];

  return (
    <div className="container mx-auto p-4 md:p-6 font-sans max-w-3xl flex flex-col min-h-full">
      
      {/* Header & Progress */}
      <div className="mb-6 sticky top-16 bg-gray-100 pt-4 z-10 pb-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 3: Remote Work</h1>
            <p className="text-sm text-gray-500 font-medium">
              Step {currentStep + 1} of {STEPS.length}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ease-out ${activeData.type === 'quiz' ? 'bg-indigo-400' : 'bg-indigo-600'}`}
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Content Card Switcher */}
      <div className="flex-grow pb-24">
        <div key={currentStep} className="animate-fade-in-up">
          {activeData.type === 'content' ? (
            <FocusSlide 
              sectionTitle={activeData.sectionTitle}
              sectionSubtitle={activeData.sectionSubtitle}
              label={activeData.label}
              content={activeData.content}
              theme={activeData.theme}
              vocab={activeData.vocab}
            />
          ) : (
            <QuizSlide 
              question={activeData.question}
              options={activeData.options}
              correctAnswer={activeData.correctAnswer}
              explanation={activeData.explanation}
            />
          )}
        </div>
      </div>

      {/* Fixed Footer Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
              currentStep === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600 active:scale-95'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === STEPS.length - 1}
            className={`flex items-center px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform ${
              currentStep === STEPS.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'
            }`}
          >
            {currentStep === STEPS.length - 1 ? 'Lesson Complete' : 'Next'}
            {currentStep !== STEPS.length - 1 && (
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Lesson3;