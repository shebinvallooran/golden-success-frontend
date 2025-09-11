# 🎨 SCSS Variables Guide for Golden Success

This guide explains how to use SCSS variables in your React frontend application with your custom primary color `#04C39A`.

## 📁 File Structure

```
frontend/src/styles/
├── variables.scss      # SCSS variables (for SASS compilation)
├── variables.css       # CSS custom properties (currently active)
└── main.scss          # Main SCSS file with utilities
```

## 🚀 Quick Start

### Option 1: Using CSS Custom Properties (Currently Active)

The CSS variables are already imported in `src/index.css` and ready to use:

```css
/* In your CSS files */
.my-element {
  color: var(--primary-color);
  background-color: var(--primary-50);
  border: 1px solid var(--primary-color);
}
```

```jsx
/* In your JSX with Tailwind classes */
<button className="bg-primary text-white border-primary">
  Primary Button
</button>
```

### Option 2: Using SCSS Variables (Requires SASS setup)

To use SCSS variables, import them in your `.scss` files:

```scss
// In your component's .scss file
@import '../../styles/variables';

.my-component {
  background-color: $primary-color;
  color: $white;
  padding: $spacing-4;
  border-radius: $rounded-lg;
  
  &:hover {
    background-color: $primary-dark;
  }
}
```

## 🎨 Available Colors

### Primary Colors (Your Brand Color: #04C39A)
```scss
$primary-color: #04C39A;     // Main brand color
$primary-light: #28E0B9;     // Lighter shade
$primary-dark: #039577;      // Darker shade

// Full palette (50-900)
$primary-50: #B8F5E8;
$primary-100: #A3F2E1;
$primary-200: #7AECD4;
$primary-300: #51E6C6;
$primary-400: #28E0B9;
$primary-500: #04C39A;       // Your main color
$primary-600: #039577;
$primary-700: #026754;
$primary-800: #013931;
$primary-900: #000B0E;
```

### Secondary Colors (Your Secondary Color: #00B4D8)
```scss
$secondary-color: #00B4D8;   // Secondary brand color
$secondary-light: #33C3E7;   // Lighter shade
$secondary-dark: #0090AD;    // Darker shade

// Full secondary palette
$secondary-50: #E6F7FC;
$secondary-100: #CCF0F9;
$secondary-200: #99E1F3;
$secondary-300: #66D2ED;
$secondary-400: #33C3E7;
$secondary-500: #00B4D8;     // Your secondary color
$secondary-600: #0090AD;
$secondary-700: #006C82;
$secondary-800: #004856;
$secondary-900: #00242B;
```

### Gradient Colors (Primary + Secondary Combinations)
```scss
// Linear gradients
$gradient-primary-secondary: linear-gradient(135deg, #04C39A 0%, #00B4D8 100%);
$gradient-primary-secondary-hover: linear-gradient(135deg, #039577 0%, #0090AD 100%);
$gradient-secondary-primary: linear-gradient(135deg, #00B4D8 0%, #04C39A 100%);

// Special gradients
$gradient-radial-primary-secondary: radial-gradient(circle, #04C39A 0%, #00B4D8 100%);
$gradient-diagonal-primary-secondary: linear-gradient(45deg, #04C39A 0%, #00B4D8 50%, #04C39A 100%);
```

### Neutral Colors
```scss
$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-200: #e5e7eb;
$gray-300: #d1d5db;
$gray-400: #9ca3af;
$gray-500: #6b7280;
$gray-600: #4b5563;
$gray-700: #374151;
$gray-800: #1f2937;
$gray-900: #111827;
```

## 📏 Spacing & Sizing

```scss
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
$spacing-12: 3rem;     // 48px
$spacing-16: 4rem;     // 64px
```

## 🔤 Typography

```scss
$font-family-sans: 'Inter', sans-serif;
$font-family-mono: 'Fira Code', monospace;

$text-xs: 0.75rem;     // 12px
$text-sm: 0.875rem;    // 14px
$text-base: 1rem;      // 16px
$text-lg: 1.125rem;    // 18px
$text-xl: 1.25rem;     // 20px
$text-2xl: 1.5rem;     // 24px
$text-3xl: 1.875rem;   // 30px

$font-light: 300;
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
```

## 🎯 Component Examples

