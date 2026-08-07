import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const tones = ["yellow", "sky", "coral", "purple", "mint", "pink"];

function toCourse(row, index) {
  return {
    id: row.slug,
    title: row.name,
    category: row.category,
    age: row.age_group,
    ageGroup: row.age_group.toLowerCase().includes("adult") ? "Adults" : row.age_group.toLowerCase().includes("teen") || row.age_group.includes("13") ? "Teens" : "Kids",
    level: row.skill_level,
    duration: row.duration,
    schedule: row.schedule_summary,
    mode: row.mode === "online" ? "Online" : row.mode === "hybrid" ? "Studio + online" : "Studio",
    materials: row.materials,
    fee: row.fee_label || (row.fee == null ? "Ask for fee" : `From ₹${Number(row.fee).toLocaleString("en-IN")}`),
    seats: row.available_seats ?? 0,
    tone: tones[index % tones.length],
    description: row.description
  };
}

export async function getPublishedClasses() {
  if (!isSupabaseConfigured()) {
    console.error("Published classes unavailable: Supabase is not configured.");
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("classes")
    .select("slug,name,category,description,age_group,skill_level,duration,schedule_summary,materials,fee,fee_label,mode,available_seats")
    .eq("status", "published")
    .order("sort_order")
    .order("created_at");

  if (error) {
    console.error("Published classes query failed:", error.message);
    return [];
  }

  return data.map(toCourse);
}
