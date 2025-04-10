import { Staff } from "@/app/types/staff.types";
import { createClient } from "../supabase/server";

export const fetchStaffById = async (staffId: string) => {
  const supabase = await createClient();

  const { data: staffData, error } = await supabase
    .from("staff")
    .select("*")
    .eq("staff_id", staffId)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return staffData as Staff;
};
