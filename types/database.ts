export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      app_role: "owner" | "ops_manager" | "salesperson" | "cashier" | "inventory_controller" | "credit_officer" | "collections_officer" | "delivery_coordinator";
    };
  };
};
