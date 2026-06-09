import { z } from "zod";

export const saleLineSchema = z.object({
  product_variant_id: z.string().uuid(),
  qty: z.coerce.number().positive(),
  unit_price: z.coerce.number().nonnegative(),
});

export const createSaleSchema = z.object({
  customer_id: z.string().uuid().optional(),
  customer_name: z.string().min(2, "Customer name is required."),
  location_id: z.string().uuid(),
  payment_mode: z.enum(["cash", "credit", "mixed"]),
  deposit_amount: z.coerce.number().nonnegative(),
  lines: z.array(saleLineSchema).min(1),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
