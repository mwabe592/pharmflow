export interface Accreditations {
  expiry_date: string;
  file_path: string;
  id: string;
  issue_date: string;
  service_accreditation_id: string | null;
  staff_id: string;
}

export type UserAccreditation = {
  id: string;
  expiry_date: Date;
  file_path: string | null;
  fileUrl: string | null;
  service_accreditations: { name: string }[];
  isExpired: boolean;
};

export type ExpiringAccreditations = {
  service_accreditations: any;
  id: string;
  expiry_date: Date;
  serviceName: {
    name: string;
  };
  staff: {
    first_name: string;
    last_name: string;
  };
};
