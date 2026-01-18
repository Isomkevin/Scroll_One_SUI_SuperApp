# SDK Implementation Status

## Purpose

This document tracks the implementation status of the ScrollOne SDK (scrollone-sdk).

**Audience**: SDK maintainers, bridge developers

## Implementation Status

### ✅ Completed

#### Core Protocol

- [x] Canonical message format (`BridgeMessage`)
- [x] Canonical response format (`BridgeResponse`)
- [x] Type guards and validation
- [x] Error codes and error handling
- [x] Constants (methods, events, timeouts)

#### Web SDK

- [x] `window.scrollOne` API implementation
- [x] Request queue management
- [x] Timeout handling
- [x] Event system
- [x] State synchronization
- [x] Injected JavaScript generator

#### Native SDK

- [x] Message router (`NativeBridge`)
- [x] Action registry (`ActionRegistry`)
- [x] Handler context
- [x] Security middleware (origin, method, rate limiting)
- [x] Wallet lock checks
- [x] Approval requirements

#### Handlers

- [x] `GET_ACCOUNT` - Get wallet address
- [x] `GET_BALANCE` - Get ETH balance
- [x] `SIGN_TRANSACTION` - Sign and send transaction
- [x] `SIGN_MESSAGE` - Sign arbitrary message
- [x] `GET_NETWORK` - Get network info
- [x] `ESTIMATE_GAS` - Estimate gas

#### App Integration

- [x] Bridge service singleton
- [x] WebViewContainer refactored to use SDK
- [x] Transaction approval modal
- [x] State synchronization
- [x] Error handling

#### Security

- [x] Origin validation
- [x] Method allow-list
- [x] Rate limiting hooks
- [x] Wallet lock enforcement
- [x] Message validation
- [x] Timeout protection

## ⚠️ Partially Implemented

### SIGN_TYPED_DATA

- [x] Handler stub exists
- [ ] EIP-712 implementation
- [ ] Type validation
- **Status**: Returns unsupported error

### Token Balance Support

- [x] ETH balance supported
- [ ] ERC-20 token balance
- [ ] Token address parameter
- **Status**: Only ETH balance works

## ❌ Not Implemented

### Permissions System

- [ ] Permission request handler
- [ ] Permission validation
- [ ] Usage tracking
- **Status**: Planned feature

### Network Switching

- [x] Handler exists
- [ ] UI implementation
- [ ] State synchronization
- **Status**: Code ready, UI missing

## File Structure

```
scrollone-sdk/
├── core/
│   ├── constants.ts      # Methods, events, timeouts
│   ├── errors.ts         # Error codes and classes
│   ├── protocol.ts       # Message/response contracts
│   └── validator.ts      # Validation utilities
├── web/
│   ├── webBridge.ts      # window.scrollOne implementation
│   ├── injectedScript.ts # JavaScript generator
│   └── index.ts          # Web SDK exports
├── native/
│   ├── nativeBridge.ts   # Message router
│   ├── registry.ts       # Handler registry
│   └── index.ts          # Native SDK exports
├── types/
│   ├── wallet.ts         # Wallet types
│   └── transactions.ts   # Transaction types
├── index.ts              # Main SDK exports
└── README.md             # Documentation
```

## Key Features

### Framework Agnostic

- Zero dependencies
- Works with React Native, Flutter, native iOS/Android
- No app-specific imports in SDK

### Type Safe

- Full TypeScript support
- Strict types throughout
- No `any` types (except where necessary)

### Security First

- Origin validation
- Method allow-lists
- Rate limiting hooks
- Wallet lock checks
- Message validation

### Lifecycle Management

- Proper initialization
- State synchronization
- Event system
- Cleanup on reload

### Error Handling

- Standardized error codes
- Deterministic error responses
- User-friendly error messages

## Testing Checklist

- [ ] GET_ACCOUNT returns correct address
- [ ] GET_BALANCE returns correct balance
- [ ] SIGN_TRANSACTION shows approval modal
- [ ] SIGN_TRANSACTION executes after approval
- [ ] SIGN_MESSAGE signs correctly
- [ ] GET_NETWORK returns network info
- [ ] ESTIMATE_GAS returns gas estimate
- [ ] Events fire correctly
- [ ] State syncs on changes
- [ ] Errors are handled properly
- [ ] Origin validation works
- [ ] Rate limiting works
- [ ] Wallet lock blocks operations

## Known Limitations

1. **SIGN_TYPED_DATA**: Not yet implemented (returns unsupported error)
2. **Token Balances**: Only ETH balance supported (ERC-20 coming soon)
3. **Network Switching**: Handler exists but UI not implemented
4. **Permissions**: Not yet implemented

## Next Steps

1. Implement SIGN_TYPED_DATA (EIP-712)
2. Add ERC-20 token balance support
3. Add network switching UI
4. Add transaction status polling
5. Add more comprehensive tests
6. Add rate limiting implementation
7. Add origin allow-list UI
8. Implement permissions system

## Version

**Current Version**: v1.0.0

**Version History**:
- v1.0.0: Initial release with core functionality

---

**Related Documentation:**
- [SDK Reference](../integrations/sdk-reference.md)
- [WebView Bridge](../integrations/webview-bridge.md)
- [Implementation Status](./implementation-status.md)
