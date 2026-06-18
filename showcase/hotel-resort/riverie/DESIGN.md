---
name: Riverie
description: A modern tropical retreat in Bali.
version: "1.1"
updated: "2026-06-03"
colors:
  coconut-white: "#FCFBF9"
  limestone: "#E6E2D8"
  warm-sand: "#C8BBA6"
  teak-brown: "#8B5A2B"
  espresso: "#2B251F"
  palm-green: "#2F3E2F"
  pool-blue: "#5C8A97"
  primary: "{colors.espresso}"
  neutral-bg: "{colors.coconut-white}"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.75rem, 7vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.08em"
  hero:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.9rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.4vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.01em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  small:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.15em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "96px"
  xxl: "128px"
layout:
  maxWidth: "1440px"
  pagePaddingMobile: "20px"
  pagePaddingTablet: "32px"
  pagePaddingDesktop: "48px"
  gridDesktop: "12 columns"
  gridMobile: "4 columns"
components:
  button-primary:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.coconut-white}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.teak-brown}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    border: "1px solid {colors.espresso}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.coconut-white}"
    rounded: "{rounded.none}"
    paddingMobile: "24px"
    paddingDesktop: "40px"
---

# Design System: Riverie

## 1. Overview

**Creative North Star: "The Slow Tropical Sanctuary"**

Riverie’s website should feel like entering a modern tropical retreat before arriving in Bali. The interface translates the property’s open-air architecture, pool reflections, palm shadows, teak details, soft limestone surfaces, linen textures, and quiet communal spaces into a calm editorial digital experience.

The design system communicates quiet luxury through restraint, warm materiality, generous breathing room, and practical clarity. It should not feel raw, cold, or severe. It should feel composed, sunlit, natural, and considered.

The website acts as both a brand world and a booking path. It must create desire through atmosphere, then reduce hesitation through clear room information, amenities, location context, policies, contact paths, and visible booking actions.

### Key Characteristics

- **Slow editorial pacing:** Large image moments, short copy, and spacious layouts that let users linger.
- **Modern tropical architecture:** Flat planes, sharp image frames, clean geometry, vertical rhythm, and teak-inspired warmth.
- **Quiet luxury:** Premium through balance, typography, materials, and silence, not decorative excess.
- **Human hospitality:** Calm and refined, but never inaccessible, cryptic, or too minimal to use.
- **Clear conversion:** Booking actions stay visible and confident without using aggressive urgency tactics.

---

## 2. Color System

Riverie’s color system is warm, organic, and hospitality-driven. It should avoid pure black, pure white, cold greys, neon accents, and overly saturated tropical colors. Most color should come from photography: water, palms, wood, shadow, linen, and stone.

### Primary

- **Espresso** (`#2B251F`): Deep warm charcoal-brown. Used for primary typography, icons, borders, nav text, and primary button backgrounds. It provides structure without the coldness of pure black.

### Secondary

- **Teak Brown** (`#8B5A2B`): Warm wood tone. Used for hover states, text links, small accent rules, line icons, and subtle material cues. Do not overuse it as a large background.

### Neutrals

- **Coconut White** (`#FCFBF9`): Primary canvas and card surface. Soft off-white inspired by lime plaster and sunlit interior walls.
- **Limestone** (`#E6E2D8`): Secondary section surface, dividers, image captions, inactive states, and quiet backing planes.
- **Warm Sand** (`#C8BBA6`): Muted metadata, secondary borders, inactive UI, and subtle environmental warmth.

### Accents

- **Palm Green** (`#2F3E2F`): Reserved for rare UI accents, icon highlights, confirmation messages, or nature-led sections. Most palm green should come from photography.
- **Pool Blue** (`#5C8A97`): Reserved for booking confirmation states, water-related details, selected calendar dates, or very subtle highlights. Most blue should come from pool photography.

### Rules

#### The 10% Accent Rule
Palm Green and Pool Blue must never exceed 10% of any page or screen. The interface remains anchored in Coconut White, Limestone, Espresso, and photography.

#### The Warm Grounding Rule
Do not use pure black (`#000000`) or pure white (`#FFFFFF`) in interface surfaces or typography. Use Espresso and Coconut White instead.

#### The Photography First Rule
Avoid using large colored UI blocks to force a tropical mood. Let real imagery carry the atmosphere.

#### Contrast Rules
- Body text on Coconut White should use Espresso.
- Secondary text may use Espresso at 72-80% opacity only when contrast remains accessible.
- Text over images must use an overlay, solid text panel, or low-detail image area.
- Do not place small uppercase labels directly on busy photography.

