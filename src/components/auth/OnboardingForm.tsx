"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import completeonboarding from "@/app/actions/completeonboarding";

import RoleSelect from "./RoleSelect";
import PharmacySelect from "./PharmacySelect";

export default function OnboardingForm() {
  const handleFormSubmit = async (formData: FormData) => {
    try {
      await completeonboarding(formData);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      return;
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      {/* Form */}
      <form action={handleFormSubmit}>
        <div className="space-y-4">
          {/* first name */}
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              name="first-name"
              type="text"
              placeholder="First Name"
              required
            />
          </div>
          {/* last name */}
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              name="last-name"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          {/* email */}
          <div className="space-y-2">
            <Label htmlFor="last-name">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <PharmacySelect />
          <RoleSelect />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
