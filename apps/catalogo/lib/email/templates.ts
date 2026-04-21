// apps/catalogo/lib/email/templates.ts
//
// Template HTML email — stile Overfy (Linear/Vercel tech moderno).
// Logo: 3 pallini CSS + wordmark "Overfy" testuale — zero dipendenze
// da immagini esterne, funziona in ogni client anche se bloccano i PNG.

/* ================================================================= */
/* WELCOME — inviata dal webhook Stripe dopo checkout completato      */
/* ================================================================= */

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
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Benvenuto in Overfy</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;">
  <tr><td align="center">
    <table role="presentation" cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;" bgcolor="#ffffff">

      <tr><td style="padding:36px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0;vertical-align:middle;line-height:0;font-size:0;">
              <span style="display:inline-block;width:13px;height:13px;background:#ff4d4d;border-radius:50%;"></span><span style="display:inline-block;width:13px;height:13px;background:#00c896;border-radius:50%;margin-left:-4px;"></span><span style="display:inline-block;width:13px;height:13px;background:#3ba3ff;border-radius:50%;margin-left:-4px;"></span>
            </td>
            <td style="padding:0 0 0 12px;vertical-align:middle;font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;line-height:1;">
              Overfy
            </td>
          </tr>
        </table>
      </td></tr>

      <tr><td style="padding:28px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <div style="height:1px;background:#f0f0f0;line-height:1px;font-size:1px;">&nbsp;</div>
      </td></tr>

      <tr><td style="padding:32px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <p style="font-family:'SF Mono','Monaco','Menlo','Cascadia Mono',Consolas,monospace;font-size:11px;color:#a3a3a3;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;">
          ABBONAMENTO ATTIVO
        </p>
      </td></tr>

      <tr><td style="padding:10px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
          Benvenuto, ${display}.
        </h1>
      </td></tr>

      <tr><td style="padding:16px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
          Il tuo piano <strong style="color:#0a0a0a;font-weight:600;">${args.planName}</strong> è attivo. Il tuo business sarà online in 48 ore — ti scriviamo a breve per raccogliere i materiali.
        </p>
      </td></tr>

      <tr><td style="padding:28px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:-0.01em;line-height:1.3;">
          Vai alla dashboard →
        </a>
      </td></tr>

      <tr><td style="padding:36px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <div style="height:1px;background:#f0f0f0;line-height:1px;font-size:1px;">&nbsp;</div>
      </td></tr>

      <tr><td style="padding:20px 40px 36px 40px;background:#ffffff;" bgcolor="#ffffff">
        <p style="font-size:12px;color:#a3a3a3;margin:0;line-height:1.7;">
          Overfy · Napoli, Italia<br>
          <a href="https://overfydigital.com" style="color:#a3a3a3;text-decoration:none;">overfydigital.com</a> &nbsp;·&nbsp; <a href="mailto:info@overfydigital.com" style="color:#a3a3a3;text-decoration:none;">info@overfydigital.com</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ================================================================= */
/* LEAD NOTIFY (admin) — inviata quando arriva un nuovo lead dal form */
/* ================================================================= */

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
      ? `<tr>
          <td style="padding:10px 0;color:#a3a3a3;font-size:12px;width:110px;vertical-align:top;font-family:'SF Mono','Monaco',monospace;letter-spacing:0.04em;text-transform:uppercase;">${label}</td>
          <td style="padding:10px 0;color:#0a0a0a;font-size:14px;line-height:1.5;">${escape(value)}</td>
        </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Nuovo lead — Overfy</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;" bgcolor="#ffffff">

    <tr><td style="padding:32px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0;vertical-align:middle;line-height:0;font-size:0;">
            <span style="display:inline-block;width:13px;height:13px;background:#ff4d4d;border-radius:50%;"></span><span style="display:inline-block;width:13px;height:13px;background:#00c896;border-radius:50%;margin-left:-4px;"></span><span style="display:inline-block;width:13px;height:13px;background:#3ba3ff;border-radius:50%;margin-left:-4px;"></span>
          </td>
          <td style="padding:0 0 0 12px;vertical-align:middle;font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;line-height:1;">
            Overfy
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:24px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <div style="height:1px;background:#f0f0f0;line-height:1px;font-size:1px;">&nbsp;</div>
    </td></tr>

    <tr><td style="padding:28px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <p style="font-family:'SF Mono','Monaco','Menlo',monospace;font-size:11px;color:#a3a3a3;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;">
        NUOVO LEAD
      </p>
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:22px;line-height:1.2;font-weight:600;color:#0a0a0a;margin:8px 0 0 0;letter-spacing:-0.02em;">
        ${escape(args.fullName || args.email)}
      </h1>
    </td></tr>

    <tr><td style="padding:20px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row('Email', args.email)}
        ${row('Azienda', args.companyName)}
        ${row('Telefono', args.phone)}
        ${row('Fonte', args.source)}
        ${row('Piano', args.interestTier)}
      </table>
      ${
        args.message
          ? `<div style="margin-top:16px;padding:14px 16px;background:#f5f5f5;border-radius:8px;font-size:14px;line-height:1.6;color:#0a0a0a;">${escape(args.message).replace(/\n/g, '<br>')}</div>`
          : ''
      }
    </td></tr>

    <tr><td style="padding:24px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <a href="mailto:${args.email}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:-0.01em;line-height:1.3;">
        Rispondi →
      </a>
    </td></tr>

    <tr><td style="padding:32px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <div style="height:1px;background:#f0f0f0;line-height:1px;font-size:1px;">&nbsp;</div>
    </td></tr>

    <tr><td style="padding:16px 36px 32px 36px;background:#ffffff;" bgcolor="#ffffff">
      <p style="font-size:11px;color:#a3a3a3;margin:0;">Overfy · Admin notification</p>
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