---

## 3. Typography

**Display Font:** Playfair Display, Georgia, serif  
**Functional Font:** Manrope, system-ui, sans-serif

Typography should balance editorial softness with booking clarity. Playfair Display gives Riverie its slow, refined voice. Manrope keeps navigation, room details, forms, prices, and policies clear.

### Hierarchy

- **Brand Display:** Playfair Display, Regular 400, uppercase, high letter-spacing. Used for the logotype and rare large brand marks.
- **Hero:** Playfair Display, Regular 400, `clamp(2.5rem, 7vw, 5.75rem)`, line-height `1.05`. Used for primary page headlines.
- **Headline:** Playfair Display, Regular 400, `clamp(1.9rem, 4vw, 3.25rem)`, line-height `1.15`. Used for section statements.
- **Title:** Manrope, SemiBold 600, `clamp(1.125rem, 1.4vw, 1.375rem)`. Used for room names, cards, and practical headings.
- **Body:** Manrope, Regular 400, `1rem`, line-height `1.7`. Used for descriptive copy. Maximum line length: `65ch`.
- **Small:** Manrope, Regular 400, `0.875rem`, line-height `1.6`. Used for captions and metadata.
- **Label:** Manrope, Bold 700, `0.75rem`, uppercase, letter-spacing `0.15em`. Used for navigation, buttons, section kickers, and short labels only.

### Rules

#### The Poetic plus Practical Rule
Pair poetic serif headlines with practical Manrope copy. Example: "Slow living, naturally." followed by details about rooms, pool, shared dining, location, and booking.

#### The Upper-Spaced Label Rule
Uppercase labels should be small and controlled. Do not use uppercase for long sentences or essential mobile body content.

#### The Readability Rule
No paragraph should exceed `65ch`. Avoid very thin text weights. Avoid low-contrast beige text for important content.

#### The Light-on-Dark Rule
When Coconut White text appears on Espresso, increase font weight by one step or slightly increase line-height to maintain comfortable readability.

---

## 4. Layout System

The layout should feel architectural but relaxed: clear structure, generous voids, asymmetry, and image-led rhythm.

### Grid

- **Desktop:** 12-column grid, max-width `1440px`, page padding `48px`.
- **Tablet:** 8-column grid, page padding `32px`.
- **Mobile:** 4-column grid, page padding `20px`.
- Use asymmetric spans such as 5/7, 4/8, 7/5, and 3/6/3.
- Avoid equal card grids as the dominant layout pattern. Use them only for practical lists.

### Section Spacing

- Hero to first section: `64-96px` depending on viewport.
- Standard section vertical padding: `96-128px` desktop, `64-80px` mobile.
- Compact content groups: `32-48px`.
- Keep generous negative space around headlines and image groups.

### Image Ratios

- Hero image: `16:9`, `4:3`, or full viewport crop with safe focal point.
- Room card image: `4:3` or `3:2`.
- Editorial portrait image: `4:5`.
- Wide atmospheric banner: `21:9` or `16:7`.
- Avoid random image ratio mixing unless it creates intentional editorial pacing.

### Responsive Behavior

- Complex editorial layouts should stack into clear vertical stories on mobile.
- Booking CTA remains reachable near the top of the page and at decision points.
- Avoid text overlays on mobile unless contrast is guaranteed.
- Preserve image quality but aggressively optimize file size.

---

## 5. Elevation and Surfaces

Riverie uses a flat, layered architectural style. Depth is created through tonal separation, overlapping layout composition, and photography, not digital effects.

### Rules

- No heavy shadows under cards, buttons, or navigation.
- No glassmorphism, blur panels, gradient overlays, or floating SaaS widgets.
- Use `1px solid Limestone` borders for cards, forms, and separators.
- Use Coconut White cards on Limestone backgrounds for soft separation.
- Use Espresso surfaces sparingly for strong contrast moments such as footer, booking CTA strip, or selected states.

### Corner Radius

Architectural sharpness is the default.

- Buttons, image frames, nav, editorial cards: `0px`.
- Form inputs, date picker cells, error states, and small functional controls may use `2px` or `4px` only when it improves usability.
- Do not use large rounded cards or pill-shaped buttons.

---

## 6. Components

### Navigation Header

- Height: `72-96px`, depending on viewport.
- Background: Coconut White or transparent over calm image areas with adequate contrast.
- Logo: left aligned, Playfair Display uppercase, letter-spacing `0.2em`.
- Primary links: Stay, Experience, Journal, About, Contact.
- Primary CTA: Book Now.
- On mobile, use a simple menu button with clear label. Do not use cryptic icons only.
- Header may become sticky after scroll, but should remain quiet and thin.

