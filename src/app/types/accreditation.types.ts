export interface Accreditations {
  expiry_date: string;
  file_path: string;
  id: string;
  issue_date: string;
  service_accreditation_id: string | null;
  staff_id: string;
}

export type ExpiringAccreditation = {
  id: string;
  expiry_date: string;
  service_accreditations: {
    name: string;
  };
  staff: {
    last_name: string;
    first_name: string;
  };
};

export type UserAccreditation = {
  isExpired: boolean;
  fileUrl: string | null;
  id: string;
  expiry_date: string;
  file_path: string | null;
  service_accreditations: {
    name: string;
  } | null;
};
