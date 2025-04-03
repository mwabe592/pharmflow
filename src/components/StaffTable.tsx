"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Staff } from "@/app/types/staffTypes";

interface StaffTableProps {
  staffData: Staff[];
}

export function StaffTable({ staffData }: StaffTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter staff based on search term
  const filteredStaff: Staff[] = useMemo(() => {
    if (!staffData) return [];

    if (searchTerm.trim() === "") {
      return staffData;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    return staffData.filter(
      (staffMember: Staff) =>
        `${staffMember.first_name} ${staffMember.last_name}`
          .toLowerCase()
          .includes(lowercasedSearch) ||
        staffMember.role.toLowerCase().includes(lowercasedSearch) ||
        staffMember.status.toLowerCase().includes(lowercasedSearch)
    );
  }, [staffData, searchTerm]);

  // Reset search and show all staff
  const handleShowAll = () => {
    setSearchTerm("");
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Staff Directory</CardTitle>
        <div className="flex flex-col sm:flex-row gap-3 items-center mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search staff..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleShowAll}
            className="whitespace-nowrap"
          >
            Show All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-4">Name</TableHead>
              <TableHead className="p-4">Role</TableHead>
              <TableHead className="p-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staffMember) => (
                <TableRow
                  key={staffMember.staff_id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push(`/staff/${staffMember.staff_id}`)}
                >
                  <TableCell className="font-medium p-4">
                    {`${staffMember.first_name} ${staffMember.last_name}`}
                  </TableCell>
                  <TableCell className="p-4">{staffMember.role}</TableCell>
                  <TableCell className="p-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        staffMember.status === "active"
                          ? "bg-green-100 text-green-800"
                          : staffMember.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-200 text-gray-800"
                      }`}
                    >
                      {staffMember.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
