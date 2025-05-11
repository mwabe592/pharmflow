"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

export async function loginWithEmailPassword(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect("/error");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error(userError?.message || "User not found");
  }

  const { data: onboardingData, error: onboardingDataError } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .single();

  if (onboardingDataError) {
    throw new Error(onboardingDataError.message);
  }

  revalidatePath("/", "layout");

  // 🔁 Check onboarding status
  if (!onboardingData?.onboarded) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}
