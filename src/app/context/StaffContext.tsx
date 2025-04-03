import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/app/utils/supabase/server";

interface Staff {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  // Add other fields from your staff profile table as needed
}

interface StaffContextType {
  staff: Staff | null;
  loading: boolean;
  error: string | null;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const useStaff = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaff must be used within a StaffProvider");
  }
  return context;
};

export const StaffProvider: React.FC = ({ children }: any) => {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          throw new Error("User not found!");
        }

        const { data: staff, error } = await supabase
          .from("staff")
          .select("*")
          .single();

        if (error) {
          throw new Error(error.message);
        }

        setStaff(staff);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffProfile();
  }, []);

  return (
    <StaffContext.Provider value={{ staff, loading, error }}>
      {children}
    </StaffContext.Provider>
  );
};
