"use client";

import { useActionState } from "react";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { login } from "@/app/admin/login/actions";
import styles from "@/app/admin/login/login.module.css";

const initialState = { error: "" };

export default function AdminLoginForm({ initialError = "" }) {
  const [state, formAction, pending] = useActionState(login, {
    ...initialState,
    error: initialError
  });

  return (
    <form className={styles.form} action={formAction}>
      <label>
        <span>Email address</span>
        <div className={styles.inputWrap}>
          <Mail size={18} aria-hidden="true" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="admin@example.com"
            required
          />
        </div>
      </label>
      <label>
        <span>Password</span>
        <div className={styles.inputWrap}>
          <LockKeyhole size={18} aria-hidden="true" />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            required
          />
        </div>
      </label>
      {state?.error ? (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      ) : null}
      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in to admin"}
        {!pending && <ArrowRight size={18} aria-hidden="true" />}
      </button>
    </form>
  );
}

