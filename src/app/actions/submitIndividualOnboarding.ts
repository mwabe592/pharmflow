"use server";

import { createClient } from "../utils/supabase/server";

type PreviousState = {
  message: string;
  success: boolean;
  error: string;
  data: {
    firstName: string;
    lastName: string;
    role: string;
  };
};
export async function submitIndividualOnboarding(
  prevState: PreviousState,
  formData: FormData
) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const role = formData.get("role") as string;

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const { user } = userData;

  if (userError || !user) {
    console.error("No authenticated user found");
    throw new Error("User not authenticated");
  }

  // Upload user details to users table
  const { data: onboardingData, error: onboardingError } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      first_name: firstName,
      last_name: lastName,
      email: user.email,
      onboarded: true,
      user_type: "individual",
    });

  if (!onboardingData && onboardingError) {
    console.error(onboardingError.message);
    throw new Error(onboardingError.message);
  }

  return {
    data: {
      firstName,
      lastName,
      role,
    },
    message: "Successfully onboarded as an individual",
    success: true,
    error: "Unsuccessful in submitting individual onboarding form",
  };
}
