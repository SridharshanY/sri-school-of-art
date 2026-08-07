# Supabase setup

## 1. Configure the database

Open **Supabase Dashboard → SQL Editor**, paste the complete contents of
`schema.sql`, and run it once.

The script creates the content tables, timestamps, indexes and Row Level
Security policies. It does not publish placeholder content.

## 2. Create the first administrator

In **Authentication → Users**, create the administrator using the intended
email address and a strong temporary password. Copy the new user's UUID.

Then run this in SQL Editor, replacing the UUID and display name:

```sql
insert into public.admin_users (user_id, display_name)
values ('PASTE_AUTH_USER_UUID_HERE', 'Sri School of Art Administrator');
```

Only users present in `public.admin_users` with `active = true` can enter the
protected admin portal.

## 3. Configure local environment variables

Copy `.env.example` to `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SECRET_KEY=sb_secret_YOUR_SERVER_KEY
```

Restart the development server after changing `.env.local`.

The secret key is reserved for later server-only administration tasks. It must
never be prefixed with `NEXT_PUBLIC_`, sent to the browser or committed to Git.

## 4. Test authentication

Open `/admin/login/`, sign in with the Auth user created above, and verify that
you are redirected to `/admin/`.

