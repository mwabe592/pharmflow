import { Metadata } from "next";
import { getTeamMembers } from "@/app/utils/helpers/getTeamMembers";
import { TeamTable } from "@/components/dashboard/team/TeamTable";

export const metadata: Metadata = {
  title: "Team | Pharmacy Accreditation Manager",
  description: "Manage your pharmacy team members",
};

export default async function TeamPage() {
  const { teamMembers, success } = await getTeamMembers();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
          <p className="text-muted-foreground">
            View and manage your pharmacy team members
          </p>
        </div>
      </div>

      {success ? (
        <TeamTable data={teamMembers} />
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No team members found</h3>
          <p className="text-muted-foreground mt-2">
            Either you&apos;re not associated with a pharmacy or there are no
            team members in your pharmacy.
          </p>
        </div>
      )}
    </div>
  );
}
