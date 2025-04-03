"use server";

import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const completeonboarding = async (formData: FormData) => {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Authentication error:", authError?.message);
    return;
  }

  // Extract form values
  const firstName = formData.get("first-name")?.toString();
  const lastName = formData.get("last-name")?.toString();
  const pharmacyName = formData.get("pharmacy_name")?.toString();
  const pharmacyId = formData.get("pharmacy_id")?.toString();
  const role = formData.get("role")?.toString().toLowerCase() || "";

  console.log("pharmacy id and name:", pharmacyId, pharmacyName);

  try {
    // If role is "manager", update profiles table
    if (role === "manager") {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "manager" })
        .eq("id", user?.id);

      if (error) throw new Error(error.message);
    }

    // If role is staff, update both profiles and staff tables
    if (["pharmacist", "technician", "retail"].includes(role)) {
      // Update profiles table for staff role
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ role: "staff" })
        .eq("id", user?.id);

      if (profileError) throw new Error(profileError.message);

      // Check if staff record exists in the staff table
      const { data: existingStaff, error: staffCheckError } = await supabase
        .from("staff")
        .select("*")
        .eq("profile_id", user?.id)
        .single();

      if (staffCheckError && staffCheckError.code !== "PGRST116") {
        throw new Error(staffCheckError.message);
      }

      // If staff record exists, update it
      if (existingStaff) {
        const { error: staffError } = await supabase
          .from("staff")
          .update({ role, pharmacy_id: `${pharmacyId}` })
          .eq("id", existingStaff.id);

        if (staffError) throw new Error(staffError.message);

        // Update profile to indicate completion
        const { error: profileCompleteError } = await supabase
          .from("profiles")
          .update({ profile_completed: true })
          .eq("id", existingStaff.profile_id);

        if (profileCompleteError) throw new Error(profileCompleteError.message);
      } else {
        // If no existing staff record, create a new one
        const { error: createStaffError } = await supabase
          .from("staff")
          .insert({
            profile_id: user?.id,
            first_name: firstName,
            last_name: lastName,
            pharmacy_id: `${pharmacyId}`,
            role: role,
          });

        if (createStaffError) throw new Error(createStaffError.message);
      }

      // Update profile completion flag
      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({ profile_completed: true })
        .eq("id", user?.id);

      if (profileUpdateError) throw new Error(profileUpdateError?.message);
    }
    
    // Redirect to the dashboard after successful completion
    revalidatePath("/dashboard");
    redirect("/dashboard");
    
  } catch (err) {
    console.error("Error updating role:", err);
    // You can either return an error or redirect to an error page
    return { success: false, message: "Failed to complete onboarding" };
  }
};

export default completeonboarding;