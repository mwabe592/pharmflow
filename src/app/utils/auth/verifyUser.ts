// utils/auth.ts
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation"; // For redirection in server components

// Function to verify if the user is authenticated
export async function verifyUser() {
  const supabase = await createClient();

  // Get the current session from Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // If there's no user or an authentication error, redirect to the login page
  if (error || !user) {
    redirect("/login");
  }

  return { supabase, user }; // Return the authenticated user
}
