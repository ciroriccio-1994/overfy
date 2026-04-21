// apps/catalogo/app/api/leads/route.ts
//
// Salva un lead nel DB e invia email di notifica a admin.
// Supporta "Chiamami adesso": se request_callback=true il subject diventa
// urgente e il template email si colora di rosso.

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getResend, getFromEmail, getNotifyEmail } from '@/lib/email/resend';
import { leadNotifyEmailHtml } from '@/lib/email/templates';

export const runtime = 'nodejs';

const VALID_PREFERRED_TIMES = ['today_2h', 'tomorrow_am', 'tomorrow_pm', 'within_3_days'] as const;
type PreferredTime = (typeof VALID_PREFERRED_TIMES)[number];

const PREFERRED_TIME_LABELS: Record<PreferredTime, string> = {
  today_2h: 'Oggi, entro 2 ore',
  tomorrow_am: 'Domani mattina (9:00 — 12:00)',
  tomorrow_pm: 'Domani pomeriggio (14:00 — 18:00)',
  within_3_days: 'Entro 3 giorni lavorativi',
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));

    const email = (body?.email as string | undefined)?.trim().toLowerCase();
    const fullName = (body?.full_name as string | undefined)?.trim() || null;
    const companyName = (body?.company_name as string | undefined)?.trim() || null;
    const phone = (body?.phone as string | undefined)?.trim() || null;
    const message = (body?.message as string | undefined)?.trim() || null;
    const source = (body?.source as string | undefined)?.trim() || 'contatti';
    const interestTier = (body?.interest_tier as string | undefined)?.trim() || null;
    const requestCallback = body?.request_callback === true;
    const rawPreferredTime = body?.preferred_time as string | undefined | null;
    const preferredTime: PreferredTime | null =
      requestCallback && rawPreferredTime && VALID_PREFERRED_TIMES.includes(rawPreferredTime as PreferredTime)
        ? (rawPreferredTime as PreferredTime)
        : null;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email non valida.' }, { status: 400 });
    }
    if (!message || message.length < 3) {
      return NextResponse.json({ error: 'Messaggio troppo corto.' }, { status: 400 });
    }
    if (requestCallback && !phone) {
      return NextResponse.json(
        { error: 'Per richiedere una chiamata serve il numero di telefono.' },
        { status: 400 },
      );
    }

    const admin = createAdminClient();

    const { error: dbError } = await admin.from('leads').insert({
      email,
      full_name: fullName,
      company_name: companyName,
      phone,
      message,
      source,
      interest_tier: interestTier,
      request_callback: requestCallback,
      preferred_time: preferredTime,
    });

    if (dbError) {
      console.error('[leads] db error:', dbError);
      return NextResponse.json(
        { error: 'Impossibile salvare la richiesta. Riprova tra un momento.' },
        { status: 500 },
      );
    }

    // Invia notifica admin — best effort
    try {
      const resend = getResend();

      const subject = requestCallback
        ? `🔥 CALLBACK · ${fullName || email}${preferredTime ? ` — ${PREFERRED_TIME_LABELS[preferredTime]}` : ''}`
        : `Nuovo lead Overfy — ${fullName || email}`;

      await resend.emails.send({
        from: getFromEmail(),
        to: getNotifyEmail(),
        replyTo: email,
        subject,
        html: leadNotifyEmailHtml({
          fullName,
          email,
          companyName,
          phone,
          message,
          source,
          interestTier,
          requestCallback,
          preferredTimeLabel: preferredTime ? PREFERRED_TIME_LABELS[preferredTime] : null,
        }),
      });
    } catch (err) {
      console.error('[leads] notify email error:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[leads] handler error:', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
