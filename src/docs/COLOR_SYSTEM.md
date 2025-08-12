# Color System Documentation

## Overview

This document describes the unified color system used throughout the PlayVot application. The color system is designed to be consistent, maintainable, and accessible.

## Color Definitions

All colors are defined in `src/config/styledTheme.ts` and exported through `src/utils/colors.ts`.

### Primary Colors

```typescript
primary: '#3B82F6'        // Main brand color
primaryHover: '#2563EB'   // Hover state
primaryLight: 'rgba(59, 130, 246, 0.1)'  // Light background
primaryBorder: 'rgba(59, 130, 246, 0.2)' // Border color
primaryDark: '#1D4ED8'    // Dark variant
```

### Secondary Colors

```typescript
secondary: '#8B5CF6'      // Secondary brand color
secondaryHover: '#7C3AED' // Hover state
secondaryLight: 'rgba(139, 92, 246, 0.1)' // Light background
secondaryBorder: 'rgba(139, 92, 246, 0.2)' // Border color
```

### Status Colors

```typescript
success: '#10B981'        // Success states
warning: '#F59E0B'        // Warning states
error: '#EF4444'          // Error states
```

Each status color has corresponding `Light`, `Border`, and `Hover` variants.

### Background Colors

```typescript
background: {
  primary: '#0A0A23',     // Main background
  secondary: '#111827',   // Secondary background
  tertiary: '#0F172A',    // Tertiary background
  card: 'rgba(15, 23, 42, 0.3)', // Card background
  surface: 'rgba(30, 41, 59, 0.4)', // Surface background
  overlay: 'rgba(0, 0, 0, 0.5)', // Overlay background
}
```

### Text Colors

```typescript
text: {
  primary: '#FFFFFF',     // Primary text
  secondary: 'rgba(255, 255, 255, 0.8)', // Secondary text
  disabled: 'rgba(255, 255, 255, 0.5)', // Disabled text
  muted: '#94A3B8',       // Muted text
  inverse: '#0F172A',     // Text on light backgrounds
}
```

### Border Colors

```typescript
border: {
  primary: 'rgba(255, 255, 255, 0.1)',   // Primary borders
  secondary: 'rgba(59, 130, 246, 0.15)', // Secondary borders
  accent: 'rgba(139, 92, 246, 0.15)',    // Accent borders
}
```

## Usage Guidelines

### 1. Import Colors

```typescript
import { colors, colorUtils, colorCombinations } from '@/utils/colors';
// or
import { colors } from '@/utils';
```

### 2. Using Colors in Styled Components

```typescript
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorder};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;
```

### 3. Using Colors in Material-UI

```typescript
import { colors } from '@/utils/colors';

const styles = {
  button: {
    backgroundColor: colors.primary,
    color: colors.text.primary,
    '&:hover': {
      backgroundColor: colors.primaryHover,
    }
  }
};
```

### 4. Using Color Utilities

```typescript
import { colorUtils } from '@/utils/colors';

// Get color with opacity
const transparentBlue = colorUtils.withOpacity(colors.primary, 0.5);

// Get status colors
const successColor = colorUtils.getStatusColor('success');
const errorBackground = colorUtils.getStatusBackground('error');
const warningBorder = colorUtils.getStatusBorder('warning');
```

### 5. Using Color Combinations

```typescript
import { colorCombinations } from '@/utils/colors';

// Button styles
const primaryButtonStyle = colorCombinations.button.primary;

// Card styles
const cardStyle = colorCombinations.card.default;

// Text styles
const headingColor = colorCombinations.text.primary;
```

### 6. Using Gradients

```typescript
import { gradients } from '@/utils/colors';

const gradientBackground = gradients.primary;
const rainbowGradient = gradients.rainbow;
const subtleGradient = gradients.subtle;
```

## Best Practices

### 1. Never Use Hardcoded Colors

❌ **Don't do this:**
```typescript
const styles = {
  backgroundColor: '#3B82F6',
  color: '#FFFFFF'
};
```

✅ **Do this:**
```typescript
import { colors } from '@/utils/colors';

const styles = {
  backgroundColor: colors.primary,
  color: colors.text.primary
};
```

### 2. Use Theme Colors in Styled Components

❌ **Don't do this:**
```typescript
const StyledComponent = styled.div`
  color: #3B82F6;
`;
```

✅ **Do this:**
```typescript
const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;
```

### 3. Use Status Colors for Semantic Meaning

```typescript
// For success states
const successStyle = colorUtils.getStatusColor('success');

// For error states
const errorStyle = colorUtils.getStatusColor('error');

// For warning states
const warningStyle = colorUtils.getStatusColor('warning');
```

### 4. Use Color Utilities for Dynamic Colors

```typescript
// Instead of hardcoding opacity
const transparentColor = colorUtils.withOpacity(colors.primary, 0.1);

// Instead of hardcoding status colors
const statusColor = colorUtils.getStatusColor('success');
```

## Migration Guide

### From Hardcoded Colors

1. **Find hardcoded colors:**
   ```bash
   grep -r "#[0-9A-Fa-f]\{3,6\}" src/
   ```

2. **Replace with theme colors:**
   ```typescript
   // Before
   color: '#3B82F6'
   
   // After
   color: colors.primary
   ```

### From Old Theme System

1. **Update imports:**
   ```typescript
   // Before
   import { themeColors } from '@/config/theme';
   
   // After
   import { colors } from '@/utils/colors';
   ```

2. **Update color references:**
   ```typescript
   // Before
   themeColors.primary
   
   // After
   colors.primary
   ```

## Accessibility Considerations

- All color combinations meet WCAG 2.1 AA contrast requirements
- Use `colors.text.primary` for main text on dark backgrounds
- Use `colors.text.inverse` for text on light backgrounds
- Status colors are semantically meaningful for screen readers

## Future Considerations

- Consider adding dark/light theme support
- Add color palette variations for different contexts
- Implement color scheme validation in CI/CD
- Add color accessibility testing tools
