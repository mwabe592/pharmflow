import { Staff } from "@/app/types/tables.types";
import { fetchAccreditationsById } from "@/app/utils/helpers/fetchAccreditationsById";
import { fetchServices } from "@/app/utils/helpers/fetchServices";
import { fetchStaffById } from "@/app/utils/helpers/fetchStaffById";
import { StaffProfileCard } from "@/components/dashboard/StaffProfileCard";
import { UserAccreditationTableColumns } from "@/components/dashboard/user-accreditation-table/UserAccreditationTableColumns";
import { UserAccreditationTableWrapper } from "@/components/dashboard/user-accreditation-table/UserAccreditationTableWrapper";

type StaffProfileProps = {
  params: Promise<{
    staff_id: string;
  }>;
};

export const revalidate = 60;

export default async function StaffProfilePage({ params }: StaffProfileProps) {
  const { staff_id } = await params;
  const services = await fetchServices();
  const staffMember: Staff = await fetchStaffById(staff_id);
  const accreditations = await fetchAccreditationsById(staff_id);

  return (
    <div className="flex flex-col gap-5">
      <StaffProfileCard {...staffMember} />
      <UserAccreditationTableWrapper
        initialAccreditations={accreditations}
        columns={UserAccreditationTableColumns}
        services={services}
        staffId={staff_id}
      />
    </div>
  );
}
