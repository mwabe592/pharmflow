import Link from "next/link";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Plus,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

export default function AdminDashboard({ user }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {user?.pharmacy_name}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.first_name}. Here is what is happening with
            your pharmacy accreditations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-[#5e8e4b] hover:bg-[#5e8e4b]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Accreditation
          </Button>
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Team Member
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valid Accreditations
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-[#5e8e4b]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              92% of total accreditations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Expiring in the next 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>
              Breakdown of team members by role and accreditation status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#5e8e4b] mr-2"></div>
                    <span>Pharmacists</span>
                  </div>
                  <span className="font-medium">5</span>
                </div>
                <Progress
                  value={42}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-[#5e8e4b]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Pharmacy Technicians</span>
                  </div>
                  <span className="font-medium">4</span>
                </div>
                <Progress
                  value={33}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-blue-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span>Pharmacy Interns</span>
                  </div>
                  <span className="font-medium">2</span>
                </div>
                <Progress
                  value={17}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-purple-500"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span>Administrative Staff</span>
                  </div>
                  <span className="font-medium">1</span>
                </div>
                <Progress
                  value={8}
                  className="h-2 bg-muted"
                  indicatorClassName="bg-amber-500"
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">
                Accreditation Compliance
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-[#5e8e4b]">92%</div>
                  <div className="text-xs text-muted-foreground">Compliant</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-amber-500">6%</div>
                  <div className="text-xs text-muted-foreground">Expiring</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold text-destructive">2%</div>
                  <div className="text-xs text-muted-foreground">Expired</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/team">View Team Details</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder.svg?height=36&width=36"
                    alt="Avatar"
                  />
                  <AvatarFallback className="bg-[#5e8e4b]/10 text-[#5e8e4b]">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    John Doe renewed{" "}
                    <span className="font-semibold">CPR Certification</span>
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder.svg?height=36&width=36"
                    alt="Avatar"
                  />
                  <AvatarFallback className="bg-blue-500/10 text-blue-500">
                    EM
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Emily Miller uploaded{" "}
                    <span className="font-semibold">
                      Immunization Certificate
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Yesterday at 3:45 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder.svg?height=36&width=36"
                    alt="Avatar"
                  />
                  <AvatarFallback className="bg-purple-500/10 text-purple-500">
                    SJ
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <span className="font-semibold">You</span> invited Sarah
                    Johnson to the team
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="/placeholder.svg?height=36&width=36"
                    alt="Avatar"
                  />
                  <AvatarFallback className="bg-amber-500/10 text-amber-500">
                    RW
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Robert Williams{" "}
                    <span className="font-semibold">HIPAA Certification</span>{" "}
                    is expiring soon
                  </p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-xs" asChild>
              <Link href="#">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
