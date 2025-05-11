import { createClient } from "../supabase/server";
import { QueryData } from "@supabase/supabase-js";

type UserAccreditation = {
  isExpired: boolean;
  fileUrl: string | null;
  id: string;
  expiry_date: string;
  file_path: string | null;
  service_accreditations: {
    name: string;
  } | null;
};

export async function fetchAccreditationsById(staffId: string) {
  const supabase = await createClient();
  const currentDate = new Date().toISOString().split("T")[0];

  const accreditationsQuery = supabase
    .from("accreditations")
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

  type AccreditationData = QueryData<typeof accreditationsQuery>;

  const { data, error } = await accreditationsQuery;

  if (!data || error) {
    throw new Error(error?.message || "Failed to fetch accreditations");
  }
  const accreditationData: AccreditationData = data;
  const accreditationPromises = accreditationData.map(async (accreditation) => {
    let signedUrl: string | null = null;

    if (accreditation.file_path) {
      const { data: signedData } = await supabase.storage
        .from("accreditation-certificates")
        .createSignedUrl(accreditation.file_path, 3600);

      if (signedData) {
        signedUrl = signedData.signedUrl;
      }
    }

    return {
      ...accreditation,
      isExpired: accreditation.expiry_date < currentDate,
      fileUrl: signedUrl,
    };
  });

  const accreditationsWithExpiration = await Promise.all(accreditationPromises);

  return accreditationsWithExpiration as UserAccreditation[];
}
