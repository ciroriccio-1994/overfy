// apps/catalogo/lib/auth-helpers.ts
//
// Helper di auth per Server Components e Route Handlers.
// - getCurrentUser(): ritorna user+profile o null (non redirige). Usare in API routes.
// - requireUser(): redirige a /login se non loggato. Usare in Server Components.
// - requireAdmin(): redirige a / se non admin. Usare in Server Components admin.
// - isAdminUser(): boolean puro. Utile per mostrare/nascondere UI.

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ProfileRow } from '@/types/database';

export type ProfileRowWithAdmin = ProfileRow & { is_admin: boolean };

export interface CurrentUser {
  userId: string;
  email: string;
  profile: ProfileRowWithAdmin;
}

/**
 * Restituisce l'utente auth + profilo completo, o null se non loggato.
 * Non redirige mai. Usare in API route handlers.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  // Uso admin client per leggere is_admin. RLS permetterebbe comunque la lettura
  // del proprio profilo, ma passo per admin per evitare latency di policy check
  // e per avere un punto unico di accesso al profilo lato server.
  const admin = createAdminClient();
  const { data: profile, error } = await admin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !profile) return null;

  return {
    userId: user.id,
    email: user.email ?? (profile as ProfileRowWithAdmin).email,
    profile: profile as ProfileRowWithAdmin,
  };
}

/**
 * Richiede autenticazione. Se non loggato, redirige a /login?next=...
 * Usare in Server Components di pagine protette.
 */
export async function requireUser(nextPath = '/dashboard'): Promise<CurrentUser> {
  const data = await getCurrentUser();
  if (!data) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return data;
}

/**
 * Richiede autenticazione + is_admin=true. Se non admin, torna in homepage.
 * Usare in Server Components dell'area admin.
 */
export async function requireAdmin(nextPath = '/admin'): Promise<CurrentUser> {
  const data = await getCurrentUser();
  if (!data) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  if (!data.profile.is_admin) redirect('/');
  return data;
}

/**
 * Check puro (non redirige). Utile per mostrare/nascondere elementi UI
 * come il link "Admin" nella Navbar.
 */
export async function isAdminUser(): Promise<boolean> {
  const data = await getCurrentUser();
  return Boolean(data?.profile.is_admin);
}
