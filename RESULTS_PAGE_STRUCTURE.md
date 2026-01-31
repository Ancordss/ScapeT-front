# ScapeT Results Page - Itinerary Display Structure

## 📋 Overview

The Results Page displays a beautifully formatted, interactive travel itinerary generated from the questionnaire responses. The layout follows the scapeT design system with the new typography implementation.

---

## 🎨 Page Layout Structure

### 1. **Page Container**
- Full-screen layout with padding
- Silk animated background
- Theme toggle (top-left)
- Profile button (top-right)

### 2. **Main Content Sections**

#### **A. Header Card**
- **Location**: Top of page
- **Content**:
  - ScapeT logo with location icon
  - Main title: "Your ScapeT Itinerary"
  - Subtitle: "Personalized travel plan crafted just for you"
  - Action buttons: "Export PDF" and "Share"

**Typography Applied:**
```jsx
// Title
className="text-4xl md:text-5xl font-semibold tracking-tight uppercase text-primary"

// Subtitle
className="text-sm font-light text-gray-600 dark:text-gray-300 leading-relaxed"

// Buttons
className="font-tech uppercase tracking-widest text-xs"
```

---

#### **B. Day Selector**
- **Function**: Switch between different days of the itinerary
- **Display**: Horizontal button group
- **Content per button**:
  - Day number (large)
  - Pace type (small, uppercase)
- **States**:
  - Active: Green background, white text, shadow
  - Inactive: Semi-transparent, hover effects

**Typography Applied:**
```jsx
// Day number
className="text-2xl font-bold"

// Pace label
className="text-xs tracking-widest uppercase"
```

---

#### **C. Day Overview Card**
- **Content**:
  - Day number badge (small, uppercase, tech font)
  - Day title (large, uppercase, semibold)
  - Zone/location with icon
  - Pace badge
  - Daily tips section (expandable list)

**Typography Applied:**
```jsx
// Day badge
className="font-tech text-xs tracking-ultra uppercase text-primary"

// Day title
className="text-3xl md:text-4xl font-semibold tracking-tight uppercase"

// Zone text
className="font-light"

// Daily tips title
className="font-tech text-xs tracking-widest uppercase text-primary"

// Tip text
className="text-sm font-light"
```

**Daily Tips Section:**
- Green background (primary/10)
- Checkmark icons
- Bulleted list format

---

#### **D. Activities Timeline**

Each activity is a card with:

##### **Collapsed State (Default):**
1. **Time Badge**
   - Large time display (e.g., "09:00")
   - Duration below (e.g., "75min")
   - Tech font, bold

2. **Activity Header**
   - Activity type icon + label
   - Physical effort badge (low/medium/high with color coding)
   - Place name (large, uppercase)
   - Reason/description

3. **Expand/Collapse Icon**
   - Chevron that rotates when clicked

**Typography Applied:**
```jsx
// Time
className="font-tech text-2xl font-bold text-primary"

// Duration
className="text-xs text-gray-500 dark:text-gray-400"

// Activity type
className="font-tech text-xs tracking-widest uppercase"

// Place name
className="text-xl font-semibold tracking-tight uppercase"

// Reason
className="text-sm font-light leading-relaxed"
```

##### **Expanded State:**
Shows additional details:

1. **Traveler Tips**
   - Lightning bolt icons
   - Bulleted list
   - Light font weight

2. **Avoid If** (if applicable)
   - Red warning badge
   - Warning icon
   - Red text with red background/border

3. **Best Time Window**
   - Clock icon
   - Highlighted in primary color

**Typography Applied:**
```jsx
// Section headers
className="font-tech text-xs tracking-widest uppercase text-primary"

// Tip content
className="text-sm font-light"

// Warning content
className="text-sm font-light text-red-600 dark:text-red-400"
```

---

## 📊 JSON Data Mapping

### **Guide Array Structure:**
```javascript
{
  "guide": [
    {
      "day": 1,                    // → Day Selector Button
      "title": "...",              // → Day Overview Title
      "zone": "...",               // → Location Badge
      "pace": "balanced",          // → Pace Badge
      "schedule": [...],           // → Activities Timeline
      "daily_tips": [...]          // → Daily Tips Section
    }
  ]
}
```

