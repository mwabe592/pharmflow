import { createClient } from "../supabase/server";

export async function fetchAccreditationsById(staffId: string) {
  const supabase = await createClient();

  const { data: accreditationData, error } = await supabase
    .from("staff_accreditations")
    .select("id, expiry_date, file_path, service_accreditations(name)")
    .eq("staff_id", staffId);
  if (error) {
    throw new Error(error.message);
  }

  return accreditationData;
}
