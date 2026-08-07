import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login/?reason=setup");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || !userId) {
    redirect("/admin/login/");
  }

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, display_name, active")
    .eq("user_id", userId)
    .maybeSingle();

  if (adminError || !adminUser?.active) {
    await supabase.auth.signOut();
    redirect("/admin/login/?reason=unauthorized");
  }

  return children;
}

