// apps/catalogo/lib/email/resend.ts
//
// Istanza Resend server-side, lazy-loaded per evitare crash in build quando
// la env var non esiste.

import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || 'Overfy <noreply@overfydigital.com>';
}

export function getNotifyEmail(): string {
  return process.env.NOTIFY_EMAIL || 'info@overfydigital.com';
}
