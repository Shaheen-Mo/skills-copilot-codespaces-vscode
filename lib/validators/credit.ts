import { z } from "zod";

export const reviewCreditApplicationSchema = z.object({
  application_id: z.string().uuid(),
  decision: z.enum(["approved", "rejected"]),
  approved_amount: z.coerce.number().nonnegative().optional(),
  approved_term_months: z.coerce.number().int().positive().optional(),
  notes: z.string().optional(),
});
