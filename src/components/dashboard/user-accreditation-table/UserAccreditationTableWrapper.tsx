"use client";

import { useState } from "react";
import { UserAccreditationTable } from "./UserAccreditationTable";
import { deleteAccreditation } from "@/app/utils/helpers/deleteAccreditation";
import { UserAccreditation } from "@/app/types/accreditation.types";
import { Service } from "@/app/types/services.types";

export function UserAccreditationTableWrapper({
  initialAccreditations,
  columns,
  services,
  staffId,
}: {
  initialAccreditations: UserAccreditation[];
  columns: any;
  services: Service[];
  staffId: string;
}) {
  const [accreditations, setAccreditations] = useState(initialAccreditations);

  const handleUploadSuccess = (newAccreditation: UserAccreditation) => {
    setAccreditations((prev) => [...prev, newAccreditation]);
  };

  const handleDelete = async (accreditation: UserAccreditation) => {
    const response = await deleteAccreditation(accreditation);

    if (response.success) {
      setAccreditations((prev) =>
        prev.filter((a) => a.id !== accreditation.id)
      );
    }
  };

  return (
    <UserAccreditationTable
      data={accreditations}
      columns={columns}
      services={services}
      staffId={staffId}
      filterColumn="service_accreditations.name"
      filterPlaceholder="Filter services..."
      showPagination={true}
      pageSize={5}
      onUploadSuccess={handleUploadSuccess}
    />
  );
}
