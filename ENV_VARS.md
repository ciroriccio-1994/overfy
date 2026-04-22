# ENV Variables — Overfy

Questo documento elenca tutte le variabili d'ambiente necessarie per far girare
l'app Overfy (`apps/catalogo`).

> **⚠️ ATTENZIONE**
> Non inserire mai valori reali in questo file. Usa sempre **placeholder**.
> I valori reali vanno solo in `.env.local` (locale) o nelle env vars di Vercel (produzione).

---

## Variabili necessarie

### Site
| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL base del sito (es. `https://overfydigital.com`) |

### Supabase
| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del progetto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role (solo server-side, mai esposta al client) |

### Stripe
| Variabile | Descrizione |
|---|---|
| `STRIPE_SECRET_KEY` | Secret key (TEST o LIVE) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key (client-side ok) |

### Stripe Price IDs — Piani base
| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_MONTHLY` | Price ID — Essenziale mensile |
| `NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_QUARTERLY` | Price ID — Essenziale trimestrale |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_MONTHLY` | Price ID — Professionale mensile |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_QUARTERLY` | Price ID — Professionale trimestrale |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY` | Price ID — Business mensile |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_QUARTERLY` | Price ID — Business trimestrale |

### Stripe Price IDs — Social add-on
| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_BASIC` | Price ID — Social Basic (€100/mese) |
| `NEXT_PUBLIC_STRIPE_PRICE_SOCIAL_PRO` | Price ID — Social Pro (€200/mese) |

### Email — Resend
| Variabile | Descrizione |
|---|---|
| `RESEND_API_KEY` | API key di Resend |
| `RESEND_FROM_EMAIL` | Mittente (es. `Overfy <noreply@overfydigital.com>`) |
| `NOTIFY_EMAIL` | Email interna per notifiche admin (default: info@overfydigital.com) |

---

## Come configurare in locale

1. Copia `apps/catalogo/.env.example` come `apps/catalogo/.env.local`
2. Compila con valori reali recuperati da:
   - **Supabase**: dashboard → Settings → API
   - **Stripe**: dashboard → Developers → API keys (e Products per i price_id)
   - **Resend**: dashboard → API keys

## Come configurare in produzione (Vercel)

Imposta le stesse variabili nelle env vars del progetto Vercel:
`Settings → Environment Variables`.

Per ogni variabile scegli gli ambienti (Production, Preview, Development).
