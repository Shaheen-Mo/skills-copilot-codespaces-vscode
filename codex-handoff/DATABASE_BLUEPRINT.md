# Database Blueprint

## Required tables

| Table | Purpose |
| --- | --- |
| `users` | App profile linked to Supabase Auth. |
| `roles` | RBAC role catalog. |
| `user_roles` | User-to-role assignment. |
| `locations` | Store/warehouse inventory locations. |
| `customers` | Customer profile. |
| `suppliers` | Supplier/vendor profile. |
| `products` | Product family/catalog item. |
| `product_variants` | Sellable SKU/variant. |
| `price_lists` | Pricing groups/versions. |
| `price_list_items` | SKU prices per price list. |
| `inventory_movements` | Source-of-truth stock ledger. |
| `inventory_balances` | Derived read model by variant/location. |
| `sales` | Sale header. |
| `sale_lines` | Sale line items. |
| `payments` | Deposits, final payments, credit payments. |
| `credit_applications` | Credit review request. |
| `credit_accounts` | Approved account/loan. |
| `installment_schedule` | Due dates and balances. |
| `collection_actions` | Calls, visits, promises, collection notes. |
| `deliveries` | Delivery scheduling and completion. |
| `expenses` | Store/operations expenses. |
| `cash_sessions` | Daily cash open/close reconciliation. |
| `audit_logs` | Immutable operational audit trail. |

## Required enums/statuses

- `sale_status`: `draft`, `reserved`, `delivery_pending`, `delivered`, `cancelled`
- `payment_mode`: `cash`, `credit`, `mixed`
- `payment_method`: `cash`, `card`, `bank_transfer`, `mobile_money`
- `payment_kind`: `deposit`, `final`, `credit_installment`, `refund`
- `inventory_movement_type`: `stock_in_purchase`, `stock_in_adjustment`, `reserve_out`, `reserve_release`, `sold_out_delivery`, `transfer_out`, `transfer_in`, `damage_out`
- `credit_application_status`: `draft`, `submitted`, `under_review`, `approved`, `rejected`, `cancelled`
- `credit_account_status`: `active`, `closed`, `defaulted`, `restructured`
- `installment_status`: `pending`, `partial`, `paid`, `overdue`
- `delivery_status`: `pending`, `scheduled`, `out_for_delivery`, `completed`, `failed`, `cancelled`
- `cash_session_status`: `open`, `closed`

## Critical RPC functions

### `fn_confirm_reservation(p_sale_id uuid)`

Must:

1. Check payment/deposit exists.
2. Check line stock is available at sale location.
3. Insert `reserve_out` inventory movements.
4. Update sale status to `reserved`.
5. Audit the transition.

### `fn_complete_delivery(p_delivery_id uuid)`

Must:

1. Check delivery exists and sale is reserved/delivery pending.
2. Insert `sold_out_delivery` movement rows.
3. Mark delivery `completed`.
4. Mark sale `delivered`.
5. Audit the transition.

### `fn_apply_credit_payment(p_credit_account_id uuid, p_amount numeric)`

Must:

1. Insert payment row.
2. Apply amount to oldest unpaid installments.
3. Update installment statuses.
4. Audit payment application.

### `fn_close_cash_session(p_location_id uuid, p_session_date date, p_counted_cash numeric)`

Must:

1. Calculate expected cash from cash payments/collections.
2. Store counted cash.
3. Store variance.
4. Prevent duplicate close.
5. Audit close.

## RLS requirements

- Enable RLS on all operational tables.
- Authenticated users can read their allowed module data.
- Only owners/ops managers can see cross-module sensitive data.
- Inventory balances should be readable but not directly editable by normal users.
- Inventory movements should only be inserted by allowed roles or secure RPCs.
- Financial writes should require cashier/owner/ops manager permissions.
