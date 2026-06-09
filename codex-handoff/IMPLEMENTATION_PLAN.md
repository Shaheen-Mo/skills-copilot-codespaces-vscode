# Implementation Plan

## Phase 1: Make the scaffold runnable

- Run `npm install`.
- Copy `.env.example` to `.env.local`.
- Add Supabase URL and anon key.
- Run `npm run dev`.
- Confirm `/login`, `/owner`, `/sales`, `/inventory`, and `/credit` render.

## Phase 2: Create real Supabase schema

Add migrations in this order:

1. `0001_core_schema.sql`
2. `0002_seed_roles.sql`
3. `0003_inventory_rpc.sql`
4. `0004_rls_policies.sql`
5. `0005_audit_triggers.sql`

## Phase 3: Auth and RBAC

- Create Supabase Auth user for owner.
- Insert matching app `users` row.
- Seed `roles`.
- Insert owner `user_roles` row.
- Confirm `/owner` works for owner.
- Confirm `/forbidden` works for unauthorized roles.

## Phase 4: Real sales and reservation

- Replace sales form hardcoded product/location with real select/search.
- Server action creates `sales`, `sale_lines`, and `payments`.
- Deposit/full payment calls `fn_confirm_reservation`.
- `fn_confirm_reservation` posts `reserve_out` movements.

## Phase 5: Real inventory

- Inventory page reads `inventory_movements` and `inventory_balances`.
- Manual adjustments require `inventory.movement.create`.
- Do not expose direct editing of `inventory_balances`.

## Phase 6: Delivery workflow

- Create delivery records for reserved sales.
- Delivery completion calls `fn_complete_delivery`.
- Completion posts `sold_out_delivery` movement rows.

## Phase 7: Credit and collections

- Credit approval creates `credit_accounts` and `installment_schedule`.
- Collection payments apply to oldest unpaid installments.
- Collection actions log call/visit/promise/payment follow-up.

## Phase 8: Finance close and owner dashboard

- Add `cash_sessions` table.
- Expected cash = cash payments + cash collections for location/date.
- Variance = counted cash - expected cash.
- Owner dashboard reads from SQL views/RPCs instead of raw UI aggregation.

## Phase 9: Production hardening

- Add RLS policies.
- Add audit triggers.
- Add tests.
- Generate Supabase TypeScript types.
- Add CI checks for `npm run typecheck` and `npm run build`.
