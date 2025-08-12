# PlayVot Color System

## 🎨 Overview

This document provides a quick reference for the unified color system implemented in PlayVot. The system ensures consistent, maintainable, and accessible color usage across the entire application.

## 🚀 Quick Start

### Import Colors

```typescript
// For styled-components
import { colors } from '@/utils/colors';

// For Material-UI
import { colors } from '@/utils/colors';

// For theme access in styled-components
const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;
```

### Basic Usage

```typescript
// Primary colors
colors.primary          // #3B82F6
colors.primaryHover     // #2563EB
colors.primaryLight     // rgba(59, 130, 246, 0.1)

// Status colors
colors.success          // #10B981
colors.warning          // #F59E0B
colors.error            // #EF4444

// Text colors
colors.text.primary     // #FFFFFF
colors.text.secondary   // rgba(255, 255, 255, 0.8)

// Background colors
colors.background.primary   // #0A0A23
colors.background.card      // rgba(15, 23, 42, 0.3)
```

## 🛠️ Color Utilities

### Color Utils

```typescript
import { colorUtils } from '@/utils/colors';

// Add opacity to any color
colorUtils.withOpacity(colors.primary, 0.5)

// Get status colors
colorUtils.getStatusColor('success')
colorUtils.getStatusBackground('error')
colorUtils.getStatusBorder('warning')
```

### Color Combinations

```typescript
import { colorCombinations } from '@/utils/colors';

// Button styles
colorCombinations.button.primary
colorCombinations.button.secondary

// Card styles
colorCombinations.card.default
colorCombinations.card.primary
```

### Gradients

```typescript
import { gradients } from '@/utils/colors';

gradients.primary           // Primary gradient
gradients.rainbow          // Rainbow gradient
gradients.background       // Background gradient
gradients.subtle           // Subtle gradient
```

## 📋 Common Patterns

### Buttons

```typescript
// Primary button
const primaryButton = {
  backgroundColor: colors.primary,
  color: colors.text.primary,
  '&:hover': {
    backgroundColor: colors.primaryHover,
  }
};

// Secondary button
const secondaryButton = {
  backgroundColor: 'transparent',
  color: colors.text.primary,
  border: `1px solid ${colors.border.secondary}`,
  '&:hover': {
    backgroundColor: colors.primaryLight,
  }
};
```

### Cards

```typescript
const cardStyle = {
  backgroundColor: colors.background.card,
  border: `1px solid ${colors.border.primary}`,
  borderRadius: '12px',
  backdropFilter: 'blur(8px)',
};
```

### Status Indicators

```typescript
// Success
const successStyle = {
  backgroundColor: colors.successLight,
  color: colors.success,
  border: `1px solid ${colors.successBorder}`,
};

// Error
const errorStyle = {
  backgroundColor: colors.errorLight,
  color: colors.error,
  border: `1px solid ${colors.errorBorder}`,
};
```

## 🔧 Migration Tools

### Find Hardcoded Colors

```bash
# Find all hardcoded colors (dry run)
npm run fix-colors

# Apply fixes
npm run fix-colors:apply

# Verbose output
npm run fix-colors -- --verbose
```

### Manual Migration

1. **Replace hardcoded colors:**
   ```typescript
   // Before
   color: '#3B82F6'
   
   // After
   color: colors.primary
   ```

2. **Update imports:**
   ```typescript
   // Add to file
   import { colors } from '@/utils/colors';
   ```

3. **Use theme in styled-components:**
   ```typescript
   // Before
   color: #3B82F6
   
   // After
   color: ${({ theme }) => theme.colors.primary}
   ```

## 🎯 Best Practices

### ✅ Do's

- Use `colors.primary` instead of `#3B82F6`
- Use `colors.text.primary` for main text
- Use status colors for semantic meaning
- Use `colorUtils.withOpacity()` for transparency
- Use theme colors in styled-components

### ❌ Don'ts

- Don't use hardcoded hex values
- Don't use hardcoded rgba values
- Don't create new colors without updating the theme
- Don't use colors that don't match the semantic meaning

## 📚 Documentation

For detailed documentation, see:
- [Color System Documentation](./src/docs/COLOR_SYSTEM.md)
- [Theme Configuration](./src/config/styledTheme.ts)
- [Color Utilities](./src/utils/colors.ts)

## 🔍 Troubleshooting

### Common Issues

1. **Colors not updating:**
   - Make sure you're using theme colors, not hardcoded values
   - Check that the ThemeProvider is wrapping your component

2. **Import errors:**
   - Use `import { colors } from '@/utils/colors'`
   - Make sure the path alias `@` is configured

3. **TypeScript errors:**
   - Make sure you're importing from the correct file
   - Check that the theme types are properly extended

### Getting Help

- Check the [Color System Documentation](./src/docs/COLOR_SYSTEM.md)
- Run `npm run fix-colors` to find hardcoded colors
- Review existing components for examples
