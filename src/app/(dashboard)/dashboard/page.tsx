import { StaffTable } from "@/components/StaffTable";
import { fetchStaff } from "@/app/utils/helpers/fetchStaff";
import { Staff } from "../../types/staffTypes";

const DashboardPage = async () => {
  const staffData: Staff[] = await fetchStaff();

  // Fetch staff data from the server

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl mb-5 ml-2">Staff</h1>
      <StaffTable staffData={staffData} />
    </div>
  );
};

export default DashboardPage;
