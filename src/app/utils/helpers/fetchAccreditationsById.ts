import { UserAccreditation } from "@/app/types/accreditationTypes";
import { createClient } from "../supabase/server";

export async function fetchAccreditationsById(staffId: string) {
  const supabase = await createClient();
  const currentDate = new Date().toISOString().split("T")[0];

  const { data: accreditationData, error } = await supabase
    .from("staff_accreditations")
    .select(
      `
      id,
      expiry_date,
      file_path,
      service_accreditations:service_accreditation_id (
        name
      )
    `
    )
    .eq("staff_id", staffId);

  if (error) {
    throw new Error(error.message);
  }

  // Create an array of promises for generating signed URLs
  const accreditationPromises = accreditationData.map(async (accreditation) => {
    let signedUrl = null;

    if (accreditation.file_path) {
      // Make sure to use the actual file path from the accreditation
      const { data } = await supabase.storage
        .from("accreditation-certificates")
        .createSignedUrl(accreditation.file_path, 3600);

      if (data) {
        signedUrl = data.signedUrl;
      }
    }

    return {
      ...accreditation,
      isExpired: accreditation.expiry_date < currentDate,
      fileUrl: signedUrl, // Store the signed URL in a new property
    };
  });

  // Wait for all promises to resolve
  const accreditationsWithExpiration = await Promise.all(accreditationPromises);

  return accreditationsWithExpiration as UserAccreditation[];
}
