import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = isSupabaseConfigured();
  let database = configured ? "unreachable" : "configuration_required";
  let publishedClasses = null;
  let databaseError = null;

  if (configured) {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("classes")
      .select("id", { count: "exact", head: true })
      .eq("status", "published");

    if (error) {
      databaseError = error.message;
    } else {
      database = "connected";
      publishedClasses = count;
    }
  }

  return NextResponse.json(
    {
      status: "ok",
      service: "sri-school-of-art",
      supabase: configured ? "configured" : "configuration_required",
      database,
      publishedClasses,
      ...(databaseError ? { databaseError } : {})
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