### **Activity Object Structure:**
```javascript
{
  "time": "09:00",                        // → Time Badge (left)
  "place": "Place Name",                  // → Activity Title
  "activity_type": "food",                // → Icon + Type Badge
  "estimated_duration_minutes": 75,       // → Duration Display
  "physical_effort": "low",               // → Effort Badge (green/yellow/red)
  "best_time_window": "morning",          // → Best Time Display
  "reason": "Why this activity...",       // → Description Text
  "traveler_tips": [...],                 // → Tips Section (expandable)
  "avoid_if": [...]                       // → Warning Section (expandable)
}
```

---

## 🎨 Component Breakdown

### **1. Activity Icons**
Activity types mapped to SVG icons:
- `food` → Fork & knife icon
- `history` → Clock icon
- `culture` → Layers icon
- `nature` → Shield icon
- `sightseeing` → Info icon

### **2. Effort Badge**
```jsx
<EffortBadge level="low|medium|high" />
```
- **Low**: Green badge
- **Medium**: Yellow badge
- **High**: Red badge

### **3. Pace Badge**
```jsx
<PaceBadge pace="balanced|relaxed|intense" />
```
- Always green (primary color)
- Displays pace type in uppercase

---

## 🎯 Interactive Features

### **1. Day Switching**
- Click any day button
- Updates entire content area
- Smooth state transition
- Selected day highlighted

### **2. Activity Expansion**
- Click any activity card
- Expands to show detailed tips
- Chevron rotates 180°
- Smooth accordion animation

### **3. Export/Share Buttons**
- Export PDF: Download itinerary
- Share: Share with others
- Both use tech font, uppercase, tracking

---

## 📱 Responsive Design

### **Mobile (< 768px)**
- Single column layout
- Smaller text sizes (text-3xl → text-4xl)
- Stacked buttons
- Full-width cards

### **Tablet (768px - 1024px)**
- Two-column where applicable
- Medium text sizes (text-4xl → text-5xl)
- Horizontal button groups

### **Desktop (> 1024px)**
- Max-width container (7xl = 80rem)
- Full typography scale
- Optimal spacing

---

## 🎨 Design System Elements Used

### **Colors**
- Primary: `#56A87E` (green)
- Success: Green tones
- Warning: Yellow tones
- Danger: Red tones
- Background: Semi-transparent gray (light/dark mode)

### **Typography**
- **Headers**: Inter semibold, uppercase, tracking-tight
- **Labels**: Space Grotesk, uppercase, tracking-widest/ultra
- **Body**: Inter light, leading-relaxed
- **Buttons**: Space Grotesk, uppercase, tracking-widest

### **Spacing**
- Card padding: `p-6` to `p-8`
- Section gaps: `space-y-4` to `space-y-6`
- Inner spacing: `gap-2` to `gap-4`

### **Effects**
- Backdrop blur: `backdrop-blur-md`
- Shadows: `shadow-lg`, `shadow-primary/30`
- Hover: `hover:scale-105`, `hover:border-primary/40`
- Transitions: `transition-all duration-300`

---

## 📋 Visual Hierarchy

### **Level 1: Page Header**
- Largest text (text-4xl to text-5xl)
- Primary color
- Maximum visual weight

### **Level 2: Day Title**
- Large text (text-3xl to text-4xl)
- Uppercase
- Semibold weight

### **Level 3: Section Labels**
- Tech font
- Extra letter spacing
- Small size (text-xs)
- Uppercase

### **Level 4: Activity Titles**
- Medium text (text-xl)
- Uppercase
- Semibold

### **Level 5: Body Text**
- Small text (text-sm)
- Light weight
- Relaxed leading

### **Level 6: Metadata**
- Extra small (text-xs)
- Light color
- Secondary information

---

## 🔄 State Management

### **Current States:**
1. `selectedDay` - Which day is currently displayed
2. `expandedActivity` - Which activity card is expanded (null = all collapsed)

### **State Transitions:**
- Day selection: Updates `selectedDay` → Re-renders day content
- Activity expansion: Toggles `expandedActivity` → Shows/hides details

---

## 📐 Card Structure Pattern

