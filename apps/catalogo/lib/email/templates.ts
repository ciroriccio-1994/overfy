// apps/catalogo/lib/email/templates.ts
//
// Template HTML email — stile Overfy (Linear/Vercel tech moderno).
// Logo: 3 pallini CSS + wordmark "Overfy" testuale — zero dipendenze
// da immagini esterne, funziona in ogni client.

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
        ${logoHtml()}
      </td></tr>

      <tr><td style="padding:28px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        ${dividerHtml()}
      </td></tr>

      <tr><td style="padding:32px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <p style="font-family:'SF Mono','Monaco','Menlo','Cascadia Mono',Consolas,monospace;font-size:11px;color:#a3a3a3;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;">
          ABBONAMENTO ATTIVO
        </p>
      </td></tr>

      <tr><td style="padding:10px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
          Benvenuto, ${escape(display)}.
        </h1>
      </td></tr>

      <tr><td style="padding:16px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
          Il tuo piano <strong style="color:#0a0a0a;font-weight:600;">${escape(args.planName)}</strong> è attivo. Il tuo business sarà online in 48 ore — ti scriviamo a breve per raccogliere i materiali.
        </p>
      </td></tr>

      <tr><td style="padding:28px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
        <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:-0.01em;line-height:1.3;">
          Vai alla dashboard →
        </a>
      </td></tr>

      ${footerHtml()}

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ================================================================= */
/* REFERRAL — il tuo amico si è abbonato (primo pagamento)           */
/* Inviata quando il referred paga per la prima volta.               */
/* ================================================================= */

export function referralFirstPaymentEmailHtml(args: {
  referrerName: string | null;
  referredName: string | null;
  consolidationDate: string;
  dashboardUrl: string;
}): string {
  const display = args.referrerName?.split(' ')[0] || 'ciao';
  const friend = args.referredName?.split(' ')[0] || 'Il tuo amico';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Il tuo amico si è abbonato</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;" bgcolor="#ffffff">

    <tr><td style="padding:36px 40px 0 40px;">${logoHtml()}</td></tr>
    <tr><td style="padding:28px 40px 0 40px;">${dividerHtml()}</td></tr>

    <tr><td style="padding:32px 40px 0 40px;">
      <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#00a173;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
        REFERRAL IN CORSO
      </p>
    </td></tr>

    <tr><td style="padding:10px 40px 0 40px;">
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
        ${escape(friend)} si è abbonato, ${escape(display)}.
      </h1>
    </td></tr>

    <tr><td style="padding:16px 40px 0 40px;">
      <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
        Ha appena attivato un piano Overfy usando il tuo codice. Il tuo sconto del
        <strong style="color:#0a0a0a;">50%</strong> si attiverà il
        <strong style="color:#0a0a0a;">${escape(args.consolidationDate)}</strong>
        e verrà applicato automaticamente al tuo prossimo rinnovo.
      </p>
    </td></tr>

    <tr><td style="padding:20px 40px 0 40px;">
      <div style="background:#f5f5f5;border-radius:10px;padding:16px 18px;">
        <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#737373;margin:0 0 6px 0;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">
          PERCHÉ 30 GIORNI?
        </p>
        <p style="font-size:13px;line-height:1.6;color:#525252;margin:0;">
          Aspettiamo che scada il periodo di rimborso del tuo amico prima di sbloccare lo sconto. Se tutto procede liscio, è automatico.
        </p>
      </div>
    </td></tr>

    <tr><td style="padding:28px 40px 0 40px;">
      <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;line-height:1.3;">
        Vedi il tuo programma referral →
      </a>
    </td></tr>

    ${footerHtml()}

  </table>
</td></tr></table>
</body></html>`;
}

/* ================================================================= */
/* REFERRAL — sconto sbloccato (dopo 30gg)                            */
/* Inviata quando il credito passa a 'applied' (coupon creato su sub).*/
/* ================================================================= */

export function referralUnlockedEmailHtml(args: {
  referrerName: string | null;
  referredName: string | null;
  dashboardUrl: string;
}): string {
  const display = args.referrerName?.split(' ')[0] || 'ciao';
  const friend = args.referredName?.split(' ')[0] || 'il tuo amico';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Sconto 50% sbloccato</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:1px solid #00c896;border-radius:12px;" bgcolor="#ffffff">

    <tr><td style="padding:36px 40px 0 40px;">${logoHtml()}</td></tr>
    <tr><td style="padding:28px 40px 0 40px;">${dividerHtml()}</td></tr>

    <tr><td style="padding:32px 40px 0 40px;">
      <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#00a173;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
        ✓ SCONTO SBLOCCATO
      </p>
    </td></tr>

    <tr><td style="padding:10px 40px 0 40px;">
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
        Il tuo 50% è pronto, ${escape(display)}.
      </h1>
    </td></tr>

    <tr><td style="padding:16px 40px 0 40px;">
      <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
        Il pagamento di ${escape(friend)} è confermato. Abbiamo applicato uno
        <strong style="color:#0a0a0a;">sconto del 50%</strong> al tuo prossimo rinnovo Overfy — non devi fare nulla, lo vedrai direttamente sulla prossima fattura.
      </p>
    </td></tr>

    <tr><td style="padding:28px 40px 0 40px;">
      <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;line-height:1.3;">
        Invita altri amici →
      </a>
    </td></tr>

    ${footerHtml()}

  </table>
</td></tr></table>
</body></html>`;
}

