"use server";

import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/require-permission";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { createInventoryMovementSchema } from "@/lib/validators/inventory";

export async function createInventoryMovementAction(formData: FormData) {
  if (isSupabaseConfigured()) await requirePermission("inventory.movement.create");

  const parsed = createInventoryMovementSchema.parse({
    movement_type: formData.get("movement_type"),
    product_variant_id: formData.get("product_variant_id"),
    location_id: formData.get("location_id"),
    qty: formData.get("qty"),
    notes: formData.get("notes") || undefined,
  });

  if (!isSupabaseConfigured()) return { ok: true, message: "Movement validated. Configure Supabase to persist." };

  const supabase = await createClient();
  const { error } = await supabase.from("inventory_movements").insert({
    ...parsed,
    reference_type: "adjustment",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/inventory");
  return { ok: true };
}
