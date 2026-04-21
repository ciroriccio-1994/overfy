// apps/catalogo/app/auth/callback/route.ts
//
// Handler del link di conferma email Supabase.
// Scambia il code per una sessione, risolve i codici di attribution
// (referral_code / agent_code) dai user_metadata, poi redirige l'utente.
//
// Patch 2026-04-21: attribution post-signup.
//
// L'utente ha scritto ?ref=CODE o ?agent=CODE al signup. Quei codici sono
// stati passati a supabase.auth.signUp(options.data), che li persiste nei
// raw_user_meta_data di auth.users. Qui li leggiamo, li risolviamo alle
// rispettive tabelle, e aggiorniamo la row profiles.

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=conferma_fallita`);
    }

    // Post-auth: risolvi codici di attribution dal user_metadata.
    try {
      await resolveAttributionCodes();
    } catch (err) {
      console.error('[callback] attribution resolution error:', err);
      // Non blocca il flusso: l'utente è comunque autenticato.
    }
  }

  // Se ha un piano selezionato, mandiamolo al checkout tramite /dopo-registrazione.
  if (plan && interval) {
    const qs = new URLSearchParams({ plan, interval, next: '/dashboard' });
    return NextResponse.redirect(`${origin}/dopo-registrazione?${qs.toString()}`);
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}

/**
 * Legge user.user_metadata.referral_code e .agent_code, li risolve alle
 * rispettive FK (profiles.id per referral, agents.id per agent) e aggiorna
 * il profile.
 *
 * Safe-fail: se i codici sono invalidi o il profile non esiste ancora,
 * non interrompe il flusso auth.
 */
async function resolveAttributionCodes(): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const meta = (user.user_metadata || {}) as Record<string, unknown>;
  const refCodeRaw = typeof meta.referral_code === 'string' ? meta.referral_code : null;
  const agentCodeRaw = typeof meta.agent_code === 'string' ? meta.agent_code : null;

  if (!refCodeRaw && !agentCodeRaw) return;

  const admin = createAdminClient();

  const updates: Record<string, string | null> = {};

  // REFERRAL
  if (refCodeRaw) {
    const refCode = refCodeRaw.trim().toUpperCase();
    const { data: referrer } = await admin
      .from('profiles')
      .select('id')
      .eq('referral_code', refCode)
      .maybeSingle();

    const r = referrer as { id: string } | null;
    if (r?.id && r.id !== user.id) {
      // Evita self-referral
      updates.referred_by_user_id = r.id;
    }
  }

  // AGENT
  if (agentCodeRaw) {
    const agentCode = agentCodeRaw.trim().toUpperCase();
    const { data: agent } = await admin
      .from('agents')
      .select('id, status')
      .eq('code', agentCode)
      .maybeSingle();

    const a = agent as { id: string; status: string } | null;
    if (a?.id && a.status === 'active') {
      updates.acquired_by_agent_id = a.id;
    }
  }

  if (Object.keys(updates).length === 0) return;

  // Aggiorna il profile. Se il profile non esiste ancora (trigger
  // handle_new_user non ancora eseguito), questo update fallirà silently.
  // In quel caso il trigger DB dovrebbe leggere user_metadata autonomamente;
  // se il suo codice non lo fa, il cliente perde l'attribution — edge case.
  await admin
    .from('profiles')
    .update(updates)
    .eq('id', user.id);
}
