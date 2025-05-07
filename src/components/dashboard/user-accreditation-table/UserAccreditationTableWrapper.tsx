"use client";

import { useState } from "react";
import { UserAccreditationTable } from "./UserAccreditationTable";
import { UserAccreditation } from "@/app/types/accreditation.types";
import { Service } from "@/app/types/services.types";
import { ColumnDef } from "@tanstack/react-table";

export function UserAccreditationTableWrapper({
  initialAccreditations,
  columns,
  services,
  staffId,
}: {
  initialAccreditations: UserAccreditation[];
  columns: ColumnDef<UserAccreditation>[];
  services: Service[];
  staffId: string;
}) {
  const [accreditations, setAccreditations] = useState(initialAccreditations);

  const handleUploadSuccess = (newAccreditation: UserAccreditation) => {
    setAccreditations((prev) => [...prev, newAccreditation]);
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
