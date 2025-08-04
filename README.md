# PlayVot - Sports Betting Platform

A modern, responsive sports betting platform built with React, TypeScript, and Material-UI.

## 🚀 Features

- **Multi-Sport Support**: Cricket, Football, Kabaddi, Volleyball
- **Live Match Updates**: Real-time commentary and score updates
- **Betting Interface**: Comprehensive odds and betting options
- **Responsive Design**: Optimized for all device sizes
- **Dark Theme**: Modern dark UI with consistent styling

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Authentication components
│   ├── Match/          # Match-related components
│   ├── Shared/         # Shared/common components
│   └── ui/             # UI components
├── config/             # Configuration files
│   ├── theme.tsx       # Material-UI theme configuration
│   └── config.tsx      # App configuration
├── data/               # Static data and mock data
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── styles/             # Styling files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions and constants
```

## 🎨 Design System

### Theme Configuration

The application uses a centralized theme system located in `src/config/theme.tsx`:

- **Colors**: Consistent color palette with primary, secondary, and semantic colors
- **Typography**: Standardized font weights and sizes
- **Spacing**: Consistent spacing scale
- **Components**: Pre-configured Material-UI component styles

### Styling Patterns

#### 1. Shared Styles (`src/styles/shared.styles.ts`)

Common styling patterns used across components:

- Layout patterns (containers, grids, flex layouts)
- Card patterns with consistent hover effects
- Button patterns (primary, secondary)
- Text patterns (headings, body text, captions)
- Status patterns (success, warning, error, info)
- Loading, error, and empty state patterns

#### 2. Component-Specific Styles

Each major feature has its own style file:

- `src/styles/matches.styles.ts` - Matches page styles
- `src/styles/matchDetails.styles.ts` - Match details page styles

#### 3. Global Styles (`src/styles/globals.css`)

CSS custom properties and utility classes for consistent theming.

### Usage Examples

```typescript
// Using shared styles
import { sharedStyles } from "@/styles/shared.styles";

const MyComponent = () => (
  <Box sx={sharedStyles.card}>
    <Typography sx={sharedStyles.heading}>Title</Typography>
    <Button sx={sharedStyles.primaryButton}>Click me</Button>
  </Box>
);

// Using theme colors
import { themeColors } from "@/config/theme";

const StyledBox = styled(Box)({
  backgroundColor: themeColors.surface,
  color: themeColors.text.primary,
  border: `1px solid ${themeColors.border}`,
});
```

## 📝 Coding Standards

### 1. Import Organization

Imports should be organized in the following order:

1. React and external libraries
2. Material-UI components
3. Internal components (using barrel exports)
4. Hooks and utilities
5. Types
6. Styles

```typescript
import React from "react";
import { Box, Typography } from "@mui/material";
import { Layout, MatchCard } from "@/components";
import { useMatches } from "@/hooks";
import { Match } from "@/types";
import { matchesStyles } from "@/styles";
```

### 2. Component Structure

Components should follow this structure:

1. Imports
2. Type definitions
3. Component definition
4. Export

```typescript
import React from "react";
import { Box } from "@mui/material";
import { themeColors } from "@/config/theme";

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <Box sx={{ color: themeColors.text.primary }}>
      <h1>{title}</h1>
      {children}
    </Box>
  );
};

export default Component;
```

### 3. Styling Guidelines

- Use Material-UI's `sx` prop for component-specific styles
- Use shared styles for common patterns
- Use theme colors and constants for consistency
- Prefer responsive design with breakpoint objects

```typescript
// Good
<Box sx={{
  ...sharedStyles.card,
  padding: { xs: 2, sm: 3, md: 4 },
  color: themeColors.text.primary
}}>

// Avoid inline styles
<Box style={{ padding: '16px', color: '#FFFFFF' }}>
```

### 4. Type Safety

- Use TypeScript interfaces for all props
- Export types from barrel files
- Use strict typing for API responses

```typescript
// Define interfaces
interface MatchData {
  id: string;
  title: string;
  status: "live" | "upcoming" | "completed";
}

// Use in components
const MatchComponent: React.FC<{ match: MatchData }> = ({ match }) => {
  // Component logic
};
```

### 5. Utility Functions

Use the centralized utility functions from `src/utils/`:

- `formatScore()` - Format scores based on sport type
- `formatDate()` - Format dates consistently
- `isLiveMatch()` - Type guards for match status
- `debounce()` - Performance optimization

## 🔧 Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm start
```

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

## 📦 Dependencies

### Core

- React 19.1.0
- TypeScript 4.9.5
- Material-UI 7.2.0
- React Router DOM 6.30.1

### Development

- CRACO 7.1.0
- ESLint
- Prettier

## 🎯 Best Practices

1. **Consistency**: Always use shared styles and theme constants
2. **Performance**: Use React.memo for expensive components
3. **Accessibility**: Include proper ARIA labels and keyboard navigation
4. **Responsive**: Design for mobile-first approach
5. **Error Handling**: Implement proper error boundaries and loading states
6. **Type Safety**: Use strict TypeScript configuration
7. **Code Organization**: Follow the established folder structure
8. **Naming**: Use descriptive names for components, functions, and variables

## 🤝 Contributing

1. Follow the established coding standards
2. Use the shared styling patterns
3. Write TypeScript interfaces for all new components
4. Update documentation for new features
5. Test on multiple device sizes

## 📄 License

This project is licensed under the MIT License.
