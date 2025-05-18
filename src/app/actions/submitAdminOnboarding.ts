"use server";

import { TablesInsert } from "../types/database.types";
import { createClient } from "../utils/supabase/server";

type PreviousState = {
  message: string;
  success: boolean;
  error: string;
  data: {
    firstName: string;
    lastName: string;
    pharmacyName: string;
  };
};

export async function submitAdminOnboarding(
  prevState: PreviousState,
  formData: FormData
) {
  const pharmacyName = formData.get("pharmacyName") as string;
  const pharmacyAddress = formData.get("pharmacyAddress") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  const { user } = userData;

  if (userError || !user) {
    console.error("No authenticated user found");
    throw new Error("User not authenticated");
  }

  // Upload pharmacy data
  const pharmacyData: TablesInsert<"pharmacies"> = {
    name: pharmacyName,
    address: pharmacyAddress,
  };

  const { data: insertedPharmacy, error: pharmacyUploadError } = await supabase
    .from("pharmacies")
    .insert(pharmacyData)
    .select("id");

  if (pharmacyUploadError) {
    console.error(pharmacyUploadError.message);
    throw new Error(pharmacyUploadError.message);
  }

  const pharmacyId = insertedPharmacy?.[0]?.id;
  console.log("new pharmacy is:", insertedPharmacy);

  // Insert pharmacy_membership
  const { error: membershipError } = await supabase
    .from("pharmacy_memberships")
    .insert({
      user_id: user.id,
      pharmacy_id: pharmacyId,
      role: "admin",
      status: "active",
    });

  if (membershipError) {
    console.error(membershipError.message);
    throw new Error(membershipError.message);
  }

  // Upload user details to users table
  const { data: onboardingData, error: onboardingError } = await supabase
    .from("users")
    .upsert({
      id: user?.id,
      first_name: firstName,
      last_name: lastName,
      email: user?.email,
      onboarded: true,
      user_type: "admin",
    });

  if (!onboardingData && onboardingError) {
    console.error(onboardingError.message);
    throw new Error(onboardingError.message);
  }

  return {
    data: {
      firstName,
      lastName,
      pharmacyName,
    },
    message: "Successfully set up your pharmacy",
    success: true,
    error: "Unsuccessful in setting up pharmacy",
  };
}