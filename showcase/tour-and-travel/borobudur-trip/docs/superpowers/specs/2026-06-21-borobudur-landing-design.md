# Borobudur Landing Page — Design Spec

**Date:** 2026-06-21
**Type:** Portfolio showcase (brand register)
**Approach:** Destination Journal — editorial hybrid with cinematic hero, asymmetric middle, structured close

---

## Overview

A single-page editorial landing page for Borobudur temple (Central Java, Indonesia). This is a portfolio piece demonstrating landing page design craftsmanship using the "Contemporary Desert Editorialism" design system.

**Narrative Angle:** "Stone and Light" — architectural and visual storytelling focusing on Borobudur's sculptural artistry, the dramatic Javanese landscape, and the cinematic quality of the site at dawn.

**Technical Stack:** Pure HTML/CSS/JS — no dependencies, single page, maximum control.

---

## Design System

### Color Palette (OKLCH-based)

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Warm Stone White | #F5F3F0 | Primary canvas |
| Surface | Desert Sand | #E8DED2 | Cards, section separation |
| Surface Alt | Soft Limestone | #D8CCC0 | Layer hierarchy |
| Text Primary | Charcoal Earth | #1B1A18 | Headings, body |
| Text Secondary | Weathered Stone | #6B655D | Supporting text |
| Text Muted | Desert Dust | #9A938A | Captions, metadata |
| Accent Primary | Sunlit Terracotta | #B56F4C | CTAs, interactive |
| Accent Secondary | Canyon Rust | #8C4A2D | Hover states |
| Accent Tertiary | Sky Mineral Blue | #6D9AA9 | Environmental balance |

### Typography

| Element | Font | Weight | Size | Tracking |
|---------|------|--------|------|----------|
| H1 | Inter | 300 | 72px | -1.5% |
| H2 | Inter | 400 | 48px | -1% |
| H3 | Inter | 500 | 28px | -0.5% |
| Body | Inter / system-ui | 400 | 17px | normal |
| Caption | Inter | 400 | 13px | normal |
| Data | Inter | 600 | varies | normal |

- Body line length: max 68ch
- Line height: 1.6 for body, 1.1-1.2 for headings

### Spacing

- Section vertical padding: 140-160px
- Content max-width: 1280px
- Reading width: 640px
- Grid: 12-column, 24px gutter

---

## Page Sections

### 1. Hero

**Purpose:** Immediate emotional immersion.

**Layout:**
- Full viewport height (100vh)
- Full-bleed background image: Borobudur at dawn, mist rising, volcanic backdrop
- Text overlay positioned bottom-left with 80px padding
- Subtle gradient overlay for text legibility (from transparent to rgba(27,26,24,0.4))

**Content:**
- H1: "Stone and Light"
- Subheadline: "Where ancient architecture meets the Javanese sky"
- CTA: Text link — "Explore ↓" with smooth scroll
- Scroll indicator: Thin animated line at bottom center

**Image:** Pexels — Borobudur temple sunrise, wide landscape, golden hour, misty atmosphere

---

### 2. Discovery

**Purpose:** Introduce Borobudur with editorial weight — establish scale, history, emotional context.

**Layout:**
- Asymmetric: text (4 cols) | image (8 cols)
- Left-aligned text block
- Image with subtle shadow

**Content:**
- H2: "A Monument Carved from Stone and Time"
- Body (2-3 paragraphs):
  - Built in the 9th century during the Sailendra dynasty
  - 2,672 relief panels, 72 stupas, world's largest Buddhist monument
  - UNESCO World Heritage Site since 1991
- Caption: "Central Java, Indonesia"

**Image:** Pexels — Borobudur from distance, volcanic backdrop, wide environmental framing

---

### 3. Experiences

**Purpose:** Showcase 3 distinct angles of the Borobudur experience.

