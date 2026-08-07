import AdminPortal from "@/components/AdminPortal";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Portal",
  description: "Administration portal for Sri School of Art.",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: classes = [] } = await supabase
    .from("classes")
    .select("*")
    .order("sort_order")
    .order("created_at");

  return <AdminPortal databaseClasses={classes} />;
}
