"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AdminOnboardingForm } from "./AdminOnboardingForm";
import { CompletionScreen } from "./CompletionScreen";
import { DecisionScreen } from "./DecisionScreen";
import { IndividualOnboardingForm } from "./IndividualOnboardingForm";
import { OnboardingSteps } from "./OnboardingSteps";

export type OnboardingStep = "decision" | "form" | "completion";
export type UserType = "admin" | "individual" | null;

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("decision");
  const [userType, setUserType] = useState<UserType>(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    pharmacyName: "",
  });

  const handlePathSelection = (type: UserType) => {
    setUserType(type);
    setCurrentStep("form");
  };

  const handleFormSubmit = (data: any) => {
    setUserData({ ...userData, ...data });
    setCurrentStep("completion");
  };

  const handleGoBack = () => {
    if (currentStep === "form") {
      setCurrentStep("decision");
      setUserType(null);
    }
  };

  // Calculate current step number for progress indicator
  const stepNumber =
    currentStep === "decision" ? 1 : currentStep === "form" ? 2 : 3;
  const totalSteps = 3;

  return (
    <div className="w-full max-w-2xl sm:p-5">
      <OnboardingSteps currentStep={stepNumber} totalSteps={totalSteps} />

      <AnimatePresence mode="wait">
        {currentStep === "decision" && (
          <motion.div
            key="decision"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <DecisionScreen onSelect={handlePathSelection} />
          </motion.div>
        )}

        {currentStep === "form" && userType === "admin" && (
          <motion.div
            key="admin-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <AdminOnboardingForm
              onSubmit={handleFormSubmit}
              onBack={handleGoBack}
            />
          </motion.div>
        )}

        {currentStep === "form" && userType === "individual" && (
          <motion.div
            key="individual-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <IndividualOnboardingForm
              onSubmit={handleFormSubmit}
              onBack={handleGoBack}
            />
          </motion.div>
        )}

        {currentStep === "completion" && (
          <motion.div
            key="completion"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <CompletionScreen userType={userType} userData={userData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
