export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      accreditations: {
        Row: {
          created_at: string | null;
          expiry_date: string;
          file_path: string | null;
          id: string;
          service_accreditation_id: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          expiry_date: string;
          file_path?: string | null;
          id?: string;
          service_accreditation_id?: string | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          expiry_date?: string;
          file_path?: string | null;
          id?: string;
          service_accreditation_id?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "accreditations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "staff_accreditations_service_accreditation_id_fkey";
            columns: ["service_accreditation_id"];
            isOneToOne: false;
            referencedRelation: "service_accreditations";
            referencedColumns: ["id"];
          },
        ];
      };
      pharmacies: {
        Row: {
          address: string;
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          address: string;
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          address?: string;
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      pharmacy_memberships: {
        Row: {
          created_at: string | null;
          id: string;
          pharmacy_id: string;
          role: string;
          status: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          pharmacy_id: string;
          role: string;
          status?: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          pharmacy_id?: string;
          role?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pharmacy_memberships_pharmacy_id_fkey";
            columns: ["pharmacy_id"];
            isOneToOne: false;
            referencedRelation: "pharmacies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pharmacy_memberships_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      pharmacy_service_offerings: {
        Row: {
          created_at: string | null;
          pharmacy_id: string;
          service_id: string;
        };
        Insert: {
          created_at?: string | null;
          pharmacy_id: string;
          service_id: string;
        };
        Update: {
          created_at?: string | null;
          pharmacy_id?: string;
          service_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pharmacy_service_offerings_pharmacy_id_fkey";
            columns: ["pharmacy_id"];
            isOneToOne: false;
            referencedRelation: "pharmacies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pharmacy_service_offerings_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "pharmacy_services";
            referencedColumns: ["id"];
          },
        ];
      };
      pharmacy_services: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      reminder_logs: {
        Row: {
          id: string;
          reminder_type: string;
          sent_date: string;
          staff_accreditation_id: string;
        };
        Insert: {
          id?: string;
          reminder_type: string;
          sent_date?: string;
          staff_accreditation_id: string;
        };
        Update: {
          id?: string;
          reminder_type?: string;
          sent_date?: string;
          staff_accreditation_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reminder_logs_staff_accreditation_id_fkey";
            columns: ["staff_accreditation_id"];
            isOneToOne: false;
            referencedRelation: "accreditations";
            referencedColumns: ["id"];
          },
        ];
      };
      service_accreditations: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          required_for: string[] | null;
          service_id: string | null;
          updated_at: string | null;
          validity_period: unknown | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          required_for?: string[] | null;
          service_id?: string | null;
          updated_at?: string | null;
          validity_period?: unknown | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          required_for?: string[] | null;
          service_id?: string | null;
          updated_at?: string | null;
          validity_period?: unknown | null;
        };
        Relationships: [
          {
            foreignKeyName: "service_accreditations_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "pharmacy_services";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          created_at: string | null;
          email: string;
          first_name: string;
          id: string;
          last_name: string;
          onboarded: boolean | null;
          pharmacy_id: string | null;
          phone: string;
          updated_at: string | null;
          user_type: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          onboarded?: boolean | null;
          pharmacy_id?: string | null;
          phone?: string;
          updated_at?: string | null;
          user_type?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
          onboarded?: boolean | null;
          pharmacy_id?: string | null;
          phone?: string;
          updated_at?: string | null;
          user_type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_pharmacy_id_fkey";
            columns: ["pharmacy_id"];
            isOneToOne: false;
            referencedRelation: "pharmacies";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "manager" | "staff" | "admin";
      status_enum: "active" | "on leave" | "inactive";
      user_permission:
        | "profiles.read"
        | "profiles.create"
        | "profiles.update"
        | "profiles.delete"
        | "staff.read"
        | "staff.create"
        | "staff.update"
        | "staff.delete"
        | "staff_accreditations.read"
        | "staff_accreditations.create"
        | "staff_accreditations.update"
        | "staff_accreditations.delete"
        | "pharmacy.read"
        | "pharmacy.update";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["manager", "staff", "admin"],
      status_enum: ["active", "on leave", "inactive"],
      user_permission: [
        "profiles.read",
        "profiles.create",
        "profiles.update",
        "profiles.delete",
        "staff.read",
        "staff.create",
        "staff.update",
        "staff.delete",
        "staff_accreditations.read",
        "staff_accreditations.create",
        "staff_accreditations.update",
        "staff_accreditations.delete",
        "pharmacy.read",
        "pharmacy.update",
      ],
    },
  },
} as const;
