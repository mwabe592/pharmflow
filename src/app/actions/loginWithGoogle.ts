import { createClient } from "../utils/supabase/client";

export const loginWithGoogle = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};
