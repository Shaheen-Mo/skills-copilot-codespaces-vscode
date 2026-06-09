# Paste this into Codex

You are working in a Next.js App Router + TypeScript + Supabase internal operations app for a furniture retail business called **ChaChaCha Ops**.

## Goal

Turn the existing scaffold into a proper production-minded MVP app. Do not treat the current repo as finished. It is a shell with pages, RBAC helpers, validators, and Supabase utilities. Your job is to make the app real by adding database migrations, Supabase workflows/RPCs, real data reads/writes, RLS, and tests.

## Current stack

- Next.js App Router
- TypeScript
- Supabase Auth + Postgres
- Tailwind CSS
- shadcn-style local UI components
- Zod validation

## Critical business rules

1. Inventory movements are the source of truth.
2. Inventory balances are read/materialized state derived from movements.
3. Inventory states must support `on_hand`, `reserved`, and `sold`.
4. No stock reservation is allowed without payment/deposit.
5. Deposit creates reservation.
6. Delivery completion converts `reserved` to `sold`.
7. Sales can be `cash`, `credit`, or `mixed`.
8. Multiple inventory locations must be supported.
9. Credit accounts need installment tracking.
10. Collections workflow must track actions, promises, and payments.
11. Delivery workflow must track status and completion proof.
12. Daily cash reconciliation must compare expected vs counted cash.
13. Owner dashboard must show daily operational control metrics.
14. Sensitive operations must be guarded by RBAC, server-side checks, Supabase RLS, and audit logs.

## Existing app structure to preserve

- `app/(auth)/login` for login.
- `app/(dashboard)/owner` for owner dashboard.
- `app/(dashboard)/sales` for sales entry.
- `app/(dashboard)/inventory` for inventory movements.
- `app/(dashboard)/credit` for credit application review.
- `app/(dashboard)/collections` scaffold.
- `app/(dashboard)/delivery` scaffold.
- `app/(dashboard)/finance` scaffold.
- `lib/permissions/*` for RBAC permission map.
- `lib/auth/*` for server-side permission checks.
- `lib/validators/*` for Zod schemas.
- `lib/supabase/*` for Supabase clients.
- `components/ui/*` for reusable UI primitives.

## First implementation task

Start by creating a real Supabase database layer:

1. Add `db/migrations/0001_core_schema.sql` with tables:
   - `users`
   - `roles`
   - `user_roles`
   - `locations`
   - `customers`
   - `suppliers`
   - `products`
   - `product_variants`
   - `price_lists`
   - `price_list_items`
   - `inventory_balances`
   - `inventory_movements`
   - `sales`
   - `sale_lines`
   - `payments`
   - `credit_applications`
   - `credit_accounts`
   - `installment_schedule`
   - `collection_actions`
   - `deliveries`
   - `expenses`
   - `cash_sessions`
   - `audit_logs`
2. Add enums/check constraints for statuses and movement types.
3. Add `db/migrations/0002_seed_roles.sql` for the roles used by `lib/permissions/permissions.ts`.
4. Add `db/migrations/0003_inventory_rpc.sql` for:
   - `fn_confirm_reservation(sale_id uuid)`
   - `fn_complete_delivery(delivery_id uuid)`
   - `fn_post_inventory_movement(...)`
5. Add `db/migrations/0004_rls_policies.sql` for role-aware access control.
6. Add `db/migrations/0005_audit_triggers.sql` for audit logs.

## Then wire app behavior

1. Replace hardcoded dashboard/sales/inventory/credit sample arrays with Supabase queries.
2. Update sales server action so it creates:
   - customer if needed,
   - sale,
   - sale lines,
   - payment/deposit,
   - reservation via `fn_confirm_reservation`.
3. Update delivery route/action so completion calls `fn_complete_delivery`.
4. Update credit review so approval creates credit account and installment schedule.
5. Update collections so payments apply to oldest unpaid installments.
6. Update finance close so it calculates expected cash and variance.

## Rules for implementation

- Do not let clients directly update inventory balances.
- Do not manually set sold/reserved quantities from the UI.
- Do not bypass permissions in server actions or route handlers.
- Prefer Supabase RPC for multi-table transactions.
- Keep UI components reusable.
- Keep domain logic out of page components where possible.
- Use Zod schemas for every mutation payload.
- Add tests for permission logic and business workflows.

## Expected output from Codex

- A committed branch with migrations, working server actions/routes, and real Supabase-backed pages.
- Updated README setup instructions.
- Tests/checks run and listed clearly.
