import { createClient } from "../supabase/client";

export const loginWithGoogle = async () => {
  const supabase = await createClient();

  try {
    const { error: googleLoginError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (googleLoginError) {
      throw new Error(googleLoginError.message);
    }
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};
