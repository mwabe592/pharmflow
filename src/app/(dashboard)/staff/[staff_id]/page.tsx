import { Staff } from "@/app/types/tables.types";
import { fetchAccreditationsById } from "@/app/utils/helpers/fetchAccreditationsById";
import { fetchServices } from "@/app/utils/helpers/fetchServices";
import { fetchStaffById } from "@/app/utils/helpers/fetchStaffById";
import { AccreditationUploadFormModal } from "@/components/AccreditationUploadForm";
import { UserAccreditationTable } from "@/components/user-accreditation-table/UserAccreditationTable";
import { columns } from "@/components/user-accreditation-table/columns";

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
    <div>
      <h1>{`${staffMember.first_name}`}</h1>
      <UserAccreditationTable
        columns={columns}
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
