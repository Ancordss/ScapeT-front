# ScapeT Frontend - Integration Complete

This frontend application is now fully integrated with the core-scapet backend API.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env and set your backend API URL
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## Integration Features

### ✅ Completed Integration

- **Authentication System**
  - JWT-based authentication
  - Login and registration flows
  - Protected routes with automatic redirection
  - Persistent auth state (localStorage)
  - Automatic token injection in API requests

- **User Profile Management**
  - Real-time credit balance display
  - Profile information from backend
  - Logout functionality

- **Travel Guide Generation**
  - 7-step questionnaire with validation
  - Real-time credit cost calculation
  - API integration for guide generation
  - Data transformation (frontend ↔ backend)

- **Results Display**
  - Dynamic itinerary loading from API
  - PDF export functionality
  - Credit deduction handling

- **Error Handling**
  - User-friendly error messages
  - Validation error display
  - Network error handling
  - 401/403 automatic redirection

### API Endpoints Used

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /profile/me` - Get user profile
- `POST /generate-guide` - Generate travel itinerary

### Data Flow

```
User Input (Questionnaire) 
  → Data Transformation (dataTransformers.js)
  → API Request (guideService.js)
  → Backend Processing (FastAPI + Gemini AI)
  → API Response
  → LocalStorage + State Update
  → Results Display
```

### File Structure

```
src/
├── services/
│   ├── api.js              # Axios client with interceptors
│   ├── authService.js      # Authentication endpoints
│   ├── profileService.js   # Profile management
│   └── guideService.js     # Guide generation
├── contexts/
│   ├── AuthContext.jsx     # Auth state management
│   └── ThemeContext.jsx    # Theme management
├── components/
│   ├── ProtectedRoute.jsx  # Route protection HOC
│   └── ProfileButton.jsx   # User profile dropdown
├── pages/
│   ├── LoginPage.jsx       # Login form
│   ├── RegisterPage.jsx    # Registration form
│   ├── QuestionnairePage.jsx # 7-step form
│   └── ResultsPage.jsx     # Itinerary display
└── utils/
    ├── dataTransformers.js # Data mapping utilities
    └── errorMessages.js    # Error message mapping
```

### Backend Requirements

The backend API (core-scapet) must be running with:
- Valid `GOOGLE_AI_API_KEY` configured
- JWT authentication enabled
- CORS configured for frontend URL
- SQLite database initialized

### Environment Variables

Required in `.env`:
```bash
VITE_API_URL=http://localhost:8000  # or your backend URL
```

### Testing the Integration

1. **Start the backend:**
   ```bash
   cd ../core-scapet
   uvicorn app.main:app --reload
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

3. **Test the flow:**
   - Register a new user → Check JWT token in localStorage
   - Login → Verify redirect to questionnaire
   - Complete questionnaire → Check API request in Network tab
   - View results → Verify guide data loaded
   - Check credits → Should be deducted after generation

### Known Limitations

1. **Backend URL**: Must be configured in `.env` before running
2. **CORS**: Backend must allow requests from frontend origin
3. **Token Expiry**: Tokens expire after 60 minutes (configurable in backend)
4. **Credit Validation**: Frontend validates credits before submission, but backend is the source of truth

### Troubleshooting

**401 Unauthorized Error:**
- Check if token is saved in localStorage (`scapet_token`)
- Verify backend is running and accessible
- Check backend logs for authentication errors

**CORS Error:**
- Ensure backend CORS middleware allows frontend URL
- Check `Access-Control-Allow-Origin` header in response

**Guide Generation Fails:**
- Verify `GOOGLE_AI_API_KEY` is set in backend
- Check user has sufficient credits
- Validate request data format in Network tab

**Page Blank After Build:**
- Ensure `.env` file exists and has correct API URL
- Check console for errors
- Verify all dependencies are installed

### Development Notes

- API client automatically adds JWT token to all requests
- 401 responses trigger automatic redirect to login
- User data is cached in localStorage for persistence
- Credits are refreshed after each guide generation

### Production Deployment

1. Update `.env` with production backend URL
2. Build the frontend: `npm run build`
3. Deploy `dist/` folder to hosting service
4. Ensure backend CORS allows production URL
5. Test authentication flow end-to-end

---

For questions or issues, refer to the backend documentation in `../core-scapet/docs/`
