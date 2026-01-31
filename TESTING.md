# Testing Guide - ScapeT Integration

## Manual Testing Checklist

### Prerequisites
1. Backend API running on `http://localhost:8000` (or configured URL)
2. Backend has valid `GOOGLE_AI_API_KEY` configured
3. Frontend running on `http://localhost:5173` (or using build)

---

## Test Flow 1: User Registration & Authentication

### 1.1 Registration
- [ ] Navigate to `/register`
- [ ] Try submitting empty form → Should show validation errors
- [ ] Enter email without @ → Should show "Email is invalid"
- [ ] Enter password < 8 chars → Should show "Password must be at least 8 characters"
- [ ] Enter mismatched passwords → Should show "Passwords do not match"
- [ ] Register with valid data:
  ```
  Full Name: Test User
  Email: test@example.com
  Password: password123
  ```
- [ ] Should redirect to `/questionnaire` after successful registration
- [ ] Check localStorage:
  - `scapet_token` should contain JWT token
  - `scapet_user` should contain user data with 100 initial credits

### 1.2 Login
- [ ] Logout (from profile dropdown)
- [ ] Navigate to `/login`
- [ ] Try invalid credentials → Should show error message
- [ ] Enter password < 8 chars → Should show validation error
- [ ] Login with registered credentials
- [ ] Should redirect to `/questionnaire`
- [ ] Verify token and user data in localStorage

### 1.3 Protected Routes
- [ ] Logout
- [ ] Try accessing `/questionnaire` → Should redirect to `/login`
- [ ] Try accessing `/results` → Should redirect to `/login`
- [ ] Try accessing `/dashboard` → Should redirect to `/login`
- [ ] Login → Should allow access to protected routes

---

## Test Flow 2: Questionnaire & Guide Generation

### 2.1 Step 1: Destination
- [ ] Navigate to `/questionnaire` (must be logged in)
- [ ] Try clicking Next without entering destination → Button should be disabled
- [ ] Enter destination: "Barcelona"
- [ ] Click Next

### 2.2 Step 2: Dates
- [ ] Try clicking Next without selecting dates → Button should be disabled
- [ ] Click "Select dates" button
- [ ] Calendar should appear
- [ ] Select date range (e.g., 3 days from tomorrow)
- [ ] Verify day count displays correctly
- [ ] Try selecting > 14 days → Should show error on submit
- [ ] Click Next

### 2.3 Step 3: Interests
- [ ] Try clicking Next without selecting interests → Button should be disabled
- [ ] Select multiple interests (e.g., Photography, Art & Museums, Beaches)
- [ ] Selected count should update
- [ ] Click Next

### 2.4 Step 4: Budget
- [ ] Click "Yes" for budget
- [ ] Slider should appear
- [ ] Adjust slider to $5,000
- [ ] Click "Change Answer" → Should reset to choice buttons
- [ ] Click "No" for budget
- [ ] Three budget levels should appear (Low, Medium, High)
- [ ] Select "Medium"
- [ ] Click Next

### 2.5 Step 5: Trip Types
- [ ] Try clicking Next without selecting trip types → Button should be disabled
- [ ] Select multiple trip types (e.g., Food, History, Nature)
- [ ] Selected count should update
- [ ] Click Next

### 2.6 Step 6: Travel Type
- [ ] Try clicking Next without selecting travel type → Button should be disabled
- [ ] Select one option (e.g., "Couple")
- [ ] Only one should be selected (radio-like behavior)
- [ ] Click Next

### 2.7 Step 7: Dislikes (Optional)
- [ ] This step is optional, Next should be enabled
- [ ] Enter dislikes: "crowds, long walks"
- [ ] Verify credit cost summary displays:
  - Trip duration: X days
  - Credit cost: Y credits (100 for 1-9 days, 250 for 10-14 days)
  - Your balance: Should show user's credits
- [ ] If credits < cost → Should show error on submit
- [ ] Click "Create My Trip"

### 2.8 Guide Generation
- [ ] Loading screen should appear with rotating messages
- [ ] Wait for API response (may take 10-30 seconds)
- [ ] Should redirect to `/results` on success
- [ ] Check localStorage:
  - `scapet_guide` should contain guide data
  - `scapet_guide_city` should contain "Barcelona"
  - `scapet_guide_days` should contain day count