### Buttons

#### Primary Button
- Espresso background, Coconut White text.
- Uppercase Manrope label, `0.75rem`, `0.15em` letter-spacing.
- Padding: `16px 32px` desktop, `14px 24px` mobile.
- Hover: Teak Brown background.
- Focus: visible outline using Pool Blue or Teak Brown with sufficient contrast.

#### Secondary Button
- Transparent background, Espresso border, Espresso text.
- Hover: Espresso background, Coconut White text.

#### Text Link
- Espresso text with Teak Brown hover.
- Underline or bottom border on hover and focus.
- Do not rely on color alone.

### Room Cards

Room cards must combine mood and decision-making.

Required content:
- Room or suite name.
- 1 short emotional line.
- Practical details: size, occupancy, bed type, view, key amenities.
- CTA: View Details or Check Availability.
- Image with useful alt text.

Avoid cards that show only a photo and poetic copy.

### Feature Items

Feature items can use thin line icons, short uppercase labels, and 1-2 lines of description.

Examples:
- Open-Air Living
- Nature Connected
- Water at Heart
- Soulful Spaces
- Local Touches
- Quiet Luxury

### Booking Module

The booking module must be calm but unmistakable.

Required fields:
- Check-in date.
- Check-out date.
- Guests.
- Room or retreat type, optional.
- Check Availability CTA.

States:
- Empty.
- Focus.
- Selected.
- Unavailable.
- Error.
- Loading.
- Confirmation.

Booking components should never use urgency countdowns, fake scarcity, or aggressive discount banners.

### Forms

- Use visible labels, not placeholder-only labels.
- Inputs use Coconut White or Limestone with Espresso text.
- Borders use Warm Sand or Limestone.
- Focus states must be visible.
- Error messages must be specific and polite.
- Form success should feel warm and reassuring.

### Gallery

- Use curated image sets with clear categories: Rooms, Pool, Dining, Details, Surroundings.
- Avoid endless uncaptioned galleries.
- Gallery controls must be keyboard accessible.
- Add captions when a photo supports a specific decision.

### Footer

- Footer may use Espresso background with Coconut White text.
- Include booking CTA, contact, location, social links, newsletter or inquiry path, and key policies.
- Keep it calm and structured, not crowded.

---

## 7. Website Experience Architecture

Riverie’s site should support two browsing modes: slow discovery and fast action.

### Recommended Pages

1. **Homepage**: Brand arrival, main booking path, room previews, experience highlights, location, journal teaser, final CTA.
2. **Stay / Retreats**: Room and suite listing with comparison details.
3. **Room Detail**: Room-specific story, gallery, amenities, size, occupancy, pricing path, policies, booking CTA.
4. **Experience**: Open-air dining, pool, quiet spaces, local touches, long-stay rhythm.
5. **Journal**: Editorial content about slow travel, Bali, design, local guides, and retreat rituals.
6. **About**: Brand story, architecture, values, and hospitality philosophy.
7. **Contact / Booking Inquiry**: Contact form, WhatsApp path, map, FAQ, policies.

### Navigation Order

Recommended top navigation:

**Stay / Experience / Journal / About / Contact / Book Now**

For early launch, simplify to:

**Stay / Experience / About / Contact / Book Now**

---

## 8. Homepage System

The homepage should create emotional arrival first, then guide toward booking.

### Homepage Flow

1. **Hero Arrival**
   - Full-width or split hero with architectural/pool image.
   - Headline: calm and memorable.
   - Short subcopy that explains what Riverie is.
   - Primary CTA: Book Now or Check Availability.
   - Secondary CTA: Explore the Retreat.

2. **Brand Intro**
   - Short editorial statement about modern tropical retreat living.
   - Mention Bali, open-air architecture, quiet luxury, and natural rhythm.

3. **Booking Bar**
   - Dates, guests, room type, Check Availability.
   - Should appear early without feeling like a hard-sell.

4. **Retreat Highlights**
   - 3-6 feature items with icons and short descriptions.

5. **Stay Preview**
   - Room/suite cards with photos, key details, and CTAs.

6. **Experience Moment**
   - Large image-led section for pool, dining, slow mornings, or palm-shadowed spaces.

7. **Location Context**
   - Calm map or text-based location section.
   - Explain what guests are near and what kind of environment they can expect.

8. **Journal / Local Notes**
   - 2-3 editorial cards if content exists.
   - If not, replace with a quiet brand detail section.

