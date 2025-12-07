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

  const addSlide = (
    contentSlide: Omit<ContentStep, 'type'>, 
    quizzes: { q: string, opts: string[], ans: number, expl: string }[]
  ) => {
    steps.push({ type: 'content', ...contentSlide });
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
    label: "Prompt Breakdown",
    content: "Some think **individuals** can do little to improve the environment. Only **governments and large companies** can make a real difference. \n\n**Type:** Discuss both views + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "mitigation", ru: "смягчение (последствий)", uz: "yumshatish" },
      { term: "negligible", ru: "ничтожный / незначительный", uz: "arzimas" }
    ]
  }, [
    {
      q: "What is the core conflict?",
      opts: ["Rich vs Poor", "Individual Agency (Small scale) vs State Power (Large scale)", "Cars vs Bikes"],
      ans: 1,
      expl: "The prompt asks if one person's actions matter ('do little') compared to the massive power of governments."
    },
    {
      q: "If you agree that individuals can do little, what are you saying?",
      opts: ["Recycling is useless", "Individual actions have a 'negligible' impact compared to industrial pollution", "People should litter"],
      ans: 1,
      expl: "Agreement with the prompt implies a cynical or realistic view that personal habits are too small to stop global climate change."
    }
  ]);

  // -- 2. Planning: Position --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "Thesis Statement",
    content: "**Position:** Nuanced Agreement. \n**Thesis:** While individual action acts as a **catalyst**, I agree that only the **legislative** power of governments is sufficient to tackle the **magnitude** of the climate crisis.",
    theme: "indigo",
    vocab: [
      { term: "catalyst", ru: "катализатор / ускоритель", uz: "katalizator" },
      { term: "legislative", ru: "законодательный", uz: "qonunchilik" }
    ]
  }, [
    {
      q: "What does 'catalyst' mean?",
      opts: ["A type of car", "Something that sparks or speeds up a change", "A cat list"],
      ans: 1,
      expl: "This is a chemistry metaphor. Individuals don't do the heavy lifting, but they start the reaction (political pressure)."
    },
    {
      q: "Why focus on 'legislative power'?",
      opts: ["Because laws force companies to change", "Because it sounds fancy", "Because lawyers are rich"],
      ans: 0,
      expl: "The prompt mentions 'governments'. Their unique superpower is making laws (legislation). Identifying this shows deep task response."
    }
  ]);

  // -- 3. Planning: Blueprint --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Outline",
    content: [
      "**BP1 (Side A):** The Power of the State (Scale, Infrastructure, Regulation).",
      "**BP2 (Side B):** The Role of the Individual (Consumer pressure, Habits).",
      "**BP3 (Opinion):** Individual action is the **fuel**, but Government is the **engine**."
    ],
    theme: "indigo",
    vocab: [
      { term: "infrastructure", ru: "инфраструктура", uz: "infratuzilma" },
      { term: "regulation", ru: "регулирование", uz: "tartibga solish" }
    ]
  }, [
    {
      q: "What analogy is used in the Opinion section?",
      opts: ["Fuel and Engine", "Cat and Mouse", "Hammer and Nail"],
      ans: 0,
      expl: "Using an analogy (Engine/Fuel) helps clarify the relationship between the two sides. The engine (Gov) does the work, but needs fuel (People) to run."
    },
    {
      q: "Why discuss Side A first?",
      opts: ["To get it out of the way", "To establish the scale of the problem before discussing the solution", "Random choice"],
      ans: 1,
      expl: "Establishing the 'Scale' of the problem explains WHY individuals feel powerless, setting up the context for the whole debate."
    }
  ]);

  // -- 4. Introduction --
  addSlide({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "The Context",
    content: "The question of who bears the primary responsibility for environmental **remediation** is pivotal. Many argue that the **sheer scale** of global warming renders individual efforts **futile** without systemic change led by state actors.",
    theme: "blue",
    vocab: [
      { term: "remediation", ru: "восстановление / исправление", uz: "tiklash / tuzatish" },
      { term: "futile", ru: "бесполезный / тщетный", uz: "foydasiz / behuda" }
    ]
  }, [
    {
      q: "What is 'remediation'?",
      opts: ["Thinking", "The action of remedying or stopping damage", "Reading"],
      ans: 1,
      expl: "Environmental 'remediation' is the specific term for cleaning up pollution. It is Topic Specific Vocabulary."
    },
    {
      q: "What does 'sheer scale' emphasize?",
      opts: ["The problem is transparent", "The problem is absolutely massive", "The problem is vertical"],
      ans: 1,
      expl: "'Sheer' is an intensifier. It emphasizes that the size of the problem is the main issue."
    }
  ]);

  // -- 5. BP1: Government Power --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The State",
    label: "Systemic Impact",
    content: [
      "It is undeniable that industrial pollution dwarfs personal waste. Governments possess the unique authority to enforce **stringent regulations** on emissions and invest in green **infrastructure** (like high-speed rail) that individuals simply cannot build.",
      "**Key Concept:** Scale of impact."
    ],
    theme: "red",
    vocab: [
      { term: "stringent", ru: "строгий / жесткий", uz: "qattiq / qat'iy" },
      { term: "dwarfs", ru: "затмевает / делает мелким", uz: "mitti qilib ko'rsatadi" }
    ]
  }, [
    {
      q: "What does the verb 'dwarfs' mean here?",
      opts: ["Makes short", "Makes something look small by comparison", "A fantasy creature"],
      ans: 1,
      expl: "Industrial pollution is so big it makes personal waste look tiny (like a dwarf). This is excellent descriptive vocabulary."
    },
    {
      q: "Why mention 'high-speed rail'?",
      opts: ["I like trains", "It is an example of infrastructure that requires government money/planning", "It is fast"],
      ans: 1,
      expl: "Individuals can't build trains. This proves that some environmental solutions are ONLY possible for governments."
    }
  ]);

  // -- 6. BP2: Individual Role --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Individual",
    label: "Collective Agency",
    content: [
      "However, to dismiss individual action as **negligible** ignores the power of **collective agency**. Markets shift based on consumer demand; if millions refuse plastic, corporations are forced to adapt. Political will is also generated by the voting patterns of individuals.",
      "**Key Concept:** Bottom-up pressure."
    ],
    theme: "green",
    vocab: [
      { term: "collective agency", ru: "коллективное действие", uz: "jamoaviy harakat" },
      { term: "negligible", ru: "ничтожный", uz: "ahamiyatsiz" }
    ]
  }, [
    {
      q: "What is 'collective agency'?",
      opts: ["A talent agency", "The power that a group has when they act together", "A collection"],
      ans: 1,
      expl: "One person is weak. A million people acting together (Collective) have power (Agency). This refutes the 'individuals are weak' argument."
    },
    {
      q: "How do individuals influence corporations?",
      opts: ["By writing letters", "By 'voting with their wallets' (Consumer demand)", "By asking nicely"],
      ans: 1,
      expl: "The paragraph argues that corporations only produce what people buy. If people stop buying plastic, companies stop making it."
    }
  ]);

  // -- 7. BP3: Opinion --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Writer's Opinion",
    label: "The Symbiotic Relationship",
    content: "Ultimately, I maintain that while governments hold the **levers of power**, they are static without individual pressure. Legislation provides the **framework**, but public compliance and advocacy provide the momentum. Neither can succeed in isolation.",
    theme: "yellow",
    vocab: [
      { term: "levers of power", ru: "рычаги власти", uz: "hokimiyat richaglari" },
      { term: "compliance", ru: "соблюдение (правил)", uz: "rioya qilish" }
    ]
  }, [
    {
      q: "What does 'levers of power' imply?",
      opts: ["Government is a machine", "Government has the tools to make things happen mechanically", "A gym machine"],
      ans: 1,
      expl: "This metaphor suggests that the government sits in the control seat. They can pull the lever (pass a law) to change reality instantly."
    },
    {
      q: "What is the relationship described?",
      opts: ["They are enemies", "Symbiotic (they need each other)", "Independent"],
      ans: 1,
      expl: "The opinion argues that Government needs People (momentum) and People need Government (framework). They are interdependent."
    }
  ]);

  // -- 8. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Final Verdict",
    label: "Shared Responsibility",
    content: "In conclusion, the **magnitude** of the environmental crisis demands a dual approach. While only governments can enforce **systemic** changes, these actions are inevitably driven by the conscience and choices of the individual citizenry.",
    theme: "purple",
    vocab: [
      { term: "magnitude", ru: "масштаб / величина", uz: "kattalik / miqyos" },
      { term: "systemic", ru: "системный", uz: "tizimli" }
    ]
  }, [
    {
      q: "What is 'systemic change'?",
      opts: ["Change to the whole system", "Small changes", "Changing a lightbulb"],
      ans: 0,
      expl: "Recycling a bottle is 'individual'. Changing how electricity is generated for the whole country is 'systemic'."
    },
    {
      q: "Does the writer choose one side?",
      opts: ["Yes, Government only", "Yes, Individuals only", "No, it's a 'Dual Approach'"],
      ans: 2,
      expl: "The conclusion synthesizes both views. The scale requires Government, but the motivation comes from Individuals."
    }
  ]);

  // -- 9. Scorecard --
  addSlide({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Key Takeaways",
    label: "Why this works",
    content: [
      "**Task Response:** Acknowledged the limit of individual power ('negligible') while validating its role as a 'catalyst'.",
      "**Lexical Resource:** Used environmental collocations: 'Green infrastructure', 'Stringent regulations', 'Remediation'.",
      "**Grammar:** Complex sentences balancing two subjects ('While X... Y')."
    ],
    theme: "indigo",
    vocab: [
      { term: "conscience", ru: "совесть", uz: "vijdon" },
      { term: "advocacy", ru: "пропаганда / защита интересов", uz: "targ'ibot / himoya" }
    ]
  }, [
    {
      q: "Why is 'catalyst' a key structural concept?",
      opts: ["It sounds good", "It explains the *relationship* between the two sides (Cause and Effect)", "It is a noun"],
      ans: 1,
      expl: "Instead of just saying 'Both are important', describing one as the 'Catalyst' explains precisely HOW they interact. This creates a deep argument."
    },
    {
      q: "What is 'advocacy'?",
      opts: ["Being a lawyer", "Public support for or recommendation of a particular cause or policy", "Ignoring problems"],
      ans: 1,
      expl: "When individuals protest or vote for green policies, they are engaging in 'advocacy'. This is the mechanism of their power."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson7: React.FC = () => {
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
      <div className="mb-6 sticky top-16 bg-gray-100 pt-4 z-10 pb-4">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 7: Environmental Responsibility</h1>
            <p className="text-sm text-gray-500 font-medium">Step {currentStep + 1} of {STEPS.length}</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ease-out ${activeData.type === 'quiz' ? 'bg-indigo-400' : 'bg-indigo-600'}`} style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}></div>
        </div>
      </div>
      
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

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex justify-between items-center px-4">
          <button onClick={handlePrev} disabled={currentStep === 0} className={`flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-200 ${currentStep === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600 active:scale-95'}`}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>Back
          </button>
          <button onClick={handleNext} disabled={currentStep === STEPS.length - 1} className={`flex items-center px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-200 transform ${currentStep === STEPS.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 active:scale-95'}`}>
            {currentStep === STEPS.length - 1 ? 'Lesson Complete' : 'Next'}
            {currentStep !== STEPS.length - 1 && (<svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson7;