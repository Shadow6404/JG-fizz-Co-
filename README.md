# JG Fizz Co (Placeholder)

A clean Next.js starter storefront for a whimsical bath bomb brand with a Square-ready server-side checkout path.

## What is included
- Homepage with starter brand messaging
- Product grid and bundle-ready product data
- Server route that can either:
  - redirect to prebuilt Square payment links, or
  - create a Square payment link through the Square API
- Minimal styling and a lightweight structure that is easy to extend

## Run locally
1. Install dependencies:
   npm install
2. Copy environment template:
   cp .env.example .env.local
3. Add your Square credentials or payment links to `.env.local`
4. Start the dev server:
   npm run dev

## Square options
### Easiest starter path
Use prebuilt payment links in Square and paste them into `.env.local` using the provided keys.

### More custom path
Set `SQUARE_ACCESS_TOKEN` and `SQUARE_LOCATION_ID`. The `/api/checkout` route will create a payment link on demand.

## Replace product images
Update `data/products.js` with your own image URLs or local assets.

## Notes
This starter keeps business logic in small helper modules to stay maintainable and avoid spaghetti code.
