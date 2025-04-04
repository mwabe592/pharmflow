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

  console.log("Raw first item:", JSON.stringify(accreditationData[0], null, 2));

  const accreditationsWithExpiration = accreditationData.map(
    (accreditation) => {
      // console.log("current date is", currentDate);
      return {
        ...accreditation,
        isExpired: accreditation.expiry_date < currentDate,
      };
    }
  );

  console.log("acc with expiries are:", accreditationsWithExpiration);
  return accreditationsWithExpiration as UserAccreditation[];
}
