import { fetchExpiringAccreditationsWithin } from "@/app/utils/helpers/fetchExpAccWIthin";
import { createClient } from "@/app/utils/supabase/server";
import { EmailTemplate } from "@/components/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const supabase = await createClient();

    const expiringAccreditationWithin7Days =
      await fetchExpiringAccreditationsWithin(30);

    // Fetch accreditations with reminders already sent
    const { data: remindersSent } = await supabase
      .from("reminder_logs")
      .select("staff_accreditation_id")
      .eq("reminder_type", "7_day_expiry");

    const sentIds =
      remindersSent?.map((item) => item.staff_accreditation_id) ?? [];

    // Step 3: Filter out accreditations with reminders already sent
    const unsent = expiringAccreditationWithin7Days.filter(
      (item) => !sentIds.includes(item.id)
    );

    const groupedByUser: Record<string, typeof unsent> = {};

    unsent.forEach((item) => {
      const key = item.staff.staff_id; // Identify each staff member
      if (!groupedByUser[key]) {
        groupedByUser[key] = [];
      }
      groupedByUser[key].push(item);
    });

    // Send reminders for each user
    for (const [, accreditations] of Object.entries(groupedByUser)) {
      const staff = accreditations[0].staff;
      const firstName = staff.first_name;
      const lastName = staff.last_name;

      const accreditationList = accreditations.map((accreditation) => ({
        serviceName: accreditation.service_accreditations?.name,
        expiryDate: accreditation.expiry_date,
      }));

      // Email content
      const emailContent = EmailTemplate({
        firstName,
        lastName,
        accreditations: accreditationList,
      });

      // Send email to each employee
      const { error } = await resend.emails.send({
        from: "Accreditation Management <onboarding@resend.dev>",
        to: "benmwangi123@gmail.com", // Send email to the actual staff email
        subject: `You have accreditations expiring soon!`,
        react: emailContent,
      });

      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

      // Log the sent reminder to prevent re-sending an email for same accreditation
      await supabase.from("reminder_logs").insert(
        accreditations.map((accreditation) => ({
          staff_accreditation_id: accreditation.id,
          reminder_type: "7_day_expiry",
        }))
      );
    }

    // Return a success response
    return NextResponse.json({ message: "Reminders sent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send reminders" },
      { status: 500 }
    );
  }
}
