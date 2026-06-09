---
title: Design Rules
description: The hard visual constraints — spacing, type, color, motion. Non-negotiable.
sidebar:
  order: 1
node:
  pillar: directives
  id: design-rules
  summary: Visual constraints every interface must respect — 8pt spacing, restrained type scale, light-first high-contrast color, purposeful motion.
  facts:
    spacing_system: 8pt grid
    base_unit: 4px
    default_theme: light
    type_pairing: Geist / Inter
    mono: Geist Mono
    aesthetic: Calm, technical, high-contrast
  rules:
    - rule: Space everything on a 4px base, 8px rhythm. No arbitrary values like 11px or 13px.
      why: A shared unit makes spacing decisions automatic and layouts feel composed instead of nudged. If a value isn't on the scale, the design probably doesn't need it.
    - rule: Default to light mode, mobile-first. Design the small screen first, then let it breathe up.
      why: Light-first keeps the aesthetic calm and readable. Mobile-first forces hierarchy decisions early, when they're cheap.
    - rule: Prioritize negative space. When a layout feels off, the fix is usually more room, not more elements.
      why: Whitespace frames content and signals confidence. Crowding signals the opposite.
    - rule: Use a restrained type scale with strong hierarchy. Geist or Inter for UI and body, Geist Mono for code and rare technical accents (~10% of type).
      why: A tight pairing reads as intentional. Mono used sparingly carries a technical signal without turning everything into a terminal.
    - rule: High contrast for text and key actions. No low-contrast gray-on-gray for anything that has to be read or clicked.
      why: Contrast is legibility and accessibility at once. Subtlety belongs in spacing and motion, not in whether someone can read the words.
    - rule: Motion is purposeful and subtle — it explains a change or guides attention, never decorates. Respect prefers-reduced-motion.
      why: Good motion makes an interface feel responsive and legible. Gratuitous motion makes it feel cheap and excludes people who can't tolerate it.
    - rule: No magic numbers in the design. Hierarchy comes from the token scale, not from hand-tuned one-offs.
      why: Tokens keep a system coherent as it grows. One-offs are where consistency quietly dies.
  tags: [design, spacing, typography, color, motion, accessibility]
---

These are the constraints I don't relax. They're not style preferences — they're the floor. An interface can be plain and still be right if it respects these; it can be elaborate and still be wrong if it doesn't.

## Spacing — the 8pt grid

Everything sits on a 4px base with an 8px rhythm. Margins, padding, gaps, component sizes — all multiples. The payoff isn't rigidity, it's that spacing stops being a decision I agonize over. When something looks slightly off, the answer is almost always "snap it to the grid," not "invent a new value."

If a layout seems to need `11px`, that's usually a signal the design is fighting the system. The honest fix is `8` or `12`, not `11`.

## Color & contrast

Light mode is the default. The palette stays calm — mostly neutral, high contrast where it counts, color used as signal rather than decoration. Text and interactive elements have to clear a real contrast bar; I'd rather a thing be obviously legible than subtly tasteful-but-unreadable.

## Type

Geist and Inter carry the interface and the body. Geist Mono shows up for code and the occasional technical detail — roughly a tenth of the type, never the default. The scale is restrained on purpose: a few sizes with clear jumps beats a dozen sizes that blur together.

## Motion

Motion earns its place by doing a job — showing that something changed, drawing the eye to where it should go. It's subtle, it's quick, and it always respects `prefers-reduced-motion`. Anything that moves just to look lively gets cut.

## The principle underneath all of it

Calm, technical, high-contrast. Every element has to justify itself functionally. Negative space does more work than most people give it credit for. When in doubt, take something out.
