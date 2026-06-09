# ChaChaCha Ops

A production-minded MVP for an internal furniture retail operations app built with Next.js App Router, TypeScript, Supabase, Tailwind CSS, and shadcn/ui-style components.

## Modules

- Auth and role-based access control
- Owner dashboard
- Sales entry for cash, credit, and mixed payment sales
- Inventory movements ledger with `on_hand`, `reserved`, and `sold` state support
- Credit application review
- Collections, delivery, and finance close scaffolds

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Populate `.env.local` with your Supabase project URL and anon key. Without Supabase variables, the UI runs with sample data so you can review the MVP screens first.

## Important business rules

- Inventory movements are the source of truth.
- Inventory balances are derived from movements.
- Deposits create reservations.
- No stock reservation should happen without payment.
- Delivery completion converts reserved stock to sold stock.
- Sensitive mutations should use server actions, route handlers, or Supabase RPC functions.

## Project structure

```txt
app/                  Next.js App Router routes and API handlers
components/           Reusable UI, form, table, and dashboard components
lib/                  Supabase clients, auth, RBAC, validators, and domain rules
db/migrations/        Starter PostgreSQL schema and inventory ledger triggers
types/                Shared TypeScript types
docs/                 Architecture and workflow notes
```

## Useful commands

```bash
npm run dev
npm run typecheck
npm run build
```
