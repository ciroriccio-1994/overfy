# OVERFY · Animazioni auth + "Chiamami Adesso"

Due feature in un pacchetto:

1. **Animazioni fluide ed eleganti** su `/registrati`, `/login`, `/contatti`
   - Stagger fade-in dei campi (easing cubic-bezier 0.22, 1, 0.36, 1 — easeOutQuart, stile Linear/Vercel)
   - Micro-interazioni su focus: border nero + ring mint soft
   - Bottoni con lift leggero on hover (-1px + shadow)
   - Rispetta `prefers-reduced-motion`

2. **"Chiamami Adesso"** sul form contatti
   - Toggle "Email" vs "Chiamami" in cima al form
   - Se "Chiamami": telefono obbligatorio + radio buttons "Quando?" (4 opzioni)
   - Flag `request_callback` + `preferred_time` salvati in DB lead
   - Email admin cambia: subject "🔥 CALLBACK · Nome — Orario", card rossa, bottone `tel:` primary

## File nel pacchetto

```
SUPABASE_LEADS_CALLBACK.sql                         ← da eseguire PRIMA del deploy

apps/catalogo/app/registrati/
  page.tsx                                          (animazioni heading)
  RegistratiForm.tsx                                (animazioni campi + fix email duplicata)

apps/catalogo/app/login/
  page.tsx                                          (animazioni heading)
  LoginForm.tsx                                     (animazioni + prefill ?email= da query)

apps/catalogo/app/contatti/
  page.tsx                                          (animazioni heading + nuovo copy)
  ContattiForm.tsx                                  (toggle Email/Callback + radio orari)

apps/catalogo/app/api/leads/
  route.ts                                          (supporto request_callback + preferred_time)

apps/catalogo/lib/email/
  templates.ts                                      (leadNotifyEmailHtml con versione URGENTE)
```

## Deploy — IMPORTANTE l'ordine

### 1. Esegui la SQL su Supabase PRIMA

Apri: https://supabase.com/dashboard/project/ukespvqmqrglsexcmrzt/sql/new

Incolla `SUPABASE_LEADS_CALLBACK.sql` → Run.

Se non fai questo step, il nuovo route.ts tenta di inserire campi che non esistono → i form contatti vanno in errore.

### 2. Deploy del codice

```powershell
cd "C:\Users\Ciro Riccio\demo-day"
Expand-Archive "$env:USERPROFILE\Downloads\overfy-anim-callback.zip" -DestinationPath "$env:TEMP\anim-cb" -Force
Copy-Item -Path "$env:TEMP\anim-cb\*" -Destination . -Recurse -Force
Remove-Item "$env:TEMP\anim-cb" -Recurse -Force
cd apps\catalogo
npx next build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 10 -ExpandProperty Line
```

Se pulito:

```powershell
vercel --prod
cd ..\..
git add .
git commit -m "feat(overfy): auth animations + callback option on contact form"
git push
```

## Test post-deploy

1. **Animazioni** — apri `/registrati` e `/login` in incognito hard-reload (`Ctrl+Shift+R`):
   - Heading fade-in dal basso
   - Card appare subito dopo
   - Ogni campo del form scivola in sequenza
   - Focus su un campo → border nero + alone mint
   - Hover sul bottone → leva leggera + ombra

2. **Chiamami Adesso** — vai su `/contatti`:
   - In cima ci sono 2 card cliccabili "Via email" / "Chiamami"
   - Default = Email
   - Clicca **Chiamami** → la card diventa mint, il campo telefono si colora di verde e diventa obbligatorio, appare sotto "Quando ti chiamiamo?" con 4 radio
   - Seleziona "Oggi, entro 2 ore"
   - Compila nome/email/messaggio/telefono → **Richiedi chiamata**
   - Controlla che arrivi nella tua casella admin con subject `🔥 CALLBACK · ...` e card rossa
   - In Supabase → Table editor → `leads` → riga con `request_callback=true`, `preferred_time='today_2h'`

## Note tecniche

- Le animazioni usano CSS keyframes iniettati inline nel componente (nessuna dipendenza esterna aggiunta, zero impatto su bundle size)
- `prefers-reduced-motion: reduce` rispettato → utenti con accessibilità attiva non vedono animazioni
- Il bottone submit cambia colore e testo quando attivi "Chiamami": mint + "Richiedi chiamata →"
- Il toggle usa `<button type="button">` → non triggera submit per errore