### 2.9 Error Handling
- [ ] If backend is down → Should show connection error
- [ ] If insufficient credits → Should show credit error
- [ ] If validation fails → Should show validation error
- [ ] If API key invalid → Should show server error

---

## Test Flow 3: Results Page

### 3.1 Initial Load
- [ ] Navigate to `/results` (after generating guide)
- [ ] Should display itinerary for selected destination
- [ ] Title should show "Your {City} Itinerary"
- [ ] Day tabs should display all days
- [ ] First day should be selected by default

### 3.2 Navigation
- [ ] Click different day tabs
- [ ] Content should update to show selected day's schedule
- [ ] Selected tab should be highlighted
- [ ] Scroll through activities in timeline

### 3.3 Activity Details
- [ ] Each activity should show:
  - Time
  - Duration
  - Place name
  - Activity type icon
  - Physical effort badge (Low/Medium/High)
  - Description/reason
  - Traveler tips (expandable)
  - Avoid if conditions
  - Best time window
- [ ] Timeline line should connect activities
- [ ] Hover effects should work on cards

### 3.4 Daily Information
- [ ] Day header should show:
  - Day number
  - Title
  - Zone
  - Pace badge (Relaxed/Balanced/Intense)
- [ ] Daily tips section should display at top

### 3.5 Export PDF
- [ ] Click "Export PDF" button
- [ ] Browser print dialog should open
- [ ] Preview should show all days (not just selected day)
- [ ] Print-specific styling should apply
- [ ] Save as PDF or print

### 3.6 Direct Access
- [ ] Try navigating to `/results` without guide data
- [ ] Should redirect to `/questionnaire`
- [ ] Refresh page with guide data → Should reload from localStorage

---

## Test Flow 4: Profile & Credits

### 4.1 Profile Button
- [ ] Profile button should display in top-right
- [ ] Should show user icon and credit count
- [ ] Click to open dropdown

### 4.2 Profile Dropdown
- [ ] Should show:
  - User's full name
  - User's email
  - TriPoints (credits) display
  - Logout button
- [ ] Credits should match backend value

### 4.3 Credit Deduction
- [ ] Note initial credit count before generation
- [ ] Generate a guide
- [ ] Check profile after generation
- [ ] Credits should be deducted:
  - 1-9 days: -100 credits
  - 10-14 days: -250 credits
- [ ] Credit count should update in profile button

### 4.4 Logout
- [ ] Click "Logout" in dropdown
- [ ] Should clear localStorage (`scapet_token`, `scapet_user`)
- [ ] Should redirect to `/login`
- [ ] Try accessing protected route → Should redirect to login

---

## Test Flow 5: Theme Toggle

### 5.1 Theme Switching
- [ ] Click theme toggle button (top-left)
- [ ] Page should switch between light and dark mode
- [ ] Theme preference should persist in localStorage
- [ ] Refresh page → Theme should be remembered
- [ ] Test theme toggle on:
  - Login page
  - Register page
  - Questionnaire page
  - Results page

---

## Test Flow 6: Error Scenarios

### 6.1 Network Errors
- [ ] Stop backend server
- [ ] Try to login → Should show "No response from server"
- [ ] Try to register → Should show connection error
- [ ] Try to generate guide → Should show connection error

### 6.2 Invalid Token
- [ ] Login successfully
- [ ] Manually edit `scapet_token` in localStorage to invalid value
- [ ] Try to access `/questionnaire`
- [ ] Should redirect to `/login`
- [ ] Token should be cleared from localStorage

### 6.3 Expired Token (Manual)
- [ ] Login successfully
- [ ] Wait 60 minutes (token expiry)
- [ ] Try to generate guide
- [ ] Should redirect to `/login`
- [ ] Should show "Session expired" message

### 6.4 Validation Errors
- [ ] Try registering with existing email → Should show "Email already registered"
- [ ] Try invalid city name → Should show validation error
- [ ] Try > 14 days → Should show error
- [ ] Try > 8 interests → Should show error

---

## Test Flow 7: Data Persistence

### 7.1 LocalStorage Persistence
- [ ] Login and complete questionnaire
- [ ] Refresh page at any step
- [ ] Auth state should persist (stay logged in)
- [ ] Navigate away and back
- [ ] User should remain authenticated

