# UI Architecture

## Purpose

This document describes the frontend UI architecture, component structure, and design system for Scroll One SuperApp.

**Audience**: Frontend engineers, UI/UX developers

## Overview

The mobile app uses React Native with Expo, following a component-based architecture with a custom design system.

## Framework Stack

- **React Native**: 0.81.5
- **Expo**: ~54.0.27
- **Expo Router**: File-based routing
- **TypeScript**: 5.9.2 (strict mode)
- **Icons**: Lucide React Native

## Project Structure

```
app/
├── (tabs)/              # Tab navigation screens
│   ├── (wallet)/        # Wallet tab
│   ├── (explore)/       # Explore tab (mini-apps)
│   └── (identity)/      # Identity tab
├── _layout.tsx          # Root layout
└── +not-found.tsx       # 404 screen

components/
├── ui/                  # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── ...
└── ...

theme/
├── colors.ts            # Color system
├── typography.ts        # Typography
├── spacing.ts           # Spacing system
└── shadows.ts           # Shadow system
```

## Design System

### Colors

**Location**: `theme/colors.ts`

**Color Palette**:
- Primary: Scroll brand colors
- Background: Light/dark themes
- Text: High contrast for readability
- Accent: Highlight colors
- Status: Success, error, warning

**Theme Support**: Light and dark modes

### Typography

**Location**: `theme/typography.ts`

**Type Scale**:
- Heading (H1-H4)
- Body (regular, medium, semibold)
- Caption
- Button text

**Font**: System fonts (iOS/Android)

### Spacing

**Location**: `theme/spacing.ts`

**Spacing Scale**: 4px base unit
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Shadows

**Location**: `theme/shadows.ts`

**Shadow Levels**: Elevation-based shadows for depth

## Component Architecture

### Screen Components

**Location**: `app/(tabs)/`

**Structure**:
```typescript
import { Screen } from '@/components/ui/Screen';

export default function WalletScreen() {
  return (
    <Screen>
      {/* Screen content */}
    </Screen>
  );
}
```

### UI Components

**Location**: `components/ui/`

**Common Components**:
- `Button`: Primary, secondary, text buttons
- `Card`: Container with shadow
- `Header`: Screen header with navigation
- `Loading`: Loading spinner
- `CategoryTabs`: Category navigation
- `TransactionItem`: Transaction list item

### Component Patterns

**Container/Presentational**:
- Containers: Handle logic and state
- Presentational: Pure UI components

**Composition**:
- Small, focused components
- Composed into larger components

## Navigation

### Expo Router

**File-Based Routing**:
- `app/(tabs)/(wallet)/index.tsx` → Wallet tab
- `app/(tabs)/(explore)/index.tsx` → Explore tab
- `app/(tabs)/(identity)/index.tsx` → Identity tab

**Navigation**:
```typescript
import { router } from 'expo-router';

router.push('/wallet/send');
```

### Tab Navigation

**Tabs**:
1. Wallet: Wallet overview, send, receive, activity
2. Explore: Mini-app discovery and browsing
3. Identity: Profile, badges, settings

## Screen Structure

### Wallet Tab

**Screens**:
- `index.tsx`: Wallet overview
- `send.tsx`: Send transaction
- `receive.tsx`: Receive (QR code)
- `activity.tsx`: Transaction history
- `transaction/[hash].tsx`: Transaction details

### Explore Tab

**Screens**:
- `index.tsx`: Mini-app list
- `[appId].tsx`: Mini-app WebView

### Identity Tab

**Screens**:
- `index.tsx`: Profile
- `preferences.tsx`: Settings
- `privacy.tsx`: Privacy & security

## WebView Integration

### WebViewContainer

**Location**: `miniapps/WebViewContainer.tsx`

**Features**:
- Loads dApp URL
- Injects bridge SDK
- Handles bridge messages
- Shows loading/error states

**Usage**:
```typescript
<WebViewContainer
  app={selectedApp}
  onError={handleError}
/>
```

## Responsive Design

### Screen Sizes

- **Small**: < 375px width
- **Medium**: 375px - 768px
- **Large**: > 768px

### Adaptive Layouts

- Flexible layouts using Flexbox
- Responsive spacing
- Adaptive typography

## Accessibility

### Best Practices

- Semantic HTML (where applicable)
- Screen reader support
- High contrast mode
- Touch target sizes (minimum 44x44px)

## Performance

### Optimization

- **Lazy Loading**: Load screens on demand
- **Memoization**: Memoize expensive components
- **Image Optimization**: Optimize images
- **List Virtualization**: Virtualize long lists (planned)

### Bundle Size

- Code splitting (Expo Router)
- Tree shaking
- Remove unused dependencies

## Testing

### Component Testing

**Planned**:
- React Native Testing Library
- Component unit tests
- Integration tests

## Future Enhancements

1. **Animation**: Framer Motion integration
2. **Gesture Handling**: React Native Gesture Handler
3. **Accessibility**: Enhanced a11y support
4. **Theming**: More theme options
5. **Internationalization**: i18n support

---

**Related Documentation:**
- [State Management](./state-management.md)
- [System Overview](../architecture/system-overview.md)
- [Code Style](../contributing/code-style.md)
