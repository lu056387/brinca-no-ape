# Little Room Adventures — international funnel

The English sales page lives under `/en/`. The Brazilian page, product and campaign are separate.

## Current offer

The Small-Space Play Kit: 36 unique activities for ages 4–8 with a grown-up, in a 44-page main guide, plus six supporting PDF resources. US Letter and A4 contain the same material. Extras reuse or support the 36 activities. Advertised price: USD 9.90, one-time. Final currency, amount, taxes and terms must be checked at the provider.

International checkout: https://pay.kiwify.com/9MM7u2F?region=intl . The Brazilian checkout is never a fallback. Paid files are not stored in this public repository; only a free sample and previews are public.

The page follows the root shadow/light presentation and provides automatic, light and dark appearance. All four promotional CTAs scroll to `#get-kit`; only the offer's native checkout anchor opens payment. The child footage stays in its original frame, muted, with pause, reduced-motion and data-saving support.

## Measurement

Meta pixel: 1792904275365443; international product ID: little-room-adventures-en-v1. Consent storage: lra_marketing_consent_v1, independent of the Portuguese funnel. PageView and ViewContent only after consent. OfferNavigationClick, OfferViewed, ScrollDepth and CheckoutButtonClick are custom events. No landing-page InitiateCheckout or Purchase. Actual payment approval must own Purchase. No CAPI credentials are present.

Only bounded utm_source, utm_medium, utm_campaign, utm_content and utm_term values are forwarded. The `region=intl` parameter does not itself guarantee USD charging.

## Prepared replacement creative — not published to Meta

Video: little-room-adventures-en-67s.mp4 (67 seconds, 720 × 1280, original framing, English narration with original woman’s opening and closing audio).

Primary text:

The screen switches off. Then comes the question: “What can I do now?”

Have a next idea ready. Little Room Adventures brings together 36 ways to imagine, make and play with children ages 4–8—using no supplies, paper and crayons, or everyday household objects.

Made for small spaces and time with a grown-up. Main guide plus six practical resources, in US Letter and A4. One payment of $9.90 USD. Explore the kit and try a sample.

Headline: When the screen goes off, have a next idea ready.

Description: 36 ways to create together · Ages 4–8 · $9.90 USD

CTA: Learn More

Destination: https://brinca-no-ape.vercel.app/en/

Suggested URL parameters: utm_source=facebook&utm_medium=paid_social&utm_campaign=lra_international&utm_content=video_en_67s

Preserve the verified existing international audience, currency, budget and conversion configuration until inspected live. Historical international budget was R$14/day with the user's ceiling R$25/day; this is not a live budget verification. Do not change or reactivate other ads. Sales/Purchase optimization is appropriate only when the actual payment-confirmed Purchase event is correctly received.

## Verification / publishing status

Static HTML IDs, local assets, offer anchors, separate checkout, UTM forwarding, consent-gated pixel and JS syntax are checked locally. Browser visual QA is blocked by the unavailable browser backend. Committing this directory publishes the page through the existing Vercel integration; it does not upload, publish or activate an ad in Meta.
