# OVERFY · LOGO FIX v2

Risolve:
1. Logo sfocato in email (era JPEG compresso → ora PNG vettoriale pulito 1600px)
2. Logo in navbar/footer ora è SVG inline → sempre nitido a qualsiasi zoom
3. Dark mode email — background del box forzato bianco con media query + attributi `bgcolor`, il testo del logo resta sempre leggibile

## File nel pacchetto

```
apps/catalogo/public/
  logo-overfy-brand.svg            ← SVG vettoriale (nuovo, per web)
  logo-overfy-brand.png            ← PNG 1600px alta risoluzione (per email)
  logo-overfy-brand-white.png      ← variante con sfondo bianco (fallback)
  icon-overfy-brand.png            ← 512x512 solo pallini (per Stripe icon/favicon)

apps/catalogo/app/components/
  NavbarClient.tsx                 ← SVG inline con currentColor, sempre nitido
  Footer.tsx                       ← usa OverfyLogoInline esportato da NavbarClient

apps/catalogo/lib/email/
  templates.ts                     ← punta al nuovo PNG + dark mode hardening
```

## Deploy

```powershell
cd "C:\Users\Ciro Riccio\demo-day"
Expand-Archive "$env:USERPROFILE\Downloads\overfy-logo-fix.zip" -DestinationPath "$env:TEMP\logo-fix" -Force
Copy-Item -Path "$env:TEMP\logo-fix\*" -Destination . -Recurse -Force
Remove-Item "$env:TEMP\logo-fix" -Recurse -Force
cd apps\catalogo
vercel --prod
```

## Ricarica logo su Stripe

Se il logo caricato prima su Stripe era la versione sfocata dal JPEG, ricaricalo con questo nuovo file nitido:

Stripe Dashboard → Impostazioni → Branding → **Logo** → click → upload
`C:\Users\Ciro Riccio\demo-day\apps\catalogo\public\logo-overfy-brand.png`

**Icona** → upload
`C:\Users\Ciro Riccio\demo-day\apps\catalogo\public\icon-overfy-brand.png`

Save.

## Verifiche dopo deploy

1. Apri `https://overfydigital.com/logo-overfy-brand.png` → il nuovo PNG nitido deve caricare
2. `https://overfydigital.com` (hard reload Ctrl+Shift+R) → logo in navbar e footer sostanzialmente identico ma nitido a qualsiasi zoom (è SVG, scala infinito)
3. Nuova registrazione + checkout test o live → email "Benvenuto" con il logo **nitido** (non più sfocato) e box sempre bianco anche in dark mode mobile
