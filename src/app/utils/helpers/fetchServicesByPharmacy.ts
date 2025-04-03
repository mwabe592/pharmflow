import { createClient } from "../supabase/server";

interface ServicesFetchProps {
  pharmacyId: string;
}

export const fetchServicesByPharmacy = async ({
  pharmacyId,
}: ServicesFetchProps) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pharmacy_service_offerings")
    .select("pharmacy_services( id, name)")
    .eq("pharmacy_id", pharmacyId);

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  const services = data.map((d) => d.pharmacy_services);

  return services;
};
