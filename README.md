# Zoddz - Premier Sports Betting Platform

A modern, responsive React application for sports betting with real-time updates, live odds, and comprehensive match details. Zoddz is your premier destination for sports wagering across cricket, football, kabaddi, volleyball, and more.

## 🚀 Features

- **Multi-Sport Support**: Cricket, Football, Kabaddi, Volleyball
- **Real-time Match Updates**: Live scores, commentary, and statistics
- **Betting Interface**: Comprehensive odds and betting options
- **Responsive Design**: Mobile-first approach with Material-UI
- **TypeScript**: Full type safety and better development experience
- **Error Handling**: Robust error boundaries and fallback UI
- **Performance Optimized**: Efficient rendering and data management

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── ErrorBoundary/   # Error handling components
│   ├── Layout/          # Layout and navigation components
│   ├── Match/           # Match-related components
│   │   ├── Commentary/  # Live commentary components
│   │   ├── Highlights/  # Match highlights components
│   │   ├── MatchDetails/# Match details page components
│   │   └── Scorecard/   # Scorecard components
│   ├── Shared/          # Shared/common components
│   └── UI/              # Basic UI components
├── config/              # Configuration files
│   ├── theme.tsx        # Material-UI theme configuration
│   └── styledTheme.ts   # Styled-components theme
├── data/                # Mock data and static data
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API services and data fetching
├── styles/              # Styled components and CSS
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
│   ├── constants/       # Application constants
│   ├── formatters.ts    # Data formatting utilities
│   ├── validators.ts    # Validation utilities
│   ├── storage.ts       # Local storage utilities
│   └── performance.ts   # Performance optimization utilities
└── App.tsx              # Main application component
```

## 🛠️ Technology Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library
- **Styled Components** - CSS-in-JS styling
- **React Router** - Client-side routing
- **Swiper** - Touch slider for mobile
- **CRACO** - Create React App Configuration Override

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd zoddz
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://api.zoddz.com
REACT_APP_ENVIRONMENT=development
```

### API Integration

The application integrates with real sports data APIs:

- **Boxing Matches API**: `https://zodds-client-uat-506191930239.asia-south1.run.app/ppl_upcoming_fixtures`
- **Authentication**: Bearer token authentication
- **Data Format**: JSON response with boxing fixtures and match details

API configuration is managed in `src/config/api.ts` with centralized endpoint management and authentication headers.

### TypeScript Configuration

The project uses strict TypeScript configuration with:

- Path mapping for clean imports (`@/*`)
- Strict type checking
- Modern ES features

### ESLint Configuration

Comprehensive ESLint setup with:

- TypeScript support
- Import ordering
- React best practices
- Code quality rules

## 🎨 Styling

The application uses a hybrid approach:

- **Material-UI**: For component library and theming
- **Styled Components**: For custom styling and animations
- **CSS Modules**: For component-specific styles

### Theme System

Centralized theme configuration in `src/config/theme.tsx` with:

- Dark mode support
- Consistent color palette
- Typography system
- Component overrides

## 📱 Component Architecture

### Component Organization

Components are organized by feature and responsibility:

1. **Page Components** (`src/pages/`): Main route components
2. **Feature Components** (`src/components/Match/`): Feature-specific components
3. **Shared Components** (`src/components/Shared/`): Reusable across features
4. **UI Components** (`src/components/UI/`): Basic building blocks

### Component Patterns

- **Functional Components**: With TypeScript interfaces
- **Custom Hooks**: For logic reuse and state management
- **Error Boundaries**: For graceful error handling
- **Loading States**: Consistent loading UI patterns

## 🔄 State Management

### Custom Hooks

- `useMatches()`: Match data management
- `useMatchDetails()`: Match details data management
- Error handling and retry logic built-in

### Data Flow

1. **Services Layer**: API calls and data transformation
2. **Hooks Layer**: State management and business logic
3. **Component Layer**: UI rendering and user interactions

## 🚨 Error Handling

### Error Boundaries

- Global error boundary in `App.tsx`
- Feature-specific error boundaries
- Graceful fallback UI
- Development error details

### Error Patterns

- Loading states for async operations
- Retry mechanisms for failed requests
- User-friendly error messages
- Console logging in development

## 📊 Performance Optimizations

### Code Splitting

- Route-based code splitting
- Component lazy loading
- Dynamic imports for heavy components

### Rendering Optimizations

- React.memo for expensive components
- useMemo and useCallback for expensive calculations
- Efficient re-rendering patterns

### Bundle Optimization

- Tree shaking for unused code
- Optimized imports
- Efficient dependency management

## 🧪 Testing

### Test Structure

```
src/
├── __tests__/           # Test files
├── components/          # Component tests
└── utils/              # Utility tests
```

### Testing Tools

- Jest for unit testing
- React Testing Library for component testing
- TypeScript support in tests

## 📈 Code Quality

### Linting

- ESLint with TypeScript support
- Import ordering and organization
- Code style consistency
- Best practices enforcement

### Type Safety

- Strict TypeScript configuration
- Comprehensive type definitions
- Interface-first development
- Type guards for runtime safety

## 🚀 Deployment

### Build Process

1. **Type checking**: `npm run type-check`
2. **Linting**: `npm run lint`
3. **Testing**: `npm test`
4. **Building**: `npm run build`

### Deployment Options

- **Static hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: For global performance
- **Environment-specific builds**

## 🤝 Contributing

### Development Workflow

1. **Feature branches**: Create from `main`
2. **Type safety**: Ensure all code is properly typed
3. **Testing**: Add tests for new features
4. **Documentation**: Update docs for API changes
5. **Code review**: Submit pull requests for review

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Write self-documenting code
- Add JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Built with ❤️ by Zoddz Team using modern React and TypeScript**
