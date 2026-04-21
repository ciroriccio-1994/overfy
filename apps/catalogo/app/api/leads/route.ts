// apps/catalogo/app/api/leads/route.ts
//
// Salva un lead nel DB e invia email di notifica a info@overfydigital.com.

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getResend, getFromEmail, getNotifyEmail } from '@/lib/email/resend';
import { leadNotifyEmailHtml } from '@/lib/email/templates';

export const runtime = 'nodejs';

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

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email non valida.' }, { status: 400 });
    }
    if (!message || message.length < 3) {
      return NextResponse.json({ error: 'Messaggio troppo corto.' }, { status: 400 });
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
      await resend.emails.send({
        from: getFromEmail(),
        to: getNotifyEmail(),
        replyTo: email,
        subject: `Nuovo lead Overfy — ${fullName || email}`,
        html: leadNotifyEmailHtml({
          fullName,
          email,
          companyName,
          phone,
          message,
          source,
          interestTier,
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