### 7.2 Guide Data Persistence
- [ ] Generate a guide
- [ ] View results
- [ ] Refresh page
- [ ] Guide should reload from localStorage
- [ ] Navigate away from results
- [ ] Navigate back to results
- [ ] Same guide should display

### 7.3 Cross-Tab Behavior
- [ ] Login in one tab
- [ ] Open new tab with same app
- [ ] Should be logged in (shared localStorage)
- [ ] Logout in one tab
- [ ] Refresh other tab → Should be logged out

---

## Test Flow 8: Responsive Design

### 8.1 Mobile View (< 768px)
- [ ] Test all pages on mobile viewport
- [ ] Forms should be readable and usable
- [ ] Buttons should be tap-friendly
- [ ] Cards should stack vertically
- [ ] Navigation should work smoothly

### 8.2 Tablet View (768px - 1024px)
- [ ] Test questionnaire grid layouts
- [ ] Day tabs should scroll horizontally if needed
- [ ] Cards should display properly

### 8.3 Desktop View (> 1024px)
- [ ] Full layout should display
- [ ] Grids should show multiple columns
- [ ] Hover effects should work

---

## API Integration Tests

### Backend Health Check
```bash
curl http://localhost:8000/health
```
Expected: `{"status":"ok","version":"1.0.0","gemini_configured":true}`

### Test Registration
```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "password": "password123",
    "full_name": "Test User 2"
  }'
```
Expected: JWT token response

### Test Login
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test2@example.com",
    "password": "password123"
  }'
```
Expected: JWT token response

### Test Protected Endpoint
```bash
curl http://localhost:8000/profile/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
Expected: User profile data

### Test Guide Generation
```bash
curl -X POST http://localhost:8000/generate-guide \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "city": "Barcelona",
    "days": 3,
    "interests": ["food", "history", "nature"],
    "budget": "medium",
    "travel_type": "couple",
    "dislikes": ["crowds"]
  }'
```
Expected: Guide response with itinerary

---

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Performance Tests

### Load Time
- [ ] Initial page load < 2s
- [ ] Route transitions < 500ms
- [ ] API responses display loading states

### Bundle Size
- [ ] Check build output: `npm run build`
- [ ] Total bundle < 1.5MB (currently ~1.3MB)
- [ ] Consider code-splitting for future optimization

---

## Security Tests

### Authentication
- [ ] Cannot access protected routes without token
- [ ] Invalid tokens are rejected
- [ ] Expired tokens are cleared and user redirected
- [ ] Logout clears all auth data

### XSS Prevention
- [ ] User input is properly escaped in forms
- [ ] No inline script execution
- [ ] CSP headers (backend responsibility)

### Data Validation
- [ ] Client-side validation matches server-side
- [ ] Cannot submit invalid data
- [ ] Server errors are handled gracefully

---

## Regression Tests (Future)

After any changes, re-run:
- [ ] Full authentication flow
- [ ] Guide generation end-to-end
- [ ] Profile credit display
- [ ] Theme persistence

---

## Known Issues / Limitations

1. **Token Refresh**: No automatic token refresh implemented (expires after 60 min)
2. **Offline Mode**: No offline functionality or service worker
3. **Bundle Size**: Large bundle due to Three.js (Silk component)
4. **Rate Limiting**: No frontend indication of rate limit status
5. **Credit Purchase**: No credit purchase flow implemented

---

## Success Criteria

✅ All authentication flows work without errors
✅ Guide generation completes successfully
✅ Credits are deducted correctly
✅ Results display properly with all data
✅ Protected routes are secure
✅ Error messages are user-friendly
✅ Theme persists across sessions
✅ Build completes without errors
✅ No console errors during normal operation

---

## Next Steps (Future Enhancements)

1. Add automated tests (Vitest + React Testing Library)
2. Implement token refresh flow
3. Add loading skeletons for better UX
4. Optimize bundle size (code-splitting, lazy loading)
5. Add service worker for offline support
6. Implement credit purchase flow
7. Add trip history/favorites feature
8. Add social sharing for generated guides
9. Implement password reset flow
10. Add user settings page

---

**Testing completed by**: _____________
**Date**: _____________
**Backend Version**: _____________
**Frontend Version**: _____________
**Issues found**: _____________
