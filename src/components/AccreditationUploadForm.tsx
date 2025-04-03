"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";
import { handleAccreditationUpload } from "@/app/utils/helpers/handleAccreditationUpload";
import { Modal } from "./Modal";

type Service = {
  id: string;
  name: string;
};

type AccreditationUploadFormProps = {
  services: Service[];
  staffId: string;
};

interface SelectedService {
  id: string;
  name: string;
}

export function AccreditationUploadFormModal({
  services,
  staffId,
}: AccreditationUploadFormProps) {
  const [date, setDate] = useState<Date>();
  const [fileName, setFileName] = useState<string>("");
  const [selectedService, setSelectedService] = useState<SelectedService>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (!selectedService) {
      console.error("Please select a service");
      return;
    }

    const response = await handleAccreditationUpload(formData, {
      selectedService,
      staffId,
    });
    if (response.error) {
      console.error("Error uploading accreditation:", response.error);
      return;
    }
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>
        Upload new accreditation
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Accreditation"
        description="Upload your certification or accreditation documents"
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        }
      >
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <Select
              name="service"
              onValueChange={(value) => {
                const service = services.find((s) => s.name === value);
                setSelectedService(service);
              }}
            >
              <SelectTrigger id="service">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.name}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Input
                id="expiry-date"
                name="expiry-date"
                type="text"
                placeholder="Or type date (DD/MM/YYYY)"
                value={date ? format(date, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  // Simple date parsing - in a real app, use a more robust solution
                  const parts = e.target.value.split("/");
                  if (parts.length === 3) {
                    const newDate = new Date(
                      Number.parseInt(parts[2]),
                      Number.parseInt(parts[1]) - 1,
                      Number.parseInt(parts[0])
                    );
                    if (!isNaN(newDate.getTime())) {
                      setDate(newDate);
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate">Upload Certificate</Label>
            <div className="grid w-full gap-1.5">
              <Label
                htmlFor="certificate"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background p-4 text-muted-foreground hover:bg-accent/50"
              >
                {fileName ? (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium">Selected file:</span>
                    <span className="text-xs">{fileName}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs">PDF or image (max 5MB)</span>
                  </div>
                )}
              </Label>
              <Input
                id="certificate"
                name="certificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Upload Accreditation
          </Button>
        </form>
      </Modal>
    </div>
  );
}
