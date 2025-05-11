import { fetchExpiringAccreditationsWithin } from "./fetchExpAccWIthin";

export type FormattedExpiringData = {
  expiryDate: string;
  daysUntilExpiry: number;
  serviceName: string | null;
};

export async function fetchUpcomingExpirations() {
  const expiringAccreditationWithin30Days =
    await fetchExpiringAccreditationsWithin(30);

  const today = new Date();

  const formattedData: FormattedExpiringData[] =
    expiringAccreditationWithin30Days.map((d) => {
      const expiryDateObj = new Date(d.expiry_date);

      const diffTime = expiryDateObj.getTime() - today.getTime();
      const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        expiryDate: expiryDateObj.toLocaleDateString(),
        daysUntilExpiry,
        serviceName: d.service_accreditations?.name ?? null,

        //look at adding a staff member's name
      };
    });

  return formattedData;
}
