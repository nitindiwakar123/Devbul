# AI Website Builder — Engineering Workflow

## 1. Problem / Requirement

Used when:
- A new requirement appears
- A problem is discovered
- Existing behavior needs to change

Goal:

> Clearly understand what problem we are solving.

Flow:

```text
Problem
→ Understand
→ Clarify requirements
→ Define constraints
→ Define expected outcome
→ Ready for solution design
```

---

## 2. Technical Decision

Used when:
- Multiple technical approaches exist
- An architectural decision is required
- We don't understand a technology/concept needed to proceed

Goal:

> Choose a solution based on understanding and trade-offs.

Flow:

```text
Problem to solve
→ Understand constraints
→ Identify approaches
→ Research / learn if needed
→ Compare trade-offs
→ Decide
→ Document reasoning
→ Lock decision
```

---

## 3. Implementation

Used when:
- The requirement is understood
- Necessary technical decisions are locked
- We are ready to build

Goal:

> Build and validate the chosen solution.

Flow:

```text
Locked requirement/design
→ Define implementation scope
→ Implement smallest meaningful piece
→ Run
→ Test
→ Debug / understand failures
→ Refactor if necessary
→ Validate against requirements
→ Complete
```

---

## Core Principle

Not every task needs all three paths.

The Technical Decision workflow is triggered only when a meaningful technical or design decision is required.

The three paths answer different questions:

- **Problem / Requirement → WHAT**
- **Technical Decision → HOW**
- **Implementation → BUILD**