9. **Final Booking CTA**
   - Clear, warm, and direct.

---

## 9. Photography and Art Direction

Photography is the primary emotional layer of the website.

### Use

- Real property imagery whenever possible.
- Morning light, palm shadows, pool reflections, linen, teak, stone, open-air dining, still interiors, quiet landscape views.
- Human presence only when it feels natural, calm, and secondary to the space.
- Wide architectural shots mixed with close material details.
- Editorial crops with generous negative space.

### Avoid

- Over-saturated tropical stock photos.
- Influencer-first posing.
- Party, nightlife, beach-club, or hostel energy.
- Fake rustic textures, excessive boho styling, spiritual clichés, or surf-shack visuals.
- Busy photo backgrounds behind essential text.
- Heavy filters that make the property feel unreal.

### Image Treatment

- Minimal editing.
- Warm but not yellow.
- Natural shadows preserved.
- Pool water should feel clear and quiet, not overly cyan.
- Skin tones, if people appear, should remain natural.

---

## 10. Interaction and Motion

Motion should feel like a slow change of light, not an app transition.

### Allowed

- Soft fade-in on scroll.
- Subtle image reveal.
- Gentle hover opacity or color change.
- Very slight image scale on hover, maximum `1.03`.
- Smooth anchor scrolling if it does not interfere with accessibility.

### Avoid

- Heavy parallax.
- Elastic motion.
- Bouncing icons.
- Cursor tricks.
- Auto-playing loud video.
- Fast carousels.
- Scroll hijacking.

### Accessibility

- Respect `prefers-reduced-motion`.
- Do not animate essential booking feedback in a way that hides state changes.

---

## 11. Content and Copy Rules

Voice should be calm, refined, sensory, and practical.

### Good Copy Direction

- Short, spacious sentences.
- Sensory but grounded.
- Pair emotion with clear information.
- Use specific hospitality details.
- Use verbs like arrive, breathe, linger, wake, gather, unwind, restore.

### Avoid

- "Ultimate paradise."
- "Hidden gem."
- "Once-in-a-lifetime escape."
- "Luxury like never before."
- Overuse of "exclusive."
- Generic real estate copy.
- Influencer caption tone.
- Wellness overclaims.

### Example Tone

Good:

> Wake slowly to palm shadows, open the doors to warm air, and spend the day between quiet rooms, shared tables, and the pool.

Too generic:

> Experience the best luxury villa in Bali with unforgettable vibes and premium facilities.

---

## 12. Accessibility and Inclusion

Target standard: **WCAG 2.2 AA**.

Riverie is soft and light, so accessibility must be intentionally protected.

### Requirements

- Minimum body text size: `16px`.
- Essential text must meet WCAG AA contrast.
- Buttons and links must have visible focus states.
- Booking CTA, forms, date pickers, galleries, accordions, and menus must be keyboard accessible.
- Do not use color alone for errors, selected states, unavailable dates, or active filters.
- Form labels must be visible.
- Error messages must be clear, polite, and actionable.
- Images need meaningful alt text, especially room and amenity photos.
- Motion must respect reduced-motion preferences.
- Avoid tiny uppercase labels for essential information on mobile.
- Keep performance strong for travelers on mobile networks.

### Inclusive Hospitality Considerations

The site should feel welcoming to:

- Couples.
- Solo travelers.
- Remote workers.
- Long-stay guests.
- Small groups.
- Local and international guests.
- Travelers seeking quiet rather than nightlife.

Do not make the experience feel only for influencers, luxury elites, party travelers, or wellness insiders.

---

## 13. Do's and Don'ts

### Do

- Use warm off-white and limestone surfaces.
- Use Playfair Display for emotional moments and Manrope for practical clarity.
- Keep layouts spacious and editorial.
- Pair every mood section with clear user value.
- Keep room cards practical.
- Keep booking visible but calm.
- Optimize images for performance.
- Use real property and atmosphere photography.
- Use small functional radius only when usability needs it.

### Don't

- Do not use pure black or pure white.
- Do not use glassmorphism, neon, gradient text, or crypto-style UI.
- Do not use heavy shadows or floating cards.
- Do not use large rounded SaaS cards or pill buttons.
- Do not create crowded hotel-template layouts.
- Do not hide booking actions.
- Do not place small text over busy images.
- Do not rely on mood photography without practical details.
- Do not use urgency countdowns or fake scarcity.
- Do not let animations slow the experience.
- Do not make the website feel like a party hostel, real-estate landing page, or generic luxury resort.
