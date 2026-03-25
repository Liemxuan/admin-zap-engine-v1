# Login Page Implementation Workflow (ZAP Design Engine)

Standard workflow for releasing or maintaining the Login page.

---

### [LGN-WF-01] Declare Domain Types (src/features/auth/types/)
- Define interfaces for Login Request (UserName/Account, Email/MerchantName, Password, IsRemember).
- Define interfaces for Login Response (Success, Message, AccessToken, RefreshToken - apply PascalCase).

### [LGN-WF-02] Develop Auth Service (API) (src/features/auth/services/)
- Write API call functions via the shared Axios Client.
- Strictly map and type-cast API payloads and responses.

### [LGN-WF-03] Implement Business Logic Hook (src/features/auth/hooks/)
- Manage formData via useState.
- Handle Loading state and Error messages from API responses.
- Save Token to localStorage and redirect to Dashboard on success.

### [LGN-WF-04] Build UI Components (src/features/auth/components/)
- Use zap-input for fields, zap-button for Submit.
- Create LoginForm.tsx (form logic) and SocialForm.tsx (social logins).
- Integrate i18n (useTranslation) for labels, placeholders, and error messages.

### [LGN-WF-05] Complete Page Layout (src/features/auth/pages/)
- Create PageLogin.tsx: Design centered layout with responsive background for all devices.
- Apply smooth animations when loading the form into the page.

### [LGN-WF-06] Register Route & Code-splitting (src/app/router/)
- Add Route to the application configuration.
- Use React.lazy to optimize initial page load.
- Ensure both /login path and root / point to PageLogin.

---

### Optimization Tips:
- **[LGN-WF-TIP-01]** Always check the disabled state of the button when isLoading to prevent double requests.
- **[LGN-WF-TIP-02]** Support Enter key interaction (keyDown) across the entire login form to improve user speed.
