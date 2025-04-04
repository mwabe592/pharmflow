import { UserAccreditation } from "@/app/types/accreditationTypes";
import { Staff } from "@/app/types/staffTypes";
import { fetchAccreditationsById } from "@/app/utils/helpers/fetchAccreditationsById";
import { fetchServices } from "@/app/utils/helpers/fetchServices";
import { fetchStaffById } from "@/app/utils/helpers/fetchStaffById";
import { AccreditationUploadFormModal } from "@/components/AccreditationUploadForm";
import { UserAccreditationTable } from "@/components/user-accreditation-table/UserAccreditationTable";
import { columns } from "@/components/user-accreditation-table/columns";

type StaffProfilePageProps = {
  params: { staff_id: string };
};

export default async function StaffProfilePage({
  params,
}: StaffProfilePageProps) {
  const { staff_id } = await params;

  const staffMember: Staff = await fetchStaffById(staff_id);
  const services = await fetchServices();
  const accreditations = await fetchAccreditationsById(staff_id);

  console.log("fetched data is", accreditations);

  return (
    <div>
      <h1 className="text-2xl">{`${staffMember.first_name} ${staffMember.last_name}`}</h1>

      <div>
        {/* <UserAccreditationTable data={accreditations} /> */}
        <UserAccreditationTable
          columns={columns}
          data={accreditations}
          filterColumn="service_accreditations.name"
          filterPlaceholder="Filter services..."
          showPagination={true}
          pageSize={5}
        />
      </div>

      <AccreditationUploadFormModal services={services} staffId={staff_id} />
    </div>
  );
}
