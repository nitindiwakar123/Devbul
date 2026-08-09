# Project Charter

**Version:** 0.1
**Status:** Draft
**Date:** YYYY-MM-DD

---

# 1. Purpose

This project exists to help us become better software engineers by designing and building a complex software system from first principles.

The AI Website Builder is not the final goal—it is the vehicle through which we will learn how modern software systems are designed, implemented, deployed, and evolved.

Throughout this project, we aim to understand not only *how* technologies work, but *why* they exist, the problems they solve, and the trade-offs involved in choosing them.

---

# 2. Core Capability

The system enables users to transform their ideas into live websites and web applications through natural language, allowing them to build, refine, and iterate collaboratively with AI.

---

# 3. Success Criteria

## Completion Criteria

The project will be considered complete when:

- The planned MVP has been implemented.
- The application is successfully deployed and publicly accessible.
- Project documentation accurately reflects the implemented system.

---

## Success Criteria

The project will be considered successful when:

- We understand every major architectural decision made throughout the project.
- We can explain why each major technology was selected and where it fits within the system.
- We can confidently extend and improve the project without relying on step-by-step tutorials.
- We can apply the same engineering process to build other complex software systems.

---

## 4. Scope & Boundaries

### MVP Scope

The MVP will provide the following end-to-end workflow:

> **Verified User → Create Project → Describe Idea → AI Generation → Edit Files → Live Preview → Deploy → Live Website**

The system will allow users to:

- Create persistent projects.
- Describe the website they want using natural language.
- Generate HTML, CSS, and JavaScript using AI.
- Modify the generated files.
- See their changes through a live preview.
- Deploy the resulting website to a live URL.

### Explicitly Out of Scope for MVP

The following capabilities are intentionally excluded from the MVP:

- React or other framework-based application generation.
- Generated backend applications.
- Complex full-stack application generation.
- Advanced collaboration features.
- Multiple deployment providers.
- PostgreSQL migration.
- Advanced or agentic AI workflows.

> **Note:** Being out of scope for the MVP does not mean these features will never be implemented. They may be introduced in later phases as the system evolves.

---

## 5. Constraints

### Time Constraint

The initial MVP is targeted for the first **5 days** of the project.

The remaining 10 days of the current 15-day plan are reserved for bringing Zafilo toward production.

### Financial Constraint

Infrastructure and API costs should be minimized.

The project should make responsible use of free tiers and paid cloud resources and should not assume unlimited access to external services.

The system should therefore include reasonable resource limits rather than providing users with unlimited access to finite and paid resources.

### Resource Constraint

This project is being built by a **single engineer**.

We should therefore avoid unnecessary complexity that does not contribute to the project's goals.

### MVP Scope Constraint

The MVP is intentionally limited to generating:

- HTML
- CSS
- JavaScript

More advanced application generation belongs to later phases.

---

## 6. Assumptions

No additional project-level assumptions have been identified at this stage.

Assumptions that materially affect architectural or implementation decisions will be documented when those decisions are made.

---

## 7. Risks

### Critical Risks

#### 7.1 AI Reliability

AI-generated code may be:

- Invalid or incomplete.
- Inconsistent across files.
- Incorrect relative to the user's request.
- Potentially unsafe.

**Impact:** AI generation is the core capability of the system. Unreliable generation directly affects the fundamental purpose of the product.

**Initial mitigation direction:**

- Validate generated output.
- Introduce controlled generation workflows.
- Handle generation failures gracefully.
- Allow users to refine and correct generated output through subsequent interactions.

Detailed mitigation will be designed during the relevant architecture and implementation phases.

---

#### 7.2 Deployment Failures

A generated project may work correctly in the preview environment but fail during deployment.

**Impact:** The intended workflow ends with a live website. Successful preview alone is insufficient.

**Initial mitigation direction:**

- Validate generated files before deployment.
- Establish a controlled deployment workflow.
- Track deployment state.
- Handle failed deployments gracefully.

Detailed deployment architecture will be addressed during the HLD/implementation phases.

---

#### 7.3 Security Vulnerabilities

The system will process user input, store projects, render generated code, and communicate with external services. This creates potential security risks including:

- Broken access control.
- Injection vulnerabilities.
- Cross-Site Scripting (XSS).
- Cross-Site Request Forgery (CSRF).
- Authentication and session vulnerabilities.
- Unauthorized project/file access.
- Malicious user-provided or AI-generated content.
- Insufficient isolation of generated code during preview.

**Impact:** Security vulnerabilities could result in unauthorized access, data exposure, abuse of infrastructure, or compromise of the application.

Security will therefore be treated as a first-class engineering concern throughout the project rather than as a final-stage feature.

---

### Significant Risks

#### 7.4 Resource Abuse

Users may intentionally or unintentionally consume excessive:

- AI API usage.
- Storage.
- Deployment resources.
- Bandwidth.

Initial resource-control measures include:

- Email verification through OTP.
- Maximum of **10 projects per user**.

These measures reduce abuse but do not guarantee prevention, particularly because temporary or disposable email addresses may still pass verification.

Additional controls such as quotas, rate limiting, storage limits, and usage limits may be introduced later.

---

#### 7.5 MVP Scope Creep

The system has significant potential for expansion, which creates a risk of continuously adding features before completing the initial MVP.

Examples include:

- React generation.
- Backend generation.
- Git integration.
- Collaboration.
- Advanced AI agents.
- Additional deployment providers.

The explicitly defined MVP boundary will be used to prevent unnecessary expansion during the initial phase.

---

#### 7.6 Time Pressure

The initial MVP has a 5-day target.

The primary risk is not only failing to complete the MVP, but also rushing implementation in a way that undermines the project's primary learning objective.

The schedule should therefore guide prioritization without encouraging blind implementation or skipping necessary understanding.

---

#### 7.7 Infrastructure and API Costs

AI API calls, object storage, deployment, bandwidth, and other cloud resources may generate costs.

This risk is related to resource abuse but is distinct:

- **Resource abuse:** excessive consumption caused by individual users.
- **Infrastructure/API cost:** the overall financial cost of operating the system.

The project should monitor and control resource consumption throughout development and deployment.