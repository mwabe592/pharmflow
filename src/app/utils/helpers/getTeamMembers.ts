import { createClient } from "../supabase/server";
import getUser from "./getUser";

export type TeamMember = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  user_type: string;
  pharmacy_id: string | null;
  pharmacy_name: string | null;
  created_at: string;
};

export async function getTeamMembers(): Promise<{
  teamMembers: TeamMember[];
  success: boolean;
  message: string;
}> {
  try {
    // Get the current user to determine their pharmacy_id
    const { userData, success } = await getUser();

    console.log("Current user data:", userData);

    if (!success || !userData) {
      return {
        teamMembers: [],
        success: false,
        message: "No authenticated user found",
      };
    }

    // If user doesn't belong to a pharmacy, return empty array
    if (!userData.pharmacy_id) {
      return {
        teamMembers: [],
        success: false,
        message: "User is not associated with any pharmacy",
      };
    }

    console.log("Looking for users with pharmacy_id:", userData.pharmacy_id);

    // Create Supabase client
    const supabase = await createClient();

    // First, let's query all users to see what we have
    const allUsers = await supabase.from("users").select("*");
    console.log("All users in the database:", allUsers.data);
    console.log(
      "Number of all users:",
      allUsers.data ? allUsers.data.length : 0
    );

    // Now query for users with the same pharmacy_id
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("pharmacy_id", userData.pharmacy_id);

    if (error) {
      console.error("Supabase query error:", error);
      throw new Error(error.message);
    }

    console.log("Raw data from users query:", data);
    console.log("Number of team members found:", data ? data.length : 0);

    // Add pharmacy name to each team member
    const teamMembers = data.map((member) => ({
      ...member,
      pharmacy_name: userData.pharmacy_name,
    })) as TeamMember[];

    console.log("Final team members array:", teamMembers);

    return {
      teamMembers,
      success: true,
      message: "Team members fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching team members:", error);
    return {
      teamMembers: [],
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch team members",
    };
  }
}
