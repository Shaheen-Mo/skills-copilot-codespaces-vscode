# RBAC Matrix

| Role | Main access |
| --- | --- |
| owner | All pages and actions |
| ops_manager | Operational pages and actions |
| salesperson | Sales page, create sale, reserve sale |
| cashier | Sales payment and finance close |
| inventory_controller | Inventory movement posting |
| credit_officer | Credit application review and account creation |
| collections_officer | Collection actions and collection payments |
| delivery_coordinator | Delivery scheduling and completion |

The canonical permission map lives in `lib/permissions/permissions.ts`.
