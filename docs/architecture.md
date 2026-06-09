# Architecture

ChaChaCha Ops separates the system into four layers:

1. **Route/UI layer** in `app/` and `components/`.
2. **Validation layer** in `lib/validators/` using Zod.
3. **Domain rules layer** in `lib/domain/` for business invariants.
4. **Persistence layer** in Supabase tables, triggers, and future RPC functions under `db/migrations/`.

The highest-risk operations are inventory, payment, delivery, credit approval, and cash close. Keep those behind server actions, route handlers, or database RPC functions.
