# Code Style Guide

## Purpose

This document defines coding standards and conventions for Scroll One SuperApp.

**Audience**: All developers contributing to the project

## TypeScript

### General Rules

- **Strict Mode**: Always use TypeScript strict mode
- **No `any`**: Avoid `any` type, use proper types or `unknown`
- **Explicit Types**: Prefer explicit types over inference for function parameters and returns
- **Interfaces over Types**: Use `interface` for object shapes, `type` for unions/intersections

### Example

```typescript
// Good
interface User {
  walletAddress: string;
  role: 'user' | 'admin' | 'super_admin';
}

function getUser(walletAddress: string): Promise<User | null> {
  // ...
}

// Bad
function getUser(walletAddress: any): any {
  // ...
}
```

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (`WalletScreen.tsx`)
- **Services**: camelCase (`walletService.ts`)
- **Constants**: UPPER_SNAKE_CASE (`SCROLL_MAINNET_RPC`)
- **Directories**: kebab-case or camelCase (`services/`, `scroll/`)

### Variables and Functions

- **Variables**: camelCase (`walletAddress`, `transactionHash`)
- **Functions**: camelCase (`getBalance()`, `sendTransaction()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `DEFAULT_TIMEOUT`)
- **Private members**: Prefix with underscore if needed (`_internalMethod()`)

### Classes and Interfaces

- **Classes**: PascalCase (`ScrollProvider`, `BridgeService`)
- **Interfaces**: PascalCase (`User`, `TransactionRequest`)
- **Types**: PascalCase (`BridgeMethod`, `ErrorCode`)

## Code Organization

### File Structure

```typescript
// 1. Imports (external first, then internal)
import { ethers } from 'ethers';
import { scrollProvider } from './provider';

// 2. Types and interfaces
interface MyType {
  // ...
}

// 3. Constants
const MY_CONSTANT = 'value';

// 4. Functions/Classes
export function myFunction() {
  // ...
}

// 5. Default export (if any)
export default MyClass;
```

### Function Organization

1. **Pure functions first**: Functions with no side effects
2. **Helper functions**: Small utility functions
3. **Main functions**: Primary functionality
4. **Exports**: At the end

## React/React Native

### Component Structure

```typescript
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';

// 2. Types
interface Props {
  title: string;
  onPress: () => void;
}

// 3. Component
export function MyComponent({ title, onPress }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 6. Handlers
  const handlePress = () => {
    // ...
  };
  
  // 7. Render
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
```

### Hooks

- Use custom hooks for reusable logic
- Keep hooks focused (single responsibility)
- Name hooks with `use` prefix (`useWallet`, `useTransactions`)

### State Management

- **Local State**: `useState` for component-specific state
- **Global State**: Zustand stores for app-wide state
- **Server State**: React Query for server data

## Error Handling

### Always Handle Errors

```typescript
// Good
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('[Service] Error in riskyOperation:', error);
  throw new Error('Operation failed');
}

// Bad
const result = await riskyOperation(); // No error handling
```

### Error Messages

- **User-facing**: Clear, actionable messages
- **Logging**: Include context and error details
- **Never**: Expose sensitive data in errors

## Comments

### When to Comment

- **Why, not what**: Explain reasoning, not obvious code
- **Complex logic**: Document non-obvious algorithms
- **TODOs**: Mark incomplete work (with issue reference)
- **Public APIs**: Document function parameters and returns

### Comment Style

```typescript
/**
 * Signs a transaction with the wallet's private key.
 * 
 * @param transaction - Transaction request object
 * @returns Signed transaction ready to send
 * @throws Error if wallet is locked or transaction is invalid
 */
async function signTransaction(transaction: TransactionRequest): Promise<SignedTransaction> {
  // Implementation
}
```

## Security

### Never Do

- ❌ Log private keys or sensitive data
- ❌ Store secrets in code
- ❌ Expose private keys to WebView
- ❌ Trust user input without validation
- ❌ Use `eval()` or similar dangerous functions

### Always Do

- ✅ Validate all inputs
- ✅ Use SecureStore for sensitive data
- ✅ Encrypt sensitive data at rest
- ✅ Use HTTPS for all network calls
- ✅ Sanitize user inputs

## Performance

### Best Practices

1. **Memoization**: Use `useMemo` and `useCallback` appropriately
2. **Lazy Loading**: Load components and data on demand
3. **Debouncing**: Debounce user input handlers
4. **Pagination**: Limit result sets
5. **Caching**: Cache frequently accessed data

### Avoid

- Unnecessary re-renders
- Large bundle sizes
- Blocking the main thread
- Memory leaks (clean up subscriptions)

## Testing

### Test Structure

```typescript
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test';
      
      // Act
      const result = methodName(input);
      
      // Assert
      expect(result).toBe('expected');
    });
  });
});
```

### Test Coverage

- **Unit Tests**: Test individual functions
- **Integration Tests**: Test service interactions
- **E2E Tests**: Test complete user flows

## Git Conventions

### Commit Messages

Follow conventional commits:

```
feat: Add network switching UI
fix: Resolve token balance display issue
docs: Update API documentation
refactor: Simplify bridge handler logic
test: Add tests for transaction service
chore: Update dependencies
```

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation
- `refactor/refactoring-description` - Refactoring

## Linting and Formatting

### ESLint

Run linting:
```bash
bun run lint
```

Fix automatically:
```bash
bun run lint:fix
```

### Prettier (Planned)

Prettier will be added for consistent formatting.

## Code Review Guidelines

### For Authors

- Keep PRs small and focused
- Write clear commit messages
- Respond to feedback promptly
- Test thoroughly before submitting

### For Reviewers

- Be constructive and respectful
- Focus on code quality and correctness
- Check for security issues
- Verify tests and documentation

---

**Related Documentation:**
- [Contribution Guide](./contribution-guide.md)
- [System Overview](../architecture/system-overview.md)
- [Implementation Status](../reference/implementation-status.md)