**Layout:**
- Section heading (H2)
- 3-card grid, left-aligned
- Cards: Desert Sand (#E8DED2) background, rounded corners (8px)

**Content:**
- H2: "Three Ways to Encounter the Temple"
- Card 1: "Dawn Ascent" — sunrise viewing from the temple summit
- Card 2: "Stone Narratives" — exploring the relief panels and their stories
- Card 3: "Kedu Plain" — the surrounding landscape of rice terraces and volcanoes

**Each Card:**
- Image (4:3 ratio)
- H3 title
- 2-line description
- Small metadata caption

**Images (Pexels):**
1. Temple silhouette at sunrise
2. Close-up of stone relief carvings
3. Rice terraces with volcanic backdrop

---

### 4. Storytelling

**Purpose:** Emotional heart of the page — cinematic narrative block.

**Layout:**
- Full-bleed atmospheric image
- Pull quote positioned below or overlaid
- Short narrative paragraph
- Centered text alignment (intentional for this section only)

**Content:**
- Image: Borobudur stupas at sunrise, golden light, atmospheric depth
- Pull quote: "At dawn, the temple exhales."
- Narrative paragraph (3-4 sentences): The experience of being present as light moves across ancient stone, the scale of human devotion preserved in rock, the silence of 1,200 years.

**Image:** Pexels — stupa close-up with morning light, atmospheric, cinematic

---

### 5. Trust

**Purpose:** Build credibility through data and authentic social proof.

**Layout:**
- Asymmetric: image (8 cols) | testimonial (4 cols)
- 3 data points below, aligned left

**Content:**
- Image: Visitors on temple stairs, human scale, morning light
- Testimonial: "The most profound sunrise I've ever witnessed." — Travel Journal
- Data points:
  - "1,600+ years old"
  - "1991 UNESCO listed"
  - "2M+ annual visitors"

**Data Styling:**
- Large numbers (48px, weight 600, monospaced numerals)
- Small labels (13px, muted color)
- Desert Sand card backgrounds

---

### 6. Conversion

**Purpose:** Final emotional invitation — invitational, not aggressive.

**Layout:**
- Centered block
- Warm Stone White background
- Subtle top divider (hairline)

**Content:**
- H2: "Begin Your Journey to Borobudur"
- CTA button: "Plan Your Visit →" (Sunlit Terracotta background, white text)
- Supporting text: "Curated experiences in Central Java"

**CTA Styling:**
- Background: #B56F4C
- Hover: #8C4A2D
- Border-radius: 4px
- Padding: 16px 40px
- Font-weight: 500

---

### 7. Footer

**Purpose:** Clean close with minimal navigation.

**Layout:**
- Charcoal Earth (#1B1A18) background
- 3-column: Brand | Explore | Connect
- Thin divider above attribution

**Content:**
- Brand: "Borobudur Trip" + "© 2026 Portfolio showcase piece"
- Explore: Yogyakarta, Prambanan, Dieng Plateau
- Connect: Instagram, Behance, Contact
- Attribution: "Designed with care. Authentic imagery via Pexels."

---

## Motion & Effects

- Smooth scroll for anchor links
- Subtle fade-in on scroll for content blocks (Intersection Observer)
- No parallax (avoid performance issues)
- No bouncy/elastic easing — use ease-out only
- Hover transitions: 200ms ease-out

---

## Responsive Strategy

**Breakpoints:**
- Desktop: 1024px+ (full editorial layout)
- Tablet: 768-1023px (stacked sections, reduced columns)
- Mobile: <768px (single column, adjusted spacing)

**Mobile Adjustments:**
- Hero: Reduce heading size to 48px
- Discovery/Trust: Stack to single column
- Experiences: Single column cards
- Reduce section padding to 80px
- Body font size: 16px

---

## Image Requirements

All images sourced from Pexels. Search queries:
1. Hero: "borobudur temple sunrise mist"
2. Discovery: "borobudur landscape volcano"
3. Experiences: "temple sunrise silhouette", "stone relief carving", "java rice terrace volcano"
4. Storytelling: "borobudur stupa golden hour"
5. Trust: "temple visitors morning light"

Fallback: Generic Java/Indonesia landscape photography if Borobudur-specific not available.

---

## File Structure

```
borobudur-trip/
├── index.html          (single page)
├── css/
│   └── style.css       (all styles)
├── js/
│   └── main.js         (scroll effects, interactions)
├── images/             (downloaded Pexels images)
├── PRODUCT.md          (brand context)
├── DESIGN.md           (design system reference)
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-06-21-borobudur-landing-design.md
```

---

## Success Criteria

- [ ] Feels like a destination publication, not a tourism website
- [ ] Typography hierarchy is clear and elegant
- [ ] Color palette derives from the landscape
- [ ] Hero creates immediate emotional immersion
- [ ] Editorial pacing across sections (magazine spread feel)
- [ ] Responsive down to mobile without breaking
- [ ] All images are authentic, high-quality photography
- [ ] No anti-patterns from DESIGN.md anti-rules list
