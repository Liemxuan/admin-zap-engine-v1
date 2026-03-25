# Reset Password Feature Development Workflow

---
description: Workflow for completing the Reset Password flow from email link
---

## 1. Extract Token
- Use `URLSearchParams` to get the token from `location.search`.

## 2. API Submission
- Send request with body containing token and new password.
- Ensure the correct `POST` method is used.

## 3. Feedback Loop
- Display a success message.
- Auto-redirect the user to the Login page so they can continue using the system.
