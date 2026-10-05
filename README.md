# ContextLup

Most documentation is basically a graveyard of good intentions—it tells you what was built six months ago, and usually poorly. This repo is different. It holds the actual rules, logic, and constraints that drive the system.

Point an AI at this, and it doesn't just skim a summary. It downloads a complete, functional methodology. (Which means less time arguing with a chatbot about why it shouldn't try to use jQuery).

## No More Sync Issues

You write a standard Markdown file. You throw some specific configuration into the frontmatter, and it instantly becomes an active node in the system. That frontmatter is exactly what the API reads.

The docs you read with your human eyes and the API your AI agent consumes are the exact same file. They literally cannot fall out of sync unless you go out of your way to break them.

## The Four Pillars

We split the knowledge base up so neither you nor the agent gets confused:

* **Directives:** The non-negotiable rules for design and code. Do not cross these lines.
* **Mental Models:** How to actually think about a problem, so you (or the AI) don't over-engineer a simple feature.
* **Inventory:** The approved tech stack. If it's not on this list, it doesn't exist here.
* **References:** An index of things that don't suck. We explain exactly *why* we like them, giving the agent a concrete aesthetic target to aim for instead of just guessing.

## The API Map

The system builds the API statically. More importantly, every single rule requires a `why` field. If you don't explicitly explain the *why*, the agent is going to guess, and its guess will probably be terrible.

* `/api/manifest.json`: The root index and routing table.
* `/api/identity.json`: Our core design DNA.
* `/api/directives.json`: Every hard rule, flattened into one big list.
* `/api/nodes.json`: The map of how everything connects.
* `/llms.txt`: A plain-text map to just spoon-feed the agent.

## The Stack

* **Astro + Starlight:** Content-first, ships barely any JavaScript, and gets out of the way.
* **TypeScript:** Strict mode everywhere. We aren't animals.
* **Zod:** Build-time validation for every node. If you mess up the frontmatter, the build fails instantly instead of silently feeding your agent a broken API contract.
