// apps/catalogo/app/components/Navbar.tsx
//
// Navbar: Server Component wrapper che fetcha lo stato di auth/admin
// e delega la UI al Client Component NavbarClient. Grazie a questo split
// evitiamo il flash "sloggato → loggato" e non dobbiamo aggiungere una
// chiamata Supabase al mount su ogni pagina.
//
// Usage (invariato rispetto a prima):
//   import { Navbar } from '../components/Navbar';
//   <Navbar />

import { getCurrentUser } from '@/lib/auth-helpers';
import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const auth = await getCurrentUser().catch(() => null);
  return (
    <NavbarClient
      isAuthenticated={Boolean(auth)}
      isAdmin={Boolean(auth?.profile.is_admin)}
      userEmail={auth?.email ?? null}
      userName={auth?.profile.full_name ?? null}
    />
  );
}
