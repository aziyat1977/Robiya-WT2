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
    content: "Address **all** parts of the prompt (Discuss both sides **AND** give your opinion). \n\n**Topic:** Future of city life (**unlivable** vs. solved). \n**Type:** Discussion + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "unlivable", ru: "непригодный для жизни", uz: "yashash uchun yaroqsiz" },
      { term: "overcrowding", ru: "перенаселенность", uz: "aholi zichligi" }
    ]
  }, [
    {
      q: "What defines a 'Discussion + Opinion' essay type?",
      opts: ["You only write about your opinion", "You discuss both views objectively, then give your opinion", "You list advantages and disadvantages only"],
      ans: 1,
      expl: "The prompt asks for three specific things: Discuss Side A, Discuss Side B, and Give Your Opinion. Missing any one of these lowers the Task Response score to Band 6 or below."
    },
    {
      q: "What happens if you focus only on 'pollution' but ignore 'overcrowding'?",
      opts: ["It's fine, they are similar", "You fail to fully address the task", "You get extra points for focus"],
      ans: 1,
      expl: "Pauline Cullen emphasizes that you must address 'all parts of the prompt'. If the prompt mentions both pollution and overcrowding, your essay should ideally touch upon both."
    }
  ]);

  // -- 2. Planning: Position --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "The Thesis Statement",
    content: "Must have a clear, **nuanced** position stated immediately. \n\n**Position:** Acknowledge the severity of the threat, but argue that **technological innovation** is the only **viable** path to making cities sustainable.",
    theme: "indigo",
    vocab: [
      { term: "nuanced", ru: "детальный / с нюансами", uz: "batafsil / nozik farqli" },
      { term: "viable", ru: "жизнеспособный", uz: "yashashga qodir" }
    ]
  }, [
    {
      q: "Why is a 'nuanced' position better than a simple 'I agree'?",
      opts: ["It is longer", "It shows higher critical thinking and Band 9 Task Response", "It confuses the examiner"],
      ans: 1,
      expl: "Band 9 requires a 'fully developed position'. Acknowledging the problem (threats are real) while proposing a specific solution (tech) is more sophisticated than a blind 'Yes'."
    },
    {
      q: "Where should the position be stated first?",
      opts: ["In the conclusion only", "In the introduction", "In the second body paragraph"],
      ans: 1,
      expl: "For a high score, your position must be clear 'throughout the response'. Stating it clearly in the introduction sets the direction for the whole essay."
    }
  ]);

  // -- 3. Planning: Blueprint --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Argument Blueprint",
    content: [
      "Structure must be logical.",
      "**BP1:** Why cities are threatened (Side A).",
      "**BP2:** Why technology is the solution (Side B).",
      "**BP3:** Why technology is **necessary** (**Reiterate** & Deepen Opinion)."
    ],
    theme: "indigo",
    vocab: [
      { term: "blueprint", ru: "план / схема", uz: "reja / chizma" },
      { term: "reiterate", ru: "повторить / подтвердить", uz: "takrorlamoq / ta'kidlamoq" }
    ]
  }, [
    {
      q: "What is the function of Body Paragraph 3 in this specific plan?",
      opts: ["To repeat the introduction", "To deepen and fully develop the writer's personal opinion", "To summarize the essay"],
      ans: 1,
      expl: "In a Discussion + Opinion essay, adding a third paragraph dedicated to your opinion ensures it is not just an afterthought, but a central part of the argument."
    },
    {
      q: "Why is the order Side A -> Side B -> Opinion chosen?",
      opts: ["It builds a logical flow towards the writer's conclusion", "It is random", "Alphabetical order"],
      ans: 0,
      expl: "This structure is persuasive. You acknowledge the opposing view (Threats), present the solution (Tech), and then explain WHY that solution is the only way forward."
    }
  ]);

  // -- 4. Introduction --
  addSlide({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "Setting the Stage",
    content: "The **prognosis** for the world’s major metropolises is divided. While one school of thought suggests that unchecked population density and environmental **degradation** will render urban centers uninhabitable, a counter-argument holds that human ingenuity will ensure sustainability.",
    theme: "blue",
    vocab: [
      { term: "prognosis", ru: "прогноз", uz: "prognoz" },
      { term: "degradation", ru: "деградация / ухудшение", uz: "tanazzul" }
    ]
  }, [
    {
      q: "What is the meaning of 'prognosis' in this context?",
      opts: ["A medical diagnosis", "A forecast or likely future outcome", "A type of city"],
      ans: 1,
      expl: "Using 'prognosis' (often medical) to describe the health of a city is an excellent example of metaphorical collocation, boosting Lexical Resource."
    },
    {
      q: "How does the writer introduce the opposing views?",
      opts: ["People say X. People say Y.", "Using 'While one school of thought suggests... a counter-argument holds...'", "I think X and Y."],
      ans: 1,
      expl: "This complex sentence structure ('While X... Y...') efficiently contrasts the two views in a single, cohesive sentence, showing high Grammatical Range."
    }
  ]);

  // -- 5. BP1: Threats --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Threats",
    label: "The Crisis of Scale",
    content: [
      "Cities are currently facing an inevitable crisis due to **escalating** human activity.",
      "The most immediate threat is severe **overcrowding**, which places an **untenable** strain on critical infrastructure like sewage and transport."
    ],
    theme: "red",
    vocab: [
      { term: "escalating", ru: "нарастающий", uz: "kuchayib borayotgan" },
      { term: "untenable", ru: "неприемлемый / невыносимый", uz: "chidab bo'lmas" }
    ]
  }, [
    {
      q: "What is the main topic of this paragraph?",
      opts: ["How technology works", "The severity of the threats (overcrowding/pollution)", "The history of cities"],
      ans: 1,
      expl: "The Topic Sentence clearly states 'cities are facing an inevitable crisis'. Every sentence after that supports this specific point."
    },
    {
      q: "What does 'untenable' mean?",
      opts: ["Under ten years old", "Cannot be maintained or defended against", "Very strong"],
      ans: 1,
      expl: "If a situation is 'untenable', it is so bad that it cannot continue. This is precise vocabulary to describe a crisis."
    }
  ]);

  // -- 6. BP2: Solutions --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Tech Solution",
    label: "The Innovation Defense",
    content: [
      "Conversely, the belief that technological innovation can **mitigate** these problems is grounded in recent breakthroughs.",
      "The necessity of vast agricultural land is being **circumvented** through vertical farming, addressing the root cause of resource inefficiency."
    ],
    theme: "green",
    vocab: [
      { term: "mitigate", ru: "смягчить / уменьшить", uz: "yumshatmoq" },
      { term: "circumvented", ru: "обойти / избежать", uz: "chetlab o'tmoq" }
    ]
  }, [
    {
      q: "What specific example is given for food security?",
      opts: ["Fast food", "Vertical farming", "Importing food"],
      ans: 1,
      expl: "Listing 'vertical farming' is a concrete, task-specific example that supports the general claim of 'technological innovation'."
    },
    {
      q: "What linking word signals the shift from BP1 (Threats) to BP2 (Solutions)?",
      opts: ["Furthermore", "Conversely", "Therefore"],
      ans: 1,
      expl: "'Conversely' is a contrast marker. It signals to the reader that we are now looking at the *opposite* perspective."
    }
  ]);

  // -- 7. BP3: Opinion --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Writer's Opinion",
    label: "The Condition for Success",
    content: "While both viewpoints contain merit, I strongly believe that the solution is **contingent** upon revolutionary technology. Without it, the consequences regarding global warming will be **catastrophic**.",
    theme: "yellow",
    vocab: [
      { term: "contingent", ru: "зависящий / условный", uz: "bog'liq / shartli" },
      { term: "catastrophic", ru: "катастрофический", uz: "halokatli" }
    ]
  }, [
    {
      q: "Is the writer's opinion simple or conditional?",
      opts: ["Simple: Tech is good.", "Conditional: Tech works ONLY IF adopted on a large scale.", "Negative: Tech is bad."],
      ans: 1,
      expl: "The writer uses 'contingent upon' (depends on). This adds depth (nuance) to the argument, moving it beyond a simplistic 'yes/no' answer."
    },
    {
      q: "Why use strong words like 'catastrophic'?",
      opts: ["To scare the reader", "To show the writer's strong feelings (Stance)", "It is a common word"],
      ans: 1,
      expl: "Band 9 Task Response requires a 'clear position'. Using strong, precise adjectives helps convey the writer's conviction effectively."
    }
  ]);

  // -- 8. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "The Final Verdict",
    label: "Summarizing the Argument",
    content: "The proposition that cities will **succumb** to overcrowding is well-founded. However, I assert that future liveability rests on the **trajectories** of successful technological deployment supported by government policy.",
    theme: "purple",
    vocab: [
      { term: "succumb", ru: "поддаться / погибнуть", uz: "yengilmoq / taslim bo'lmoq" },
      { term: "trajectories", ru: "траектории / пути", uz: "rivojlanish yo'llari" }
    ]
  }, [
    {
      q: "Does the conclusion introduce new arguments?",
      opts: ["Yes", "No, it summarizes and re-states the position", "Maybe"],
      ans: 1,
      expl: "A conclusion should never introduce new ideas. It synthesizes the arguments made in the body paragraphs to reach a final verdict."
    },
    {
      q: "What is the final 'assertion'?",
      opts: ["Cities are doomed", "Tech + Policy is the only way", "We should move to the countryside"],
      ans: 1,
      expl: "The essay concludes that technology is the solution, but adds the crucial condition of 'supported by determined governmental policy'."
    }
  ]);

  // -- 9. Scorecard --
  addSlide({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Why this scores high",
    label: "The Cullen Checklist",
    content: [
      "**Coherence**: Used effective **signposting** (Conversely, Crucially) to guide the logic.",
      "**Lexical Resource**: Used precise vocabulary like **systemic** innovation, not just 'big words'.",
      "**Task Response**: Addressed both sides and gave a clear opinion."
    ],
    theme: "indigo",
    vocab: [
      { term: "signposting", ru: "связующие слова", uz: "bog'lovchi so'zlar" },
      { term: "systemic", ru: "системный", uz: "tizimli" }
    ]
  }, [
    {
      q: "What is 'signposting' in an essay?",
      opts: ["Putting signs on the street", "Using words that tell the reader where the argument is going", "Signing your name"],
      ans: 1,
      expl: "Words like 'However', 'First', 'Conversely' act as road signs, helping the examiner follow your train of thought without getting lost."
    },
    {
      q: "According to Cullen, what is more important than 'fancy' vocabulary?",
      opts: ["Long words", "Precision and Collocation", "Slang"],
      ans: 1,
      expl: "Band 9 is not about using obscure words. It is about using the *right* word for the specific context (precision) and using words together naturally (collocation)."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson2: React.FC = () => {
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 2: City Future</h1>
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

export default Lesson2;