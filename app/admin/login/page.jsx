import Link from "next/link";
import { Palette, ShieldCheck } from "lucide-react";
import AdminLoginForm from "@/components/AdminLoginForm";
import styles from "./login.module.css";

export const metadata = {
  title: "Admin Sign In",
  robots: {
    index: false,
    follow: false
  }
};

const errors = {
  setup:
    "Supabase configuration is missing. Add the environment variables and restart the application.",
  unauthorized: "Your account is signed in but does not have administrator access."
};

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const initialError = errors[params?.reason] || "";

  return (
    <main className={styles.loginPage} id="main-content">
      <Link className={styles.publicLink} href="/">
        ← Return to public website
      </Link>
      <section className={styles.loginCard}>
        <div className={styles.brandMark}>
          <Palette size={28} aria-hidden="true" />
        </div>
        <p className={styles.eyebrow}>Sri School of Art</p>
        <h1>Welcome back.</h1>
        <p className={styles.intro}>
          Sign in with an approved administrator account to manage the school
          website.
        </p>
        <AdminLoginForm initialError={initialError} />
        <div className={styles.securityNote}>
          <ShieldCheck size={18} aria-hidden="true" />
          <span>
            Access is protected by Supabase authentication and database
            administrator permissions.
          </span>
        </div>
      </section>
      <p className={styles.footerNote}>
        Need access? Ask the project owner to add your account as an
        administrator.
      </p>
    </main>
  );
}

