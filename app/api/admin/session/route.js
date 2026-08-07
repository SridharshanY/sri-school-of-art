import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { authenticated: false, error: "Supabase configuration is required." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, display_name, active")
    .eq("user_id", userId)
    .maybeSingle();

  if (adminError || !adminUser?.active) {
    return NextResponse.json(
      { authenticated: true, authorized: false },
      { status: 403 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    authorized: true,
    admin: {
      id: adminUser.user_id,
      displayName: adminUser.display_name
    }
  });
}

