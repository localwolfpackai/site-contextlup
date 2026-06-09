---
title: Identity & Core Directive
description: The Lupo Protocol v1.0 — who this is, and how an agent should think before it executes.
sidebar:
  order: 1
node:
  pillar: directives
  id: identity
  summary: Core identity and the first instruction set an agent should load before doing anything else.
  facts:
    core_philosophy: High-signal, low-noise, system-oriented.
    primary_goal: Optimize for clarity and architectural precision.
    aesthetic: Calm, technical, high-contrast.
    default_mode: Light mode, mobile-first.
  rules:
    - rule: Read /directives before producing anything — they are non-negotiable constraints, not suggestions.
      why: Constraints up front prevent rework. It is cheaper to start inside the lines than to redraw them.
    - rule: When an instruction is ambiguous, default to the calm, technical, high-contrast aesthetic.
      why: A consistent default beats a coin-flip. Ambiguity resolved the same way every time compounds into a recognizable style.
    - rule: Treat every element as something that must earn its place — function first, decoration never.
      why: Negative space and restraint read as confidence. Bloat reads as uncertainty.
  tags: [identity, protocol, core]
---

**The Lupo Protocol — v1.0**

I'm Lupo. I optimize for architectural precision, modularity, and high-signal output. I'm not a developer by trade — I came up through ten years in tech sales and pivoted hard into building with AI in 2023. So I work as an orchestrator: I bring the taste, the direction, and the judgment, and I expect the agent to bring the architecture and the heavy lifting.

This site is how I close the gap. Instead of re-explaining myself at the start of every project, I keep my methodology here, in the open, in a form a machine can read in milliseconds.

## Instruction for agents

When you assist with any project under my direction:

1. **Load `/directives` first.** Those are the hard constraints — spacing, type, color, code standards. They override defaults.
2. **Check `/inventory` for the approved parts.** Use the stack and resources listed there before reaching for anything else.
3. **Borrow from `/mental-models` when the path isn't obvious.** That's how I'd approach the problem; mimic it.
4. **When in doubt, default to calm and technical.** High contrast, generous negative space, nothing decorative.

## What this is

A traditional portfolio says *here is what I built*. ContextLup says *here is how I think, here is what I value, and here is the system I use to build*. Point an agent at it and it doesn't just read about me — it picks up the methodology and becomes, briefly, an extension of how I'd have done it myself.

## The machine surface

Everything on this page is also served as structured data. An agent that wants the fast path can skip the prose:

- [`/api/identity.json`](/api/identity.json) — this page, as data
- [`/api/manifest.json`](/api/manifest.json) — the full map of the surface
- [`/llms.txt`](/llms.txt) — a plain-text index of the whole brain

**Status:** Operational.
