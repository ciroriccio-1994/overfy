# OVERFY · BRAND LOGO REFRESH

Sostituisce il vecchio logo SVG (3 pallini piccoli + freccia) col nuovo logo brand (PNG) ovunque nel prodotto: navbar, footer, email transazionali.

## File nel pacchetto

```
apps/catalogo/public/
  logo-overfy-brand.png         ← logo trasparente (usato da web/email)
  icon-overfy-brand.png         ← solo icona 512x512 (usabile per favicon/Stripe icon)
  logo-overfy-brand-white.png   ← logo con sfondo bianco (fallback Outlook)

apps/catalogo/app/components/
  NavbarClient.tsx              ← sostituisce SVG con <Image src="/logo-overfy-brand.png">
  Footer.tsx                    ← stesso, col logo più grande

apps/catalogo/lib/email/
  templates.ts                  ← email welcome + lead notify ora caricano il PNG
                                  da https://overfydigital.com/logo-overfy-brand.png
```

## Deploy

```powershell
cd "C:\Users\Ciro Riccio\demo-day"
Expand-Archive "$env:USERPROFILE\Downloads\overfy-brand-logo.zip" -DestinationPath "$env:TEMP\brand-logo" -Force
Copy-Item -Path "$env:TEMP\brand-logo\*" -Destination . -Recurse -Force
Remove-Item "$env:TEMP\brand-logo" -Recurse -Force
cd apps\catalogo
vercel --prod
```

## Upload su Stripe (parallelo, manuale)

Dal tuo computer prendi questi 2 file dal progetto locale e caricali su Stripe Dashboard → Impostazioni → Branding:

- **Logo**: `apps\catalogo\public\logo-overfy-brand.png`
- **Icona**: `apps\catalogo\public\icon-overfy-brand.png`

Poi imposta:
- Colore brand: `#00C896` (verde mint)
- Colore in contrasto: `#0a0a0a` (nero ink)

Salva. Al prossimo checkout vedrai il logo Overfy al posto del placeholder Coins Farm.

## Verifiche post-deploy

- Homepage `overfydigital.com`: nuovo logo in navbar in alto a sinistra, stesso in footer
- `/dashboard`: stessa navbar (logo appare anche qui)
- Nuova registrazione + checkout test: email "Benvenuto" ha il logo PNG in alto

## Note tecniche

- Il nuovo logo viene cacheato da Vercel/CDN. Se non lo vedi dopo il deploy, fai hard reload (`Ctrl+Shift+R`).
- L'email carica il logo via URL pubblico, quindi funziona solo **dopo il deploy** (prima il file non esiste a quell'URL). Se mandi email di test subito prima del deploy, vedrai un placeholder rotto. Dopo il deploy OK.
- Outlook desktop con immagini esterne bloccate mostrerà alt text "Overfy". Se vuoi garantire anche quel caso specifico, si può allegare il logo all'email (CID attachment via Resend) — non incluso in questa patch.
