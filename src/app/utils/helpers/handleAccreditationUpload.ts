"use server";

import { UserAccreditation } from "@/app/types/accreditation.types";
import { createClient } from "../supabase/server";

type SelectedServiceProps = {
  selectedService: { id: string; name: string };
  staffId: string;
};
export const handleAccreditationUpload = async (
  formData: FormData,
  { selectedService, staffId }: SelectedServiceProps
) => {
  //   const supabase = await createClient();

  const supabase = await createClient();
  const service = formData.get("service") as string;
  const expiryDate = formData.get("expiry-date") as string;
  const certificateFile = formData.get("certificate") as File;
  const serviceId = selectedService.id;

  if (!service || !expiryDate || !certificateFile) {
    return { error: "All fields are required" };
  }

  //Add file to storage
  const { data: fileData, error: fileError } = await supabase.storage
    .from("accreditation-certificates")
    .upload(`/certificates/${certificateFile.name}`, certificateFile);

  if (fileError) {
    console.error("Error uploading file:", fileError);
    return { error: "Error uploading file" };
  }

  // Check if accreditation exists
  const { data: existingAccreditation, error: checkError } = await supabase
    .from("service_accreditations")
    .select("id")
    .eq("name", service) // Check by name
    .maybeSingle();

  if (checkError) {
    console.error("Error checking accreditation:", checkError);
    return { error: "Failed to check accreditation" };
  }

  // accreditation doesn't exist, insert it
  let accreditationId = existingAccreditation?.id;

  if (!accreditationId) {
    const { data: newAccreditation, error: insertError } = await supabase
      .from("service_accreditations")
      .insert([{ id: serviceId, name: service, service_id: serviceId || null }]) // Set service_id NULL for general accreditations
      .select("id")
      .single();

    if (insertError) {
      console.error("Error inserting accreditation:", insertError);
      return { error: "Failed to create accreditation" };
    }

    accreditationId = newAccreditation.id;
  }

  //Add accreditation to database table
  const { error: dbError } = await supabase
    .from("staff_accreditations")
    .insert([
      {
        staff_id: staffId,
        service_accreditation_id: accreditationId,
        expiry_date: expiryDate,
        file_path: fileData.path, // Ensure this is correctly typed
      },
    ]);
  if (dbError) {
    console.error("Error inserting accreditation data into database:", dbError);
    return { error: "Error inserting accreditation data into database" };
  }

  const newAccreditation: UserAccreditation = {
    isExpired: new Date(expiryDate) < new Date(),
    fileUrl: fileData?.path
      ? supabase.storage
          .from("accreditation-certificates")
          .getPublicUrl(fileData.path).data.publicUrl
      : null,
    id: accreditationId,
    expiry_date: expiryDate,
    file_path: fileData?.path || null,
    service_accreditations: {
      name: service,
    },
  };
  return {
    success: true,
    message: "Upload Successful",
    accreditation: newAccreditation,
  };
};
