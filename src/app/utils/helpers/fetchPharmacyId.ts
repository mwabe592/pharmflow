import { createClient } from "../supabase/server";

async function fetchPharmacyId() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(`Auth error: ${authError.message}`);
  }

  if (!user) {
    throw new Error("No authenticated user found.");
  }

  const { data: pharmacyData, error: profileError } = await supabase
    .from("profiles")
    .select("pharmacy_id")
    .eq("id", user.id)
    .single();

  if (profileError || !pharmacyData) {
    throw new Error("Error fetching user profile.");
  }

  return pharmacyData.pharmacy_id;
}

export default fetchPharmacyId;
