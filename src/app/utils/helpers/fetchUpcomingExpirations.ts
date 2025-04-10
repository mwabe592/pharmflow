import { createClient } from "../supabase/server";
import { fetchExpiringAccreditationsWithin } from "./fetchExpAccWIthin";

export type FormattedExpiringData = {
  expiryDate: string;
  serviceName: string | null;
  staffName: string;
};

export async function fetchUpcomingExpirations() {
  const expiringAccreditationWithin30Days =
    await fetchExpiringAccreditationsWithin(30);

  const supabase = await createClient();
  const reminderSent = await supabase;

  const formattedData: FormattedExpiringData[] =
    expiringAccreditationWithin30Days.map((d) => ({
      expiryDate: new Date(d.expiry_date).toLocaleDateString(),
      serviceName: d.service_accreditations?.name ?? null,
      staffName: `${d.staff.first_name} ${d.staff.last_name}`,
    }));

  return formattedData;
}
