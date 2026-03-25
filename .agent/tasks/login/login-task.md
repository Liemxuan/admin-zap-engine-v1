# Login Page Task List (ZAP Design Engine)

Mandatory checklist when building or upgrading the Login page.

---

### 📋 Implementation Checklist:
- [ ] **[LGN-TSK-01]** Declare Types: Define PascalCase interfaces for request/response.
- [ ] **[LGN-TSK-02]** i18n: Update Vietnamese/English localization in `src/shared/locales/`.
- [ ] **[LGN-TSK-03]** API Integration: Implement functions to call `/api/login/`.
- [ ] **[LGN-TSK-04]** Build Logic Hook: Complete `useLogin` for UI navigation.
- [ ] **[LGN-TSK-05]** LoginForm: Use `zap-input`, `zap-button`, and `zap-checkbox`.
- [ ] **[LGN-TSK-06]** SocialForm: Set up social login buttons (Google, Apple, Microsoft).
- [ ] **[LGN-TSK-07]** Page UI: Build `PageLogin.tsx` with centered layout and background video/parallax.
- [ ] **[LGN-TSK-08]** Router Setup: Register Router (`React.lazy`).
- [ ] **[LGN-TSK-09]** Auth Flow: Save token to `localStorage` and redirects.

### ⚡ UX/UI Checklist:
- [ ] **[LGN-TSK-10]** "Signing In..." animation on Login button while calling API.
- [ ] **[LGN-TSK-11]** Display detailed Error Alert (messages in Vietnamese/English).
- [ ] **[LGN-TSK-12]** Mobile Responsive: Check layout on all screen sizes.
- [ ] **[LGN-TSK-13]** Remember Me: Save login info as expected.
- [ ] **[LGN-TSK-14]** Enter key support for all input fields.

### 🛠 Maintenance & Upgrade (Advanced):
- [ ] **[LGN-TSK-15]** Write unit tests for `auth.service.ts` and `useLogin.ts`.
- [ ] **[LGN-TSK-16]** Optimize image/video asset loading on Login.
- [ ] **[LGN-TSK-17]** Add Forgot Password flow (if required).
