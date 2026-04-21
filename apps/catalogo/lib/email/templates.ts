// apps/catalogo/lib/email/templates.ts
//
// Template HTML email — stile sobrio, coerente con il brand Overfy.

export function welcomeEmailHtml(args: {
  name: string | null;
  planName: string;
  dashboardUrl: string;
}): string {
  const display = args.name || 'ciao';
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Benvenuto in Overfy</title>
</head>
<body style="margin:0;padding:0;background:#F9F7F3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0a0a0a;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F3;padding:40px 20px;">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;">
      <tr><td style="padding:40px 40px 20px 40px;">
        <div style="font-family:Georgia,serif;font-size:32px;color:#0a0a0a;font-weight:normal;letter-spacing:-0.5px;">Overfy</div>
        <div style="height:4px;width:48px;background:#00c896;margin-top:8px;border-radius:2px;"></div>
      </td></tr>
      <tr><td style="padding:10px 40px 30px 40px;">
        <h1 style="font-family:Georgia,serif;font-size:36px;line-height:1.1;margin:0 0 16px 0;color:#0a0a0a;font-weight:normal;">
          Benvenuto, ${display}.
        </h1>
        <p style="font-size:16px;line-height:1.6;color:#444;margin:0 0 16px 0;">
          Il tuo abbonamento <strong>${args.planName}</strong> è attivo. Da ora in poi ci pensiamo noi — aggiornamenti, modifiche, problemi.
        </p>
        <p style="font-size:16px;line-height:1.6;color:#444;margin:0 0 24px 0;">
          Il tuo business sarà online in <strong>48 ore</strong>. Nel frattempo ti contatteremo a breve per raccogliere materiali e contenuti.
        </p>
        <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:500;">
          Vai alla dashboard →
        </a>
      </td></tr>
      <tr><td style="padding:20px 40px 30px 40px;border-top:1px solid #eee;">
        <p style="font-size:13px;line-height:1.6;color:#888;margin:0;">
          Hai domande? Rispondi a questa email o scrivi a <a href="mailto:info@overfydigital.com" style="color:#0a0a0a;">info@overfydigital.com</a>
        </p>
      </td></tr>
      <tr><td style="padding:20px 40px 40px 40px;">
        <p style="font-size:12px;color:#aaa;margin:0;">Overfy · Napoli, Italia · overfydigital.com</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export function leadNotifyEmailHtml(args: {
  fullName: string | null;
  email: string;
  companyName: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  interestTier: string | null;
}): string {
  const row = (label: string, value: string | null) =>
    value
      ? `<tr><td style="padding:8px 0;color:#666;font-size:13px;width:140px;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#0a0a0a;font-size:14px;">${escape(value)}</td></tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="utf-8"><title>Nuovo lead — Overfy</title></head>
<body style="margin:0;padding:0;background:#F9F7F3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table cellpadding="0" cellspacing="0" width="100%" style="background:#F9F7F3;padding:40px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#ffffff;border-radius:16px;">
    <tr><td style="padding:32px 32px 16px 32px;border-bottom:1px solid #eee;">
      <div style="font-family:Georgia,serif;font-size:22px;color:#0a0a0a;">📥 Nuovo lead Overfy</div>
    </td></tr>
    <tr><td style="padding:24px 32px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row('Nome', args.fullName)}
        ${row('Email', args.email)}
        ${row('Azienda', args.companyName)}
        ${row('Telefono', args.phone)}
        ${row('Fonte', args.source)}
        ${row('Piano', args.interestTier)}
      </table>
      ${
        args.message
          ? `<div style="margin-top:20px;padding:16px;background:#F9F7F3;border-radius:8px;font-size:14px;line-height:1.6;color:#333;"><strong>Messaggio:</strong><br>${escape(args.message).replace(/\n/g, '<br>')}</div>`
          : ''
      }
      <div style="margin-top:24px;">
        <a href="mailto:${args.email}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:12px 24px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:500;">Rispondi →</a>
      </div>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
