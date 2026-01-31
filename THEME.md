# Theme Configuration

This document shows the exact theme colors applied to your authentication system.

## CSS Variables

### Light Mode (Default)
```css
:root {
  --background: 0 0% 100%;           /* Pure white */
  --foreground: 0 0% 3.9%;           /* Almost black */
  --card: 0 0% 100%;                 /* White */
  --card-foreground: 0 0% 3.9%;      /* Almost black */
  --popover: 0 0% 100%;              /* White */
  --popover-foreground: 0 0% 3.9%;   /* Almost black */
  --primary: 0 0% 9%;                /* Very dark gray */
  --primary-foreground: 0 0% 98%;    /* Almost white */
  --secondary: 0 0% 96.1%;           /* Light gray */
  --secondary-foreground: 0 0% 9%;   /* Very dark gray */
  --muted: 0 0% 96.1%;               /* Light gray */
  --muted-foreground: 0 0% 45.1%;    /* Medium gray */
  --accent: 0 0% 96.1%;              /* Light gray */
  --accent-foreground: 0 0% 9%;      /* Very dark gray */
  --destructive: 0 84.2% 60.2%;      /* Red */
  --destructive-foreground: 0 0% 98%; /* Almost white */
  --border: 0 0% 89.8%;              /* Light gray border */
  --input: 0 0% 89.8%;               /* Light gray border */
  --ring: 0 0% 3.9%;                 /* Almost black */
  --radius: 0.5rem;                  /* 8px border radius */
}
```

### Dark Mode
```css
.dark {
  --background: 0 0% 3.9%;           /* Almost black */
  --foreground: 0 0% 98%;            /* Almost white */
  --card: 0 0% 3.9%;                 /* Almost black */
  --card-foreground: 0 0% 98%;       /* Almost white */
  --popover: 0 0% 3.9%;              /* Almost black */
  --popover-foreground: 0 0% 98%;    /* Almost white */
  --primary: 0 0% 98%;               /* Almost white */
  --primary-foreground: 0 0% 9%;     /* Very dark gray */
  --secondary: 0 0% 14.9%;           /* Dark gray */
  --secondary-foreground: 0 0% 98%;  /* Almost white */
  --muted: 0 0% 14.9%;               /* Dark gray */
  --muted-foreground: 0 0% 63.9%;    /* Light gray */
  --accent: 0 0% 14.9%;              /* Dark gray */
  --accent-foreground: 0 0% 98%;     /* Almost white */
  --destructive: 0 62.8% 30.6%;      /* Dark red */
  --destructive-foreground: 0 0% 98%; /* Almost white */
  --border: 0 0% 14.9%;              /* Dark gray border */
  --input: 0 0% 14.9%;               /* Dark gray border */
  --ring: 0 0% 83.1%;                /* Light gray */
}
```

## How to Use These Variables

In your Tailwind classes, these variables are used like this:

```jsx
// Background color
<div className="bg-background text-foreground">

// Card component
<Card className="bg-card text-card-foreground">

// Primary button
<Button className="bg-primary text-primary-foreground">

// Border
<div className="border border-border">

// Destructive/error state
<Input className="border-destructive">
```

## Tailwind Configuration

The variables are mapped to Tailwind classes in `tailwind.config.js`:

```javascript
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... etc
}
```

## Color Format

All colors use HSL (Hue, Saturation, Lightness) format without the `hsl()` wrapper:
- Format: `H S% L%`
- Example: `0 0% 100%` = white
- Example: `0 84.2% 60.2%` = red

This format allows for easy manipulation and ensures consistency across the design system.
