import { Permission, Role, rolePermissions } from "./permissions";

export function can(role: Role | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function canAny(role: Role | null | undefined, permissions: Permission[]): boolean {
  return permissions.some((permission) => can(role, permission));
}
