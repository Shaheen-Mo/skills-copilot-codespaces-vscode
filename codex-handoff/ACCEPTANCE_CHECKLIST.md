# Acceptance Checklist

## Setup

- [ ] `npm install` succeeds.
- [ ] `.env.local` is configured.
- [ ] `npm run dev` starts app.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.

## Auth/RBAC

- [ ] Owner can access all modules.
- [ ] Salesperson can access sales only.
- [ ] Cashier can capture payments and close cash.
- [ ] Inventory controller can post allowed movements only.
- [ ] Credit officer can review credit applications.
- [ ] Collections officer can log collection actions/payments.
- [ ] Delivery coordinator can schedule/complete deliveries.
- [ ] Unauthorized users see `/forbidden`.

## Inventory

- [ ] Stock changes only through `inventory_movements`.
- [ ] `inventory_balances` is derived and cannot be manually edited from UI.
- [ ] Reservation posts `reserve_out`.
- [ ] Delivery completion posts `sold_out_delivery`.
- [ ] Negative stock states are blocked.
- [ ] Multi-location stock works.

## Sales

- [ ] Sale can be cash, credit, or mixed.
- [ ] Deposit creates reservation.
- [ ] No reservation without payment.
- [ ] Sale lines use real products/variants/prices.

## Credit/Collections

- [ ] Credit application can be approved/rejected.
- [ ] Approved credit creates account and installments.
- [ ] Payments apply to installments.
- [ ] Collection actions are logged.

## Delivery

- [ ] Delivery can be scheduled.
- [ ] Delivery completion requires allowed role.
- [ ] Completion converts reserved stock to sold.

## Finance close

- [ ] Cash sessions open/close.
- [ ] Expected cash is system-calculated.
- [ ] Variance is stored and visible to owner.

## Audit

- [ ] Sales status changes are audited.
- [ ] Payments are audited.
- [ ] Inventory movements are audited.
- [ ] Credit decisions are audited.
- [ ] Delivery completion is audited.
- [ ] Cash close is audited.
