# Travel Questionnaire Page

## ✅ Successfully Updated to Match Authentication Design!

A multi-step questionnaire page that collects travel preferences from users after they sign in, now with the **same design and Silk animated background** as the authentication pages.

## 🎨 Design Consistency

### Matching Authentication Pages
- ✅ **Same Silk animated background** with green (#56A87E) color
- ✅ **Same card styling**: Semi-transparent backdrop with blur effect
  - Light mode: `bg-gray-100/90`
  - Dark mode: `bg-gray-900/50`
- ✅ **Same text colors**: 
  - Light mode: Gray-700 for headings, gray-600 for descriptions
  - Dark mode: White text throughout
- ✅ **Same input styling**: `bg-white/30 dark:bg-black/20`
- ✅ **Same border styling**: `border-2 border-primary/20`
- ✅ **Same shadow effects**: `shadow-lg shadow-primary/5`
- ✅ **Theme toggle button** in top-right corner
- ✅ **White background layer** in light mode (behind Silk)

## 🎯 Overview

After logging in, users are now directed to an interactive questionnaire that asks 5 key questions about their travel plans. Each question has custom UI elements designed to make the experience engaging and intuitive.

## 📝 The 5 Questions

### Question 1: Destination
**"Where are you traveling to?"**

**UI Element**: Large text input
- Center-aligned input field
- Placeholder: "e.g., Paris, Tokyo, New York..."
- Auto-focus on load
- 56px height for prominence

**Validation**: Requires non-empty destination

---

### Question 2: Travel Duration
**"How many days are you traveling?"**

**UI Element**: Date Range Picker with Calendar
- Click button to open calendar popup
- Select start and end dates
- Shows formatted date range
- Displays total number of days
- Two-month view for easy selection
- Disables past dates

**Features**:
- Date format: "MMM dd, yyyy"
- Live day count display
- Interactive calendar with hover states
- Green theme integration

**Validation**: Requires both start and end dates

---

### Question 3: Interests
**"What are your interests?"**

**UI Element**: Multi-select grid of interest cards

**15 Example Interests** (your own examples can replace these):
1. Photography
2. Art & Museums
3. Beaches
4. Mountains
5. Wildlife
6. Architecture
7. Local Cuisine
8. Wine Tasting
9. Hiking
10. Water Sports
11. Music & Concerts
12. Festivals
13. Historical Sites
14. Street Food
15. Yoga & Wellness

**Interaction**:
- Click to select/deselect
- Multiple selections allowed
- Selected cards: Green border, green background, scale up
- Unselected: Gray border, hover effect
- Shows count of selected interests

**Grid Layout**:
- 2 columns on mobile
- 3 columns on desktop
- Responsive design

**Validation**: Requires at least 1 interest selected

---

### Question 4: Budget
**"Do you have a budget?"**

**Step 1**: Yes/No choice
- Two large buttons
- Yes → Shows budget selector
- No → Skips to Question 5

**Step 2 (if Yes)**: Budget Selection

**Two Options**:

**A) Slider**
- Range: $500 - $20,000
- Step: $500 increments
- Live dollar amount display
- Green accent color
- Shows min/max values

**B) Quick Select Buttons**
- **Low**: $1,000
- **Medium**: $5,000
- **High**: $10,000
- One-click selection
- Overrides slider value

**Display**:
- Large dollar amount: "$X,XXX"
- Formatted with commas
- Green color for emphasis

**Validation**: Requires budget choice if "Yes" selected

---

### Question 5: Type of Trip
**"Type of trip"**

**UI Element**: Multi-select grid with icons

**8 Trip Types**:
1. 🍽️ **Food**
2. 🏛️ **History**
3. 🌿 **Nature**
4. 🎭 **Culture**
5. 🌃 **Nightlife**
6. 🛍️ **Shopping**
7. ⛰️ **Adventure**
8. 🧘 **Relaxation**

**Interaction**:
- Click to select/deselect
- Multiple selections allowed
- Large emoji icons (48px)
- Selected: Green border, green background, scale up, shadow
- Unselected: Gray border, hover effect
- Shows count of selected types

**Grid Layout**:
- 2 columns on mobile
- 4 columns on desktop
- Larger cards with icons

**Validation**: Requires at least 1 trip type selected

## 🎨 Design Features

