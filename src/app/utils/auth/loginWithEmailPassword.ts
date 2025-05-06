"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";
import { getUserRoleFromToken } from "./getUserRole";

export async function loginWithEmailPassword(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: loginData, error: logInError } =
    await supabase.auth.signInWithPassword(data);
  console.log("login data is:", loginData);
  if (logInError) {
    console.log("login error is:", logInError);
    redirect("/error");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/error");

  const userRole = getUserRoleFromToken(session.access_token);
  console.log("User role is now:", userRole);

  revalidatePath("/", "layout");

  if (userRole === "manager") {
    redirect("/manager");
  } else if (userRole === "staff") {
    redirect("/staff");
  } else {
    redirect("/dashboard");
  }
}
