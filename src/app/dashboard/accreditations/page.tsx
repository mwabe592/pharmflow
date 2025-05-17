import { AccreditationModals } from "@/components/dashboard/accreditations/AccreditationModals";

export default function AccreditationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Accreditations</h1>
          <p className="text-muted-foreground">
            Manage all your pharmacy accreditations in one place.
          </p>
        </div>
        <AccreditationModals />
      </div>

      {/* Your accreditations list would go here */}
      <div className="border rounded-md p-8 text-center text-muted-foreground">
        No accreditations found. Add your first accreditation to get started.
      </div>
    </div>
  );
}
