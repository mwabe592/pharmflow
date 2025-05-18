import { createClient } from "../supabase/server";

export default async function getUser() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  console.log("user is", user);

  if (user.data.user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("first_name, last_name, pharmacy_id, email, phone, user_type")
      .eq("id", user.data.user.id)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    let pharmacyName = null;

    if (userData.pharmacy_id) {
      const { data: pharmacyData, error: pharmacyError } = await supabase
        .from("pharmacies")
        .select("name")
        .eq("id", userData.pharmacy_id)
        .maybeSingle();

      if (pharmacyError && pharmacyError.code !== "PGRST116") {
        throw new Error(pharmacyError.message);
      }

      pharmacyName = pharmacyData?.name ?? null;
    }

    return {
      userData: {
        ...userData,
        pharmacy_name: pharmacyName,
      },
      message: "Successfully fetched user and pharmacy data",
      success: true,
    };
  }

  return {
    userData: null,
    message: "No user found",
    success: false,
  };
}
