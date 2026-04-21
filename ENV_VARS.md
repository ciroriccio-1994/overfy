# OVERFY — ENV VARS (Patch 1)

Aggiungi queste su **Vercel Dashboard → Project `catalogo` → Settings → Environment Variables**.

**Target:** seleziona **Production + Preview + Development** per tutte, TRANNE dove indicato diversamente.

Dopo averle aggiunte, **ridistribuisci** (Deployments → ultimo deploy → ⋯ → Redeploy) così le variabili diventano attive.

---

## 🔷 Supabase (progetto Overfy)

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ukespvqmqrglsexcmrzt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `REDACTED_SUPABASE_PUBLISHABLE` |
| `SUPABASE_SERVICE_ROLE_KEY` | `REDACTED_SUPABASE_SECRET` |

> `SUPABASE_SERVICE_ROLE_KEY` bypassa RLS. **MAI** esporla lato client, **MAI** prefissarla con `NEXT_PUBLIC_`.

---

## 🔷 Stripe (account CoinsFarm — Test mode)

| Name | Value |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_51S8OTpEYr37k81VqC3hq0kOo0qBn299uBqkcdS9gXAam8oVWJk9wdjKH0D1VHpujWuZ7WZZg0YTRhBi88f7DKCrN00PVyhdUuM` |
| `STRIPE_SECRET_KEY` | `REDACTED_STRIPE_TEST` |
| `STRIPE_WEBHOOK_SECRET` | *(la generiamo in Patch 2 — per ora metti placeholder: `whsec_PLACEHOLDER`)* |

---

## 🔷 Stripe Price IDs

| Name | Value |
|---|---|
| `NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_MONTHLY` | `price_1TOOz0EYr37k81VqF2HSCMn8` |
| `NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_YEARLY` | `price_1TOOzaEYr37k81VqCo8EmoiU` |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_MONTHLY` | `price_1TOP03EYr37k81VqBXO0Fzy0` |
| `NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_YEARLY` | `price_1TOP0REYr37k81VqT9FXf4X3` |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY` | `price_1TOP0IEYr37k81VquD1yZkBo` |
| `NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_YEARLY` | `price_1TOP15EYr37k81Vqa2kYnNw4` |

> Sono `NEXT_PUBLIC_*` perché vanno letti lato client per passarli al checkout. Non è informazione sensibile.

---

## 🔷 App config

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://overfydigital.com` |

> In Preview/Development puoi usare `http://localhost:3000` oppure lasciare il valore prod (il middleware non se ne cura).

---

## 🔷 Resend (la metteremo in Patch 2, pronta la slot)

| Name | Value |
|---|---|
| `RESEND_API_KEY` | *(da generare su resend.com in Patch 2 — placeholder: `re_PLACEHOLDER`)* |
| `RESEND_FROM_EMAIL` | `Overfy <info@overfydigital.com>` |
| `NOTIFY_EMAIL` | `info@overfydigital.com` |

---

## ⚠️ NOTA per migrazione LIVE

Quando aprirai SRL Overfy e migrerai a Stripe LIVE, **devi cambiare**:
- `STRIPE_SECRET_KEY` → nuova chiave `sk_live_...`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → nuova chiave `pk_live_...`
- `STRIPE_WEBHOOK_SECRET` → NUOVO `whsec_...` (quello LIVE è diverso da quello test, va generato creando un webhook endpoint separato in Stripe Dashboard LIVE mode)
- Tutti e 6 i `NEXT_PUBLIC_STRIPE_PRICE_*` → nuovi price IDs creati in LIVE mode (i price test non funzionano in live e viceversa)

Su Supabase invece nessun cambio: lo stesso progetto andrà bene.

---

## ✅ Setup locale (file `.env.local`)

Se vuoi far girare l'app in locale, crea `apps/catalogo/.env.local` con le stesse variabili. Copia-incolla rapido:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ukespvqmqrglsexcmrzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=REDACTED_SUPABASE_PUBLISHABLE
SUPABASE_SERVICE_ROLE_KEY=REDACTED_SUPABASE_SECRET

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51S8OTpEYr37k81VqC3hq0kOo0qBn299uBqkcdS9gXAam8oVWJk9wdjKH0D1VHpujWuZ7WZZg0YTRhBi88f7DKCrN00PVyhdUuM
STRIPE_SECRET_KEY=REDACTED_STRIPE_TEST
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER

NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_MONTHLY=price_1TOOz0EYr37k81VqF2HSCMn8
NEXT_PUBLIC_STRIPE_PRICE_ESSENZIALE_YEARLY=price_1TOOzaEYr37k81VqCo8EmoiU
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_MONTHLY=price_1TOP03EYr37k81VqBXO0Fzy0
NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONALE_YEARLY=price_1TOP0REYr37k81VqT9FXf4X3
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_MONTHLY=price_1TOP0IEYr37k81VquD1yZkBo
NEXT_PUBLIC_STRIPE_PRICE_BUSINESS_YEARLY=price_1TOP15EYr37k81Vqa2kYnNw4

NEXT_PUBLIC_SITE_URL=http://localhost:3000

RESEND_API_KEY=re_PLACEHOLDER
RESEND_FROM_EMAIL=Overfy <info@overfydigital.com>
NOTIFY_EMAIL=info@overfydigital.com
```

Verifica che `.env.local` sia nel `.gitignore` (già è di default in Next.js, ma controlla).
