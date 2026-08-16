# AI Website Builder — Engineering Workflow

# Engineering Workflow

The Engineering Workflow defines how we approach, design, build, validate, and complete work throughout the project.

It is a single workflow with different paths depending on the type of work.

## Complete Workflow

```text
                         ENGINEERING WORKFLOW
                                  │
                                  ▼
                         New work / change
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │ 1. Problem / Requirement│
                    │          WHAT?           │
                    └────────────┬────────────┘
                                 │
                       What are we solving?
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Is a technical/design │
                    │   decision required?    │
                    └────────────┬────────────┘
                           ┌─────┴─────┐
                          No           Yes
                           │            │
                           │            ▼
                           │   ┌─────────────────────┐
                           │   │ 2. Technical        │
                           │   │    Decision         │
                           │   │       HOW?          │
                           │   └──────────┬──────────┘
                           │              │
                           │      Decide + document
                           │              │
                           │              ▼
                           └───────► ┌─────────────────────┐
                                    │ 3. Implementation    │
                                    │       BUILD          │
                                    └──────────┬──────────┘
                                               │
                                               ▼
                                    ┌─────────────────────┐
                                    │ 4. Testing &         │
                                    │    Validation        │
                                    └──────────┬──────────┘
                                               │
                                      Does it work?
                                         ┌─────┴─────┐
                                        No           Yes
                                         │            │
                                         ▼            │
                              ┌─────────────────────┐ │
                              │ 5. Failure →        │ │
                              │    Understand →     │ │
                              │    Resolve          │ │
                              └──────────┬──────────┘ │
                                         │            │
                                      Re-test         │
                                         │            │
                                         └──────┬─────┘
                                                │
                                                ▼
                                    ┌─────────────────────┐
                                    │ 6. Documentation &  │
                                    │    Completion       │
                                    └──────────┬──────────┘
                                               │
                                               ▼
                                             DONE
```

## The Three Core Questions

The workflow contains three fundamentally different types of work:

| Part                  | Question  | Purpose                                    |
| --------------------- | --------- | ------------------------------------------ |
| Problem / Requirement | **WHAT?** | Understand what we need to solve or build  |
| Technical Decision    | **HOW?**  | Determine how the problem should be solved |
| Implementation        | **BUILD** | Build the chosen solution                  |

The Technical Decision path is **conditional**. Not every task requires a significant technical decision.

## Supporting Processes

Testing, failure handling, and documentation are not independent development paths. They support the implementation process:

```text
Problem / Requirement
        ↓
Technical Decision (if required)
        ↓
Implementation
        ↓
Testing & Validation
        ↓
Failure → Understand → Resolve (if required)
        ↓
Documentation & Completion
        ↓
DONE
```

# Detailed Breakdown

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

## 4. Testing & Validation

Used when:
- An implementation has been completed
- A change needs to be verified
- We need to determine whether the requirement has actually been satisfied

Goal:

> Verify that the implementation behaves as expected and satisfies the requirement.

Flow:

```text
Implementation
→ Run the implementation
→ Verify expected behavior
→ Test relevant failure / edge cases
→ Compare result with requirement
→ Does it satisfy the requirement?
    → No → Debug / revise
    → Yes → Mark implementation validated
```

### Principle

Testing should be proportional to the change.

Small changes do not require unnecessary testing complexity, while critical areas such as authentication, security boundaries, VFS, and deployment require stronger validation.

---

## 5. Failure → Understand → Resolve

Used when:
- Something fails during development
- A test fails
- The system behaves unexpectedly
- An implementation produces an unexpected result

Goal:

> Understand why something failed before deciding how to fix it.

Flow:

```text
Failure
→ Reproduce
→ Observe / gather evidence
→ Understand why it failed
→ Identify root cause
→ Decide the appropriate solution
→ Implement the fix
→ Re-test
→ Verify the failure is actually resolved
```

### Principle

> **Every failure is an opportunity to understand the system.**

We should not treat an error merely as something to make disappear.

We understand the cause first, then choose and implement the appropriate solution.

Failure handling is considered during design and implementation by identifying relevant failure modes and deciding how the system should respond.

---

## 6. Documentation & Completion

Used when:
- A piece of work has been validated
- An important decision or learning needs to be preserved
- A requirement or design has changed

Goal:

> Preserve important knowledge and formally close the work.

Flow:

```text
Work validated
→ Identify anything important to preserve
→ Document if necessary
→ Confirm completion criteria
→ Mark work complete
```

### What should be documented?

- Important technical decisions and their reasoning
- Architectural changes
- Non-obvious system behavior
- Important lessons discovered during implementation
- Known limitations or trade-offs
- Changes to requirements or design

Documentation should be proportional to its value. We do not document obvious implementation details simply for the sake of documentation.

### Completion Criteria

A piece of work is complete when:

- The requirement is satisfied.
- The implementation has been validated.
- Relevant failures have been understood and resolved.
- Important decisions or knowledge have been documented when necessary.
- No known blockers remain for that piece of work.

Documentation closes the engineering loop; it does not mean creating a document for every task.
