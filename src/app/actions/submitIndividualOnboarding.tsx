"use server";

import { createClient } from "@/app/utils/supabase/server";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  pharmacyName: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
};

export async function submitIndividualOnboarding(data: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from("users").upsert({
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    onboarded: true,
  });

  if (error) {
    throw new Error(error.message);
  }
}
