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
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_permission:
        | "view_pharmacy_services"
        | "manage_pharmacy_services"
        | "manage_staff"
        | "view_staff"
        | "manage_managers"
        | "view_managers";
      user_role: "admin" | "manager" | "staff";
      status_enum: "active" | "inactive" | "pending";
    };
    CompositeTypes: {};
  };
};
