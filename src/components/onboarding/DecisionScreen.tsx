"use client";

import { Building2, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UserType } from "./OnboardingFlow";

interface DecisionScreenProps {
  onSelect: (type: UserType) => void;
}

export function DecisionScreen({ onSelect }: DecisionScreenProps) {
  const [selectedType, setSelectedType] = useState<UserType>(null);

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          How do you plan on using the platform?
        </h1>
      </div>

      <div className="grid gap-6 mt-8">
        <Card
          className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-md ${
            selectedType === "admin"
              ? "ring-2 ring-[#5e8e4b] ring-offset-2"
              : ""
          }`}
          onClick={() => handleSelect("admin")}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-[#5e8e4b]"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#5e8e4b]" />I manage or own a
              pharmacy
            </CardTitle>
            <CardDescription>
              Set up and manage accreditations for your pharmacy and staff
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Perfect for pharmacy owners, managers, and administrators who need
              to track and manage accreditations for their entire organization.
            </p>
          </CardContent>
        </Card>

        <Card
          className={`relative overflow-hidden transition-all cursor-pointer hover:shadow-md ${
            selectedType === "individual"
              ? "ring-2 ring-[#5e8e4b] ring-offset-2"
              : ""
          }`}
          onClick={() => handleSelect("individual")}
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-[#5e8e4b]"></div>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#5e8e4b]" />I manage my own
              accreditations
            </CardTitle>
            <CardDescription>
              Track and manage your personal pharmacy accreditations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ideal for individual pharmacists, technicians, and pharmacy
              professionals who want to track their own certificates and
              accreditations.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          className="w-full md:w-auto"
          style={{ backgroundColor: "#5e8e4b", color: "white" }}
          onClick={() => onSelect(selectedType)}
          disabled={!selectedType}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
