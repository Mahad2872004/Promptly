# Redesign audit and implementation

React 19 + TypeScript + Vite, React Router, Tailwind 4, Motion, Express; existing Supabase contact insert, Calendly booking, Gemini estimator and browser-local portal demo. No CMS or verified production domain configuration. Preserve all 18 routes and integrations. Existing P mark, cyan brand ancestry and team portraits retained. No verified product screenshots exist. Client outcomes/testimonials and speculative product roadmap are not substantiated by this checkout; retain source data but exclude from public presentation.

Reference principles (reviewed 28 October 2026):
- https://vercel.com/ : technical taxonomy and precise, compact navigation.
- https://linear.app/ : tangible interface storytelling and progressive detail.
- https://stripe.com/ : organize a broad offering around business tasks.
- https://ramp.com/ : concise outcome language and a clear next action.
- https://attio.com/ : explain connected workflows through interface detail.
- https://thoughtbot.com/ : distinguish disciplines, process and project evidence.
- https://www.instrument.com/ : editorial pacing and work-led presentation.
Browser reference capture was unreliable; text/navigation research completed directly, without claiming a full interaction audit.

Direction: retained geometric P, warm paper/ink surfaces, teal accents, disciplined rules, editorial headings, a labeled systems diagram and illustrative xSender workflow. No fake proof, customer counts or availability assertions.

Implementation: shared navigation/footer and homepage; reusable product data and marketing sections; service and industry templates; products/work/about/booking; preserve form/estimator/demo behavior; metadata/404/sitemap; responsive and reduced-motion QA; type check and production build. Remove remote-code eval startup block before executing the server. Domain-dependent SEO derives only from configured SITE_URL.

## Revised brand direction after owner feedback
The supplied turquoise/orange geometric P is the visual source of truth. Navy becomes the default foundation; turquoise leads interactions; orange is a restrained secondary cue. Homepage rebuilt with an editorial hero and interactive engineering studio, alternating pale expertise and navy product surfaces. Vector logo recreates the supplied mark rather than the earlier monochrome replacement. Existing theme preference remains available.

## Final validation
- TypeScript check (`npm run lint`), production build and production smoke suite pass.
- Smoke suite covers 19 routes, per-route titles/canonicals, sitemap, robots, unknown-route 404, trailing slash handling, API health, invalid input and explicitly labeled offline AI fallback.
- Browser review covered 19 routes at 390, 768 and 1440 pixels, with no horizontal overflow or broken loaded images. Final production homepage, interactive studio and mobile menu/Escape were verified after the polish pass.
- Contact error handling and product enquiry selection were exercised. Real Supabase submission success and live Gemini generation require configured credentials; neither is claimed as verified. Calendly and existing third-party widget remain integrated.
- SEO metadata is emitted into route-specific HTML; page content remains client-rendered. Core Web Vitals and formal WCAG conformance were not independently certified.
- The existing remote-code evaluation startup block was removed. No secrets were added. No deployment or git push was performed.

## Extension points
Add confirmed products to `src/data/products.ts`; entries support either a clearly labeled illustration or a real screenshot. Shared marketing components and CSS variables govern typography, color, surfaces, responsive behavior and interactions. Service and industry pages share reusable detail templates. Add route metadata in `src/seo.ts` and include new public routes in the sitemap.

## Content decisions
The supplied logo governs the final navy, turquoise and orange palette. Earlier warm-paper direction above is superseded. Product previews are illustrative and labeled; production screenshots, verified client projects and results can replace them when available. Existing unsupported testimonial/metrics source data is retained but not displayed in the redesigned marketing pages.

## Motion and device experience refinement
Owner requested a more expressive premium experience. Added an original desktop/mobile interface composition (explicitly a concept), scroll-linked perspective and translation using existing Motion, a sticky connected-architecture narrative, finite SVG motion graphics, shared section entrances, and polished action/portfolio hover states. Services retains the interactive engineering explorer. Mobile has a separately composed device arrangement; reduced-motion disables transforms and entrances. No runtime dependency or backend change was introduced.
Validation: TypeScript and production build pass; 19-route smoke suite passes. Browser checks across seven key routes at 390/768/1440 found no overflow or broken loaded images. Services explorer interaction verified. Corrected mobile device clearance after visual inspection. Live integration verification limitations above remain unchanged.

## Full-page art direction pass — 29 October 2026
Replaced the plain expertise rows with an accessible, keyboard-operated capability showcase and three original animated technical compositions. Added illustrated split heroes to marketing, service, industry, contact and tool pages. Rebuilt service/industry capability layouts as alternating editorial scenes. Refined product display stages, case-study panels, work demonstrations, delivery sequences, company principles/team portraits, consultation/contact panels, closing invitations and footer signature. Existing forms, APIs, booking links and demo behavior remain intact.

Implementation lives in DesignVisuals.tsx and art-direction.css, using existing Motion. Illustrations are identified as system concepts; no customer proof or product availability claims were added. Motion respects reduced-motion preferences. New UI uses native buttons and visible keyboard focus.

Validation: TypeScript, build and 19-route production smoke suite passed. Browser sweep of 19 routes × 3 widths (390/768/1440) found no horizontal overflow, broken loaded images or duplicate/missing H1s. Fixed a visual-class collision found in the mobile review, then rechecked affected templates at all three widths. Verified keyboard capability selection, mobile menu/Escape, dark/light appearance and contact form visibility. No deployment performed. Live submission/AI credentials and real product screenshots remain the same outstanding limitations.
