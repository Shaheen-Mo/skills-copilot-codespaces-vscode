"use server";

import { revalidatePath } from "next/cache";
import { createSaleSchema } from "@/lib/validators/sales";
import { requirePermission } from "@/lib/auth/require-permission";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";

export async function createSaleAction(formData: FormData) {
  if (isSupabaseConfigured()) await requirePermission("sales.create");

  const parsed = createSaleSchema.parse({
    customer_name: formData.get("customer_name"),
    location_id: formData.get("location_id"),
    payment_mode: formData.get("payment_mode"),
    deposit_amount: formData.get("deposit_amount"),
    lines: [
      {
        product_variant_id: formData.get("product_variant_id"),
        qty: formData.get("qty"),
        unit_price: formData.get("unit_price"),
      },
    ],
  });

  if (!isSupabaseConfigured()) {
    revalidatePath("/sales");
    return { ok: true, message: `Validated sale for ${parsed.customer_name}. Configure Supabase to persist.` };
  }

  const supabase = await createClient();
  const subtotal = parsed.lines.reduce((sum, line) => sum + line.qty * line.unit_price, 0);
  const { error } = await supabase.from("sales").insert({
    sale_no: `SO-${Date.now()}`,
    customer_id: parsed.customer_id,
    location_id: parsed.location_id,
    payment_mode: parsed.payment_mode,
    status: parsed.deposit_amount > 0 ? "reserved" : "draft",
    subtotal_amount: subtotal,
    deposit_amount: parsed.deposit_amount,
    total_amount: subtotal,
    balance_due: subtotal - parsed.deposit_amount,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/sales");
  return { ok: true, message: "Sale created." };
}