/* ================================================================= */
/* REFERRAL — sconto applicato sulla fattura                         */
/* Inviata al consumed (rinnovo con coupon andato a buon fine)        */
/* ================================================================= */

export function referralAppliedEmailHtml(args: {
  referrerName: string | null;
  amountSaved: string;
  dashboardUrl: string;
}): string {
  const display = args.referrerName?.split(' ')[0] || 'ciao';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light only">
<title>Sconto applicato — Overfy</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;" bgcolor="#ffffff">
    <tr><td style="padding:36px 40px 0 40px;">${logoHtml()}</td></tr>
    <tr><td style="padding:28px 40px 0 40px;">${dividerHtml()}</td></tr>
    <tr><td style="padding:32px 40px 0 40px;">
      <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#00a173;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
        RINNOVO SCONTATO
      </p>
    </td></tr>
    <tr><td style="padding:10px 40px 0 40px;">
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
        Hai risparmiato ${escape(args.amountSaved)}, ${escape(display)}.
      </h1>
    </td></tr>
    <tr><td style="padding:16px 40px 0 40px;">
      <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
        Lo sconto referral del 50% è stato applicato al tuo rinnovo di oggi. Ogni amico che porti = un altro rinnovo al 50%.
      </p>
    </td></tr>
    <tr><td style="padding:28px 40px 0 40px;">
      <a href="${args.dashboardUrl}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;line-height:1.3;">
        Invita altri amici →
      </a>
    </td></tr>
    ${footerHtml()}
  </table>
</td></tr></table>
</body></html>`;
}

/* ================================================================= */
/* AGENT — onboarding (Ciro crea un agent)                           */
/* ================================================================= */

export function agentOnboardingEmailHtml(args: {
  agentFullName: string;
  agentCode: string;
  signupLink: string;       // overfydigital.com/registrati?agent=CODE
  dashboardLink: string;    // overfydigital.com/agent/view/{token}
}): string {
  const display = args.agentFullName.split(' ')[0];

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light only">
<title>Benvenuto nel programma Agent — Overfy</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="560" style="max-width:560px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;" bgcolor="#ffffff">

    <tr><td style="padding:36px 40px 0 40px;">${logoHtml()}</td></tr>
    <tr><td style="padding:28px 40px 0 40px;">${dividerHtml()}</td></tr>

    <tr><td style="padding:32px 40px 0 40px;">
      <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#0066cc;margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
        PROGRAMMA AGENT
      </p>
    </td></tr>

    <tr><td style="padding:10px 40px 0 40px;">
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:28px;line-height:1.15;font-weight:600;color:#0a0a0a;margin:0;letter-spacing:-0.025em;">
        Benvenuto, ${escape(display)}.
      </h1>
    </td></tr>

    <tr><td style="padding:16px 40px 0 40px;">
      <p style="font-size:15px;line-height:1.65;color:#525252;margin:0;">
        Sei ufficialmente agent Overfy. Ecco il tuo codice personale e i tuoi link operativi.
      </p>
    </td></tr>

    <tr><td style="padding:24px 40px 0 40px;">
      <div style="background:#f5f5f5;border-radius:10px;padding:18px 20px;">
        <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#737373;margin:0 0 6px 0;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">
          IL TUO CODICE
        </p>
        <p style="font-family:'SF Mono','Monaco',monospace;font-size:18px;color:#0a0a0a;margin:0;font-weight:600;letter-spacing:0.02em;">
          ${escape(args.agentCode)}
        </p>
      </div>
    </td></tr>

    <tr><td style="padding:20px 40px 0 40px;">
      <p style="font-family:'SF Mono','Monaco',monospace;font-size:11px;color:#737373;margin:0 0 8px 0;letter-spacing:0.06em;text-transform:uppercase;font-weight:500;">
        LINK DA CONDIVIDERE CON I CLIENTI
      </p>
      <p style="font-size:13px;line-height:1.5;color:#0a0a0a;margin:0;word-break:break-all;background:#fafafa;border:1px solid #e5e5e5;border-radius:8px;padding:12px 14px;">
        ${escape(args.signupLink)}
      </p>
    </td></tr>

    <tr><td style="padding:20px 40px 0 40px;">
      <p style="font-size:14px;line-height:1.65;color:#525252;margin:0;">
        Quando un cliente si registra da quel link e completa il primo pagamento, generi una commissione. Dopo 30 giorni (scaduto il diritto di rimborso), ricevi il bonifico.
      </p>
    </td></tr>

    <tr><td style="padding:28px 40px 0 40px;">
      <a href="${args.dashboardLink}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;line-height:1.3;">
        Apri la tua dashboard →
      </a>
    </td></tr>

    <tr><td style="padding:16px 40px 0 40px;">
      <p style="font-size:12px;color:#a3a3a3;margin:0;line-height:1.5;">
        Salva il link della dashboard: è il tuo unico accesso alle statistiche. Non condividerlo.
      </p>
    </td></tr>

    ${footerHtml()}

  </table>
</td></tr></table>
</body></html>`;
}

