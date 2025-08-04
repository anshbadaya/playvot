# Component Organization

This document outlines the organized component structure for better maintainability and efficiency.

## Directory Structure

```
src/components/
├── Auth/                    # Authentication components
│   ├── index.ts            # Auth component exports
│   ├── types.ts            # Auth-specific types
│   ├── Login.tsx           # Main login component
│   ├── LoginForm.tsx       # Login form sub-component
│   ├── LoginBackground.tsx # Login background sub-component
│   └── LoginHeader.tsx     # Login header sub-component
│
├── Layout/                  # Layout components
│   ├── index.ts            # Layout component exports
│   ├── types.ts            # Layout-specific types
│   ├── Layout.tsx          # Main layout component
│   ├── PageContainer.tsx   # Page container sub-component
│   ├── Sidebar.tsx         # Sidebar sub-component
│   └── ContentArea.tsx     # Content area sub-component
│
├── Match/                   # Match-related components
│   ├── index.ts            # Match component exports
│   ├── MatchCard.tsx       # Match card component
│   ├── MatchInfo.tsx       # Match info component
│   ├── MatchSummary.tsx    # Match summary component
│   ├── MatchTabsNavigation.tsx # Match tabs navigation
│   ├── Squads.tsx          # Squads component
│   ├── WinProbabilityBar.tsx # Win probability bar
│   ├── styles/             # Match-specific styles
│   │
│   ├── Scorecard/          # Scorecard sub-components
│   │   ├── index.ts        # Scorecard exports
│   │   ├── types.ts        # Scorecard types
│   │   ├── ScorecardComponent.tsx # Main scorecard
│   │   ├── BattingTable.tsx # Batting table
│   │   ├── BowlingTable.tsx # Bowling table
│   │   ├── MatchInfoCard.tsx # Match info card
│   │   ├── ActivePlayersCard.tsx # Active players
│   │   ├── InningsCard.tsx # Innings card
│   │   └── SquadsCard.tsx  # Squads card
│   │
│   ├── Commentary/         # Commentary sub-components
│   │   ├── index.ts        # Commentary exports
│   │   ├── types.ts        # Commentary types
│   │   ├── LiveCommentary.tsx # Main commentary
│   │   ├── CommentaryTab.tsx # Commentary tab
│   │   ├── CommentaryItem.tsx # Individual commentary item
│   │   ├── OverByOverView.tsx # Over by over view
│   │   └── CommentaryCard.tsx # Commentary card
│   │
│   └── Highlights/         # Highlights sub-components
│       ├── index.ts        # Highlights exports
│       ├── types.ts        # Highlights types
│       ├── HighlightsTab.tsx # Main highlights tab
│       ├── HighlightsCard.tsx # Highlights card
│       ├── HighlightsSection.tsx # Highlights section
│       └── HighlightItem.tsx # Individual highlight item
│
├── Shared/                  # Shared/common components
│   ├── Header.tsx          # Header component
│   ├── Footer.tsx          # Footer component
│   ├── BackHeader.tsx      # Back header component
│   └── StyledBackground.tsx # Styled background
│
├── UI/                      # Reusable UI components
│   ├── index.ts            # UI component exports
│   ├── types.ts            # UI-specific types
│   ├── Card.tsx            # Card component
│   ├── Button.tsx          # Button component
│   ├── LoadingSpinner.tsx  # Loading spinner
│   ├── ErrorBoundary.tsx   # Error boundary
│   ├── EmptyState.tsx      # Empty state component
│   └── Badge.tsx           # Badge component
│
└── index.ts                # Main component exports
```

## Component Organization Principles

### 1. **Feature-Based Organization**

- Components are organized by feature/domain (Auth, Match, Layout, etc.)
- Each feature has its own directory with sub-components

### 2. **Separation of Concerns**

- Large components are broken down into smaller, focused sub-components
- Each component has a single responsibility

### 3. **Type Safety**

- Each feature directory has its own `types.ts` file
- Types are exported through index files for easy importing

### 4. **Consistent Naming**

- Components use descriptive, consistent naming conventions
- Sub-components are clearly named with their parent context

### 5. **Reusability**

- UI components are separated for maximum reusability
- Shared components are in their own directory

## Benefits of This Organization

1. **Maintainability**: Easier to find and modify specific components
2. **Scalability**: New features can be added without affecting existing code
3. **Reusability**: UI components can be reused across the application
4. **Type Safety**: Better TypeScript support with organized types
5. **Performance**: Smaller components can be optimized individually
6. **Testing**: Easier to write unit tests for smaller, focused components

## Usage Examples

```typescript
// Import main components
import { Layout, Header, Footer } from "@/components";

// Import feature-specific components
import { Login, LoginForm } from "@/components/Auth";
import { ScorecardComponent, BattingTable } from "@/components/Match/Scorecard";

// Import UI components
import { Card, Button, LoadingSpinner } from "@/components/UI";
```

## Migration Notes

- Large monolithic components have been broken down into smaller, focused components
- Types have been extracted to separate files for better organization
- Each feature now has its own index file for clean exports
- Component names have been made more descriptive and consistent
