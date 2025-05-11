import { createClient } from "@/app/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";

export async function fetchExpiringAccreditationsWithin(daysAhead: number) {
  const supabase = await createClient();

  const currentDate = new Date().toISOString().split("T")[0];

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + daysAhead);
  const futureDateISO = futureDate.toISOString().split("T")[0];

  const expiringAccreditationsQuery = supabase
    .from("accreditations")
    .select(
      `
      id,
      expiry_date,
      service_accreditations (
        name
      ),
      staff (
      staff_id,
        first_name,
        last_name
      )
    `
    )
    .gte("expiry_date", currentDate)
    .lte("expiry_date", futureDateISO);

  type ExpiringAccreditationData = QueryData<
    typeof expiringAccreditationsQuery
  >;

  const { data, error } = await expiringAccreditationsQuery;

  if (!data || error) {
    console.error(
      `Error fetching accreditations expiring in ${daysAhead} days:`,
      error
    );
    return [];
  }

  return data as ExpiringAccreditationData;
}
