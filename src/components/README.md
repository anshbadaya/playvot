# Components

This directory contains all the reusable components for the PlayVot application, now using styled-components for cleaner and more maintainable styling.

## Architecture

### Styled Components

We've migrated from Material-UI styled components to styled-components for better performance and cleaner code. The styling system includes:

- **Theme System**: Centralized theme configuration in `src/config/styledTheme.ts`
- **Common Components**: Reusable styled components in `src/components/UI/CommonStyles.tsx`
- **Component Library**: Individual UI components in `src/components/UI/`

### Directory Structure

```
src/components/
├── Auth/           # Authentication components
├── Layout/         # Layout components
├── Match/          # Match-related components
├── Shared/         # Shared components (Header, Footer, etc.)
├── UI/             # Reusable UI components
│   ├── CommonStyles.tsx  # Common styled components
│   ├── Button.tsx        # Button component
│   ├── Card.tsx          # Card component
│   ├── LoadingSpinner.tsx # Loading spinner
│   └── Example.tsx       # Example usage
└── index.ts        # Main exports
```

## Usage

### Theme Provider

The app is wrapped with styled-components ThemeProvider in `App.tsx`:

```tsx
import { ThemeProvider } from "styled-components";
import { styledTheme } from "@/config/styledTheme";

function App() {
  return (
    <ThemeProvider theme={styledTheme}>{/* Your app content */}</ThemeProvider>
  );
}
```

### Using Styled Components

#### Basic Usage

```tsx
import styled from "styled-components";

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
```

#### Using Common Components

```tsx
import { Button, Card, Flex, Container } from "@/components/UI";

function MyComponent() {
  return (
    <Container>
      <Flex gap="16px" direction="column">
        <Card padding="md" hover>
          <Button variant="primary">Click me</Button>
        </Card>
      </Flex>
    </Container>
  );
}
```

## Available Components

### UI Components

#### Button

```tsx
<Button
  variant="primary" | "secondary" | "outline" | "ghost"
  size="sm" | "md" | "lg"
  disabled={boolean}
  fullWidth={boolean}
  onClick={() => {}}
>
  Button Text
</Button>
```

#### Card

```tsx
<Card
  padding="sm" | "md" | "lg" | "xl"
  hover={boolean}
  onClick={() => {}}
>
  Card content
</Card>
```

#### LoadingSpinner

```tsx
<LoadingSpinner
  size="sm" | "md" | "lg"
  color="custom-color"
/>
```

### Common Styled Components

#### Flex

```tsx
<Flex
  direction="row" | "column"
  align="flex-start" | "center" | "flex-end" | "stretch"
  justify="flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  gap="16px"
>
  Content
</Flex>
```

#### Container

```tsx
<Container>Responsive container with max-width and padding</Container>
```

#### Typography

```tsx
<Title>Main heading</Title>
<Subtitle>Secondary heading</Subtitle>
<Text>Body text</Text>
```

#### Badge

```tsx
<Badge variant="primary" | "secondary" | "success" | "warning" | "error">
  Badge text
</Badge>
```

## Theme

The theme object provides consistent design tokens:

```tsx
const theme = {
  colors: {
    primary: "#1D4ED8",
    background: { primary: "#0A0A23", secondary: "#111827" },
    text: { primary: "#FFFFFF", secondary: "rgba(255, 255, 255, 0.8)" },
    // ... more colors
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "900px",
    lg: "1200px",
    xl: "1536px",
  },
  transitions: {
    fast: "0.2s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },
};
```

## Benefits of Styled Components

1. **Better Performance**: No runtime CSS-in-JS overhead
2. **Cleaner Code**: Styles are co-located with components
3. **Type Safety**: Full TypeScript support
4. **Theme Integration**: Easy access to design tokens
5. **Dynamic Styling**: Props-based styling
6. **Maintainability**: Easier to refactor and maintain

## Migration from Material-UI

The components have been migrated from Material-UI styled components to styled-components:

- Removed Material-UI dependencies where possible
- Maintained the same visual design
- Improved performance and bundle size
- Simplified component APIs

## Best Practices

1. **Use Theme Tokens**: Always use theme values instead of hardcoded values
2. **Component Composition**: Build complex components from simple styled components
3. **Props for Variants**: Use props to control component variants
4. **Responsive Design**: Use theme breakpoints for responsive styling
5. **Performance**: Avoid creating styled components inside render functions

## Example

See `src/components/UI/Example.tsx` for a comprehensive example of all available components and their usage.
