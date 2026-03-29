export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bio_pages: {
        Row: {
          created_at: string
          email: string
          id: string
          links: Json
          name: string
          slug: string
          tagline: string
          theme: string
        }
        Insert: {
          created_at?: string
          email?: string
          id?: string
          links?: Json
          name: string
          slug: string
          tagline?: string
          theme?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          links?: Json
          name?: string
          slug?: string
          tagline?: string
          theme?: string
        }
        Relationships: []
      }
      pending_leads: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          payload: Json
          retried: boolean
          showcase_entry_id: string | null
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          payload: Json
          retried?: boolean
          showcase_entry_id?: string | null
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          payload?: Json
          retried?: boolean
          showcase_entry_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_leads_showcase_entry_id_fkey"
            columns: ["showcase_entry_id"]
            isOneToOne: false
            referencedRelation: "showcase_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      showcase_entries: {
        Row: {
          business_name: string
          business_type: string
          contact_email: string
          created_at: string
          id: string
          slug: string
          status: Database["public"]["Enums"]["showcase_status"]
        }
        Insert: {
          business_name: string
          business_type?: string
          contact_email?: string
          created_at?: string
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["showcase_status"]
        }
        Update: {
          business_name?: string
          business_type?: string
          contact_email?: string
          created_at?: string
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["showcase_status"]
        }
        Relationships: []
      }
      tool_leads: {
        Row: {
          business_type: string
          created_at: string
          email: string
          id: string
          name: string
          tool_used: string
        }
        Insert: {
          business_type?: string
          created_at?: string
          email: string
          id?: string
          name: string
          tool_used: string
        }
        Update: {
          business_type?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          tool_used?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_pending_lead: {
        Args: { p_entry_id: string; p_error: string; p_payload: Json }
        Returns: undefined
      }
      update_showcase_status: {
        Args: {
          p_new_status: Database["public"]["Enums"]["showcase_status"]
          p_slug: string
        }
        Returns: undefined
      }
    }
    Enums: {
      showcase_status:
        | "draft"
        | "sent"
        | "viewed"
        | "interested"
        | "not_interested"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      showcase_status: [
        "draft",
        "sent",
        "viewed",
        "interested",
        "not_interested",
      ],
    },
  },
} as const
