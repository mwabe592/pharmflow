import { ExpiringAccreditation } from "@/app/types/accreditationTypes";
import { createClient } from "../supabase/server";

export async function fetchUpcomingExpirations() {
  const supabase = await createClient();

  const currentDate = new Date().toISOString().split("T")[0];
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  const futureDate = thirtyDaysFromNow.toISOString().split("T")[0];

  const { data: expiringData, error } = await supabase
    .from("staff_accreditations")
    .select(
      `
    id,
    expiry_date,
    service_accreditations (name),
    staff ( first_name, last_name)
  `
    )
    .gte("expiry_date", currentDate)
    .lte("expiry_date", futureDate)
    .limit(2);

  if (!expiringData || error) {
    console.error("Error fetching expiring data:", error);
    return [];
  }
  const formattedData = expiringData.map((data) => ({
    expiryDate: new Date(data.expiry_date).toLocaleDateString(),
    serviceName: data.service_accreditations.name,
    staffName: `${data.staff.first_name} ${data.staff.last_name}`,
  }));

  return formattedData as ExpiringAccreditation[];
}
