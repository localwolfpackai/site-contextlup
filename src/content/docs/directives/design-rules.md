---
title: Design Rules
description: The hard visual constraints — spacing, type, color, motion. Non-negotiable.
sidebar:
  order: 1
node:
  pillar: directives
  id: design-rules
  summary: Universal UI baseline — 4px spacing, a fixed type scale, WCAG AA color tokens, and one main landmark per page.
  facts:
    spacing_system: 4px scale
    base_unit: 4px
    default_theme: light
    surface_base: "#F8F9FA"
    surface_elevated: "#FFFFFF"
    text_primary: "#1A1A1B"
    text_muted: "#636975"
    brand_primary: "#3B52C4"
    type_scale: 12 / 14 / 18 / 24 / 32
    type_pairing: Geist / Inter
    mono: Geist Mono
    aesthetic: Calm, technical, high-contrast
  rules:
    - rule: Space everything on a 4px scale (4, 8, 12, 16, 24, 32, 48, 64). No off-scale values.
      why: A shared unit makes spacing decisions automatic and layouts feel composed instead of nudged. If a value isn't on the scale, the design probably doesn't need it.
    - rule: Default to light mode, mobile-first. Design the small screen first, then let it breathe up.
      why: Light-first keeps the aesthetic calm and readable. Mobile-first forces hierarchy decisions early, when they're cheap.
    - rule: Prioritize negative space. When a layout feels off, the fix is usually more room, not more elements.
      why: Whitespace frames content and signals confidence. Crowding signals the opposite.
    - rule: Use the type scale 12, 14, 18, 24, 32. Body line-height is 1.5. Heading line-height is 1.2. Never use font-weight 300 on a light background.
      why: Those five sizes keep hierarchy obvious. Light weight fails contrast even when the color itself is dark.
    - rule: Use the color tokens. Surface base is #F8F9FA, elevated surfaces are #FFFFFF, primary text is #1A1A1B, muted text is no lighter than #636975 on white, and brand actions are #3B52C4.
      why: Named tokens keep contrast predictable. Muted text has a floor so small type stays readable.
    - rule: One main landmark per page. Footer sits outside main. Every nav has an accessible name when more than one nav exists.
      why: Screen readers and crawlers use landmarks to move through a page. Two mains, or a footer trapped inside main, breaks that map.
    - rule: Every button, link, and input defines hover, focus-visible, disabled, and active. Focus uses a 2px ring on :focus-visible. Disabled is 50% opacity, grayscale, aria-disabled, and no pointer events. Touch targets are at least 44 by 44 pixels.
      why: Interaction that only exists on hover is invisible to keyboard and touch users. The ring shows where focus is without flashing on every click.
    - rule: Motion is purposeful and subtle — it explains a change or guides attention, never decorates. Respect prefers-reduced-motion.
      why: Good motion makes an interface feel responsive and legible. Gratuitous motion makes it feel cheap and excludes people who can't tolerate it.
    - rule: No magic numbers in the design. Hierarchy comes from the token scale, not from hand-tuned one-offs.
      why: Tokens keep a system coherent as it grows. One-offs are where consistency quietly dies.
  tags: [design, spacing, typography, color, motion, accessibility]
---

These are the constraints I don't relax. They're not style preferences — they're the floor. An interface can be plain and still be right if it respects these; it can be elaborate and still be wrong if it doesn't.

## Spacing — the 4px scale

Margins, padding, gaps, and component sizes sit on 4, 8, 12, 16, 24, 32, 48, and 64. The payoff isn't rigidity. Spacing stops being a decision to agonize over. When something looks slightly off, snap it to the scale.

## Color & contrast

Light mode is the default. The page sits on `#F8F9FA`. Cards and other raised surfaces sit on `#FFFFFF`. Primary text is `#1A1A1B`. Muted text does not go lighter than `#636975` on white. Links and actions use `#3B52C4`. Those five values are the palette. Anything else is a structural line, not a new color.

## Type

Five sizes: 12, 14, 18, 24, 32. Body copy is 14px at a line-height of 1.5. Headings use 1.2. Geist and Inter carry the interface. Geist Mono stays rare. Weight stays at 400 for body and 600 for headings. Weight 300 is out. It fails contrast on a light background even when the color is dark.

## Landmarks & interaction

Each page has one `main`. The footer is outside it. A page with more than one `nav` names each of them. Buttons, links, and inputs have a hover brightness shift, a 2px focus ring that appears for keyboard focus, a disabled state at half opacity, and a slight press. On a phone, the hit area is at least 44 by 44 pixels.

## Motion

Motion earns its place by doing a job — showing that something changed, drawing the eye to where it should go. It's subtle, it's quick, and it always respects `prefers-reduced-motion`. Anything that moves just to look lively gets cut.

## The principle underneath all of it

Calm, technical, high-contrast. Every element has to justify itself functionally. Negative space does more work than most people give it credit for. When in doubt, take something out.
