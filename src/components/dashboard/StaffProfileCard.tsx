import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Circle, User } from "lucide-react";
import type { Staff } from "@/app/types/tables.types";

export function StaffProfileCard({
  first_name,
  last_name,
  role,
  email,
  phone,
  status,
}: Staff) {
  const statusColors: Record<string, string> = {
    active: "text-brand",
    inactive: "text-gray-400",
    away: "text-yellow-500",
    offline: "text-gray-400",
    busy: "text-red-500",
  };

  const statusLabels: Record<string, string> = {
    active: "Active",
    inactive: "Inactive",
    away: "Away",
    offline: "Offline",
    busy: "Busy",
  };

  // Default to inactive if status is not provided or not in our list
  const currentStatus = status && statusColors[status] ? status : "inactive";
  const fullName = `${first_name || ""} ${last_name || ""}`.trim();

  return (
    <Card className="w-full overflow-hidden border-brand/20">
      <div className="relative h-32 bg-gradient-to-r from-brand/20 to-brand/10">
        <div className="absolute -bottom-16 left-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white  flex items-center justify-center">
            {/* Placeholder icon when no image is available */}
            <User className="h-20 w-20 text-gray-300" />

            <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full border-2 border-white bg-white">
              <Circle
                className={`h-full w-full fill-current ${statusColors[currentStatus]}`}
              />
            </div>
          </div>
        </div>
      </div>

      <CardContent className="pt-20 pb-6">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold">
                {fullName || "No Name Provided"}
              </h2>
              {role && (
                <Badge
                  variant="outline"
                  className="bg-brand/10 text-brand border-brand/20"
                >
                  {role}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Circle
                className={`h-3 w-3 fill-current ${statusColors[currentStatus]}`}
              />
              <span className="text-sm text-muted-foreground">
                {statusLabels[currentStatus]}
              </span>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {email ? (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" />
                  <Link
                    href={`mailto:${email}`}
                    className="hover:text-brand hover:underline"
                  >
                    {email}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>No email provided</span>
                </div>
              )}

              {phone ? (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand" />
                  <Link
                    href={`tel:${phone}`}
                    className="hover:text-brand hover:underline"
                  >
                    {phone}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>No phone provided</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
