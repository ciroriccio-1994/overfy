// apps/catalogo/app/api/dashboard/referral/route.ts
//
// GET: ritorna al client la sezione "Invita un amico" della dashboard:
//   - codice referral (generato on-demand se non esiste)
//   - link signup completo
//   - aggregati: crediti pending/consolidated/applied/consumed/voided
//   - cap indicator (max 6 crediti non-terminali)

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ReferralCreditRow } from '@/types/database';

export const runtime = 'nodejs';

const REFERRAL_CAP = 6;

export async function GET() {
  const auth = await getCurrentUser();
  if (!auth) {
    return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  }

  const admin = createAdminClient();

  // 1. Ottieni o genera il codice referral
  const { data: codeData, error: codeError } = await admin.rpc(
    'get_or_create_referral_code',
    { p_user_id: auth.userId },
  );

  if (codeError) {
    console.error('[api/dashboard/referral] code error:', codeError);
    return NextResponse.json({ error: 'Errore nella generazione del codice.' }, { status: 500 });
  }

  const code = typeof codeData === 'string' ? codeData : null;
  if (!code) {
    return NextResponse.json({ error: 'Codice non disponibile.' }, { status: 500 });
  }

  // 2. Recupera tutti i crediti referral dell'utente (come referrer)
  const { data: creditsRaw } = await admin
    .from('referral_credits')
    .select('id, status, created_at, consolidated_at, applied_at, consumed_at, voided_at, referred_user_id')
    .eq('referrer_user_id', auth.userId)
    .order('created_at', { ascending: false });

  const credits = (creditsRaw as ReferralCreditRow[] | null) ?? [];

  // 3. Aggrega statistiche
  const stats = {
    pending: credits.filter((c) => c.status === 'pending').length,
    consolidated: credits.filter((c) => c.status === 'consolidated').length,
    applied: credits.filter((c) => c.status === 'applied').length,
    consumed: credits.filter((c) => c.status === 'consumed').length,
    voided: credits.filter((c) => c.status === 'voided').length,
    total: credits.length,
  };

  const openCount =
    stats.pending + stats.consolidated + stats.applied;
  const capReached = openCount >= REFERRAL_CAP;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://overfydigital.com';
  const signupLink = `${siteUrl}/registrati?ref=${encodeURIComponent(code)}`;

  return NextResponse.json({
    code,
    signupLink,
    stats,
    cap: REFERRAL_CAP,
    capReached,
    // Prossimo credito in attesa (il più vecchio consolidated/pending)
    nextUnlock: computeNextUnlock(credits),
  });
}

function computeNextUnlock(credits: ReferralCreditRow[]): {
  date: string;
  status: 'pending' | 'consolidated';
} | null {
  const pending = credits
    .filter((c) => c.status === 'pending' && !c.voided_at)
    .sort(
      (a, b) =>
        new Date(a.consolidated_at).getTime() - new Date(b.consolidated_at).getTime(),
    );
  if (pending.length > 0) {
    return { date: pending[0].consolidated_at, status: 'pending' };
  }

  const consolidated = credits.filter((c) => c.status === 'consolidated' && !c.voided_at);
  if (consolidated.length > 0) {
    return { date: consolidated[0].created_at, status: 'consolidated' };
  }

  return null;
}