/* ================================================================= */
/* LEAD NOTIFY (admin)                                                */
/* Se requestCallback=true → email diventa urgente (bordo rosso,      */
/* eyebrow rosso "CALLBACK RICHIESTO", bottone tel: primary)          */
/* ================================================================= */

export function leadNotifyEmailHtml(args: {
  fullName: string | null;
  email: string;
  companyName: string | null;
  phone: string | null;
  message: string | null;
  source: string | null;
  interestTier: string | null;
  requestCallback?: boolean;
  preferredTimeLabel?: string | null;
}): string {
  const isCallback = !!args.requestCallback;
  const telHref = args.phone ? `tel:${args.phone.replace(/\s+/g, '')}` : null;

  const row = (label: string, value: string | null, highlight = false) =>
    value
      ? `<tr>
          <td style="padding:10px 0;color:#a3a3a3;font-size:12px;width:110px;vertical-align:top;font-family:'SF Mono','Monaco',monospace;letter-spacing:0.04em;text-transform:uppercase;">${label}</td>
          <td style="padding:10px 0;color:${highlight ? '#dc2626' : '#0a0a0a'};font-size:14px;line-height:1.5;font-weight:${highlight ? '600' : '400'};">${escape(value)}</td>
        </tr>`
      : '';

  const accentColor = isCallback ? '#dc2626' : '#a3a3a3';
  const borderColor = isCallback ? '#fca5a5' : '#e5e5e5';
  const eyebrowText = isCallback ? '🔥 CALLBACK RICHIESTO' : 'NUOVO LEAD';
  const titleText = args.fullName || args.email;

  const primaryButton = isCallback && telHref
    ? `<a href="${telHref}" style="display:inline-block;background:#dc2626;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:-0.01em;line-height:1.3;margin-right:8px;">
        📞 Chiama ${escape(args.phone!)} →
      </a>
      <a href="mailto:${args.email}" style="display:inline-block;background:transparent;color:#525252;padding:10px 18px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;line-height:1.3;border:1px solid #e5e5e5;">
        Email
      </a>`
    : `<a href="mailto:${args.email}" style="display:inline-block;background:#0a0a0a;color:#ffffff;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:-0.01em;line-height:1.3;">
        Rispondi →
      </a>`;

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${isCallback ? 'Callback richiesto' : 'Nuovo lead'} — Overfy</title>
</head>
<body style="margin:0;padding:0;background:#fafafa;font-family:'Inter','SF Pro Text',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
<table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fafafa" style="background:#fafafa;padding:56px 20px;"><tr><td align="center">
  <table cellpadding="0" cellspacing="0" width="520" style="max-width:520px;background:#ffffff;border:${isCallback ? '2px' : '1px'} solid ${borderColor};border-radius:12px;" bgcolor="#ffffff">

    ${isCallback ? `
    <tr><td style="padding:0;background:#dc2626;border-radius:10px 10px 0 0;" bgcolor="#dc2626">
      <p style="margin:0;padding:10px 36px;color:#ffffff;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-family:'SF Mono','Monaco',monospace;">
        CHIAMARE${args.preferredTimeLabel ? ` · ${escape(args.preferredTimeLabel).toUpperCase()}` : ''}
      </p>
    </td></tr>
    ` : ''}

    <tr><td style="padding:32px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      ${logoHtml()}
    </td></tr>

    <tr><td style="padding:24px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      ${dividerHtml()}
    </td></tr>

    <tr><td style="padding:28px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <p style="font-family:'SF Mono','Monaco','Menlo',monospace;font-size:11px;color:${accentColor};margin:0;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">
        ${eyebrowText}
      </p>
      <h1 style="font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:22px;line-height:1.2;font-weight:600;color:#0a0a0a;margin:8px 0 0 0;letter-spacing:-0.02em;">
        ${escape(titleText)}
      </h1>
    </td></tr>

    <tr><td style="padding:20px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      <table cellpadding="0" cellspacing="0" width="100%">
        ${row('Email', args.email)}
        ${isCallback ? row('Telefono', args.phone, true) : row('Telefono', args.phone)}
        ${row('Azienda', args.companyName)}
        ${isCallback && args.preferredTimeLabel ? row('Quando', args.preferredTimeLabel, true) : ''}
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
      ${primaryButton}
    </td></tr>

    <tr><td style="padding:32px 36px 0 36px;background:#ffffff;" bgcolor="#ffffff">
      ${dividerHtml()}
    </td></tr>

    <tr><td style="padding:16px 36px 32px 36px;background:#ffffff;" bgcolor="#ffffff">
      <p style="font-size:11px;color:#a3a3a3;margin:0;">Overfy · Admin notification</p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;
}

