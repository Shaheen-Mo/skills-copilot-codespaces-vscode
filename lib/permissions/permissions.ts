export type Role =
  | "owner"
  | "ops_manager"
  | "salesperson"
  | "cashier"
  | "inventory_controller"
  | "credit_officer"
  | "collections_officer"
  | "delivery_coordinator";

export type Permission =
  | "page.owner_dashboard.view"
  | "page.sales.view"
  | "page.inventory.view"
  | "page.credit.view"
  | "page.collections.view"
  | "page.delivery.view"
  | "page.finance.view"
  | "sales.create"
  | "sales.reserve"
  | "payment.capture"
  | "inventory.movement.create"
  | "credit.application.review"
  | "credit.account.create"
  | "collection.action.log"
  | "collection.payment.record"
  | "delivery.schedule"
  | "delivery.complete"
  | "finance.cash_close";

const allPermissions: Permission[] = [
  "page.owner_dashboard.view",
  "page.sales.view",
  "page.inventory.view",
  "page.credit.view",
  "page.collections.view",
  "page.delivery.view",
  "page.finance.view",
  "sales.create",
  "sales.reserve",
  "payment.capture",
  "inventory.movement.create",
  "credit.application.review",
  "credit.account.create",
  "collection.action.log",
  "collection.payment.record",
  "delivery.schedule",
  "delivery.complete",
  "finance.cash_close",
];

export const rolePermissions: Record<Role, Permission[]> = {
  owner: allPermissions,
  ops_manager: allPermissions.filter((permission) => permission !== "page.owner_dashboard.view"),
  salesperson: ["page.sales.view", "sales.create", "sales.reserve"],
  cashier: ["page.sales.view", "page.finance.view", "payment.capture", "finance.cash_close"],
  inventory_controller: ["page.inventory.view", "inventory.movement.create"],
  credit_officer: ["page.credit.view", "credit.application.review", "credit.account.create"],
  collections_officer: ["page.collections.view", "collection.action.log", "collection.payment.record"],
  delivery_coordinator: ["page.delivery.view", "delivery.schedule", "delivery.complete"],
};
