# Theme System Documentation

## Overview

This project implements a comprehensive dark and light mode system that automatically detects user preferences and provides smooth transitions between themes. The system is built using React Context, CSS custom properties, and Tailwind CSS.

## Features

- 🌓 **Automatic Theme Detection**: Detects system preference on first visit
- 💾 **Persistent Storage**: Remembers user choice in localStorage
- 🔄 **System Integration**: Follows OS theme changes automatically
- ✨ **Smooth Transitions**: Beautiful animations between themes
- 🎨 **Comprehensive Colors**: Full color palette for both themes
- 🧩 **Component Library**: Theme-aware UI components

## Architecture

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)

The core of the theme system that manages:
- Current theme state (`dark` | `light`)
- Theme switching logic
- System preference detection
- localStorage persistence
- Document class management

```typescript
const { theme, toggleTheme, setTheme } = useTheme();
```

### 2. CSS Variables (`src/index.css`)

Dynamic CSS custom properties that change based on the current theme:

```css
:root {
  /* Light Mode Colors */
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... more colors */
}

.dark {
  /* Dark Mode Colors */
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more colors */
}
```

### 3. Tailwind Integration (`tailwind.config.ts`)

Extended Tailwind configuration with theme-aware utilities:

```typescript
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  // ... more colors
},
backgroundImage: {
  'gradient-light': 'var(--gradient-light)',
  'gradient-dark': 'var(--gradient-dark)',
  // ... more gradients
}
```

## Components

### Theme Toggle (`src/components/ui/theme-toggle.tsx`)

A button component that allows users to switch between themes:

```tsx
<ThemeToggle />
```

### Page Wrapper (`src/components/layout/PageWrapper.tsx`)

A wrapper component that provides consistent theme-aware styling for all pages:

```tsx
<PageWrapper showBackground={true} showParticles={false}>
  {/* Page content */}
</PageWrapper>
```

### Theme Section (`src/components/ui/theme-section.tsx`)

A section component with theme-aware backgrounds and animations:

```tsx
<ThemeSection 
  showBackground={true} 
  showCircuitLines={true} 
  padding="lg"
>
  {/* Section content */}
</ThemeSection>
```

### Theme Card (`src/components/ui/theme-card.tsx`)

A card component with multiple variants that adapt to the current theme:

```tsx
<ThemeCard variant="glass" hoverEffect={true}>
  {/* Card content */}
</ThemeCard>
```

### Theme Button (`src/components/ui/theme-button.tsx`)

A button component with theme-aware styling and multiple variants:

```tsx
<ThemeButton variant="neon" size="lg">
  Click me
</ThemeButton>
```

## Usage

### Basic Theme Usage

```tsx
import { useTheme } from '@/contexts/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
    </div>
  );
};
```

### Page Implementation

```tsx
import PageWrapper from '@/components/layout/PageWrapper';

const MyPage = () => {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-foreground">
          My Page
        </h1>
        <p className="text-muted-foreground">
          This text automatically adapts to the theme
        </p>
      </div>
    </PageWrapper>
  );
};
```

### Component Styling

Use Tailwind classes that automatically adapt to the theme:

```tsx
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Primary Text</h1>
  <p className="text-muted-foreground">Muted Text</p>
  <div className="bg-card border-border">Card Content</div>
</div>
```

## Color System

### Primary Colors
- `primary`: Electric Indigo (main brand color)
- `accent`: Cyan (secondary accent)
- `electric`: Electric Purple (special elements)

### Semantic Colors
- `background`: Main page background
- `foreground`: Primary text color
- `card`: Card and surface backgrounds
- `muted`: Muted text and backgrounds
- `border`: Border colors

### Gradients
- `gradient-neon`: Primary neon gradient
- `gradient-light`: Light mode background
- `gradient-dark`: Dark mode background
- `gradient-glass`: Glass morphism effect

## Theme Switching

The theme system automatically:

1. **Detects** system preference on first visit
2. **Stores** user choice in localStorage
3. **Applies** theme to document classes
4. **Updates** CSS variables
5. **Animates** transitions smoothly

## Browser Support

- ✅ Modern browsers with CSS custom properties support
- ✅ React 18+
- ✅ Tailwind CSS 3.4+

## Performance

- **Efficient**: Uses CSS variables for instant theme switching
- **Smooth**: Hardware-accelerated transitions
- **Lightweight**: Minimal JavaScript overhead
- **Persistent**: localStorage for user preferences

## Customization

### Adding New Colors

1. Add CSS variables in `src/index.css`
2. Extend Tailwind config in `tailwind.config.ts`
3. Use in components with Tailwind classes

### Custom Themes

The system can be extended to support additional themes by:
1. Adding new theme classes
2. Extending the ThemeContext
3. Creating theme-specific CSS variables

## Demo

Visit `/theme-demo` to see all theme components in action and test the theme switching functionality.

## Troubleshooting

### Theme Not Switching
- Check if ThemeProvider wraps your app
- Verify localStorage permissions
- Check browser console for errors

### Colors Not Updating
- Ensure CSS variables are properly defined
- Check Tailwind config includes new colors
- Verify component uses correct Tailwind classes

### Performance Issues
- Reduce transition duration in CSS
- Limit number of animated elements
- Use `will-change` CSS property sparingly

## Future Enhancements

- [ ] Additional theme variants (e.g., high contrast)
- [ ] Theme-specific animations
- [ ] Dynamic theme generation
- [ ] Theme marketplace
- [ ] Advanced color schemes 