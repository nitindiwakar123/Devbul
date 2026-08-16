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

---

## 6. Edit Files

### File Operations

- [ ] View files
- [ ] Edit file contents
- [ ] Create files
- [ ] Delete files
- [ ] Rename files
- [ ] Upload permitted image/video assets

### Supported Content

Code files supported in the MVP:

- HTML
- CSS
- JavaScript

Users can upload permitted website assets such as:

- Images
- Videos
- Photos/assets used by the website

### Security Boundary

- [ ] Users cannot create or upload arbitrary malicious or unsupported files.
- [ ] User file restrictions are enforced separately from AI generation restrictions.
- [ ] Exact file validation, MIME/type restrictions, size limits, storage, and persistence mechanisms are deferred to HLD/LLD.

### Persistence

- [ ] MVP provides an explicit **Save** button.
- [ ] Changes are persisted only when the user saves.
- [ ] No autosave requirement in MVP.

### Undo / Redo

- [ ] Undo
- [ ] Redo
- [ ] Full project version history is not part of MVP.

### Edit Files Flow

```text
Generated / Existing Project
          ↓
       File Editor
          ↓
   ┌──────┼───────────┐
   ↓      ↓           ↓
 View   Edit/Create   Upload
 Files   /Rename     Assets
   │      │           │
   └──────┼───────────┘
          ↓
      Undo / Redo
          ↓
        Save
          ↓
     Validate Changes
          ↓
   Persist Project State
          ↓
      Live Preview
```

---

## 7. Live Preview

- [ ] Preview renders the project's HTML, CSS, and JavaScript.
- [ ] Preview reflects the latest saved project state.
- [ ] HTML is sanitized using **DOMPurify before rendering**.
- [ ] HTML is also sanitized using **DOMPurify before being persisted/saved**.
- [ ] Preview does not execute arbitrary file types as part of the website.
- [ ] Exact preview isolation/sandboxing mechanism is deferred to HLD/LLD.

### Preview Flow

```text
Saved Project State
        ↓
Load HTML / CSS / JS
        ↓
Sanitize HTML
        ↓
Render Preview
        ↓
Execute Website
        ↓
User Sees Live Preview
```

### Save Flow

```text
User Changes HTML
       ↓
Click Save
       ↓
Sanitize HTML
       ↓
Persist Sanitized HTML
       ↓
Updated Saved State
       ↓
Preview Reflects Changes
```

---

## 8. Deploy

### Deployment Scope

- [ ] MVP supports static website deployment only.
- [ ] Deployment contains HTML, CSS, and JavaScript.
- [ ] Backend/server-side code deployment is not part of MVP.
- [ ] Database/API hosting for user websites is not part of MVP.

### Deployment Requirements

- [ ] Authenticated project owner can deploy the latest saved version of their project.
- [ ] Successful deployment produces a publicly accessible URL.
- [ ] User can continue editing the project after deployment.
- [ ] Changes must be saved before they can be redeployed.
- [ ] Redeployment updates the existing live website.
- [ ] The public URL remains associated with the project across successful redeployments.
- [ ] Deployment failures must not be reported as successful.
- [ ] Previous deployment versions and rollback are not part of MVP.

### Deployment Flow

```text
Saved Project
      ↓
Deploy
      ↓
Prepare Static Website
      ↓
Deploy HTML / CSS / JS
      ↓
Deployment Successful?
   ┌────┴────┐
  No         Yes
  ↓           ↓
Handle      Generate /
Failure     Obtain Public URL
              ↓
          Live Website
```

### Deployment Lifecycle

```text
Edit
  ↓
Save
  ↓
Live Preview
  ↓
Deploy
  ↓
Live Website
  │
  └──── Edit
         ↓
        Save
         ↓
      Preview
         ↓
      Redeploy
         ↓
 Updated Live Website
```

### Deployment Design Boundary

The following remain HLD/LLD decisions:

- Deployment provider
- Hosting architecture
- URL strategy
- Deployment isolation
- Deployment update mechanism
- Failure recovery

---

# MVP Functional Requirements — Complete Flow

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
Edit Files
      ↓
Save
      ↓
Live Preview
      ↓
Deploy
      ↓
Live Website
      │
      └──── Edit → Save → Preview → Redeploy
```

## Functional Requirements Status

- [x] Authentication
- [x] Create Project
- [x] Describe Idea
- [x] AI Generation
- [x] Generated Files Persistence
- [x] Edit Files
- [x] Live Preview
- [x] Deploy

> **Functional Requirements define WHAT Devbul must do. Implementation mechanisms and architectural solutions are deferred to HLD/LLD.**