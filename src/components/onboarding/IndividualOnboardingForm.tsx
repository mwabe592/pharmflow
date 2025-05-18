"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { submitIndividualOnboarding } from "@/app/actions/submitIndividualOnboarding";
import { IndividualUserData } from "./OnboardingFlow";

type IndividualOnboardingFormProps = {
  onSubmit: (data: IndividualUserData) => void;
  onBack: () => void;
};

const initialState = {
  message: "",
  success: false,
  error: "",
  data: {
    firstName: "",
    lastName: "",
    role: "",
  },
};

const professionalRoles = [
  { value: "pharmacist", label: "Pharmacist" },
  { value: "technician", label: "Pharmacy Technician" },
  { value: "intern", label: "Pharmacy Intern" },
  { value: "student", label: "Pharmacy Student" },
  { value: "assistant", label: "Pharmacy Assistant" },
  { value: "retail_manager", label: "Retail Manager" },
  { value: "manager", label: "Pharmacy Manager" },
  { value: "other", label: "Other Healthcare Professional" },
];

export function IndividualOnboardingForm({
  onSubmit,
  onBack,
}: IndividualOnboardingFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitIndividualOnboarding,
    initialState
  );

  useEffect(() => {
    if (state.success && state.data) {
      onSubmit(state.data);
    }
  }, [state.success, state.data, onSubmit]);

  return (
    <Card className="w-full relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-[#5e8e4b]"></div>
      <CardHeader>
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription>
          Tell us about yourself to personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                required
                minLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                required
                minLength={2}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Professional Role</Label>
            <Select name="role" required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your professional role" />
              </SelectTrigger>
              <SelectContent>
                {professionalRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {state.error && !state.success && (
            <div className="text-sm font-medium text-destructive">
              {state.error}
            </div>
          )}

          {state.success && state.message && (
            <div className="text-sm font-medium text-green-600">
              {state.message}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              style={{ backgroundColor: "#5e8e4b", color: "white" }}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting Up...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
