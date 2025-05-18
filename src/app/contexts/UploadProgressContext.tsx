"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the upload status type
export type UploadStatus = "pending" | "uploading" | "success" | "error";

// Define the upload item type
export type UploadItem = {
  id: string;
  name: string;
  progress: number;
  status: UploadStatus;
  error?: string;
  type: string;
};

// Define the context type
type UploadProgressContextType = {
  uploads: UploadItem[];
  addUpload: (upload: Omit<UploadItem, "id" | "progress" | "status">) => string;
  updateUploadProgress: (id: string, progress: number) => void;
  updateUploadStatus: (
    id: string,
    status: UploadStatus,
    error?: string
  ) => void;
  removeUpload: (id: string) => void;
  clearSuccessfulUploads: () => void;
};

// Create the context
const UploadProgressContext = createContext<
  UploadProgressContextType | undefined
>(undefined);

// Export the provider
export function UploadProgressProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

  // Add a new upload item
  const addUpload = (
    upload: Omit<UploadItem, "id" | "progress" | "status">
  ) => {
    const id = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newUpload: UploadItem = {
      ...upload,
      id,
      progress: 0,
      status: "pending",
    };

    setUploads((prev) => [...prev, newUpload]);
    return id;
  };

  // Update the progress of an upload
  const updateUploadProgress = (id: string, progress: number) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id ? { ...upload, progress, status: "uploading" } : upload
      )
    );
  };

  // Update the status of an upload
  const updateUploadStatus = (
    id: string,
    status: UploadStatus,
    error?: string
  ) => {
    setUploads((prev) =>
      prev.map((upload) =>
        upload.id === id
          ? {
              ...upload,
              status,
              progress: status === "success" ? 100 : upload.progress,
              error,
            }
          : upload
      )
    );
  };

  // Remove an upload
  const removeUpload = (id: string) => {
    setUploads((prev) => prev.filter((upload) => upload.id !== id));
  };

  // Clear all successful uploads
  const clearSuccessfulUploads = () => {
    setUploads((prev) => prev.filter((upload) => upload.status !== "success"));
  };

  return (
    <UploadProgressContext.Provider
      value={{
        uploads,
        addUpload,
        updateUploadProgress,
        updateUploadStatus,
        removeUpload,
        clearSuccessfulUploads,
      }}
    >
      {children}
    </UploadProgressContext.Provider>
  );
}

// Export the hook
export function useUploadProgress() {
  const context = useContext(UploadProgressContext);
  if (context === undefined) {
    throw new Error(
      "useUploadProgress must be used within a UploadProgressProvider"
    );
  }
  return context;
}
