# Project Brief: ChaChaCha Ops

## Business

ChaChaCha Ops is an internal furniture retail operations app for managing store and warehouse operations.

## MVP modules

1. Auth and role-based access control.
2. Owner dashboard.
3. Sales entry.
4. Inventory movements and balances.
5. Credit application review.
6. Credit accounts and installment tracking.
7. Collections workflow.
8. Delivery workflow.
9. Daily cash/finance close.

## Non-negotiable control rules

| Rule | Why it matters |
| --- | --- |
| Inventory movements are source of truth | Prevents manual stock manipulation and reporting drift. |
| Balances are derived from movements | Makes stock numbers explainable and auditable. |
| No reservation without payment | Prevents unpaid stock holds. |
| Deposit creates reservation | Matches retail operating process. |
| Delivery completion converts reserved to sold | Keeps physical fulfillment tied to stock state. |
| Multi-location inventory | Supports warehouse/store split. |
| RBAC everywhere | Internal users should only see/do their job. |
| Audit logs for critical changes | Owner needs traceability for money, credit, and stock. |

## MVP user roles

- `owner`
- `ops_manager`
- `salesperson`
- `cashier`
- `inventory_controller`
- `credit_officer`
- `collections_officer`
- `delivery_coordinator`

## MVP success definition

The MVP is successful when a real user can:

1. Log in.
2. See only allowed modules.
3. Create a sale.
4. Take a deposit/payment.
5. Reserve stock through a movement ledger.
6. Complete delivery and convert reserved stock to sold.
7. Approve credit and generate installment schedules.
8. Log collection actions and payments.
9. Close daily cash.
10. See owner dashboard control metrics.
