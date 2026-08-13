# Devbul — Functional Requirements

## 1. Authentication

The MVP supports two authentication paths.

### Email Authentication

- [ ] Email registration
- [ ] Email OTP verification
- [ ] Login
- [ ] Logout
- [ ] Authenticated application sessions

### Authentication Flow

```text
User
  ↓
Registration
  ↓
Enter Email
  ↓
Receive OTP
  ↓
Verify OTP
  ↓
Verified Account
  ↓
Login
  ↓
Authenticated Session
```

### Google Authentication

- [ ] Google authentication using OAuth 2.0 / OpenID Connect

### Google Authentication Flow

```text
User
  ↓
Continue with Google
  ↓
Google Authentication
  ↓
Consent / Authorization
  ↓
OpenID Connect Identity
  ↓
Authenticated Application Session
```

### Authentication Scope

Detailed behavior such as OTP expiry, retry limits, session lifetime, and account linking will be defined before HLD rather than assumed here.

---

## 2. Create Project

- [ ] Authenticated user can create a project.
- [ ] User must provide a project name.
- [ ] System creates and persists the project resource.
- [ ] Project belongs to exactly one user.
- [ ] Users can access only their own projects.
- [ ] New projects initially contain no generated files.
- [ ] Maximum 10 projects per user.
- [ ] File creation is handled later by the AI Generation workflow.

### Project Creation Flow

```text
Authenticated User
        ↓
Create Project
        ↓
Provide Project Name
        ↓
Project Resource Created
        ↓
Project Metadata Persisted
        ↓
Describe Website Idea
```

---

## 3. Describe Idea

- [ ] Project owner can provide a natural-language description of the desired website.
- [ ] System may collect additional structured information and metadata.
- [ ] System transforms the user's input and available context into an appropriate representation for the AI Generation workflow.
- [ ] User can review and modify their input before generation.
- [ ] Generation request requires sufficient website intent / description.
- [ ] Exact AI-facing representation remains a design decision for the AI Workflow / HLD.

### Describe Idea Flow

```text
Project Owner
      ↓
Open Project
      ↓
Describe Website Idea
      ↓
Provide / Modify Input
      ↓
System Collects Relevant Context
      ↓
Generation Request Ready
      ↓
AI Generation
```

### Important Design Boundary

The user-facing input model and AI-facing representation are separate concerns.

The user can describe the website naturally while the system may internally create a structured representation containing:

- User intent
- Project context
- Structured information
- System metadata

The exact structure, prompt strategy, intermediate schema, and context assembly will be decided during AI Workflow / HLD.

---

## 4. AI Generation

### Generation Model

- [ ] MVP uses one-shot AI generation.
- [ ] Generation receives the user's website intent plus system-defined generation constraints.
- [ ] MVP generates only HTML, CSS, and JavaScript.
- [ ] User instructions cannot override system-level generation constraints.
- [ ] AI-generated output must be validated before acceptance.
- [ ] Invalid or out-of-contract output must not be persisted as project files.
- [ ] AI is treated as an untrusted component from the application's security perspective.
- [ ] Exact enforcement mechanism is deferred to HLD/LLD.

### AI Generation Flow

```text
Website Intent
      ↓
Generation Request
      ↓
System Generation Constraints
      ↓
AI Model
      ↓
Generated HTML / CSS / JS
      ↓
Output Validation
      ↓
Valid Output?
   ┌──┴──┐
  No     Yes
  ↓       ↓
Reject   Persist
          Generated
          Files
```

---

## 5. Generated Files

- [ ] Generated HTML, CSS, and JavaScript files are uploaded to S3 / Cloudflare R2 before the corresponding project database state is updated.
- [ ] After successful upload, the project database entry is updated with the resulting storage information.
- [ ] The UI reflects the new project state only after the database update succeeds.
- [ ] If object-storage upload fails, the project database state must not be updated as if generation succeeded.
- [ ] If database update fails after successful object-storage upload, the system must handle the resulting inconsistent state rather than reporting the operation as fully successful.
- [ ] Exact consistency and recovery mechanism is deferred to HLD/LLD.

### Generated Files Persistence Flow

```text
AI Generated Output
        ↓
Validate Output
        ↓
Upload HTML / CSS / JS
to S3 / Cloudflare R2
        ↓
Upload Successful?
    ┌────┴────┐
   No         Yes
   ↓           ↓
Handle       Update
Failure      Project DB
               ↓
          DB Update Successful?
             ┌────┴────┐
            No         Yes
            ↓           ↓
       Handle Partial   Reflect
          Failure       Changes
                        on UI
```

---

## MVP Flow

```text
Verified User
      ↓
Create Project
      ↓
Describe Idea
      ↓
AI Generation
      ↓
Validate Generated Output
      ↓
Upload Files to Object Storage
      ↓
Update Project Database
      ↓
Reflect Changes on UI
      ↓
Edit Files
      ↓
Live Preview
      ↓
Deploy
      ↓
Live Website
```

### Locked So Far

- [x] Authentication
- [x] Create Project
- [x] Describe Idea
- [x] AI Generation
- [x] Generated Files Persistence
