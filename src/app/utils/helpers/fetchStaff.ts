
import { createClient } from "../supabase/server";

export const fetchStaff = async () => {
  const supabase = await createClient();

  const { data: staffData, error } = await supabase.from("staff").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return staffData;
};
