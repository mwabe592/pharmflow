import { getPharmacies } from "@/app/utils/helpers/getPharmacies";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import React from "react";

const OnboardingPage = async () => {
  const pharmacies = await getPharmacies();

  return (
    <div className="container relative min-h-screen flex items-center justify-center py-10 sm:m-5">
      <OnboardingFlow />
    </div>
  );
};

export default OnboardingPage;
