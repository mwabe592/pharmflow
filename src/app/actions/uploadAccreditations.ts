"use server";

import { revalidatePath } from "next/cache";
import {
  findOrCreateFolder,
  uploadFileToDrive,
  getFilePublicUrl,
} from "@/app/utils/googleDriveHelpers";
import getUser from "@/app/utils/helpers/getUser";

// Define the accreditation types
export type AccreditationType =
  | "Vaccinations"
  | "MUR"
  | "ECP"
  | "UTI"
  | "Other";

// Define the return type for the single upload action
export type UploadAccreditationResult = {
  success: boolean;
  error?: string;
  message?: string;
  data?: AccreditationData;
};

// Define the return type for the multiple upload action
export type UploadMultipleAccreditationsResult = {
  success: boolean;
  error?: string;
  message?: string;
  results?: Array<{
    type: AccreditationType;
    success: boolean;
    error?: string;
    data?: AccreditationData;
  }>;
};

// Define the accreditation data type
type AccreditationData = {
  name: string;
  expiry_date: string;
  documentUrl: string | null;
};

// Single accreditation upload
export async function uploadAccreditation(
  prevState: UploadAccreditationResult,
  formData: FormData
): Promise<UploadAccreditationResult> {
  try {
    // Extract data from form
    const accreditationType = formData.get(
      "accreditationType"
    ) as AccreditationType;
    const expiryDate = formData.get("expiryDate") as string;
    const documentFile = formData.get("document") as File;

    console.log("document file is: ", documentFile);

    // Validate required fields
    if (!accreditationType || !expiryDate) {
      return { success: false, error: "Missing required fields" };
    }

    // Get the authenticated user
    const { userData, success } = await getUser();
    if (!success || !userData) {
      return {
        success: false,
        error: "User not authenticated and cannot upload accreditations",
      };
    }

    // Only proceed with file upload if a file was provided
    let documentUrl = null;
    if (documentFile && documentFile.size > 0) {
      try {
        // 1. Find or create the main 'Accreditations' folder
        const mainFolderId = await findOrCreateFolder("Accreditations");
        if (!mainFolderId) {
          return {
            success: false,
            error: "Failed to create or find Accreditations folder",
          };
        }

        // 2. Find or create the user's personal folder (e.g., "John Smith")
        const userFolderName = `${userData.first_name} ${userData.last_name}`;
        const userFolderId = await findOrCreateFolder(
          userFolderName,
          mainFolderId
        );
        if (!userFolderId) {
          return {
            success: false,
            error: "Failed to create or find user folder",
          };
        }

        // 3. Generate a unique filename with timestamp
        const fileExt = documentFile.name.split(".").pop() || "";
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileName = `${accreditationType}_${timestamp}.${fileExt}`;

        // 4. Upload the file to Google Drive
        const fileId = await uploadFileToDrive(
          documentFile,
          fileName,
          documentFile.type,
          userFolderId
        );
        if (!fileId) {
          return {
            success: false,
            error: "Failed to upload file to Google Drive",
          };
        }

        // 5. Get the public URL for the file
        documentUrl = await getFilePublicUrl(fileId);
        if (!documentUrl) {
          return { success: false, error: "Failed to get public URL for file" };
        }
      } catch (uploadError) {
        console.error("Error during file upload:", uploadError);
        return {
          success: false,
          error: "Error uploading file to Google Drive",
        };
      }
    }

    console.log("Uploading accreditation:", {
      type: accreditationType,
      expiryDate,
      hasFile: documentFile && documentFile.size > 0,
      documentUrl,
    });

    // Revalidate the dashboard page to show the new accreditation
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/accreditations");

    const data: AccreditationData = {
      name: accreditationType,
      expiry_date: expiryDate,
      documentUrl,
    };

    return {
      success: true,
      message: `${accreditationType} accreditation added successfully`,
      data,
    };
  } catch (error) {
    console.error("Error in uploadAccreditation:", error);
    return { success: false, error: "Failed to upload accreditation" };
  }
}

// Multiple accreditations upload
export async function uploadMultipleAccreditations(
  prevState: UploadMultipleAccreditationsResult,
  formData: FormData
): Promise<UploadMultipleAccreditationsResult> {
  try {
    // Extract the number of accreditations from the form
    const count = Number.parseInt(formData.get("count") as string);
    const results = [];
    let hasError = false;

    // Get the authenticated user
    const { userData, success } = await getUser();
    if (!success || !userData) {
      return { success: false, error: "User not authenticated" };
    }

    // Find or create the main 'Accreditations' folder
    const mainFolderId = await findOrCreateFolder("Accreditations");
    if (!mainFolderId) {
      return {
        success: false,
        error: "Failed to create or find Accreditations folder",
      };
    }

    // Find or create the user's personal folder (e.g., "John Smith")
    const userFolderName = `${userData.first_name} ${userData.last_name}`;
    const userFolderId = await findOrCreateFolder(userFolderName, mainFolderId);
    if (!userFolderId) {
      return { success: false, error: "Failed to create or find user folder" };
    }

    // Process each accreditation
    for (let i = 0; i < count; i++) {
      const accreditationType = formData.get(
        `accreditationType_${i}`
      ) as AccreditationType;
      const expiryDate = formData.get(`expiryDate_${i}`) as string;
      const documentFile = formData.get(`document_${i}`) as File;

      // Skip empty entries
      if (!accreditationType || !expiryDate) {
        continue;
      }

      let documentUrl = null;
      if (documentFile && documentFile.size > 0) {
        try {
          // Generate a unique filename with timestamp and index
          const fileExt = documentFile.name.split(".").pop() || "";
          const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
          const fileName = `${accreditationType}_${timestamp}_${i}.${fileExt}`;

          // Upload the file to Google Drive
          const fileId = await uploadFileToDrive(
            documentFile,
            fileName,
            documentFile.type,
            userFolderId
          );
          if (!fileId) {
            results.push({
              type: accreditationType,
              success: false,
              error: "Failed to upload file to Google Drive",
            });
            hasError = true;
            continue;
          }

          // Get the public URL for the file
          documentUrl = await getFilePublicUrl(fileId);
          if (!documentUrl) {
            results.push({
              type: accreditationType,
              success: false,
              error: "Failed to get public URL for file",
            });
            hasError = true;
            continue;
          }
        } catch (uploadError) {
          console.error(
            `Error uploading file for accreditation ${i}:`,
            uploadError
          );
          results.push({
            type: accreditationType,
            success: false,
            error: "Error uploading file to Google Drive",
          });
          hasError = true;
          continue;
        }
      }

      console.log(`Uploading accreditation ${i}:`, {
        type: accreditationType,
        expiryDate,
        hasFile: documentFile && documentFile.size > 0,
        documentUrl,
      });

      // Add success result
      const data: AccreditationData = {
        name: accreditationType,
        expiry_date: expiryDate,
        documentUrl,
      };
      results.push({
        type: accreditationType,
        success: true,
        data,
      });
    }

    // Revalidate the dashboard page to show the new accreditations
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/accreditations");

    return {
      success: !hasError,
      message: hasError
        ? "Some accreditations could not be added"
        : "All accreditations added successfully",
      results,
    };
  } catch (error) {
    console.error("Error in uploadMultipleAccreditations:", error);
    return { success: false, error: "Failed to upload accreditations" };
  }
}
