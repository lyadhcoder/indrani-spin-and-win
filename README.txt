INDRANI ELECTRONICS - Spin & Win

IMPORTANT Vercel Environment Variables:
VITE_SUPABASE_URL = your Supabase Project URL
VITE_SUPABASE_PUBLISHABLE_KEY = your Supabase Publishable Key (sb_publishable_...)

The previous build had a variable-name mismatch: it expected VITE_SUPABASE_ANON_KEY while the setup instructions used VITE_SUPABASE_PUBLISHABLE_KEY. This build accepts the publishable key and also accepts the old anon key as fallback.

After adding/changing environment variables in Vercel, Redeploy the project.

Run the SQL in supabase-schema.sql once in Supabase SQL Editor.
