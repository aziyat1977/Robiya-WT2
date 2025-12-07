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
    content: "Address **both views** and give your **opinion**. \n\n**Topic:** Crime & Punishment (Fixed Sentencing vs. Judicial Discretion). \n**Type:** Discussion + Opinion.",
    theme: "indigo",
    vocab: [
      { term: "judicial discretion", ru: "судебное усмотрение", uz: "sud ixtiyori" },
      { term: "sentencing", ru: "вынесение приговора", uz: "hukm chiqarish" }
    ]
  }, [
    {
      q: "What is 'Judicial Discretion'?",
      opts: ["Judges keeping secrets", "The power of a judge to make decisions based on the individual circumstances", "A type of prison"],
      ans: 1,
      expl: "Discretion means the freedom to decide what should be done in a particular situation. In law, it allows judges to fit the punishment to the crime."
    },
    {
      q: "Why is this a 'Discussion' essay?",
      opts: ["It asks for your favorite crime", "It presents two opposing views (Fixed vs Variable) and asks you to analyze both", "It asks for a solution"],
      ans: 1,
      expl: "The prompt explicitly contrasts 'fixed punishments' with 'circumstances'. You must analyze the logic behind BOTH before giving your view."
    }
  ]);

  // -- 2. Planning: Position --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step B: Position",
    label: "The Thesis Statement",
    content: "**Position:** Partially Agree with variable sentencing. \n**Thesis:** While **mandatory sentencing** ensures consistency, true justice requires the flexibility to consider **mitigating circumstances**.",
    theme: "indigo",
    vocab: [
      { term: "mandatory sentencing", ru: "обязательный приговор", uz: "majburiy hukm" },
      { term: "mitigating circumstances", ru: "смягчающие обстоятельства", uz: "yengillashtiruvchi holatlar" }
    ]
  }, [
    {
      q: "What is the main benefit of 'mandatory sentencing' admitted in the thesis?",
      opts: ["It is cheaper", "It ensures consistency (fairness by treating everyone the same)", "It is faster"],
      ans: 1,
      expl: "The thesis acknowledges the strength of the opposing view ('consistency') before arguing for its own view ('flexibility'). This is a balanced, Band 9 approach."
    },
    {
      q: "What does 'mitigating' mean?",
      opts: ["Making something worse", "Making something less severe or painful", "Ignoring"],
      ans: 1,
      expl: "Mitigating factors (like self-defense or mental illness) reduce the severity of the crime and thus should reduce the punishment."
    }
  ]);

  // -- 3. Planning: Blueprint --
  addSlide({
    sectionTitle: "Cullen Planning Phase",
    sectionSubtitle: "Step C: Structure",
    label: "The Argument Blueprint",
    content: [
      "**BP1 (Side A):** Fixed punishments ensure **equality** and act as a **deterrent**.",
      "**BP2 (Side B):** Variable sentencing allows for **equity** and rehabilitation.",
      "**BP3 (Opinion):** Justice requires context; rigid systems fail in complex cases."
    ],
    theme: "indigo",
    vocab: [
      { term: "deterrent", ru: "сдерживающий фактор", uz: "to'xtatib turuvchi omil" },
      { term: "equity", ru: "справедливость (по сути)", uz: "adolat (mohiyatiga ko'ra)" }
    ]
  }, [
    {
      q: "What is the difference between 'Equality' and 'Equity' here?",
      opts: ["They are the same", "Equality is treating everyone the same; Equity is giving everyone what they need to be fair", "Equity means money"],
      ans: 1,
      expl: "BP1 argues for Equality (Same crime = Same time). BP2 argues for Equity (Fairness based on context). Distinguishing these concepts shows deep thought."
    },
    {
      q: "What is a 'deterrent'?",
      opts: ["A cleaning product", "Something that discourages someone from doing something", "A lawyer"],
      ans: 1,
      expl: "Fixed punishments are often argued to be a better deterrent because the criminal knows exactly what the penalty will be."
    }
  ]);

  // -- 4. Introduction --
  addSlide({
    sectionTitle: "Essay Writing",
    sectionSubtitle: "Introduction",
    label: "Setting the Stage",
    content: "The question of whether the law should apply a **rigid framework** of punishment or allow for judicial discretion is a **fundamental** legal debate. This essay will examine both the argument for consistency and the need for flexibility.",
    theme: "blue",
    vocab: [
      { term: "rigid framework", ru: "жесткие рамки", uz: "qattiq ramkalar" },
      { term: "fundamental", ru: "фундаментальный", uz: "asosiy" }
    ]
  }, [
    {
      q: "Why use 'rigid framework' instead of 'strict rules'?",
      opts: ["It is harder to spell", "It suggests a structure that cannot bend or adapt, which fits the topic of 'Fixed' punishment perfectly", "It is slang"],
      ans: 1,
      expl: "Lexical Resource (Band 9) involves using precise metaphorical language. 'Rigid' implies something that breaks rather than bends."
    },
    {
      q: "What is the function of the second sentence?",
      opts: ["To give the opinion", "To outline the essay structure (Roadmap)", "To finish the essay"],
      ans: 1,
      expl: "It tells the reader exactly what to expect: an examination of consistency (Side A) and flexibility (Side B)."
    }
  ]);

  // -- 5. BP1: Fixed Punishment --
  addSlide({
    sectionTitle: "Body Paragraph 1",
    sectionSubtitle: "Side A: The Case for Consistency",
    label: "Equality Before the Law",
    content: [
      "Proponents of fixed sentencing argue that it acts as a clear **deterrent** and ensures equality. If every theft carries the same penalty, there is no **ambiguity**, and bias is removed from the courtroom.",
      "**Key Concept:** Predictability prevents corruption."
    ],
    theme: "red",
    vocab: [
      { term: "ambiguity", ru: "двусмысленность / неопределенность", uz: "noaniqlik" },
      { term: "bias", ru: "предвзятость", uz: "xolislik yo'qligi" }
    ]
  }, [
    {
      q: "How does fixed sentencing remove 'bias'?",
      opts: ["Judges can't choose friends", "If the rule is fixed, the judge's personal opinion doesn't matter", "It doesn't"],
      ans: 1,
      expl: "The argument is that if the law says '5 years for theft', a judge cannot be racist or corrupt and give their friend 1 year. This ensures 'Equality'."
    },
    {
      q: "Why is 'ambiguity' bad in law?",
      opts: ["It is confusing", "Citizens need to know exactly what is illegal and what the punishment is", "It is fun"],
      ans: 1,
      expl: "Law requires clarity. 'Ambiguity' means the outcome is uncertain. Fixed sentences remove this uncertainty."
    }
  ]);

  // -- 6. BP2: Variable Sentencing --
  addSlide({
    sectionTitle: "Body Paragraph 2",
    sectionSubtitle: "Side B: The Case for Flexibility",
    label: "Context Matters",
    content: [
      "However, crimes are rarely identical. **Mitigating factors** such as self-defense, mental health, or **coercion** significantly alter the nature of the offense. A rigid system fails to distinguish between a career criminal and a desperate first-time offender.",
      "**Key Concept:** Intent changes the crime."
    ],
    theme: "green",
    vocab: [
      { term: "coercion", ru: "принуждение", uz: "majburlash" },
      { term: "distinguish", ru: "различать", uz: "ajratib ko'rsatmoq" }
    ]
  }, [
    {
      q: "What is 'coercion'?",
      opts: ["Cooperation", "Being forced to do something against your will", "Coin collecting"],
      ans: 1,
      expl: "If you are forced (coerced) to steal, you shouldn't be punished the same as someone who chose to steal. This proves the need for flexibility."
    },
    {
      q: "What is the comparison made to show the failure of rigid systems?",
      opts: ["Apples and Oranges", "Career criminal vs Desperate first-time offender", "Rich vs Poor"],
      ans: 1,
      expl: "Contrasting two people who commit the same act (theft) but for different reasons (greed vs hunger) highlights the injustice of fixed penalties."
    }
  ]);

  // -- 7. BP3: Opinion --
  addSlide({
    sectionTitle: "Body Paragraph 3",
    sectionSubtitle: "The Writer's Opinion",
    label: "The Spirit of the Law",
    content: [
      "I firmly believe that **judicial discretion** is **paramount**. A legal system that ignores context risks becoming a tool of oppression. The 'spirit of the law' often demands **leniency** where the 'letter of the law' demands harshness.",
      "**Opinion:** Blind justice is not true justice."
    ],
    theme: "yellow",
    vocab: [
      { term: "paramount", ru: "первостепенный", uz: "eng muhim" },
      { term: "leniency", ru: "снисходительность / мягкость", uz: "yumshoqlik" }
    ]
  }, [
    {
      q: "What does 'paramount' mean?",
      opts: ["A mountain", "More important than anything else", "Equal"],
      ans: 1,
      expl: "Using strong adjectives like 'paramount' (supreme importance) clearly signals the strength of your opinion to the examiner."
    },
    {
      q: "What is the difference between 'spirit' and 'letter' of the law?",
      opts: ["Ghosts vs Alphabet", "Intention of justice vs Strict written rules", "Old vs New"],
      ans: 1,
      expl: "This is a high-level idiomatic expression. The 'letter' is the exact rule; the 'spirit' is the fairness the rule was meant to create."
    }
  ]);

  // -- 8. Conclusion --
  addSlide({
    sectionTitle: "Conclusion",
    sectionSubtitle: "Final Verdict",
    label: "Summary",
    content: "In conclusion, while fixed punishments offer a **veneer** of equality, they often result in injustice. Therefore, I maintain that judges must **retain** the power to **tailor** sentences to the individual case to ensure a truly fair society.",
    theme: "purple",
    vocab: [
      { term: "veneer", ru: "видимость / внешний лоск", uz: "tashqi ko'rinish / niqob" },
      { term: "tailor", ru: "адаптировать / подгонять", uz: "moslashtirmoq" }
    ]
  }, [
    {
      q: "What does 'veneer' imply?",
      opts: ["It is solid gold", "It looks good on the surface but is thin or fake underneath", "It is wood"],
      ans: 1,
      expl: "A veneer is a thin layer. Using this word suggests that fixed punishment *looks* fair (equal) but isn't actually fair deep down."
    },
    {
      q: "Why use the verb 'tailor'?",
      opts: ["To talk about clothes", "To describe making something fit a specific person/situation perfectly", "To cut"],
      ans: 1,
      expl: "Just as a tailor fits clothes to a body, a judge fits the punishment to the crime. This is excellent metaphorical vocabulary."
    }
  ]);

  // -- 9. Band 9 Checklist --
  addSlide({
    sectionTitle: "Band 9 Analysis",
    sectionSubtitle: "Key Takeaways",
    label: "Why this works",
    content: [
      "**Task Response:** Explored the conflict between Consistency (Fixed) and Justice (Variable).",
      "**Lexical Resource:** Used legal collocations: 'Mitigating factors', 'Judicial discretion', 'Mandatory sentencing'.",
      "**Cohesion:** Logical progression from Rule -> Exception -> Verdict."
    ],
    theme: "indigo",
    vocab: [
      { term: "collocations", ru: "словосочетания", uz: "so'z birikmalari" },
      { term: "progression", ru: "прогрессия / развитие", uz: "rivojlanish" }
    ]
  }, [
    {
      q: "Which element is crucial for the Cohesion score here?",
      opts: ["Using legal words", "The logical flow (Rule -> Exception -> Verdict)", "Writing 300 words"],
      ans: 1,
      expl: "Cohesion is not just linking words; it is the logical sequencing of ideas. Moving from the general rule (BP1) to the exception (BP2) is logical."
    },
    {
      q: "Why are specific examples (Self-defense, mental health) important?",
      opts: ["They fill space", "They prove you understand the abstract concepts by applying them to reality", "They are easy"],
      ans: 1,
      expl: "Abstract concepts like 'Variable Sentencing' are hard to visualize. Examples make your argument concrete and persuasive."
    }
  ]);

  return steps;
};

const STEPS = buildSteps();

const Lesson5: React.FC = () => {
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
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Lesson 5: Crime & Punishment</h1>
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

export default Lesson5;