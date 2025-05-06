// utils/auth.ts
import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation"; 


export async function verifyUser() {
  const supabase = await createClient();


  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();


  if (error || !user) {
    redirect("/login");
  }

  return { supabase, user }; 
}
