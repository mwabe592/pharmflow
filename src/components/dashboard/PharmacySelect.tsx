"use client";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import { getPharmacies } from "@/app/actions/getpharmacies";
import { Pharmacies } from "@/app/types/tables.types";

const PharmacySelect = () => {
  const [open, setOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacies | null>(
    null
  );
  const [pharmacies, setPharmacies] = useState<Pharmacies[]>([]);
  useEffect(() => {
    const getData = async () => {
      const pharmacies: Pharmacies[] = await getPharmacies();
      setPharmacies(pharmacies);
    };
    getData();
  }, []);

  return (
    <div className="space-y-2">
      <Label>Pharmacy</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedPharmacy ? selectedPharmacy.name : "Select pharmacy..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search category..." />
            <CommandList>
              <CommandEmpty>No pharmacy found.</CommandEmpty>
              <CommandGroup>
                {pharmacies.map((pharmacy) => (
                  <CommandItem
                    key={pharmacy.id}
                    value={pharmacy.name} // UI only, not used in state
                    onSelect={() => {
                      setSelectedPharmacy(pharmacy);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedPharmacy?.id === pharmacy.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {pharmacy.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Hidden Inputs to Pass ID & Name in FormData */}
      <Input
        type="hidden"
        name="pharmacy_id"
        value={selectedPharmacy?.id ?? ""}
      />
      <Input
        type="hidden"
        name="pharmacy_name"
        value={selectedPharmacy?.name ?? ""}
      />
    </div>
  );
};

export default PharmacySelect;
