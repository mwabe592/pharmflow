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
export type UserData = {
  firstName: string;
  lastName: string;
  pharmacyName: string;
};

// Shared fields
export type SharedUserData = {
  firstName: string;
  lastName: string;
};

// Specific types
export type AdminUserData = SharedUserData & {
  pharmacyName: string;
};

export type IndividualUserData = SharedUserData & {
  role: string;
};

// Union type with discriminant
type OnboardingFormData =
  | { userType: "admin"; data: AdminUserData }
  | { userType: "individual"; data: IndividualUserData };

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

  const handleFormSubmit = (form: OnboardingFormData) => {
    const { data, userType } = form;

    if (userType === "admin") {
      // do something with AdminUserData
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        pharmacyName: data.pharmacyName,
      });
    } else {
      // do something with IndividualUserData
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        pharmacyName: "", // fallback if needed
      });
    }

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
              onSubmit={(data) => handleFormSubmit({ userType: "admin", data })}
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
              onSubmit={(data) =>
                handleFormSubmit({ userType: "individual", data })
              }
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
