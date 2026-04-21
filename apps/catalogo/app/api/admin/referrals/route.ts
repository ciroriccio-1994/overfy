// apps/catalogo/app/api/admin/referrals/route.ts
//
// GET : overview admin di tutti i referral_credits con join referrer/referred.

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ReferralCreditRow, ProfileRow } from '@/types/database';

export const runtime = 'nodejs';

export async function GET() {
  const auth = await getCurrentUser();
  if (!auth) return NextResponse.json({ error: 'Non autenticato.' }, { status: 401 });
  if (!auth.profile.is_admin) return NextResponse.json({ error: 'Non autorizzato.' }, { status: 403 });

  const admin = createAdminClient();

  const { data: creditsRaw } = await admin
    .from('referral_credits')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  const credits = (creditsRaw as ReferralCreditRow[] | null) ?? [];

  // Fetch profiles coinvolti (referrer + referred) in batch
  const userIds = Array.from(
    new Set([
      ...credits.map((c) => c.referrer_user_id),
      ...credits.map((c) => c.referred_user_id),
    ]),
  );

  const { data: profilesRaw } =
    userIds.length > 0
      ? await admin
          .from('profiles')
          .select('id, email, full_name')
          .in('id', userIds)
      : { data: [] };

  const profiles = (profilesRaw as Pick<ProfileRow, 'id' | 'email' | 'full_name'>[] | null) ?? [];
  const profilesById = new Map(profiles.map((p) => [p.id, p]));

  const rows = credits.map((c) => ({
    ...c,
    referrer: profilesById.get(c.referrer_user_id) || null,
    referred: profilesById.get(c.referred_user_id) || null,
  }));

  // Aggregati
  const aggregates = {
    total: credits.length,
    pending: credits.filter((c) => c.status === 'pending').length,
    consolidated: credits.filter((c) => c.status === 'consolidated').length,
    applied: credits.filter((c) => c.status === 'applied').length,
    consumed: credits.filter((c) => c.status === 'consumed').length,
    voided: credits.filter((c) => c.status === 'voided').length,
  };

  return NextResponse.json({ credits: rows, aggregates });
}
