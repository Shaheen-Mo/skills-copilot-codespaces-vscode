# App Structure Guide

## `app/`

Next.js App Router routes.

- `(auth)/login`: login screen and login server action.
- `(dashboard)/layout.tsx`: shared dashboard shell and navigation.
- `(dashboard)/owner`: owner KPI/control dashboard.
- `(dashboard)/sales`: sales entry.
- `(dashboard)/inventory`: movement ledger UI.
- `(dashboard)/credit`: credit application review.
- `(dashboard)/collections`: collections scaffold.
- `(dashboard)/delivery`: delivery scaffold.
- `(dashboard)/finance`: cash close scaffold.
- `api/*`: guarded route-handler boundaries for mutations.

## `components/`

Reusable UI pieces.

- `ui`: local shadcn-style primitives.
- `tables`: table helpers and status badges.
- `dashboards`: KPI/dashboard components.

## `lib/`

Application logic.

- `auth`: current role lookup and permission guard.
- `permissions`: canonical RBAC map.
- `supabase`: browser/server/middleware clients.
- `validators`: Zod schemas for mutations.
- `domain`: pure business rules.
- `utils`: shared helpers.

## `types/`

Generated/shared TypeScript types. Replace placeholder database types with generated Supabase types after schema is created.

## `docs/`

Human-readable architecture, workflows, and RBAC notes.

## `db/`

Add real Supabase migrations here. This folder is the next major work item.
