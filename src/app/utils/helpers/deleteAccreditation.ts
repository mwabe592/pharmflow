"use server";
import { UserAccreditation } from "@/app/types/accreditation.types";
import { createClient } from "../supabase/server";

export async function deleteAccreditation(accreditation: UserAccreditation) {
  const supabase = await createClient();

  //delete accreditation from staff_accreditation table
  const { data: deletedAccreditation, error: deletingError } = await supabase
    .from("staff_accreditations")
    .delete()
    .eq("id", accreditation.id)
    .select();

  if (deletingError) {
    throw new Error(
      `Error deleting accreditation${accreditation.service_accreditations?.name}`
    );
  }

  //if file present, delete file from the storage bucket
  if (accreditation.fileUrl) {
    const { data: storageData, error } = await supabase.storage
      .from("accreditation-certificates")
      .remove([`${accreditation.file_path}`]);

    if (deletingError || !storageData) {
      throw new Error(
        `Error deleting accreditation file from storage${accreditation.service_accreditations?.name}`
      );
    }
  }

  return {
    success: true,
    message: "Deleting accreditation Successful",
    deletedAccreditation: deletedAccreditation,
  };
}
