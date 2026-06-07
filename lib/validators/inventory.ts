import { z } from "zod";

export const createInventoryMovementSchema = z.object({
  movement_type: z.enum(["stock_in_purchase", "reserve_out", "reserve_release", "sold_out_delivery", "stock_in_adjustment", "transfer_out", "transfer_in", "damage_out"]),
  product_variant_id: z.string().uuid(),
  location_id: z.string().uuid(),
  qty: z.coerce.number().positive(),
  notes: z.string().optional(),
});

export type CreateInventoryMovementInput = z.infer<typeof createInventoryMovementSchema>;
