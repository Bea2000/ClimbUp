'use client';

type Step = 'judges' | 'problems';

export function CompetitionSteps({ currentStep }: { currentStep: Step }) {
  return (
    <div className="mb-8 w-full">
      <ul className="steps w-full">
        <li className={`step ${currentStep === 'judges' || currentStep === 'problems' ? 'step-primary' : ''}`}>
          Gestionar Jueces
        </li>
        <li className={`step ${currentStep === 'problems' ? 'step-primary' : ''}`}>
          Gestionar Problemas
        </li>
      </ul>
    </div>
  );
}
