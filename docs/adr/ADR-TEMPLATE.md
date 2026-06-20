<!--
================================================================================
 ARCHITECTURE DECISION RECORD (ADR) — TEMPLATE
 Format: MADR 4.0.0  ·  https://adr.github.io/madr/

 HOW TO ADD A NEW ADR
 1. Copy this file into docs/adr/.
 2. Rename it:   NNNN-short-title-in-kebab-case.md
      • NNNN  = the next 4-digit sequence number, zero-padded, never reused.
                Take the highest existing number and add one (0001, 0002, …).
      • title = lowercase, hyphen-separated, imperative mood where it reads
                naturally ("use-…", "adopt-…", "migrate-…"). ~3–6 words, and it
                should match the "# Heading" below.
      • Examples:
            0001-use-per-route-rendering-strategy.md
            0002-use-supabase-client-over-pinia-for-data.md
            0007-adopt-conventional-commits.md
 3. Fill in the frontmatter and every relevant section.
 4. Delete optional sections you don't need — and delete this comment block.

 RULES
 • One decision per file.
 • ADRs are an append-only log: never renumber or delete an accepted ADR.
   To reverse one, write a NEW ADR and set the old one's status to
   "superseded by ADR-NNNN".

 STATUS LIFECYCLE
   proposed → accepted → (later) deprecated | superseded by ADR-NNNN
================================================================================
-->

---
status: "proposed" # proposed | accepted | rejected | deprecated | superseded by ADR-NNNN
date: YYYY-MM-DD # date of the last status change
decision-makers: [list everyone involved in the decision]
consulted: [] # people whose opinions were sought (two-way communication)
informed: [] # people kept up to date (one-way communication)
---

# {short title — the problem and its chosen solution}

## Context and Problem Statement

{Describe the context and problem in 2–3 sentences, or phrase it as the question
to be answered. Link to any issue tickets or discussion threads.}

## Decision Drivers

* {decision driver 1 — a force, concern, or requirement}
* {decision driver 2}
<!-- the number of drivers can vary -->

## Considered Options

* {title of option 1}
* {title of option 2}
* {title of option 3}
<!-- the number of options can vary -->

## Decision Outcome

Chosen option: "{title of option}", because {justification — e.g. it is the only
option that meets a must-have driver, resolves the key force, or scores best
against the drivers}.

### Consequences

* Good, because {positive consequence, e.g. a quality is improved}
* Bad, because {negative consequence, e.g. a quality is compromised}
<!-- the number of consequences can vary -->

### Confirmation

{How is implementation of / compliance with this decision confirmed? e.g. a code
review, a test, a lint rule, a CI check. Prefer something automatable.}

## Pros and Cons of the Options

<!-- Optional. Keep it when comparing the options adds value. -->

### {title of option 1}

{optional: example, description, or pointer to more information}

* Good, because {argument a}
* Neutral, because {argument b}
* Bad, because {argument c}
<!-- the number of arguments can vary -->

### {title of option 2}

* Good, because {argument a}
* Bad, because {argument b}

## More Information

{Optional: additional evidence, links to related ADRs, the team agreement, or
notes on when and how this decision should be revisited.}
