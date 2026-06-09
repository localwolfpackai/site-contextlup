---
title: Problem Solving
description: How I move through a problem before touching the keyboard — the heuristics an agent can borrow.
sidebar:
  order: 1
node:
  pillar: mental-models
  id: problem-solving
  summary: Architecture and problem-solving heuristics — assess before building, get the bones right first, standardize what repeats, and treat constraints as a head start.
  facts:
    phase_order: Assess → Orient → Layout → Design → Execute → Test → Standardize
    bias: Structure before polish
  rules:
    - rule: Assess before building. Read the existing files, the README, and recent git state before writing anything new.
      why: Most mistakes are made in the first five minutes, by solving a problem that was already solved differently nearby.
    - rule: Get the bones right before reaching for visuals — semantic structure and hierarchy first, polish second.
      why: Polish bolted onto a bad structure stays fragile. Polish added to a sound structure is quick and sticks.
    - rule: When a good pattern repeats, turn it into a reusable component, snippet, or rule. Standardize the win.
      why: A solution used twice and copied is a liability. The same solution named and reused is leverage.
    - rule: Treat constraints as a head start, not a cage. A tight scope and a fixed token set make the right move obvious.
      why: A blank page is slow. Constraints collapse the option space to the few choices actually worth weighing.
    - rule: Prefer the modular, composable version over the clever monolith. Small pieces that fit beat one piece that impresses.
      why: Modular work is easier to test, replace, and reason about. Clever-but-monolithic is where future-me gets stuck.
    - rule: Verify by actually doing it — run the lint, read the diff, boot the thing. Don't claim done from inference.
      why: I can't run the project myself. "Done" has to mean observed-working, not assumed-working, or the claim is hollow.
  tags: [architecture, heuristics, process, modularity]
---

I'm an orchestrator, not a line-by-line coder — so my edge isn't in the syntax, it's in the sequence. How I move through a problem is more transferable than any single decision I'd make inside it. This is that sequence.

## Assess first

Before anything gets built, I want the lay of the land: what's already here, what the README says, what recently changed. Most avoidable mistakes happen in the first few minutes, when you solve a problem that was already solved a slightly different way three files over. Looking first is cheap insurance.

## Bones before polish

Structure comes first — semantic markup, real hierarchy, the responsive skeleton. Visuals come after. Polish laid over a shaky structure stays shaky and you end up redoing it; polish added to a sound structure goes on fast and holds. The order isn't aesthetic preference, it's what makes the polish cheap.

## Standardize the win

The first time I solve something well, it's a solution. The second time the same shape shows up, it should become a component, a snippet, or a rule — something named and reusable. Copy-paste is a quiet liability; a named pattern is leverage that pays off every time it recurs.

## Constraints are a head start

A blank page is the slow part. A tight scope and a fixed set of tokens aren't a cage — they collapse a thousand possibilities down to the handful actually worth weighing. I reach for constraints early on purpose, because they make the next move obvious.

## Verify by doing

I can't run the project to check your work — so "done" has to mean you ran the lint, read the diff, and watched the thing actually work. Inferred-done isn't done. This is the heuristic I'm strictest about, because it's the one that protects every other one.
