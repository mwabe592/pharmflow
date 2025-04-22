"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/app/lib/utils";

const roles = [
  { value: "pharmacist", label: "Pharmacist" },
  { value: "technician", label: "Technician" },
  { value: "retail", label: "Retail" },
  { value: "manager", label: "Manager" },
];

export default function RoleSelect() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Select Role</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selectedRole
              ? roles.find((role) => role.value === selectedRole)?.label
              : "Select role..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandList>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={() => setSelectedRole(role.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedRole === role.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {role.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" name="role" value={selectedRole} />
    </div>
  );
}
