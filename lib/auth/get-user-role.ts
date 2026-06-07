import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/permissions/permissions";

type RoleRow = { roles: { code: Role } | { code: Role }[] | null };

export async function getCurrentUserRole(): Promise<Role | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;

  const { data, error } = await supabase
    .from("user_roles")
    .select("roles(code)")
    .eq("user_id", auth.user.id)
    .limit(1)
    .maybeSingle<RoleRow>();

  if (error || !data?.roles) return null;
  const roles = Array.isArray(data.roles) ? data.roles[0] : data.roles;
  return roles?.code ?? null;
}
