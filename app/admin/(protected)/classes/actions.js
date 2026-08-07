"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) throw new Error("You must sign in again.");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("active")
    .eq("user_id", userId)
    .maybeSingle();
  if (!admin?.active) throw new Error("Administrator access is required.");
  return { supabase, userId };
}

function text(formData, key, max = 300) {
  return String(formData.get(key) || "").trim().slice(0, max);
}

function classPayload(formData, userId) {
  const name = text(formData, "name", 120);
  const category = text(formData, "category", 80);
  const ageGroup = text(formData, "age_group", 80);
  if (!name || !category || !ageGroup) throw new Error("Name, category and age group are required.");

  const feeValue = text(formData, "fee", 20);
  const seatsValue = text(formData, "available_seats", 10);
  const status = text(formData, "status", 20);
  if (!["draft", "published", "archived"].includes(status)) throw new Error("Invalid publishing status.");

  return {
    name,
    category,
    age_group: ageGroup,
    description: text(formData, "description", 1200),
    skill_level: text(formData, "skill_level", 80) || "All levels",
    duration: text(formData, "duration", 100),
    schedule_summary: text(formData, "schedule_summary", 160),
    materials: text(formData, "materials", 180),
    fee: feeValue === "" ? null : Math.max(0, Number(feeValue)),
    fee_label: text(formData, "fee_label", 100),
    mode: text(formData, "mode", 20) || "offline",
    available_seats: seatsValue === "" ? null : Math.max(0, Number.parseInt(seatsValue, 10)),
    status,
    updated_by: userId
  };
}

function refreshClasses() {
  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}

export async function createClass(formData) {
  const { supabase, userId } = await requireAdmin();
  const payload = classPayload(formData, userId);
  const baseSlug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "class";
  const { error } = await supabase.from("classes").insert({
    ...payload,
    slug: `${baseSlug}-${Date.now().toString(36)}`,
    created_by: userId
  });
  if (error) throw new Error(error.message);
  refreshClasses();
}

export async function updateClass(formData) {
  const { supabase, userId } = await requireAdmin();
  const id = text(formData, "id", 50);
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid class identifier.");
  const { error } = await supabase.from("classes").update(classPayload(formData, userId)).eq("id", id);
  if (error) throw new Error(error.message);
  refreshClasses();
}

export async function deleteClass(formData) {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id", 50);
  if (!/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Invalid class identifier.");
  const { error } = await supabase.from("classes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refreshClasses();
}