All cards follow this pattern:
```jsx
<div className="backdrop-blur-md bg-gray-100/90 dark:bg-gray-900/50 border-2 border-primary/20 shadow-lg rounded-xl">
  {/* Content */}
</div>
```

**Properties:**
- Semi-transparent background
- Backdrop blur
- Primary-colored border (20% opacity)
- Rounded corners
- Shadow with primary tint

---

## 🎨 Icon System

### **Built-in Icons:**
- Location pin (ScapeT logo)
- Clock (time/duration)
- Fork & knife (food)
- Layers (culture)
- Shield (nature)
- Info (sightseeing)
- Lightning bolt (tips)
- Warning triangle (avoid)
- Checkmark (daily tips)
- Chevron down (expand)

All icons:
- Stroke width: 2
- Current color support
- Consistent size: `w-4 h-4` to `w-6 h-6`

---

## 💡 Key Features

### **1. Progressive Disclosure**
- Activities collapsed by default
- Click to reveal detailed tips
- Prevents information overload

### **2. Visual Scanning**
- Time badges on left (easy to scan timeline)
- Color-coded effort levels
- Icon system for quick recognition
- Consistent card spacing

### **3. Information Architecture**
```
Page
├── Header (ScapeT branding + actions)
├── Day Selector (navigation)
└── Day Content
    ├── Overview (title, zone, pace, daily tips)
    └── Timeline (activities in chronological order)
        └── Activity Cards (time, place, details, tips)
```

### **4. Accessibility**
- Semantic HTML (buttons, headings)
- Color contrast compliance
- Keyboard navigation ready
- Screen reader friendly structure

---

## 🚀 Future Enhancements

### **Potential Additions:**
1. **Map Integration** - Show locations on interactive map
2. **Weather Widget** - Display forecast for each day
3. **Budget Tracker** - Running total of estimated costs
4. **Notes Section** - User can add personal notes
5. **Checklist** - Mark activities as done
6. **Photo Upload** - Add photos to activities
7. **Offline Mode** - Download for offline access
8. **Alternative Suggestions** - Swap activities
9. **Booking Links** - Direct links to reserve/book
10. **Travel Time** - Show transit time between activities

---

## ✅ Implementation Checklist

### **Completed:**
- ✅ Page layout structure
- ✅ Day selector with state management
- ✅ Activity timeline with expandable cards
- ✅ Typography system applied throughout
- ✅ Icon system integrated
- ✅ Color-coded badges (effort, pace)
- ✅ Daily tips section
- ✅ Traveler tips expansion
- ✅ Avoid-if warnings
- ✅ Responsive design
- ✅ Theme support (light/dark)
- ✅ Hover animations
- ✅ Mock data structure

### **Next Steps:**
- [ ] Connect to actual API/backend
- [ ] Implement PDF export functionality
- [ ] Implement share functionality
- [ ] Add loading states while fetching data
- [ ] Add empty states (no data)
- [ ] Add error handling
- [ ] Add activity filtering/search
- [ ] Add print styles

---

## 📝 Usage Example

```jsx
// The page expects data in this format:
const itineraryData = {
  guide: [
    {
      day: 1,
      title: "Day Title",
      zone: "Location Zone",
      pace: "balanced",
      schedule: [
        {
          time: "09:00",
          place: "Place Name",
          activity_type: "food",
          estimated_duration_minutes: 75,
          physical_effort: "low",
          best_time_window: "morning",
          reason: "Why this activity...",
          traveler_tips: ["Tip 1", "Tip 2"],
          avoid_if: ["Condition to avoid"]
        }
      ],
      daily_tips: ["Tip 1", "Tip 2"]
    }
  ]
};
```

---

## 🎯 Design Philosophy

The Results Page follows these principles:

1. **Information Hierarchy**: Most important info first (day, title, time)
2. **Progressive Disclosure**: Details hidden until needed
3. **Scanability**: Easy to scan timeline visually
4. **Consistency**: All cards follow same structure
5. **Accessibility**: Clear labels, semantic HTML
6. **Beauty**: Modern, clean, professional design
7. **Functionality**: Export, share, expand features

The layout successfully transforms complex JSON data into a beautiful, user-friendly travel itinerary! 🎉
