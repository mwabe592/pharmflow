import { Staff } from "@/app/types/staffTypes";
import { fetchAccreditationsById } from "@/app/utils/helpers/fetchAccreditationsById";
import fetchPharmacyId from "@/app/utils/helpers/fetchPharmacyId";
import { fetchServices } from "@/app/utils/helpers/fetchServices";
import { fetchStaffById } from "@/app/utils/helpers/fetchStaffById";
import { AccreditationUploadFormModal } from "@/components/AccreditationUploadForm";

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
  console.log(accreditations);
  return (
    <div>
      <h1 className="text-2xl">{`${staffMember.first_name} ${staffMember.last_name}`}</h1>
      <ul>
        {accreditations.map((acc) => (
          <li key={acc.id}>{acc.expiry_date}</li>
        ))}
      </ul>

      <AccreditationUploadFormModal services={services} staffId={staff_id} />
    </div>
  );
}
