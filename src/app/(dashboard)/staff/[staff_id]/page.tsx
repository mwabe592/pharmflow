import { Staff } from "@/app/types/tables.types";
import { fetchAccreditationsById } from "@/app/utils/helpers/fetchAccreditationsById";
import { fetchServices } from "@/app/utils/helpers/fetchServices";
import { fetchStaffById } from "@/app/utils/helpers/fetchStaffById";
import { AccreditationUploadFormModal } from "@/components/dashboard/AccreditationUploadForm";
import { StaffProfileCard } from "@/components/dashboard/StaffProfileCard";
import { UserAccreditationTable } from "@/components/dashboard/user-accreditation-table/UserAccreditationTable";
import { UserAccreditationTableColumns } from "@/components/dashboard/user-accreditation-table/columns";

type StaffProfileProps = {
  params: Promise<{
    staff_id: string;
  }>;
};

export default async function StaffProfilePage({ params }: StaffProfileProps) {
  const { staff_id } = await params;

  const staffMember: Staff = await fetchStaffById(staff_id);
  const services = await fetchServices();
  const accreditations = await fetchAccreditationsById(staff_id);

  return (
    <div className="flex flex-col gap-5">
      <StaffProfileCard {...staffMember} />
      <UserAccreditationTable
        columns={UserAccreditationTableColumns}
        data={accreditations}
        filterColumn="service_accreditations.name"
        filterPlaceholder="Filter services..."
        showPagination={true}
        pageSize={5}
      />
      <AccreditationUploadFormModal services={services} staffId={staff_id} />
    </div>
  );
}
