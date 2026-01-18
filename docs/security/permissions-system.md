# Permissions System

## Purpose

This document describes the ERC-7715-inspired permissions system for Scroll One SuperApp, enabling fine-grained permissions for mini-apps to reduce approval prompts.

**Audience**: Security engineers, backend developers, mini-app integrators

**Status**: 📋 **Planned for near-future implementation**

## Overview

The permissions system allows mini-apps to request fine-grained permissions from users, enabling automatic transaction execution within specified limits without requiring approval for each transaction.

### Key Benefits

1. **Better UX**: Mini-apps can execute transactions without repeated approval prompts
2. **Enhanced Security**: Fine-grained limits (amount, time, contracts) prevent abuse
3. **User Control**: Users can view, modify, and revoke permissions at any time
4. **Competitive Advantage**: Matches modern wallet UX patterns

## Architecture

### High-Level Flow

```
Mini-App → Request Permissions → Permission UI → Store Permission →
Transaction Check → Validate Constraints → Execute (if valid) →
Track Usage → Rate Limit Check
```

### Components

- **Permission Service**: Core permission logic
- **Permission Store**: Secure storage (SecureStore)
- **Permission Validator**: Constraint validation
- **Usage Tracker**: Rate limiting and usage tracking
- **Bridge Handlers**: Permission request/revoke handlers

## Permission Model

### Permission Structure

```typescript
interface Permission {
  id: string;
  appId: string;
  origin: string;
  type: 'TRANSACTION' | 'MESSAGE' | 'TYPED_DATA';
  constraints: PermissionConstraints;
  grantedAt: number;
  expiresAt?: number;
  usageCount: number;
}
```

### Constraints

**Amount Limits**:
- `maxAmount`: Max per transaction
- `maxPerDay`: Max per day
- `maxPerWeek`: Max per week
- `maxPerMonth`: Max per month

**Rate Limits**:
- `maxTransactionsPerDay`: Transaction count limit
- `maxTransactionsPerWeek`: Weekly limit

**Token Restrictions**:
- `allowedTokens`: Whitelist of tokens
- `deniedTokens`: Blacklist of tokens

**Contract Restrictions**:
- `allowedContracts`: Whitelist of contracts
- `deniedContracts`: Blacklist of contracts

**Time Restrictions**:
- `allowedHours`: Hours of day (0-23)
- `allowedDays`: Days of week (0-6)
- `expiresAt`: Expiration timestamp

## Implementation Phases

### Phase 1: Core Infrastructure

- Permission storage (SecureStore)
- Permission service
- Basic validation

### Phase 2: Bridge Integration

- Bridge methods for permission requests
- Permission UI components
- Usage tracking

### Phase 3: Advanced Features

- Rate limiting
- Time-based restrictions
- Contract/token restrictions

### Phase 4: Management UI

- Permission management screen
- View/revoke permissions
- Usage statistics

## Security Considerations

### Validation

- All constraints validated before execution
- Usage tracked and checked
- Expiration enforced
- Rate limits enforced

### Storage

- Permissions stored in SecureStore
- Encrypted at rest
- No cloud backup

### User Control

- Users can revoke at any time
- Clear permission UI
- Usage statistics visible

## API Reference

### Request Permissions

```typescript
window.scrollOne.requestPermissions({
  type: 'TRANSACTION',
  constraints: {
    maxAmount: '0.1', // 0.1 ETH
    maxPerDay: '1.0', // 1 ETH per day
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  }
});
```

### Check Permission

```typescript
const hasPermission = await window.scrollOne.checkPermission({
  type: 'TRANSACTION',
  amount: '0.05',
  to: '0x...',
});
```

### Revoke Permission

```typescript
await window.scrollOne.revokePermission(permissionId);
```

## Use Cases

### DeFi Apps

Allow DEX to swap tokens within daily limits:
```typescript
{
  type: 'TRANSACTION',
  constraints: {
    maxAmount: '0.5', // 0.5 ETH per swap
    maxPerDay: '5.0', // 5 ETH per day
    allowedContracts: ['0x...'], // DEX contract
  }
}
```

### Gaming Apps

Permit small transaction batches for in-game purchases:
```typescript
{
  type: 'TRANSACTION',
  constraints: {
    maxAmount: '0.01', // 0.01 ETH per transaction
    maxTransactionsPerDay: 100,
    allowedContracts: ['0x...'], // Game contract
  }
}
```

## Implementation Timeline

**Estimated**: ~6 weeks

- Phase 1: 2 weeks
- Phase 2: 2 weeks
- Phase 3: 1 week
- Phase 4: 1 week

## Testing

### Test Cases

- Permission request flow
- Constraint validation
- Usage tracking
- Rate limiting
- Permission revocation
- Expiration handling

## Migration

### From Current System

Current system requires approval for every transaction. Migration will:
1. Add permission system alongside existing approval flow
2. Users can opt-in to permissions
3. Existing approval flow remains as fallback

---

**Related Documentation:**
- [WebView Bridge](../integrations/webview-bridge.md)
- [Security Architecture](./auth.md)
- [Implementation Status](../reference/implementation-status.md)
