import { getPharmacies } from "@/app/utils/helpers/getPharmacies";
import OnboardingForm from "@/components/auth/OnboardingForm";
import React from "react";

const OnboardingPage = async () => {
  const pharmacies = await getPharmacies();

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Onboarding Form */}
        <h1 className="text-3xl font-bold text-center">Welcome 👋</h1>
        <p className="text-center">Let us know more about yourself</p>
        <OnboardingForm pharmacies={pharmacies} />
      </div>
    </div>
  );
};

export default OnboardingPage;
