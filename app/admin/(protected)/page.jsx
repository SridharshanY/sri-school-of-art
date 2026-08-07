import AdminPortal from "@/components/AdminPortal";

export const metadata = {
  title: "Admin Portal",
  description: "Administration portal for Sri School of Art.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminPortal />;
}