/* ================================================================= */
/* SHARED HTML PIECES                                                */
/* ================================================================= */

function logoHtml(): string {
  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      <td style="padding:0;vertical-align:middle;line-height:0;font-size:0;">
        <span style="display:inline-block;width:13px;height:13px;background:#ff4d4d;border-radius:50%;"></span><span style="display:inline-block;width:13px;height:13px;background:#00c896;border-radius:50%;margin-left:-4px;"></span><span style="display:inline-block;width:13px;height:13px;background:#3ba3ff;border-radius:50%;margin-left:-4px;"></span>
      </td>
      <td style="padding:0 0 0 12px;vertical-align:middle;font-family:'Inter','SF Pro Text',-apple-system,sans-serif;font-size:18px;font-weight:600;color:#0a0a0a;letter-spacing:-0.02em;line-height:1;">
        Overfy
      </td>
    </tr>
  </table>`;
}

function dividerHtml(): string {
  return `<div style="height:1px;background:#f0f0f0;line-height:1px;font-size:1px;">&nbsp;</div>`;
}

function footerHtml(): string {
  return `
    <tr><td style="padding:36px 40px 0 40px;background:#ffffff;" bgcolor="#ffffff">
      ${dividerHtml()}
    </td></tr>
    <tr><td style="padding:20px 40px 36px 40px;background:#ffffff;" bgcolor="#ffffff">
      <p style="font-size:12px;color:#a3a3a3;margin:0;line-height:1.7;">
        Overfy · Napoli, Italia<br>
        <a href="https://overfydigital.com" style="color:#a3a3a3;text-decoration:none;">overfydigital.com</a> &nbsp;·&nbsp; <a href="mailto:info@overfydigital.com" style="color:#a3a3a3;text-decoration:none;">info@overfydigital.com</a>
      </p>
    </td></tr>`;
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
