# SDK Reference

## Purpose

Complete reference documentation for the ScrollOne SDK, the framework-agnostic WebView Bridge SDK for Scroll SuperApps and MiniApps.

**Audience**: dApp developers, mini-app integrators, SDK maintainers

## Overview

The ScrollOne SDK enables secure two-way communication between web-based dApps (MiniApps) loaded in WebView and native SuperApp wallets. It provides a standardized protocol for wallet operations, transaction signing, and network management.

## Architecture

### Components

1. **Core Protocol** (`/core`) - Canonical message formats, validation, and error handling
2. **Web SDK** (`/web`) - `window.scrollOne` implementation for dApps
3. **Native SDK** (`/native`) - Message router and handler registry for SuperApps
4. **Types** (`/types`) - TypeScript type definitions

### Message Flow

```
dApp (WebView) → window.scrollOne API → postMessage → 
Native SDK (Router) → Handler → Wallet Service → Scroll blockchain
```

## Protocol

### Canonical Message Format

All messages MUST conform to this shape:

```typescript
interface BridgeMessage<T = unknown> {
  id: string;
  source: 'web' | 'native';
  type: BridgeMethod;
  payload?: T;
  timestamp: number;
}
```

### Canonical Response Format

All responses MUST conform to this shape:

```typescript
interface BridgeResponse<T = unknown> {
  id: string;
  success: boolean;
  data?: T;
  error?: {
    code: BridgeErrorCode;
    message: string;
  };
}
```

**No parallel formats. No ad-hoc wrapping.**

## API Reference

### getAccount()

Get connected wallet address.

```typescript
const account = await window.scrollOne.getAccount();
// Returns: { address: string | null, isConnected: boolean }
```

### getBalance(tokenAddress?: string)

Get ETH or token balance.

```typescript
// ETH balance
const balance = await window.scrollOne.getBalance();
// Returns: { balance: string, formatted: string, symbol?: string }

// Token balance (coming soon)
const tokenBalance = await window.scrollOne.getBalance('0x...');
```

### signTransaction(transaction)

Sign and send a transaction (requires user approval).

```typescript
const result = await window.scrollOne.signTransaction({
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  value: '0.1', // ETH amount as string
  data: '0x...', // Optional
  gasLimit: '21000', // Optional
});
// Returns: { hash: string, from: string, to: string | null }
```

### signMessage(message)

Sign an arbitrary message.

```typescript
const result = await window.scrollOne.signMessage('Hello, Scroll!');
// Returns: { signature: string }
```

### signTypedData(domain, types, value)

Sign EIP-712 typed data (coming soon).

```typescript
const result = await window.scrollOne.signTypedData(domain, types, value);
// Returns: { signature: string }
```

### getNetwork()

Get current network information.

```typescript
const network = await window.scrollOne.getNetwork();
// Returns: { chainId: number, chainName: string, rpcUrl: string, isTestnet: boolean }
```

### estimateGas(transaction)

Estimate gas for a transaction.

```typescript
const estimate = await window.scrollOne.estimateGas({
  to: '0x...',
  value: '0.1',
});
// Returns: { gasLimit: string, gasPrice: string, estimatedFee: string }
```

## Events

The SDK emits events for state changes:

```typescript
// Listen for account changes
window.scrollOne.on('accountChanged', (data) => {
  console.log('Account changed:', data.address);
});

// Listen for network changes
window.scrollOne.on('networkChanged', (data) => {
  console.log('Network changed:', data.chainId);
});

// Remove listener
window.scrollOne.off('accountChanged', callback);
```

### Available Events

- `scrollOneReady` - Bridge is initialized
- `accountChanged` - Wallet address changed
- `networkChanged` - Network changed
- `walletLocked` - Wallet was locked
- `walletUnlocked` - Wallet was unlocked

## Error Handling

All errors follow a standardized format:

```typescript
try {
  await window.scrollOne.signTransaction(tx);
} catch (error) {
  if (error.code === 'WALLET_LOCKED') {
    // Handle locked wallet
  } else if (error.code === 'USER_REJECTED') {
    // User rejected the transaction
  }
}
```

### Error Codes

- `WALLET_NOT_CONNECTED` - No wallet connected
- `WALLET_LOCKED` - Wallet is locked
- `TRANSACTION_REJECTED` - User rejected transaction
- `INVALID_MESSAGE` - Invalid message format
- `UNSUPPORTED_METHOD` - Method not supported
- `TIMEOUT` - Request timeout
- `INVALID_ADDRESS` - Invalid address format
- `INSUFFICIENT_BALANCE` - Insufficient balance for transaction

## TypeScript Support

Full TypeScript support with strict types:

```typescript
import type {
  AccountInfo,
  BalanceInfo,
  TransactionRequest,
  TransactionResponse,
  NetworkInfo,
  GasEstimate,
} from '@/scrollone-sdk';
```

## Framework Agnostic

The SDK has **zero dependencies** and works with:

- React Native
- Flutter (via platform channels)
- Native iOS/Android
- Any WebView implementation

## Best Practices

1. **Always check bridge readiness** before using
2. **Handle errors gracefully** with user-friendly messages
3. **Listen for state changes** (account, network)
4. **Validate transaction data** before sending
5. **Estimate gas** before sending transactions
6. **Provide loading states** during async operations

## Versioning

Current version: **v1.0.0**

The SDK follows semantic versioning:
- **Major**: Breaking protocol changes
- **Minor**: New methods/features (backward compatible)
- **Patch**: Bug fixes

## Implementation Status

See [SDK Implementation](../reference/sdk-implementation.md) for current implementation status and known limitations.

## Additional Resources

- [WebView Bridge Integration Guide](./webview-bridge.md) - Complete integration guide
- [Native Integration](../architecture/web3-architecture.md) - For SuperApp developers
- [Security Best Practices](../security/auth.md) - Security guidelines

---

**Related Documentation:**
- [WebView Bridge Integration](./webview-bridge.md)
- [System Overview](../architecture/system-overview.md)
- [Security Architecture](../security/auth.md)
