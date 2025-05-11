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
import { submitAdminOnboarding } from "@/app/actions/submitAdminOnboarding";
import type { AdminUserData } from "./OnboardingFlow";

type AdminOnboardingFormProps = {
  onSubmit: (data: AdminUserData) => void;
  onBack: () => void;
};

// Define the initial state for the action
const initialState = {
  message: "",
  success: false,
  error: "",
  data: {
    firstName: "",
    lastName: "",
    pharmacyName: "",
  },
};

export function AdminOnboardingForm({
  onSubmit,
  onBack,
}: AdminOnboardingFormProps) {
  // Use the useActionState hook with the server action
  const [state, formAction, isPending] = useActionState(
    submitAdminOnboarding,
    initialState
  );

  // When the action is successful, call the onSubmit callback
  useEffect(() => {
    if (state.success && state.data) {
      onSubmit(state.data); // ✅ Use data from the server action
    }
  }, [state.success, state.data, onSubmit]);
  return (
    <Card className="w-full relative">
      <div className="absolute inset-x-0 top-0 h-1 bg-[#5e8e4b]"></div>
      <CardHeader>
        <CardTitle className="text-2xl">Pharmacy Setup</CardTitle>
        <CardDescription>
          Tell us about yourself and your pharmacy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Information</h3>
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
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pharmacy Information</h3>
            <div className="space-y-2">
              <Label htmlFor="pharmacyName">Pharmacy Name</Label>
              <Input
                id="pharmacyName"
                name="pharmacyName"
                placeholder="Enter pharmacy name"
                required
                minLength={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pharmacyAddress">Pharmacy Address</Label>
              <Input
                id="pharmacyAddress"
                name="pharmacyAddress"
                placeholder="Enter full address"
                required
                minLength={5}
              />
            </div>
          </div>

          {/* Show error message if there is one */}
          {state.error && !state.success && (
            <div className="text-sm font-medium text-destructive">
              {state.error}
            </div>
          )}

          {/* Show success message if there is one */}
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
              disabled={isPending}
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
