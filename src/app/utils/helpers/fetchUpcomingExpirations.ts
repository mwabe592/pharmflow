import { ExpiringAccreditations } from "@/app/types/accreditationTypes";
import { createClient } from "../supabase/server";

export async function fetchUpcomingExpirations() {
  const supabase = await createClient();

  const currentDate = new Date().toISOString().split("T")[0];
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  const futureDate = thirtyDaysFromNow.toISOString().split("T")[0];

  const { data: expiringData, error } = await supabase.rpc("sql_query", {
    query: `
      SELECT
        sa.id,
        sa.expiry_date,
        sa.service_accreditation_id,
        sa.staff_id,
        sa.file_path,
        sa.created_at,
        sa.updated_at,
        s.first_name,
        s.last_name,
        s.email,
        sa.name as service_accreditation_name
      FROM staff_accreditations sa
      JOIN staff s ON sa.staff_id = s.staff_id
      LEFT JOIN service_accreditations sa2 ON sa.service_accreditation_id = sa2.id
      WHERE sa.expiry_date BETWEEN $1 AND $2
    `,
    params: [currentDate, futureDate], // replace with actual dates
  });

  if (error) {
    console.error("Error executing raw SQL:", error);
  } else {
    console.log("Query results:", expiringData);
  }

  const formattedData = expiringData.map((data: ExpiringAccreditations) => ({
    expiryDate: new Date(data.expiry_date).toLocaleDateString(),
    serviceName: data.service_accreditations.name,
    staffName: `${data.staff.first_name} ${data.staff.last_name}`,
  }));

  return formattedData as ExpiringAccreditations[];
}
