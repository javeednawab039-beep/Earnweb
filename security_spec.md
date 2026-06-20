# EarnHub AI security_spec.md

This specification details the zero-trust security policies for EarnHub AI Firestore database paths, targeting access patterns, security barriers, and preventative measures.

## 1. Data Invariants

- **User Accounts**: A user's public record (`/users/{userId}`) can only be created with their own authenticated `uid`. The coin counts and cash balance cannot be set to arbitrary values during creation (it must default or be incremented conditionally).
- **Sub-collections Membership**: A task completion `/users/{userId}/completions/{completionId}` can only be created by the owner whose `uid` matches the `{userId}` wildcard.
- **Admin Roles**: Only predefined admin emails can perform write, edit, delete operations on `/tasks`, `/quizzes`, and approve `/withdrawals`. The bootstrapped admin email is `javeednawab039@gmail.com`.
- **Temporal Integrity**: All timestamp fields such as `createdAt`, `completedAt` must refer strictly to the server timestamp (`request.time`).
- **Withdrawals State Lock**: Withdrawals can only be created with `status: "pending"`. A non-admin user cannot edit, delete, or alter any withdrawal after submission, nor can they bypass rules to approve their own payout.

---

## 2. The "Dirty Dozen" Vulnerability Scenarios Checked

1. **Self-Approve Withdrawal**: User submissions can't overwrite `status: "approved"` directly on creation.
2. **Infinite Balance Injection**: A user cannot directly update their own `/users/{userId}` coin balance by setting it to `999999` without dynamic checks or admin action.
3. **Task Manipulation**: A non-admin user cannot edit or delete tasks located under `/tasks/{taskId}`.
4. **Quiz Manipulation**: A non-admin user cannot edit or delete quizzes under `/quizzes/{quizId}`.
5. **PII Blanket Scrape**: A logged-in user cannot read other users' sensitive private settings under `/users/{differentUserId}/private/info`.
6. **Task Completions Impersonation**: User A cannot create a task completion record under User B's `/users/userB/completions/` path.
7. **Identity Spoofing**: Registering `/users/{userId}` with a mismatching `displayName` or assigning the admin flag programmatically.
8. **Withdrawal Overwrite**: User B tampering with User A's withdrawal proposal or changing payment details.
9. **Creation Timestamp Spoofing**: Sending client-clock based dates instead of `request.time`.
10. **ID Character Poisoning**: Attempting to query paths or inject extremely long, corrupted strings as Document IDs (e.g. 100kb strings or invalid characters).
11. **Shadow Field Injection**: Inserting arbitrary fields (`isVerified: true`, `isAdmin: true`) inside document updates that are not explicitly allowed.
12. **Bypassing Verification**: Writing to the DB when the auth email is unverified (`request.auth.token.email_verified == false`).

---

## 3. Zero-Trust Access Rules Matrix

| Path | Get (Single) | List (Collection) | Create | Update | Delete |
|---|---|---|---|---|---|
| `users/{userId}` | Authenticated | Authenticated | Owner Only | Owner (limited) \|\| Admin | Admin Only |
| `users/{userId}/private/info` | Owner \|\| Admin | Owner \|\| Admin | Owner Only | Owner (limited) \|\| Admin | Admin Only |
| `users/{userId}/completions/{id}`| Owner \|\| Admin | Owner \|\| Admin | Owner Only | Owner Only | Admin Only |
| `tasks/{taskId}` | Authenticated | Authenticated | Admin Only | Admin Only | Admin Only |
| `withdrawals/{id}` | Owner \|\| Admin | Owner (filtered) \|\| Admin | Owner Only | Admin Only (approve/reject) | Admin Only |
| `quizzes/{quizId}` | Authenticated | Authenticated | Admin Only | Admin Only | Admin Only |
| `notifications/{id}` | Authenticated | Authenticated | Admin Only | Admin Only | Admin Only |
