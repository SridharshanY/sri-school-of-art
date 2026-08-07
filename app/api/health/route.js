import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "sri-school-of-art",
      supabase: isSupabaseConfigured() ? "configured" : "configuration_required"
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

