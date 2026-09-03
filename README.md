# ECOVERSE Card

A standalone, mobile-first digital business card for Frans Lucena's work with ECOVERSE.

## Configure

All profile and contact details live in `src/config/contact.ts`. Unknown phone, WhatsApp, and email details are intentionally left empty and appear as pending in the interface.

To configure the URL encoded in the QR code, copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_CARD_URL=https://your-final-production-url
```

When the value is blank, the QR uses the current browser URL, which is useful during local development.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm run typecheck
npm run lint
npm run build
```
