import { NextResponse } from "next/server";
import { getCurrentUserRole } from "@/lib/auth/get-user-role";
import { can } from "@/lib/permissions/can";
import { reviewCreditApplicationSchema } from "@/lib/validators/credit";

export async function PATCH(request: Request) {
  const role = await getCurrentUserRole();
  if (!can(role, "credit.application.review")) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const payload = reviewCreditApplicationSchema.parse(await request.json());
  return NextResponse.json({ ok: true, payload });
}
