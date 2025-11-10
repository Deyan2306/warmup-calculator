# PreppedUp - Powerlifting Warm-up Calculator

A modern, modular Next.js application for generating personalized powerlifting warm-up routines.

## 🏗️ Project Structure

The project has been restructured into a world-class, modular architecture:

```
warmup-calculator/
├── app/                          # Next.js App Router pages
│   ├── create-warmup/           # Warm-up generator page
│   ├── estimate-one-rep-max/    # 1RM calculator page
│   ├── home/                    # Dashboard page
│   ├── login/                   # Authentication pages
│   ├── register/
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   ├── warmup/                  # Warm-up specific components
│   │   └── steps/               # Individual step components
│   ├── layout/                  # Layout components
│   ├── forms/                   # Form components
│   ├── common/                  # Shared components
│   └── index.ts                 # Component exports
├── types/                       # TypeScript type definitions
│   ├── warmup.ts               # Warm-up related types
│   ├── ui.ts                   # UI component types
│   ├── common.ts               # Common types
│   └── index.ts                # Type exports
├── hooks/                       # Custom React hooks
│   ├── useWarmupCalculator.ts  # Main calculator logic
│   ├── useLocalStorage.ts      # Local storage hook
│   ├── useDebounce.ts          # Debounce hook
│   ├── useAnimation.ts         # Animation hook
│   └── index.ts                # Hook exports
├── utils/                       # Utility functions
│   ├── format.ts               # Formatting utilities
│   ├── validation.ts           # Validation utilities
│   ├── calculations.ts         # Calculation utilities
│   ├── storage.ts              # Storage utilities
│   └── index.ts                # Utility exports
├── constants/                   # Application constants
│   ├── app.ts                  # App configuration
│   ├── warmup.ts               # Warm-up constants
│   ├── ui.ts                   # UI constants
│   ├── api.ts                  # API constants
│   └── index.ts                # Constant exports
├── lib/                        # Library code
│   ├── warmup/                 # Warm-up calculation logic
│   └── utils.ts                # Utility functions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🚀 Features

- **Modular Architecture**: Clean separation of concerns with organized folders
- **Type Safety**: Comprehensive TypeScript types for all components and functions
- **Custom Hooks**: Reusable logic for state management and animations
- **Design System**: Consistent Tailwind configuration with custom utilities
- **Component Library**: Organized UI components with proper exports
- **Constants Management**: Centralized configuration and constants
- **Utility Functions**: Reusable helper functions for common operations

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: shadcn/ui components
- **Animations**: GSAP for smooth animations
- **Icons**: Lucide React
- **State Management**: React hooks with custom logic

## 📦 Key Components

### Warm-up Calculator
- Multi-step wizard for generating warm-up routines
- Support for different lifts (squat, bench, deadlift)
- Multiple warm-up methods (classic, RPE, pyramid, etc.)
- Plate availability configuration
- Intensity level selection

### One Rep Max Calculator
- Brzycki and Lombardi formulas
- Support for different rep ranges
- Integration with warm-up generator

### Dashboard
- User statistics and progress tracking
- Workout history visualization
- Performance analytics

## 🎨 Design System

The project includes a comprehensive Tailwind configuration with:

- **Custom Colors**: Brand colors, powerlifting-specific colors, status colors
- **Typography**: Custom font sizes and line heights
- **Spacing**: Extended spacing scale
- **Animations**: Custom keyframes and animation utilities
- **Components**: Pre-built component classes for common patterns

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## 📁 Folder Guidelines

### Components
- Place reusable UI components in `components/ui/`
- Feature-specific components in their respective folders
- Use index.ts files for clean exports
- Follow the component naming convention

### Types
- Define types in the `types/` folder
- Group related types in separate files
- Export all types through index.ts

### Hooks
- Custom hooks in the `hooks/` folder
- One hook per file
- Include proper TypeScript types

### Utils
- Pure functions in the `utils/` folder
- Group by functionality
- Include JSDoc comments for complex functions

### Constants
- Application constants in the `constants/` folder
- Group by domain (app, warmup, ui, api)
- Use const assertions for type safety

## 🎯 Best Practices

1. **Import Organization**: Use the centralized exports from index.ts files
2. **Type Safety**: Always define proper TypeScript types
3. **Component Structure**: Follow the established component patterns
4. **Styling**: Use the custom Tailwind utilities and design system
5. **State Management**: Use custom hooks for complex state logic
6. **Constants**: Use the centralized constants instead of magic numbers/strings

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

The application is now ready for development with a clean, modular architecture that's easy to maintain and extend!