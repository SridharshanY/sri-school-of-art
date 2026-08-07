"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function login(_previousState, formData) {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase is not configured yet. Add the project values to .env.local and restart the server."
    };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Enter both your email address and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    return { error: "The email address or password is incorrect." };
  }

  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id, active")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (adminError || !adminUser?.active) {
    await supabase.auth.signOut();
    return { error: "This account does not have administrator access." };
  }

  redirect("/admin/");
}

