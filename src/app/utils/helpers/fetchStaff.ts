import { Tables } from "@/app/types/database.types";
import { createClient } from "../supabase/server";

type Staff = Tables<"staff">;

export const fetchStaff = async () => {
  const supabase = await createClient();

  const { data: staffData, error } = await supabase.from("staff").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return staffData as Staff[];
};
