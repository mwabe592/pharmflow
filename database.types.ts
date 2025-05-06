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
      managers: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string;
          last_name: string;
          manager_id: string;
          pharmacy_id: string | null;
          phone: string | null;
          profile_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          last_name: string;
          manager_id?: string;
          pharmacy_id?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          last_name?: string;
          manager_id?: string;
          pharmacy_id?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "managers_pharmacy_id_fkey";
            columns: ["pharmacy_id"];
            isOneToOne: false;
            referencedRelation: "pharmacies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "managers_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
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
      profiles: {
        Row: {
          created_at: string | null;
          id: string;
          pharmacy_id: string | null;
          profile_completed: boolean | null;
          role: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          pharmacy_id?: string | null;
          profile_completed?: boolean | null;
          role?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          pharmacy_id?: string | null;
          profile_completed?: boolean | null;
          role?: string;
          updated_at?: string | null;
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
            referencedRelation: "staff_accreditations";
            referencedColumns: ["id"];
          },
        ];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database["public"]["Enums"]["user_permission"];
          role: Database["public"]["Enums"]["user_role"];
        };
        Insert: {
          id?: number;
          permission: Database["public"]["Enums"]["user_permission"];
          role: Database["public"]["Enums"]["user_role"];
        };
        Update: {
          id?: number;
          permission?: Database["public"]["Enums"]["user_permission"];
          role?: Database["public"]["Enums"]["user_role"];
        };
        Relationships: [];
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
      staff: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string;
          last_name: string;
          pharmacy_id: string | null;
          phone: string | null;
          profile_id: string | null;
          role: string;
          staff_id: string;
          status: Database["public"]["Enums"]["status_enum"];
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          last_name: string;
          pharmacy_id?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          role: string;
          staff_id?: string;
          status?: Database["public"]["Enums"]["status_enum"];
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          last_name?: string;
          pharmacy_id?: string | null;
          phone?: string | null;
          profile_id?: string | null;
          role?: string;
          staff_id?: string;
          status?: Database["public"]["Enums"]["status_enum"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "staff_pharmacy_id_fkey";
            columns: ["pharmacy_id"];
            isOneToOne: false;
            referencedRelation: "pharmacies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "staff_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      staff_accreditations: {
        Row: {
          created_at: string | null;
          expiry_date: string;
          file_path: string | null;
          id: string;
          service_accreditation_id: string | null;
          staff_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          expiry_date: string;
          file_path?: string | null;
          id?: string;
          service_accreditation_id?: string | null;
          staff_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          expiry_date?: string;
          file_path?: string | null;
          id?: string;
          service_accreditation_id?: string | null;
          staff_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "staff_accreditations_service_accreditation_id_fkey";
            columns: ["service_accreditation_id"];
            isOneToOne: false;
            referencedRelation: "service_accreditations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "staff_accreditations_staff_id_fkey";
            columns: ["staff_id"];
            isOneToOne: false;
            referencedRelation: "staff";
            referencedColumns: ["staff_id"];
          },
        ];
      };
      user_roles: {
        Row: {
          id: number;
          pharmacy_id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Insert: {
          id?: number;
          pharmacy_id: string;
          role: Database["public"]["Enums"]["user_role"];
          user_id: string;
        };
        Update: {
          id?: number;
          pharmacy_id?: string;
          role?: Database["public"]["Enums"]["user_role"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_pharmacy_id_fkey";
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
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["user_permission"];
        };
        Returns: boolean;
      };
      custom_access_token_hook: {
        Args: { event: Json };
        Returns: Json;
      };
    };
    Enums: {
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
      user_role: "manager" | "staff";
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
      user_role: ["manager", "staff"],
    },
  },
} as const;
