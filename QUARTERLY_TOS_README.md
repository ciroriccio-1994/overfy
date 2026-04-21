# OVERFY · Trimestrali + Protezione TOS

Pacchetto che:
1. Integra i **3 piani trimestrali** (Essenziale/Pro/Business) — già creati su Stripe e con env var configurate
2. Aggiunge **protezione legale** tramite Termini di servizio + checkbox rinuncia recesso + pagina rimborsi

## File nel pacchetto

```
apps/catalogo/
  types/database.ts                                 ← BillingInterval: 'month' | 'quarter' | 'year'
  lib/plans.ts                                      ← aggiunge quarterly + INTERVAL_MONTHS helper
  app/components/Pricing.tsx                        ← toggle a 3 stati + copy aggiornata
  app/api/stripe/checkout/route.ts                  ← accetta 'quarter' + consent terms_of_service
  app/admin/page.tsx                                ← MRR corretto per trimestrali
  app/registrati/RegistratiForm.tsx                 ← 2 checkbox separati (termini + rinuncia)
  app/termini/page.tsx                              ← NUOVA pagina /termini
  app/rimborsi/page.tsx                             ← NUOVA pagina /rimborsi
```

## Pre-requisiti — già fatti

- ✅ 3 prezzi trimestrali creati su Stripe LIVE (Essenziale €134,99 / Pro €350,99 / Business €674,99)
- ✅ 3 env var `NEXT_PUBLIC_STRIPE_PRICE_*_QUARTERLY` su Vercel Production

## Deploy

```powershell
cd "C:\Users\Ciro Riccio\demo-day"
Expand-Archive "$env:USERPROFILE\Downloads\overfy-quarterly-tos.zip" -DestinationPath "$env:TEMP\quarter-tos" -Force
Copy-Item -Path "$env:TEMP\quarter-tos\*" -Destination . -Recurse -Force
Remove-Item "$env:TEMP\quarter-tos" -Recurse -Force
cd apps\catalogo
npx next build 2>&1 | Select-String -Pattern "error|Error" | Select-Object -First 10 -ExpandProperty Line
```

Se pulito:

```powershell
vercel --prod
cd ..\..
git add .
git commit -m "feat(overfy): quarterly plans + legal TOS + recess waiver"
git push
```

## Test post-deploy

### A — Trimestrali attivi
1. Incognito → `https://overfydigital.com/#pacchetti`
2. Nel toggle devi vedere **3 bottoni**: Mensile / Trimestrale (-10%) / Annuale (2 mesi gratis)
3. Click **Trimestrale** → i prezzi delle card cambiano:
   - Essenziale: €44,99/mese (fatturati ogni 3 mesi, €134,99/trim)
   - Professionale: €117,00/mese (€350,99/trim)
   - Business: €225,00/mese (€674,99/trim)
4. Click "Scegli Professionale" → se non loggato, redirect `/registrati?plan=professionale&interval=quarter`
5. (Se vuoi test full) Loggato → checkout Stripe si apre con abbonamento trimestrale €350,99

### B — Pagine legali
1. Footer homepage → link **Termini** → carica `/termini` con il documento completo
2. Footer → **Rimborsi** → carica `/rimborsi` con le 4 situazioni di rimborso chiaramente esposte
3. Entrambe le pagine si aprono nuove tab da `/registrati` (target="_blank")

### C — Checkout consent (protezione legale)
1. Fai un checkout test (una sub a €49,99 mensile con la tua carta vera o card test)
2. Nella pagina di Stripe Checkout, **sopra il bottone "Paga"**, devi vedere un checkbox con questo testo:
   > *"Accettando i [Termini di servizio] chiedo l'avvio immediato del servizio di digitalizzazione e riconosco, ai sensi dell'art. 59 lett. o) del Codice del Consumo, di perdere il diritto di recesso..."*
3. Il checkbox è **obbligatorio** — Stripe non permette di pagare senza flag
4. Questo consent è salvato su Stripe e riappare nel dettaglio del pagamento (protezione documentata)

### D — Checkbox registrati
1. Vai su `/registrati`
2. Sotto la password vedi **2 checkbox separati**:
   - Accetto Termini + Privacy (link funzionanti)
   - Chiedo avvio immediato + rinuncia recesso (link `/rimborsi`)
3. Entrambi obbligatori — se manca uno, errore inline chiaro

### E — Admin MRR aggiornato
1. Se hai già sub trimestrali, vai su `/admin`
2. KPI MRR include il contributo trimestrale normalizzato a mensile (importo/3)

## Cosa cambia rispetto a prima

**Economicamente**:
- 3 nuovi slot di pricing attivi (trimestrali) → più opzioni commitment per i clienti
- Prezzi trimestrali calcolati con sconto 10% rispetto a mensile × 3
- MRR admin ora conta correttamente i trimestrali

**Legalmente**:
- Clausola esplicita di rinuncia al recesso (art. 59 lett. o) Cod. Cons.)
- Doppio consent: al signup + al checkout Stripe
- Pagine `/termini` e `/rimborsi` accessibili da header/footer/form
- Protezione contro richieste di rimborso post-erogazione

**NON incluso in questa patch** (prossime sessioni):
- Sistema Referral "Invita un amico" (coupon Stripe automatico)
- Programma Agent con dashboard dedicata
- Privacy policy completa (pagina `/privacy` non esiste ancora — aggiungere)
- Cookie banner
