"use client";
import { UserAccreditation } from "@/app/types/accreditation.types";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Link from "next/link";

export const UserAccreditationTableColumns: ColumnDef<UserAccreditation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "service_accreditations.name",
    id: "service_accreditations.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accreditation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Access nested property
      const name = row.original.service_accreditations?.name;

      console.log(name);
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: "expiry_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expiry Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // Format the date
      const date = new Date(row.getValue("expiry_date"));
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "isExpired",
    header: "Status",
    cell: ({ row }) => {
      const isExpired = row.original.isExpired;

      return (
        <div className="flex items-center">
          {isExpired ? (
            <Badge variant="destructive" className="flex items-center gap-1">
              Expired
            </Badge>
          ) : (
            <Badge variant="default" className="bg-brand hover:bg-green-600">
              Valid
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "fileUrl",
    header: "Certificate",
    cell: ({ row }) => {
      const fileUrl = row.original.fileUrl;

      return (
        <div>
          {fileUrl ? (
            <Link href={`${fileUrl}`} target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                View
              </Button>
            </Link>
          ) : (
            <span className="text-muted-foreground text-sm">No file</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const certificate = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(certificate.id)}
            >
              Copy certificate ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {certificate.file_path && (
              <DropdownMenuItem>Download certificate</DropdownMenuItem>
            )}
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Renew certificate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
