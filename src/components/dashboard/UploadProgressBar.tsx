"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  X,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useUploadProgress } from "@/app/contexts/UploadProgressContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export function UploadProgressBar() {
  const { uploads, clearSuccessfulUploads, removeUpload } = useUploadProgress();
  const [expanded, setExpanded] = useState(false);
  const [recentlyCompleted, setRecentlyCompleted] = useState<string[]>([]);

  // Calculate if we have any active uploads
  const activeUploads = uploads.filter(
    (upload) => upload.status === "pending" || upload.status === "uploading"
  );

  const successUploads = uploads.filter(
    (upload) =>
      upload.status === "success" && !recentlyCompleted.includes(upload.id)
  );

  // Show toast for successful uploads
  useEffect(() => {
    successUploads.forEach((upload) => {
      toast.success(`${upload.name} uploaded successfully`);
      setRecentlyCompleted((prev) => [...prev, upload.id]);
    });
  }, [successUploads]);

  // Clear recently completed uploads after a timeout
  useEffect(() => {
    if (recentlyCompleted.length > 0) {
      const timer = setTimeout(() => {
        clearSuccessfulUploads();
        setRecentlyCompleted([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [recentlyCompleted, clearSuccessfulUploads]);

  // If no uploads, don't render anything
  if (uploads.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full md:w-96 p-4">
      <div className="bg-background border rounded-md shadow-lg overflow-hidden">
        <div
          className="flex items-center justify-between px-4 py-2 bg-muted cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center gap-2">
            {activeUploads.length > 0 ? (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>
                  Uploading {activeUploads.length}{" "}
                  {activeUploads.length === 1 ? "file" : "files"}
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>All uploads complete</span>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>

        {expanded && (
          <div className="p-3">
            <ScrollArea className="h-[min(calc(100vh-200px),300px)]">
              <div className="space-y-3">
                {uploads.map((upload) => (
                  <div key={upload.id} className="bg-card rounded p-2 relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                      onClick={() => removeUpload(upload.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    <div className="flex items-center gap-2 mb-1 pr-6">
                      {upload.status === "success" && (
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                      {upload.status === "error" && (
                        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                      )}
                      <span className="text-sm font-medium truncate">
                        {upload.name}
                      </span>
                    </div>

                    {(upload.status === "pending" ||
                      upload.status === "uploading") && (
                      <Progress value={upload.progress} className="h-1.5" />
                    )}

                    {upload.status === "error" && (
                      <p className="text-xs text-red-500 mt-1">
                        {upload.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            {uploads.length > 0 && (
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearSuccessfulUploads}
                >
                  Clear completed
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
