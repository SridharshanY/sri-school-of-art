import AdminPortal from "@/components/AdminPortal";

export const metadata = {
  title: "Admin Portal",
  description: "Static administration portal preview for Sri School of Art.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminPortal />;
}
