import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import React from "react";

const OnboardingPage = async () => {
  return (
    <div className="container relative min-h-screen flex items-center justify-center py-10 px-5">
      <OnboardingFlow />
    </div>
  );
};

export default OnboardingPage;
