import Link from "next/link";
import {
  BadgeIcon as Certificate,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Building2,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User } from "@/app/types/tables.types";

type UserData = {
  pharmacy_name: string | null;
  first_name: string;
  last_name: string;
  pharmacy_id: string | null;
  email: string;
  phone: string;
  user_type: string | null;
} | null;

type DashboardProps = {
  user: UserData;
};

export default function IndividualDashboard({ user }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome, {user?.first_name}
          </h1>
          <p className="text-muted-foreground">
            Track and manage your pharmacy accreditations in one place.
          </p>
        </div>
        <div>
          <Button className="bg-[#5e8e4b] hover:bg-[#5e8e4b]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Accreditation
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accreditations
            </CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              All your professional certifications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valid</CardTitle>
            <CheckCircle className="h-4 w-4 text-[#5e8e4b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              75% of your accreditations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Expiring in the next 90 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              All accreditations are current
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Expirations</CardTitle>
            <CardDescription>
              Accreditations that need attention soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500">30 days</Badge>
                  <span className="font-medium">CPR Certification</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Jul 15, 2025
                </span>
              </div>
              <Progress
                value={25}
                className="h-2"
                indicatorClassName="bg-amber-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500">60 days</Badge>
                  <span className="font-medium">Immunization Certificate</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Aug 22, 2025
                </span>
              </div>
              <Progress
                value={50}
                className="h-2"
                indicatorClassName="bg-blue-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#5e8e4b]">Valid</Badge>
                  <span className="font-medium">State Pharmacy License</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Dec 10, 2025
                </span>
              </div>
              <Progress
                value={80}
                className="h-2"
                indicatorClassName="bg-[#5e8e4b]"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#5e8e4b]">Valid</Badge>
                  <span className="font-medium">HIPAA Certification</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Jan 05, 2026
                </span>
              </div>
              <Progress
                value={90}
                className="h-2"
                indicatorClassName="bg-[#5e8e4b]"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/accreditations">
                View All Accreditations
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pharmacy Affiliations</CardTitle>
            <CardDescription>
              Organizations you're associated with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-[#5e8e4b]/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-[#5e8e4b]" />
                </div>
                <div>
                  <h3 className="font-medium">Community Pharmacy</h3>
                  <p className="text-sm text-muted-foreground">
                    Primary affiliation
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Pharmacist
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Full-time
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">City Medical Center</h3>
                  <p className="text-sm text-muted-foreground">
                    Secondary affiliation
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Consultant
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Part-time
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/affiliations">Manage Affiliations</Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Affiliation</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Renewal Timeline</CardTitle>
          <CardDescription>
            Plan ahead for your certification renewals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-7 border-l border-dashed border-muted-foreground/20"></div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 text-amber-500 z-10">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <h3 className="font-medium flex items-center gap-2">
                    CPR Certification
                    <Badge className="bg-amber-500">30 days</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expires on July 15, 2025
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Schedule Renewal
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 text-blue-500 z-10">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <h3 className="font-medium flex items-center gap-2">
                    Immunization Certificate
                    <Badge className="bg-blue-500">60 days</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expires on August 22, 2025
                  </p>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      Schedule Renewal
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#5e8e4b]/10 text-[#5e8e4b] z-10">
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div className="pt-2">
                  <h3 className="font-medium flex items-center gap-2">
                    State Pharmacy License
                    <Badge className="bg-[#5e8e4b]">Valid</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Expires on December 10, 2025
                  </p>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      No action needed for 6 months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/dashboard/calendar">View Full Calendar</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
