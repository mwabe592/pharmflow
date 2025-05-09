import { CheckIcon } from "lucide-react";

type OnboardingStepsProps = {
  currentStep: number;
  totalSteps: number;
};

export function OnboardingSteps({
  currentStep,
  totalSteps,
}: OnboardingStepsProps) {
  const steps = [
    { number: 1, label: "Choose Path" },
    { number: 2, label: "Your Details" },
    { number: 3, label: "Complete" },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                step.number < currentStep
                  ? "border-[#5e8e4b] bg-[#5e8e4b] text-white"
                  : step.number === currentStep
                    ? "border-[#5e8e4b] text-[#5e8e4b]"
                    : "border-muted-foreground/30 text-muted-foreground/50"
              }`}
            >
              {step.number < currentStep ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
              {step.number !== totalSteps && (
                <div
                  className={`absolute left-full top-1/2 h-[2px] w-[calc(100%-2.5rem)] -translate-y-1/2 ${
                    step.number < currentStep
                      ? "bg-[#5e8e4b]"
                      : "bg-muted-foreground/30"
                  }`}
                />
              )}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                step.number <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground/50"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
