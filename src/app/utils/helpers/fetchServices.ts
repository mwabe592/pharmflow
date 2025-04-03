import { createClient } from "../supabase/server";

export async function fetchServices() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("pharmacy_services").select("*");

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data;
}
