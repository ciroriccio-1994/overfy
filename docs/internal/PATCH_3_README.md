# OVERFY · PATCH 3 — Dashboard + Admin

Tutto consegnato in un solo ZIP. Si sovrappone alla root del monorepo `demo-day`
senza toccare file esistenti (eccetto due che vengono sovrascritti
intenzionalmente: `middleware.ts`, `lib/supabase/middleware.ts`,
`app/components/Navbar.tsx`).

## File in questa patch

```
SUPABASE_PATCH_3.sql                                    ← da eseguire in Supabase
docs/supabase-email-templates/
  confirm_signup.html
  magic_link.html
  recovery.html
apps/catalogo/
  middleware.ts                                          (OVERWRITE — comment-only)
  lib/
    auth-helpers.ts                                      (NEW)
    supabase/middleware.ts                               (OVERWRITE — protegge /admin)
  app/
    components/
      Navbar.tsx                                         (OVERWRITE — server async)
      NavbarClient.tsx                                   (NEW)
    dashboard/
      page.tsx                                           (NEW)
      DashboardClient.tsx                                (NEW)
    admin/
      page.tsx                                           (NEW)
      AdminClient.tsx                                    (NEW)
    api/
      auth/logout/route.ts                               (NEW)
      dashboard/profile/route.ts                         (NEW)
      stripe/portal/route.ts                             (NEW)
      admin/leads/route.ts                               (NEW)
```

## Ordine di deploy

### 1. Espandi lo ZIP sopra la root demo-day

```powershell
cd "C:\Users\Ciro Riccio\demo-day"
Expand-Archive "$env:USERPROFILE\Downloads\overfy-patch3.zip" -DestinationPath "$env:TEMP\overfy-patch3" -Force
Copy-Item -Path "$env:TEMP\overfy-patch3\*" -Destination . -Recurse -Force
Remove-Item "$env:TEMP\overfy-patch3" -Recurse -Force
```

### 2. Esegui la SQL su Supabase

Apri Supabase Dashboard → progetto `ukespvqmqrglsexcmrzt` → SQL Editor → incolla
l'intero `SUPABASE_PATCH_3.sql` → Run.

Non rompe nulla se la rilanci. Aggiunge:
- colonna `profiles.is_admin boolean default false`
- function `public.is_admin(uuid)` in security definer (serve per evitare
  ricorsione nelle policy RLS di `profiles`)
- policy admin read-all su `profiles`, `subscriptions`, `leads`
- policy admin update su `leads`
- grants mancanti

### 3. Build + deploy

```powershell
cd apps\catalogo
npx next build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 20 -ExpandProperty Line
```

Se pulito:

```powershell
vercel --prod
cd ..\..
git add .
git commit -m "feat(overfy): patch 3 - dashboard + admin + portal stripe"
git push
```

### 4. Promuovi te stesso admin

Registrati (se non l'hai ancora fatto in prod), poi in Supabase SQL Editor:

```sql
update public.profiles set is_admin = true where email = 'TUA_EMAIL@esempio.it';
update public.profiles set is_admin = true where email = 'SOCIO@esempio.it';
select email, is_admin from public.profiles where is_admin = true;
```

Da questo momento, su `/dashboard` vedrai il bottone "Area Admin" e nella
Navbar apparirà la voce "Admin" nel menu utente.

### 5. Incolla i template email in Supabase

Dashboard → Auth → Email Templates:

- **Confirm signup** → incolla `docs/supabase-email-templates/confirm_signup.html`
  Subject: `Conferma il tuo account Overfy`
- **Magic Link** → incolla `docs/supabase-email-templates/magic_link.html`
  Subject: `Il tuo link di accesso a Overfy`
- **Reset Password** → incolla `docs/supabase-email-templates/recovery.html`
  Subject: `Reimposta la password del tuo account Overfy`

### 6. Configura il Customer Portal di Stripe (se non l'hai già fatto)

Stripe Dashboard (TEST mode) → Settings → Billing → Customer portal → apri
e clicca `Save` almeno una volta. Senza questo step, il bottone "Gestisci
abbonamento" restituirà un errore Stripe parlante.

Nei settings consigliati:
- Payment methods: attivo
- Invoice history: attivo
- Customer update: nome, email, billing address, tax ID
- Subscriptions: cancel + switch plan (metti in coda i 6 price ID Essenziale/Professionale/Business × mensile/annuale)
- Business information: nome → Overfy, privacy → `https://overfydigital.com/privacy`, terms → `https://overfydigital.com/termini`

## Cosa testare in produzione

1. `/dashboard` senza login → redirect a `/login?next=%2Fdashboard` ✓
2. `/dashboard` loggato senza sub → "Non hai ancora un abbonamento" + CTA /#pacchetti ✓
3. `/dashboard` loggato con sub attiva → piano + scadenza + bottone Portale ✓
4. Bottone "Gestisci abbonamento" → redirect Stripe Portal ✓
5. Tab "Profilo" → edit → PATCH /api/dashboard/profile → pill verde "Profilo aggiornato" ✓
6. `/admin` senza `is_admin=true` → redirect a `/` (homepage) ✓
7. `/admin` con `is_admin=true` → KPI + 3 tabelle ✓
8. Dropdown status su un lead → PATCH /api/admin/leads → riga aggiornata in place ✓
9. Menu utente in navbar → "Esci" → POST /api/auth/logout → redirect / ✓

## Cosa NON è in questa patch (esplicito)

- Referral (Patch 4) — nella sezione "Invita un amico" c'è solo un placeholder.
- Rotazione chiavi Stripe webhook e Resend (fine progetto).
- Migrazione a Stripe LIVE (fine progetto).
- Template email `ai_monthly_usage` e altri webhook non-auth (non applicabile).
