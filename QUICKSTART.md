# Quick Start - ScapeT Integration

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd ScapeT-front
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```bash
VITE_API_URL=http://localhost:8000
```

### 3. Start Backend (Terminal 1)
```bash
cd ../core-scapet
uvicorn app.main:app --reload
```

### 4. Start Frontend (Terminal 2)
```bash
cd ScapeT-front
npm run dev
```

### 5. Open Browser
```
http://localhost:5173
```

---

## 🧪 Quick Test

1. **Register**: Create account with any email/password (min 8 chars)
2. **Questionnaire**: Complete all 7 steps
3. **Generate**: Wait ~10-30 seconds for AI to generate guide
4. **View**: See your personalized itinerary
5. **Credits**: Check profile button - credits should be deducted

---

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `src/services/api.js` | API client with JWT interceptors |
| `src/contexts/AuthContext.jsx` | Authentication state |
| `src/pages/QuestionnairePage.jsx` | 7-step form with API integration |
| `src/pages/ResultsPage.jsx` | Displays generated guide |
| `.env` | Backend API URL configuration |

---

## 📡 API Mapping

### Frontend → Backend

**Questionnaire Form Data:**
```javascript
{
  destination: "Barcelona",          // → city
  dateRange: { from: Date, to: Date }, // → days (calculated)
  selectedInterests: ["Photography"], // → (mapped to enums)
  tripTypes: ["food", "history"],    // → interests
  budgetLevel: "medium",             // → budget
  travelType: "couple",              // → travel_type
  dislikes: "crowds, long walks"     // → dislikes
}
```

**Backend API Format:**
```json
{
  "city": "Barcelona",
  "days": 3,
  "interests": ["food", "history", "culture"],
  "budget": "medium",
  "travel_type": "couple",
  "dislikes": ["crowds", "long walks"]
}
```

---

## 🎯 Credits System

| Days | Cost |
|------|------|
| 1-9  | 100 credits |
| 10-14 | 250 credits |
| 15+  | 350+ credits |

- New users: **100 initial credits**
- Cost shown before submission
- Balance validated client-side
- Deducted after successful generation

---

## 🔐 Authentication Flow

```
1. Register/Login → JWT token
2. Token saved to localStorage
3. Token auto-injected in all API calls
4. 401/403 → Auto redirect to login
5. Logout → Clear token & redirect
```

**LocalStorage Keys:**
- `scapet_token`: JWT access token
- `scapet_user`: User profile data
- `scapet_guide`: Generated itinerary
- `theme`: Theme preference

---

## ❗ Common Issues

### "No response from server"
→ Check backend is running on port 8000

### "CORS error"
→ Backend must allow frontend URL in CORS settings

### "Token expired"
→ Login again (tokens expire after 60 minutes)

### Build fails
→ Run `npm install` to ensure dependencies are installed

### Page redirects to login immediately
→ Check localStorage for `scapet_token`, may need to re-login

---

## 📂 Project Structure

```
ScapeT-front/
├── .env                    # Configuration (create from .env.example)
├── src/
│   ├── services/          # API clients
│   ├── contexts/          # React contexts
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   └── utils/            # Helpers & transformers
└── dist/                 # Build output (after npm run build)
```

---

## 🛠️ Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 📖 Full Documentation

- **IMPLEMENTATION_SUMMARY.md**: Complete implementation details
- **INTEGRATION.md**: Technical integration guide
- **TESTING.md**: Comprehensive testing checklist
- **Backend docs**: `../core-scapet/docs/`

---

## ✅ Integration Checklist

- [x] Axios installed and configured
- [x] API client with JWT interceptors
- [x] AuthContext for state management
- [x] Login/Register pages integrated
- [x] Protected routes implemented
- [x] Questionnaire extended to 7 steps
- [x] Data transformation utilities
- [x] Guide generation API integrated
- [x] Results page loads real data
- [x] ProfileButton shows user data
- [x] Error handling with Spanish messages
- [x] Build completes successfully
- [x] No linter errors

---

**Status**: ✅ Ready for use  
**Last Updated**: January 31, 2026
