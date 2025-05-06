"use server";

import { createClient } from "../supabase/server";
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
  const pharmacyId = formData.get("pharmacy_id")?.toString();
  const role = formData.get("role")?.toString().toLowerCase() || "";

  // If role is "manager", update profiles table
  if (role === "manager") {
    const { error } = await supabase
      .from("profiles")
      .update({ role: "manager" })
      .eq("id", user?.id);

    //if manager insert manager details to the manager table
    const { error: managerInsertError } = await supabase.from('');

    if (error) {
      console.error("Error updating manager role:", error.message);
      return { success: false, message: "Failed to complete onboarding" };
    }
  }

  // If role is staff, update both profiles and staff tables
  if (["pharmacist", "technician", "retail"].includes(role)) {
    // Update profiles table for staff role
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ role: "staff" })
      .eq("id", user?.id);

    if (profileError) {
      console.error("Error updating staff profile:", profileError.message);
      return { success: false, message: "Failed to complete onboarding" };
    }

    // Check if staff record exists in the staff table
    const { data: existingStaff, error: staffCheckError } = await supabase
      .from("staff")
      .select("*")
      .eq("profile_id", user?.id)
      .single();

    if (staffCheckError && staffCheckError.code !== "PGRST116") {
      console.error("Error checking staff record:", staffCheckError.message);
      return { success: false, message: "Failed to complete onboarding" };
    }

    if (existingStaff) {
      const { error: staffError } = await supabase
        .from("staff")
        .update({ role, pharmacy_id: `${pharmacyId}` })
        .eq("id", existingStaff.staff_id);

      if (staffError) {
        console.error("Error updating staff record:", staffError.message);
        return { success: false, message: "Failed to complete onboarding" };
      }

      const { error: profileCompleteError } = await supabase
        .from("profiles")
        .update({ profile_completed: true })
        .eq("id", existingStaff.staff_id);

      if (profileCompleteError) {
        console.error(
          "Error updating profile completion:",
          profileCompleteError.message
        );
        return { success: false, message: "Failed to complete onboarding" };
      }
    } else {
      const { data: newStaff, error: createStaffError } = await supabase
        .from("staff")
        .insert({
          profile_id: user?.id,
          first_name: firstName!,
          last_name: lastName!,
          pharmacy_id: `${pharmacyId}`,
          role,
          status: "active",
        });

      const { data, error: profileCompleteError } = await supabase
        .from("profiles")
        .update({ profile_completed: true })
        .eq("id", user?.id);

      if (createStaffError) {
        console.error("Error creating staff record:", createStaffError.message);
        return { success: false, message: "Failed to complete onboarding" };
      }
    }

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({ profile_completed: true })
      .eq("id", user?.id);

    console.log("profile update error", profileUpdateError);

    if (profileUpdateError) {
      console.error(
        "Error updating final profile flag:",
        profileUpdateError.message
      );
      return { success: false, message: "Failed to complete onboarding" };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};

export default completeonboarding;