### Page Layout
- **Full screen** centered card
- **Wide format**: Max width 768px (3xl)
- **Clean background**: Subtle gradient overlay
- **Frosted glass card**: White/95% opacity (light) or gray-900/95% (dark)

### Progress Indicator
- **5 dots** showing progress
- **Current step**: Wide green bar
- **Completed steps**: Medium green bar (60% opacity)
- **Future steps**: Gray bar
- "Step X of 5" text below

### Navigation
- **Back button**: Go to previous question (disabled on step 1)
- **Next button**: Proceed to next question (disabled if invalid)
- **Final button**: "Create My Trip" on step 5

### Animations
- **Fade in**: Each question fades in smoothly
- **Scale effects**: Cards and buttons scale on select
- **Transitions**: 200-400ms smooth animations
- **Hover effects**: Interactive feedback

## 🎯 Form State Management

### State Structure
```javascript
{
  destination: '',              // String
  dateRange: {                 // Object with from/to dates
    from: undefined,
    to: undefined
  },
  selectedInterests: [],       // Array of strings
  hasBudget: null,            // Boolean or null
  budget: 5000,               // Number (dollars)
  budgetLevel: '',            // 'low', 'medium', or 'high'
  tripTypes: []               // Array of trip type IDs
}
```

### Validation Logic
- Each step has `canProceed()` check
- Next button disabled if requirements not met
- Smart navigation (skip budget if "No")
- Final submit requires all answers

## 🎨 Visual Theme Integration

### Colors Match Auth Pages
- **Primary green**: #56A87E
- **Card background**: Same semi-transparent style
- **Text colors**: Theme-aware (gray-700 light / white dark)
- **Borders**: Green accents with 20% opacity
- **Shadows**: Green-tinted shadows

### Interactive Elements
- **Hover effects**: Scale and shadow
- **Selected states**: Green theme
- **Transitions**: Smooth 200ms
- **Focus states**: Green ring

## 📱 Responsive Design

### Desktop
- Wide card layout
- Multi-column grids (3-4 columns)
- Calendar shows 2 months
- Spacious padding

### Mobile
- Stacked layout
- 2 column grids
- Single month calendar
- Compact but readable

## 🔄 User Flow

### Complete Journey
```
1. Login → Success
   ↓
2. Redirect to Questionnaire
   ↓
3. Answer Question 1 (Destination)
   ↓
4. Answer Question 2 (Dates)
   ↓
5. Answer Question 3 (Interests)
   ↓
6. Answer Question 4 (Budget)
   ↓ (Skip if No budget)
7. Answer Question 5 (Trip Type)
   ↓
8. Click "Create My Trip"
   ↓
9. Data logged to console
   ↓
10. Navigate to results page
```

## 🎯 Interactive Features

### Date Picker
- Click to open/close
- Select date range
- Visual feedback
- Today highlighted
- Disabled past dates
- Responsive layout

### Budget Slider
- Drag to adjust
- Real-time value update
- Min/max indicators
- Green accent color
- Smooth movement

### Selection Cards
- Visual feedback on hover
- Scale effect when selected
- Color change (gray → green)
- Count display
- Multi-select capable

## 🌟 Key Features

### Smart Navigation
- Can't proceed without answering
- Back button to change answers
- Skip logic for budget question
- Progress tracking

### Visual Feedback
- Progress bar shows completion
- Selection counts displayed
- Disabled states clear
- Hover effects on all interactive elements

### Data Collection
All data logged to console on submit:
```javascript
{
  destination: "Paris",
  dateRange: { from: Date, to: Date },
  selectedInterests: ["Photography", "Local Cuisine"],
  hasBudget: true,
  budget: 5000,
  budgetLevel: "medium",
  tripTypes: ["food", "culture"]
}
```

## 🚀 Access the Questionnaire

### Two Ways:

1. **Sign In** at `http://localhost:5174/login`
   - Enter any email/password
   - Automatically redirected to questionnaire

2. **Direct URL**: `http://localhost:5174/questionnaire`
   - View questionnaire directly

## ✨ Try It Out!

Visit the page and:
1. ✅ Enter a destination
2. ✅ Select travel dates from calendar
3. ✅ Choose multiple interests
4. ✅ Set your budget (or skip)
5. ✅ Select trip types
6. ✅ Submit to see data in console

The questionnaire provides an engaging, interactive way to collect user preferences with a beautiful, theme-aware design!
