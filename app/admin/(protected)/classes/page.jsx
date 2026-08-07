import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createClass, deleteClass, updateClass } from "./actions";
import styles from "./classes.module.css";

export const metadata = { title: "Manage Classes" };
export const dynamic = "force-dynamic";

const fields = [
  ["name", "Class name", "text"], ["category", "Category", "text"],
  ["age_group", "Age group", "text"], ["skill_level", "Skill level", "text"],
  ["duration", "Duration", "text"], ["schedule_summary", "Schedule", "text"],
  ["materials", "Materials", "text"], ["fee", "Fee (₹)", "number"],
  ["fee_label", "Fee label", "text"], ["available_seats", "Available seats", "number"]
];

function ClassFields({ item = {} }) {
  return (
    <>
      {fields.map(([name, label, type]) => (
        <label key={name}><span>{label}</span><input name={name} type={type} min={type === "number" ? "0" : undefined} defaultValue={item[name] ?? ""} required={["name", "category", "age_group"].includes(name)} /></label>
      ))}
      <label><span>Mode</span><select name="mode" defaultValue={item.mode || "offline"}><option value="offline">Studio</option><option value="online">Online</option><option value="hybrid">Studio + online</option></select></label>
      <label><span>Status</span><select name="status" defaultValue={item.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
      <label className={styles.wide}><span>Description</span><textarea name="description" rows="3" defaultValue={item.description || ""} /></label>
    </>
  );
}

export default async function ManageClassesPage() {
  const supabase = await createClient();
  const { data: items = [], error } = await supabase.from("classes").select("*").order("sort_order").order("created_at");

  return (
    <main className={styles.page}>
      <header><div><p>Admin portal / Classes</p><h1>Manage classes</h1><span>Published changes appear on the public Classes page immediately.</span></div><Link href="/admin/">Back to dashboard</Link></header>
      {error ? <div className={styles.error}>Could not load classes: {error.message}</div> : null}
      <details className={styles.create} open={!items.length}>
        <summary>Add a new class</summary>
        <form action={createClass} className={styles.form}><ClassFields /><button type="submit">Create class</button></form>
      </details>
      <section className={styles.list}>
        {items.map((item) => (
          <details className={styles.card} key={item.id}>
            <summary><strong>{item.name}</strong><span>{item.age_group} · {item.status}</span></summary>
            <form action={updateClass} className={styles.form}>
              <input type="hidden" name="id" value={item.id} /><ClassFields item={item} />
              <div className={styles.actions}><button type="submit">Save changes</button><button className={styles.delete} formAction={deleteClass}>Delete class</button></div>
            </form>
          </details>
        ))}
        {!error && !items.length ? <p className={styles.empty}>No database classes yet. Add your first one above; the public site is currently showing its fallback catalogue.</p> : null}
      </section>
    </main>
  );
}