### Button Component with SCSS
```scss
@import '../../styles/variables';

.btn-primary {
  background-color: $primary-color;
  color: $white;
  border: 2px solid $primary-color;
  padding: $spacing-3 $spacing-6;
  border-radius: $rounded-full;
  font-weight: $font-medium;
  font-size: $text-sm;
  transition: all $transition-normal;
  
  &:hover {
    background-color: $primary-dark;
    border-color: $primary-dark;
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}

.btn-gradient {
  background: $gradient-primary-secondary;
  color: $white;
  border: none;
  padding: $spacing-3 $spacing-6;
  border-radius: $rounded-full;
  font-weight: $font-medium;
  font-size: $text-sm;
  transition: all $transition-normal;

  &:hover {
    background: $gradient-primary-secondary-hover;
    transform: translateY(-2px);
    box-shadow: $shadow-lg;
  }
}

.btn-gradient-border {
  position: relative;
  background: $white;
  color: $primary-color;
  border: 2px solid transparent;
  padding: $spacing-3 $spacing-6;
  border-radius: $rounded-full;
  font-weight: $font-medium;
  font-size: $text-sm;
  transition: all $transition-normal;
  background-clip: padding-box;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: $gradient-primary-secondary;
    border-radius: inherit;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    z-index: -1;
  }

  &:hover {
    background: $gradient-primary-secondary;
    color: $white;
  }
}

.btn-outline {
  background-color: transparent;
  color: $primary-color;
  border: 2px solid $primary-color;
  
  &:hover {
    background-color: $primary-color;
    color: $white;
  }
}
```

### Card Component with SCSS
```scss
@import '../../styles/variables';

.card {
  background-color: $card-bg;
  border: 1px solid $card-border;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  padding: $card-padding;
  
  .card-title {
    color: $primary-color;
    font-size: $text-xl;
    font-weight: $font-bold;
    margin-bottom: $spacing-4;
  }
  
  .card-text {
    color: $text-secondary;
    line-height: $leading-relaxed;
  }
}
```

## 🛠️ Setting Up SCSS in React

If you want to use SCSS variables instead of CSS custom properties:

1. **Install SASS** (already done):
```bash
npm install --save-dev sass
```

2. **Create component with SCSS**:
```jsx
// MyComponent.jsx
import React from 'react';
import './MyComponent.scss';

const MyComponent = () => {
  return (
    <div className="my-component">
      <h1 className="title">Hello World</h1>
      <button className="btn-primary">Click me</button>
    </div>
  );
};

export default MyComponent;
```

3. **Style with SCSS variables**:
```scss
// MyComponent.scss
@import '../../styles/variables';

.my-component {
  padding: $spacing-8;
  background-color: $bg-secondary;
  
  .title {
    color: $primary-color;
    font-size: $text-3xl;
    font-weight: $font-bold;
    margin-bottom: $spacing-6;
  }
  
  .btn-primary {
    background-color: $primary-color;
    color: $white;
    padding: $btn-padding-md;
    border-radius: $rounded-full;
    border: none;
    cursor: pointer;
    transition: all $transition-normal;
    
    &:hover {
      background-color: $primary-dark;
      transform: translateY(-2px);
    }
  }
}
```

## 🎨 Tailwind Integration

Your primary color is already configured in `tailwind.config.js`:

```javascript
// Available Tailwind classes:
<div className="text-primary">Primary text</div>
<div className="bg-primary">Primary background</div>
<div className="border-primary">Primary border</div>
<div className="hover:bg-primary-600">Hover effect</div>
```

## 📱 Responsive Design

```scss
@import '../../styles/variables';

.responsive-component {
  padding: $spacing-4;
  
  @media (max-width: $breakpoint-sm) {
    padding: $spacing-2;
  }
  
  @media (min-width: $breakpoint-lg) {
    padding: $spacing-8;
  }
}
```

## 🎯 Best Practices

1. **Always import variables**: `@import '../../styles/variables';`
2. **Use semantic naming**: `$primary-color` instead of `$green`
3. **Consistent spacing**: Use spacing variables instead of hardcoded values
4. **Color hierarchy**: Use the full color palette (50-900) for variations
5. **Component-scoped styles**: Keep styles specific to components

## 🔧 Current Setup Status

✅ **CSS Custom Properties**: Active and ready to use  
✅ **Tailwind Integration**: Primary color configured  
✅ **SCSS Variables**: Available for use  
✅ **SASS Package**: Installed  
⚠️ **SCSS Import**: Currently disabled due to compilation issues  

To enable SCSS, uncomment the import in `src/index.css`:
```css
/* @import './styles/main.scss'; */
```

Your primary color `#04C39A` is now available throughout your application! 🎉
