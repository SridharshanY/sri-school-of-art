"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    document.documentElement.classList.toggle("admin-document", isAdmin);
    document.body.classList.toggle("admin-document", isAdmin);

    return () => {
      document.documentElement.classList.remove("admin-document");
      document.body.classList.remove("admin-document");
    };
  }, [isAdmin]);

  if (isAdmin) {
    return children;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
