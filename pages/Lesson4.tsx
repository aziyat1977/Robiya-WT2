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

  // -- 1. Planning: Task Analysis --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step A: Task Analysis",
    label: "Understanding the Prompt",
    content: "Address **all** parts of the prompt (Discuss both views **AND** give your opinion). \n\n**Topic:** Scope of Charity/Aid (Local vs. Global). \n**Type:** Discussion + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "scope", ru: "масштаб / сфера действия", uz: "ko'lam / doira" },
      { term: "domestic poverty", ru: "внутренняя бедность", uz: "ichki qashshoqlik" }
    ]
  }, [
    {
      q: "What defines a 'Discussion + Opinion' essay type?",
      opts: ["Describe a problem and a solution", "Discuss both sides (Side A and Side B) and provide your own clear position", "Tell a story about charity"],
      ans: 1,
      expl: "The prompt asks you to look at two opposing views (Local vs Global) and then state what YOU think. Balancing these three elements is key to Task Response."
    },
    {
      q: "Why is 'scope' a good word here?",
      opts: ["It sounds scientific", "It precisely refers to how far the charity extends (borders vs. no borders)", "It is short"],
      ans: 1,
      expl: "'Scope' refers to the extent or area that something deals with. The essay is debating the 'geographical scope' of charity."
    }
  ]);

  // -- 2. Planning: Position --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "The Thesis Statement",
    content: "**Position:** Partially Agree with the internationalist view. \n**Thesis:** While addressing domestic poverty is crucial, the **moral imperative** to alleviate suffering globally, especially during crises, necessitates international aid.",
    theme: "indigo",
    vocab: [
      { term: "moral imperative", ru: "моральный долг / необходимость", uz: "axloqiy majburiyat" },
      { term: "nuanced", ru: "детальный / с нюансами", uz: "nozik farqli" }
    ]
  }, [
    {
      q: "What does 'moral imperative' mean?",
      opts: ["Something you must do because it is right", "A legal law", "A suggestion"],
      ans: 0,
      expl: "An 'imperative' is a command or essential duty. A 'moral imperative' means your conscience demands you do it."
    },
    {
      q: "Why 'Partially Agree'?",
      opts: ["It is safer", "It allows you to acknowledge the validity of local charity while prioritizing global crises", "You don't know the answer"],
      ans: 1,
      expl: "A nuanced position (Band 9) often finds value in both sides but establishes a hierarchy: Local is good, but Global is sometimes MORE important."
    }
  ]);

  // -- 3. Planning: Blueprint --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Argument Blueprint",
    content: [
      "**BP1 (Side A):** Argue for the domestic focus (**Charity begins at home**).",
      "**BP2 (Side B):** Argue for the international focus (**Moral Imperative**).",
      "**BP3 (Opinion):** Reaffirm Opinion, prioritizing global need over national boundaries."
    ],
    theme: "indigo",
    vocab: [
      { term: "isolationist", ru: "изоляционистский", uz: "izolyatsionistik" },
      { term: "transcends", ru: "превосходит / выходит за пределы", uz: "chegaradan chiqadi" }
    ]
  }, [
    {
      q: "What is the function of BP3 in this plan?",
      opts: ["To repeat BP2", "To explain exactly WHY the writer chooses Side B over Side A (The Verdict)", "To list examples"],
      ans: 1,
      expl: "BP3 is the 'Opinion' paragraph. It synthesizes the discussion and explains the writer's final judgment, ensuring the opinion is fully developed."
    },
    {
      q: "What does 'transcends national boundaries' mean?",
      opts: ["Stays inside the country", "Goes beyond borders (global)", "Changes the map"],
      ans: 1,
      expl: "To 'transcend' means to go beyond the range or limits of something. Aid that 'transcends boundaries' goes wherever help is needed."
    }
  ]);

  // -- 4. Introduction --
  addSlide({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "Setting the Stage",
    content: "The purpose and scope of charitable giving remains a topic of intense debate. This essay will discuss both the **isolationist** and **globalist** perspectives before asserting that **the moral imperative to alleviate acute crises** necessitates a charitable scope that transcends geography.",
    theme: "blue",
    vocab: [
      { term: "acute", ru: "острый / критический", uz: "o'tkir / jiddiy" },
      { term: "alleviate", ru: "облегчить (страдания)", uz: "yengillashtirmoq" }
    ]
  }, [
    {
      q: "Why use the terms 'isolationist' and 'globalist'?",
      opts: ["To sound political", "They are precise terms summarizing the two opposing views efficiently", "They are simple words"],
      ans: 1,
      expl: "These terms package complex ideas (people who want to focus on their own country vs. people who look outward) into single, high-level words."
    },
    {
      q: "What is 'acute crisis'?",
      opts: ["A small problem", "A sharp, severe, and immediate emergency", "A math angle"],
      ans: 1,
      expl: "'Acute' describes something intense and short-term (like a famine or earthquake), contrasting with chronic (long-term) problems."
    }
  ]);

  // -- 5. BP1: Domestic Focus --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Domestic Case",
    label: "Efficiency & Accountability",
    content: [
      "The perspective that **charity should begin at home** is rooted in practicality. Domestic giving minimizes administrative burdens; aid is distributed more **efficiently** when **logistical hurdles** are eliminated.",
      "**Example:** Local food banks rely on community donations to fill critical gaps."
    ],
    theme: "red",
    vocab: [
      { term: "logistical hurdles", ru: "логистические препятствия", uz: "logistik to'siqlar" },
      { term: "vicinities", ru: "окрестности / близость", uz: "atrof-muhit / yaqinlik" }
    ]
  }, [
    {
      q: "What is the main argument for domestic charity used here?",
      opts: ["It is nicer", "It is more practical and efficient (no shipping/currency issues)", "Foreigners don't need help"],
      ans: 1,
      expl: "The essay focuses on 'Efficiency'. Sending money across the world is hard (logistics); giving it to a neighbor is easy. This is a strong, logical argument."
    },
    {
      q: "What does 'logistical hurdles' refer to?",
      opts: ["Jumping over fences", "The practical difficulties of organizing complex operations (shipping, transport)", "Logic puzzles"],
      ans: 1,
      expl: "Logistics involves the organization of moving things. 'Hurdles' are obstacles. This collocation describes the difficulty of international aid."
    }
  ]);

  // -- 6. BP2: Global Aid --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The International Case",
    label: "Shared Humanity",
    content: [
      "Conversely, the argument for a universal approach rests on the principle that **human dignity** is not defined by nationality. Limiting efforts to one's own country becomes **morally indefensible** when vast populations face **existential threats**.",
      "**Key Idea:** Crises overwhelm single nations."
    ],
    theme: "green",
    vocab: [
      { term: "morally indefensible", ru: "морально недопустимый", uz: "axloqiy jihatdan oqlab bo'lmaydigan" },
      { term: "existential threats", ru: "угрозы существованию", uz: "mavjudlikka tahdidlar" }
    ]
  }, [
    {
      q: "What linking word introduces the contrast?",
      opts: ["Conversely", "Moreover", "Therefore"],
      ans: 0,
      expl: "'Conversely' signals that we are flipping the coin to look at the other side (Internationalism) after discussing Domestic focus."
    },
    {
      q: "What is an 'existential threat'?",
      opts: ["A threat to life/existence itself", "A philosophical question", "A small danger"],
      ans: 0,
      expl: "Use 'existential threat' for things that can kill large numbers of people (starvation, war), distinguishing them from smaller problems."
    }
  ]);

  // -- 7. BP3: Opinion --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Writer's Opinion",
    label: "The Verdict",
    content: [
      "**I firmly believe** that the ethical framework of the 21st century demands that **global solidarity** take precedence. The vulnerability of those facing catastrophic disaster **supersedes** localized needs.",
      "**Nuance:** Maintain domestic ops, but reserve capacity for global crises."
    ],
    theme: "yellow",
    vocab: [
      { term: "solidarity", ru: "солидарность / единство", uz: "birdamlik" },
      { term: "supersedes", ru: "вытесняет / имеет приоритет", uz: "ustun keladi / o'rnini bosadi" }
    ]
  }, [
    {
      q: "What does 'supersedes' mean here?",
      opts: ["Comes after", "Replaces or takes priority over", "Ignores"],
      ans: 1,
      expl: "If A supersedes B, A is more important. The writer argues that saving a life (Global) supersedes comfort (Local)."
    },
    {
      q: "How does the writer add nuance?",
      opts: ["By saying we should ignore local people", "By saying we should do BOTH, but prioritize Global in crises", "By saying nothing"],
      ans: 1,
      expl: "The 'Crucially' sentence says national charities should maintain domestic operations BUT join international efforts when needed. This is balanced."
    }
  ]);

  // -- 8. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Final Summary",
    label: "A Matter of Life and Death",
    content: "I conclude that while organizations should remain engaged with domestic welfare, their ultimate duty is to deploy resources **where human need is most acute**. Charity must be an international **endeavor** transcending **geopolitical** lines.",
    theme: "purple",
    vocab: [
      { term: "endeavor", ru: "начинание / усилие", uz: "sa'y-harakat" },
      { term: "geopolitical", ru: "геополитический", uz: "geosiyosiy" }
    ]
  }, [
    {
      q: "Does the conclusion match the thesis?",
      opts: ["No, it changed opinion", "Yes, it reaffirms the 'Crisis First' approach", "It introduces new topics"],
      ans: 1,
      expl: "The conclusion repeats the main idea: Domestic is fine, but Acute Global Need is the 'ultimate duty'. This consistency is vital for Band 9."
    },
    {
      q: "What is the tone of 'transcending geopolitical lines'?",
      opts: ["Casual", "Highly Academic and Formal", "Funny"],
      ans: 1,
      expl: "This phrase elevates the tone. It suggests that humanity is more important than political borders (geopolitics)."
    }
  ]);

  // -- 9. Band 9 Checklist --
  addSlide({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Key Takeaways",
    label: "Why this works",
    content: [
      "**Task Response:** Fully discussed both Domestic and Global views, then provided a clear, reasoned opinion.",
      "**Cohesion:** Used 'Conversely', 'Furthermore', and 'Crucially' to structure the logic.",
      "**Lexical Resource:** Used precise collocations: 'Moral imperative', 'Logistical hurdles', 'Acute crises'."
    ],
    theme: "indigo",
    vocab: [
      { term: "collocations", ru: "словосочетания", uz: "so'z birikmalari" },
      { term: "reasoned", ru: "обоснованный", uz: "asoslangan" }
    ]
  }, [
    {
      q: "What is the most important takeaway for Task Response?",
      opts: ["Write a lot", "Address all parts of the prompt and have a clear position", "Use big words"],
      ans: 1,
      expl: "If the prompt says 'Discuss both views', you MUST discuss both. If you only write about your opinion, you cannot get above Band 7."
    },
    {
      q: "Why are 'collocations' important?",
      opts: ["They show you know how native speakers combine words naturally", "They are hard to spell", "They make sentences longer"],
      ans: 1,
      expl: "Examiners look for 'natural control' of language. Knowing that 'hurdles' goes with 'logistical' (collocation) shows this control."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson4: React.FC = () => {
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 4: International Aid</h1>
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

export default Lesson4;