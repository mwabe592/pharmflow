"use client";

import { useState } from "react";
import { useActionState } from "react";
import { CalendarIcon, Loader2, Plus, Trash } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/app/lib/utils";
import {
  uploadMultipleAccreditations,
  type AccreditationType,
  type UploadMultipleAccreditationsResult,
} from "@/app/actions/uploadAccreditations";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// Define the accreditation options
const ACCREDITATION_OPTIONS: { value: AccreditationType; label: string }[] = [
  { value: "Vaccinations", label: "Vaccinations" },
  { value: "MUR", label: "Medicines Use Review (MUR)" },
  { value: "ECP", label: "Emergency Contraception Pill (ECP)" },
  { value: "UTI", label: "Urinary Tract Infection (UTI)" },
  { value: "Other", label: "Other Service" },
];

// Initial state for the action
const initialState: UploadMultipleAccreditationsResult = {
  success: false,
};

// Define the accreditation entry type
interface AccreditationEntry {
  id: number;
  type: AccreditationType | "";
  expiryDate: Date | undefined;
}

export function AddMultipleAccreditationsModal() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<AccreditationEntry[]>([
    { id: 0, type: "", expiryDate: undefined },
  ]);

  // Use the action state hook with proper typing
  const [state, formAction, isPending] = useActionState(
    uploadMultipleAccreditations,
    initialState
  );

  // Handle form submission success
  const handleOpenChange = (open: boolean) => {
    if (!open && state.success) {
      // Show success toast
      toast.success("Success", {
        description:
          state.message ||
          "Your accreditations have been uploaded successfully.",
      });

      // Reset form state
      setEntries([{ id: 0, type: "", expiryDate: undefined }]);
    }
    setOpen(open);
  };

  // Add a new entry
  const addEntry = () => {
    const newId = Math.max(...entries.map((e) => e.id), 0) + 1;
    setEntries([...entries, { id: newId, type: "", expiryDate: undefined }]);
  };

  // Remove an entry
  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  // Update an entry
  const updateEntry = (
    id: number,
    field: keyof AccreditationEntry,
    value: any
  ) => {
    setEntries(
      entries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  // Form submission handler that adds hidden fields
  const handleSubmit = async (formData: FormData) => {
    // Add the count of entries
    formData.append("count", entries.length.toString());

    // Add the expiry dates to each accreditation entry
    entries.forEach((entry, index) => {
      if (entry.expiryDate) {
        formData.append(
          `expiryDate_${index}`,
          entry.expiryDate.toISOString().split("T")[0]
        );
      }
    });

    // Let the form action handle the submission
    return formAction(formData);
  };

  // Check if form is valid
  const isFormValid = entries.every((entry) => entry.type && entry.expiryDate);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#5e8e4b] hover:bg-[#5e8e4b]/90">
          Add Multiple Accreditations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Multiple Accreditations</DialogTitle>
          <DialogDescription>
            Enter the details for each accreditation. Click upload when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {entries.map((entry, index) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">
                    Accreditation #{index + 1}
                  </h3>
                  {entries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`accreditationType_${index}`}>Type</Label>
                    <Select
                      name={`accreditationType_${index}`}
                      value={entry.type}
                      onValueChange={(value) =>
                        updateEntry(
                          entry.id,
                          "type",
                          value as AccreditationType
                        )
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACCREDITATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`expiryDate_${index}`}>Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !entry.expiryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {entry.expiryDate
                            ? format(entry.expiryDate, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={entry.expiryDate}
                          onSelect={(date) =>
                            updateEntry(entry.id, "expiryDate", date)
                          }
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor={`document_${index}`}>
                    Upload Document (Optional)
                  </Label>
                  <Input
                    id={`document_${index}`}
                    name={`document_${index}`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addEntry}
            className="w-full"
            disabled={isPending}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Accreditation
          </Button>

          {state.error && (
            <div className="text-sm font-medium text-destructive">
              {state.error}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#5e8e4b] hover:bg-[#5e8e4b]/90"
              disabled={isPending || !isFormValid}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload All"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
