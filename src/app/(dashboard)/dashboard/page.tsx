import { StaffTable } from "@/components/StaffTable";
import { fetchStaff } from "@/app/utils/helpers/fetchStaff";
import { fetchUpcomingExpirations } from "@/app/utils/helpers/fetchUpcomingExpirations";
import { UpcomingExpirationsCard } from "@/components/UpcomingExpirartions";
import TestButton from "@/components/TestButton";

const DashboardPage = async () => {
  // Fetch staff data from the server
  const staffData = await fetchStaff();
  const upcomingExpirations = await fetchUpcomingExpirations();

  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
      <UpcomingExpirationsCard data={upcomingExpirations} />
      <StaffTable staffData={staffData} />
      <TestButton />
    </div>
  );
};

export default DashboardPage;
