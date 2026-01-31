# ScapeT - AI-Powered Travel Itinerary Generator

ScapeT is a modern web application that creates personalized travel itineraries based on user preferences. Built with React and powered by AI, it generates detailed day-by-day travel plans with smart recommendations.

## 🌟 Features

- **Smart Questionnaire**: Multi-step form to capture travel preferences
  - Destination input
  - Date range selection with calendar
  - Interest categories (food, history, nature, culture, etc.)
  - Budget preferences with slider or preset levels
  - Trip type selection

- **AI-Generated Itinearies**: Detailed day-by-day travel plans including:
  - Activity schedules with time management
  - Location recommendations
  - Traveler tips and insider advice
  - "Avoid if" warnings
  - Best time windows for activities
  - Physical effort indicators
  - Estimated duration for each activity

- **Beautiful UI/UX**:
  - Clean, modern design with ScapeT branding
  - Light/Dark mode toggle
  - Smooth animations and hover effects
  - Responsive layout for all devices
  - Glass-morphism effects with backdrop blur

- **Interactive Timeline View**:
  - Visual timeline with dots and connecting lines
  - Activity cards with detailed information
  - Color-coded effort badges (low/medium/high)
  - Organized by activity type (food, history, culture, nature)

- **PDF Export**: Export complete itineraries to PDF
  - All days included in single document
  - Professional print layout
  - No UI elements in export
  - Clean, readable format

- **User Profile & TriPoints System**:
  - User profile with email and name
  - TriPoints credit system (100 default)
  - Logout functionality

## 🎨 Design System

### Typography
- **Primary Font**: Inter (body text)
- **Technical Font**: Space Grotesk (headings, buttons, labels)
- Custom letter spacing and line heights
- Text glow effects for emphasis

### Color Palette
- **Primary**: #56A87E (Green)
- **Light Mode**: White backgrounds with gray accents
- **Dark Mode**: Dark gray backgrounds with subtle contrasts
- Theme-aware throughout the application

### Components
- Semi-transparent cards with backdrop blur
- Smooth transitions (300ms duration)
- Hover animations with scale and shadow effects
- Consistent border radius and spacing

## 🚀 Getting Started

### Prerequisites
- Node.js 20.11.1 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ancordss/ScapeT-front.git
cd ScapeT-front
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **3D Graphics**: Three.js, @react-three/fiber (for Silk background)
- **Date Picker**: react-day-picker, date-fns
- **Icons**: Custom SVG icons
- **State Management**: React Context API

## 📁 Project Structure

```
ScapeT-front/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Silk.jsx         # Animated background
│   │   ├── ThemeToggle.jsx  # Theme switcher
│   │   ├── ProfileButton.jsx
│   │   ├── PhrasesCarousel.jsx
│   │   └── LoadingScreen.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx # Theme management
│   ├── layouts/
│   │   └── AuthLayout.jsx   # Authentication layout
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── QuestionnairePage.jsx
│   │   └── ResultsPage.jsx
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features Breakdown

### Authentication Flow
- Login and registration pages
- Persistent Silk animated background
- Phrases carousel with rotating messages
- Theme toggle available on auth pages

### Questionnaire (5 Steps)
1. **Destination**: Text input for travel location
2. **Dates**: Calendar with date range picker
3. **Interests**: Multi-select interest categories
4. **Budget**: Yes/No with conditional slider or preset levels
5. **Trip Type**: Multi-select trip categories with icons

### Results Page
- Day selector tabs
- Timeline view with activities
- Expandable activity details
- Tips, warnings, and time recommendations
- PDF export functionality
- Full-screen layout optimized for reading

### Loading Experience
- Smooth 5-second loading animation
- 8 dynamic phrases in sequential loop
- Transitions from questionnaire to results

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to change the primary color:
```js
colors: {
  primary: {
    DEFAULT: "hsl(151 39% 51%)", // #56A87E
  }
}
```

### Typography
Fonts are loaded from Google Fonts in `index.html`:
- Inter (300, 400, 500, 600, 700, 800)
- Space Grotesk (400, 500, 600, 700)

## 📄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is private and proprietary.

## 👥 Author

**Ancordss**

## 🔗 Links

- GitHub: [@Ancordss](https://github.com/Ancordss)
- Repository: [ScapeT-front](https://github.com/Ancordss/ScapeT-front)

---

**Built with ❤️ using React and Vite**
