# José Noguera digital card

Route: `/jose-noguera`. Francis remains at `/`.

## Architecture

- `src/config/jose-noguera.ts`: independent identity, empty unknown personal fields, and canonical profile URL. No values are copied from Francis's configuration.
- `src/app/jose-noguera/page.tsx`: route-specific metadata and server entry point.
- `jose-card.tsx` and `page.module.css`: fixed `100dvh` phone card with hidden document/card overflow, flexible portrait area, identity, primary contact actions and compact secondary navigation. Desktop centers the same card.
- `profile-sheet.tsx` and `profile-sheet.module.css`: native modal contact and testimonial sheets. Native modal focus containment, focus restoration, Escape/X/backdrop dismissal, and body scroll locking preserve the card underneath. Testimonials support horizontal touch swipe, previous/next controls, optional context/rating, and clearly unpublished placeholders. Only long overlay content may scroll; the main card never does.
- `src/lib/card-profile.ts`: shared vCard generator and profile URL resolver.
- `src/components/card-actions.tsx`: existing QR generation, mobile utility sheet, contact download, native share, and clipboard flow, now using the supplied identity. Existing sheet styling is reused unchanged.

Francis's page, CSS, configuration, root metadata, contact URLs and fallback behavior are unchanged. His generated vCard is checked byte-for-byte against the previous output.

## URL configuration

No environment file was changed. The local `NEXT_PUBLIC_CARD_URL` currently contains a placeholder. Francis continues to use that value as before; this existing local configuration does not represent a working public card URL.

For José, the resolver selects the first usable origin from:

1. Optional `NEXT_PUBLIC_JOSE_CARD_URL` (no need to add it for this phase).
2. Existing `NEXT_PUBLIC_CARD_URL`.
3. `VERCEL_PROJECT_PRODUCTION_URL` (converted to HTTPS).
4. Existing production fallback `https://ecoverse-francis-card.vercel.app`.

The resolver discards the source path, query and fragment, and always uses `/jose-noguera`. It rejects malformed URLs, non-HTTP(S) schemes and the current placeholder. The hostname can contain “francis” because both routes share the existing application; the full URL always targets José's independent route.

José's QR, copy, share, canonical metadata and vCard use the same resolved URL. His Open Graph and Twitter metadata explicitly replace Francis's metadata and omit Francis's social preview image. The vCard filename is `jose-noguera-ecoverse.vcf`; blank telephone and email fields are omitted.

Public variables are compiled at build time. Rebuild after changing URL configuration. This implementation has not been deployed: the new public route is only expected to be available after a future deployment.

## Content to supply

Portrait, phone, WhatsApp, email, social links, biography, and authorized testimonials. These are empty in configuration and visibly marked as pending in the page. Supplying these fields renders the portrait, activates contact links, and replaces biography/testimonial placeholders. Testimonials accept quote, name, optional context, and optional numeric rating out of five. The only current external link is the shared official ECOVERSE website.

## Verification

```sh
npm run typecheck
npm run lint
npm run build
node --test tests/*.test.cjs
```

The regression suite checks legacy vCard compatibility, José's isolated identity/contact data, profile URL priority/path replacement, invalid URL fallback, actual QR encoder payload, and vCard escaping.

Typecheck, ESLint, production build, and all 10 tests pass. Rendering tests additionally verify the compact main-card content, unpublished testimonial previews, actual testimonial attribution/rating, and isolated contact-sheet data.

Viewport targets: 375×812, 390×844, 393×852, and 430×932. CSS fixes the root to the dynamic viewport, hides overflow, and allocates remaining height to the portrait with a minmax(0, 1fr) grid track. Actual browser scrollHeight/clientHeight measurements and visual/interaction checks remain unverified because no browser is connected. Do not treat CSS inspection or server-render tests as measured viewport verification.
