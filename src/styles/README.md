# 🎨 Style Guidelines

This document outlines the styling patterns and conventions used in the TotoAI banking application.

## 📁 File Structure

```
src/styles/
├── theme.ts                    # Central theme constants
├── README.md                   # This file
├── [ScreenName].styles.ts      # Screen-specific styles
└── [ComponentName].styles.ts   # Component-specific styles
```

## 🎯 Core Principles

### 1. **Always Create Types and Styles Files**
- **Types**: All type definitions go in `/src/types/index.ts`
- **Styles**: All styles go in separate `.styles.ts` files
- **Never** inline styles in components (use theme constants for dynamic colors)

### 2. **Use Theme Constants**
- Import from `../styles/theme.ts`
- Use `COLORS`, `SPACING`, `FONT_SIZE`, etc.
- No hardcoded values in styles

### 3. **Consistent Naming**
- Screen styles: `[ScreenName].styles.ts` → `export const [screenName]Styles`
- Component styles: `[ComponentName].styles.ts` → `export const [componentName]Styles`

## 🎨 Theme System

### Colors
```typescript
COLORS.primary           // #1a472a (Saudi Green)
COLORS.secondary         // #b45309 (Saudi Gold/Brown)
COLORS.success          // #059669 (Green)
COLORS.error            // #dc2626 (Red)
COLORS.background.primary  // #f8f9fa
COLORS.text.primary     // #333333
```

### Spacing
```typescript
SPACING.xs    // 4px
SPACING.sm    // 8px
SPACING.md    // 12px
SPACING.lg    // 16px
SPACING.xl    // 20px
SPACING.xxl   // 24px
```

### Typography
```typescript
FONT_SIZE.sm     // 12px
FONT_SIZE.md     // 14px
FONT_SIZE.lg     // 16px
FONT_SIZE.xl     // 18px

FONT_WEIGHT.normal    // '400'
FONT_WEIGHT.medium    // '500'
FONT_WEIGHT.semibold  // '600'
FONT_WEIGHT.bold      // '700'
```

## 📋 Implementation Pattern

### 1. Create Component
```typescript
// src/components/MyComponent.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { MyComponentProps } from '../types';
import { myComponentStyles as styles } from '../styles/MyComponent.styles';
import { COLORS } from '../styles/theme';

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Icon name="star" color={COLORS.primary} />
    </View>
  );
};
```

### 2. Create Types
```typescript
// src/types/index.ts
export interface MyComponentProps {
  title: string;
  onPress?: () => void;
}
```

### 3. Create Styles
```typescript
// src/styles/MyComponent.styles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from './theme';

export const myComponentStyles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background.secondary,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.text.primary,
  },
});
```

## ✅ Best Practices

### Do's ✅
- Use theme constants for all values
- Create separate `.styles.ts` files
- Use semantic color names (`primary`, `secondary`)
- Export styles with descriptive names
- Group related styles logically
- Use consistent spacing scale

### Don'ts ❌
- Don't hardcode colors (`#1a472a` → use `COLORS.primary`)
- Don't hardcode spacing (`20` → use `SPACING.xl`)
- Don't inline styles in JSX
- Don't create styles inside components
- Don't use random font sizes (stick to scale)

## 🎯 Saudi Banking Theme

### Color Psychology
- **Primary Green (`#1a472a`)**: Trust, stability, Saudi flag
- **Secondary Gold (`#b45309`)**: Premium, luxury, Arabian heritage
- **Supporting Colors**: Professional banking palette

### Typography Hierarchy
```
Massive (40px) - Main headings
Huge (28px)    - Section titles
XXL (24px)     - Card titles
XL (20px)      - Subheadings
LG (18px)      - Body text, buttons
MD (16px)      - Labels, descriptions
SM (14px)      - Captions, metadata
XS (12px)      - Fine print
```

## 📱 Component Categories

### Layout Components
- `ProfileCard.styles.ts` - Card containers
- `ProfileHeader.styles.ts` - Header sections

### Interactive Components
- `CreditCard.styles.ts` - Financial cards
- `ProfileMenuItem.styles.ts` - Menu items
- `ChatPopup.styles.ts` - Chat interface

### Screen Styles
- `DashboardScreen.styles.ts` - Dashboard layout
- `ProfileScreen.styles.ts` - Profile layout

### Loading States
- `CardSkeleton.styles.ts` - Loading placeholders

## 🔄 Updates and Maintenance

### Adding New Colors
1. Add to `theme.ts` with semantic name
2. Update this README with usage example
3. Use across components consistently

### Adding New Components
1. Create `ComponentName.styles.ts`
2. Export as `componentNameStyles`
3. Import theme constants
4. Follow spacing/color patterns

### Refactoring Existing Styles
1. Move inline styles to `.styles.ts` file
2. Replace hardcoded values with theme constants
3. Update imports in component
4. Test on multiple screen sizes

Remember: **Consistency is key!** 🗝️ Always follow these patterns to maintain a professional, cohesive design system.