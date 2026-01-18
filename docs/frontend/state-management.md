# State Management

## Purpose

This document describes the state management architecture for Scroll One SuperApp, including Zustand stores and React Query usage.

**Audience**: Frontend engineers, React Native developers

## Overview

Scroll One SuperApp uses a hybrid state management approach:
- **Zustand**: Client-side state (wallet, user, mini-apps, settings)
- **React Query**: Server state (API data, caching, synchronization)

## Zustand Stores

### Wallet Store

**Location**: `store/walletStore.ts`

**State**:
- `address`: Current wallet address
- `isConnected`: Connection status
- `isUnlocked`: Wallet unlock status
- `balance`: ETH balance
- `assets`: Asset list (tokens)
- `transactions`: Transaction history
- `isLoading`: Loading state
- `error`: Error state

**Actions**:
- `setAddress()`: Set wallet address
- `setBalance()`: Update balance
- `setAssets()`: Update assets
- `setTransactions()`: Update transactions
- `addTransaction()`: Add new transaction
- `setUnlocked()`: Set unlock status
- `disconnect()`: Disconnect wallet
- `reset()`: Reset store

**Usage**:
```typescript
import { useWalletStore } from '@/store/walletStore';

function WalletScreen() {
  const { address, balance, setBalance } = useWalletStore();
  // ...
}
```

### User Store

**Location**: `store/userStore.ts`

**State**:
- `scrollId`: User's Scroll ID
- `username`: Username
- `displayName`: Display name
- `avatar`: Avatar URL
- `reputation`: Reputation score
- `level`: User level
- `badges`: Badge list

**Actions**:
- `setUser()`: Set user data
- `updateProfile()`: Update profile
- `addBadge()`: Add badge
- `updateReputation()`: Update reputation

### Mini-App Store

**Location**: `store/miniAppStore.ts`

**State**:
- `recentApps`: Recently used apps
- `favoriteApps`: Favorite app IDs
- `currentApp`: Currently active app
- `isLoading`: Loading state
- `viewMode`: List or grid view
- `selectedCategory`: Selected category filter
- `page`: Pagination page
- `hasMore`: More items available

**Actions**:
- `setCurrentApp()`: Set active app
- `addToRecent()`: Add to recent apps
- `toggleFavorite()`: Toggle favorite
- `clearRecent()`: Clear recent apps
- `setCategory()`: Set category filter
- `loadMore()`: Load more apps

### Settings Store

**Location**: `store/settingsStore.ts`

**State**:
- `isTestnet`: Network preference
- `themeMode`: Theme (light/dark)
- `kycSharingEnabled`: KYC sharing preference
- `biometricAuthEnabled`: Biometric auth preference
- `useMockData`: Mock data flag
- `notificationsEnabled`: Notifications preference

**Actions**:
- `setNetwork()`: Set network (mainnet/testnet)
- `setTheme()`: Set theme mode
- `setKycSharingEnabled()`: Set KYC sharing
- `setBiometricAuthEnabled()`: Set biometric auth
- `setNotificationsEnabled()`: Set notifications

**Persistence**: Settings persisted to AsyncStorage

## React Query

### Setup

**Location**: `app/_layout.tsx`

**Configuration**:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      cacheTime: 300000, // 5 minutes
    },
  },
});
```

### Usage Patterns

**Fetching Data**:
```typescript
import { useQuery } from '@tanstack/react-query';

function TransactionList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions', address],
    queryFn: () => fetchTransactions(address),
  });
}
```

**Mutations**:
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function SendTransaction() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: sendTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    },
  });
}
```

## State Flow

### Component → Store → Service

```
Component
    ↓
useStore() / useQuery()
    ↓
Store Action / Query Function
    ↓
Service Layer
    ↓
API / Blockchain
    ↓
Response
    ↓
Store Update / Query Cache
    ↓
Component Re-render
```

## Best Practices

### Zustand

1. **Keep Stores Focused**: One store per domain
2. **Immutable Updates**: Always return new state
3. **Selective Subscriptions**: Use selectors to prevent unnecessary re-renders
4. **Async Actions**: Handle async in actions or services

### React Query

1. **Query Keys**: Use descriptive, hierarchical keys
2. **Stale Time**: Set appropriate stale times
3. **Cache Time**: Configure cache expiration
4. **Error Handling**: Handle errors gracefully
5. **Optimistic Updates**: Use for better UX

## Persistence

### SecureStore (Sensitive Data)

- Private keys
- Wallet data
- Authentication tokens

### AsyncStorage (Non-Sensitive Data)

- User preferences
- Settings
- Recent apps
- Favorite apps

## State Synchronization

### Wallet State Sync

When wallet state changes:
1. Update Zustand store
2. Update bridge state
3. Notify WebView (if active)
4. Invalidate React Query cache

### Network State Sync

When network changes:
1. Update settings store
2. Update provider configuration
3. Update bridge state
4. Invalidate cached data

## Performance Optimization

### Memoization

- Use `useMemo` for expensive computations
- Use `useCallback` for stable function references
- Zustand selectors prevent unnecessary re-renders

### Lazy Loading

- Load data on demand
- Paginate large lists
- Virtualize long lists (planned)

### Caching

- React Query handles server state caching
- Zustand stores client state in memory
- AsyncStorage for persistence

---

**Related Documentation:**
- [UI Architecture](./ui-architecture.md)
- [System Overview](../architecture/system-overview.md)
- [Code Style](../contributing/code-style.md)
