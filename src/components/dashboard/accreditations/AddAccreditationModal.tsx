"use client";

import { useState } from "react";
import { useActionState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
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
  uploadAccreditation,
  type AccreditationType,
  type UploadAccreditationResult,
} from "@/app/actions/uploadAccreditations";
import { toast } from "sonner";

// Define the accreditation options
const ACCREDITATION_OPTIONS: { value: AccreditationType; label: string }[] = [
  { value: "Vaccinations", label: "Vaccinations" },
  { value: "MUR", label: "Medicines Use Review (MUR)" },
  { value: "ECP", label: "Emergency Contraception Pill (ECP)" },
  { value: "UTI", label: "Urinary Tract Infection (UTI)" },
  { value: "Other", label: "Other Service" },
];

// Initial state for the action
const initialState: UploadAccreditationResult = {
  success: false,
};

export function AddAccreditationModal() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [accreditationType, setAccreditationType] = useState<
    AccreditationType | ""
  >("");

  console.log("date is:", date, accreditationType);

  // Use the action state hook with the server action
  const [state, formAction, isPending] = useActionState(
    uploadAccreditation,
    initialState
  );

  // Handle form submission success
  const handleOpenChange = (open: boolean) => {
    if (!open && state.success) {
      // Show success toast
      toast.success("Success", {
        description:
          state.message || "Your accreditation has been uploaded successfully.",
      });

      // Reset form state
      setDate(undefined);
      setAccreditationType("");
    }
    setOpen(open);
  };

  // Custom form action to include the date
  const handleFormAction = async (formData: FormData) => {
    if (date) {
      formData.set("expiryDate", date.toISOString().split("T")[0]);
    }

    await formAction(formData);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#5e8e4b] hover:bg-[#5e8e4b]/90">
          Add Accreditation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Accreditation</DialogTitle>
          <DialogDescription>
            Enter the details of your new accreditation. Click upload when
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={handleFormAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accreditationType">Accreditation Type</Label>
            <Select
              name="accreditationType"
              value={accreditationType}
              onValueChange={(value) =>
                setAccreditationType(value as AccreditationType)
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select accreditation type" />
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
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select expiry date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">Upload Document</Label>
            <Input
              id="document"
              name="document"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-xs text-muted-foreground">
              Accepted formats: PDF, JPG, JPEG, PNG
            </p>
          </div>

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
              disabled={isPending || !accreditationType || !date}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
