import { redirect } from "next/navigation";
import { can } from "@/lib/permissions/can";
import type { Permission } from "@/lib/permissions/permissions";
import { getCurrentUserRole } from "./get-user-role";

export async function requirePermission(permission: Permission) {
  const role = await getCurrentUserRole();
  if (!role) redirect("/login");
  if (!can(role, permission)) redirect("/forbidden");
  return { role };
}
