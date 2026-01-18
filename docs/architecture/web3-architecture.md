# Web3 Architecture

## Purpose

This document describes the Web3 and blockchain integration architecture for Scroll One SuperApp, including wallet management, transaction handling, and blockchain interactions.

**Audience**: Web3 engineers, blockchain developers, security auditors

## Overview

Scroll One SuperApp is built exclusively for the Scroll blockchain (Ethereum L2). All blockchain interactions use ethers.js v6 and direct RPC calls to Scroll network endpoints.

## Blockchain Network

### Scroll Network Configuration

**Mainnet**:
- RPC URL: `https://rpc.scroll.io`
- Chain ID: `534352`
- Explorer: `https://scrollscan.com`

**Testnet (Sepolia)**:
- RPC URL: `https://sepolia-rpc.scroll.io`
- Chain ID: `534351`
- Explorer: `https://sepolia.scrollscan.com`

### Network Selection

The app supports both mainnet and testnet, with network switching capability (UI pending). Network configuration is managed in `services/scroll/provider.ts`.

## Wallet Architecture

### Wallet Creation

**Process**:
1. Generate 32 random bytes using `expo-crypto.getRandomBytes(32)`
2. Create ethers.js Wallet from private key
3. Encrypt private key
4. Store encrypted key in Expo SecureStore
5. Never expose private key to JavaScript context

**Security**:
- Cryptographically secure random generation
- Private keys never leave device
- Encrypted at rest using device keychain
- No cloud backup

### Wallet Storage

**Location**: Expo SecureStore (device keychain/keystore)

**Format**:
- Encrypted private keys
- Wallet metadata (name, address)
- Multi-wallet support (wallet list)

**Access Control**:
- Requires device unlock
- Biometric authentication (planned)
- No programmatic access from WebView

### Wallet Operations

**Supported Operations**:
- Create wallet
- Import wallet (from private key, planned)
- Switch wallet
- Lock/unlock wallet
- Sign transactions
- Sign messages
- Sign typed data (EIP-712, planned)

## Transaction Architecture

### Transaction Types

1. **Native ETH Transfer**
   - Direct ETH transfer
   - No contract interaction

2. **ERC-20 Token Transfer**
   - Token contract interaction
   - Transfer function call

3. **Contract Interaction**
   - Generic contract calls
   - Custom data payload

### Transaction Lifecycle

```
1. Transaction Request
   - User initiates transaction
   - Parameters validated

2. Gas Estimation
   - Estimate gas limit
   - Get current gas price
   - Calculate total fee

3. User Approval
   - Show transaction details
   - User approves/rejects

4. Transaction Signing
   - Sign with private key
   - Create signed transaction

5. Transaction Broadcasting
   - Send to Scroll RPC
   - Receive transaction hash

6. Status Polling
   - Poll transaction status
   - Update UI with status

7. Confirmation
   - Transaction confirmed
   - Update balance
   - Send notification
```

### Transaction Signing

**Library**: ethers.js v6

**Process**:
1. Create transaction request object
2. Sign with wallet private key
3. Serialize signed transaction
4. Send to network

**Security**:
- Private key never exposed
- Signing happens in native code
- Transaction validated before signing

## RPC Provider

### ScrollProvider

**Location**: `services/scroll/provider.ts`

**Responsibilities**:
- Manage RPC connection
- Handle network switching
- Provide ethers.js Provider instance
- Error handling and retries

**Features**:
- Connection pooling
- Automatic retries
- Error handling
- Network detection

### RPC Calls

**Direct Calls**:
- `eth_getBalance` - Get ETH balance
- `eth_sendRawTransaction` - Send transaction
- `eth_estimateGas` - Estimate gas
- `eth_getTransactionReceipt` - Get transaction status
- `eth_call` - Call contract methods

**No Middleware**: Direct RPC calls, no proxy or middleware layer.

## Token Management

### ERC-20 Token Support

**Token Operations**:
- Get token balance
- Get token metadata
- Transfer tokens
- Approve token spending (planned)

**Token Registry**:
- Token addresses in `services/scroll/tokens.ts`
- Token metadata (symbol, name, decimals)
- Token prices (from CoinGecko)

**Current Status**: Token addresses are placeholders. Must be replaced with real Scroll mainnet addresses before launch.

### Token Balance Fetching

**Process**:
1. Create ERC-20 contract instance
2. Call `balanceOf(walletAddress)`
3. Format balance using token decimals
4. Cache result (1 minute)

## Gas Management

### Gas Estimation

**Process**:
1. Create transaction request
2. Call `provider.estimateGas()`
3. Get current gas price
4. Calculate total fee

**Optimization**:
- Cache gas prices (30 seconds)
- Use EIP-1559 gas pricing (if supported)
- Allow user to adjust gas (planned)

### Gas Price Strategy

**Current**: Use network gas price

**Planned**:
- EIP-1559 support
- Custom gas price selection
- Gas price recommendations

## Transaction History

### Data Sources

1. **ScrollScan API** - Historical transactions
2. **RPC Polling** - Real-time status updates
3. **Backend Indexing** - Enhanced transaction data (optional)

### Transaction Indexing

**Client-Side**:
- Fetch from ScrollScan API
- Cache results
- Poll for new transactions

**Backend** (Optional):
- Background job indexes transactions
- Stores in database
- Provides enhanced search/filtering

## Smart Contract Interactions

### Contract Calls

**Process**:
1. Create contract instance (ethers.js)
2. Encode function call
3. Send transaction or call
4. Decode response

**Supported**:
- Read operations (view functions)
- Write operations (state-changing functions)
- Event listening (planned)

### Contract Verification

**Current**: No contract verification

**Planned**:
- Contract address validation
- Contract source verification
- Risk assessment

## Security Architecture

### Private Key Security

- **Generation**: Cryptographically secure
- **Storage**: Encrypted in SecureStore
- **Usage**: Never exposed to JavaScript
- **Backup**: No cloud backup (seed phrase planned)

### Transaction Security

- **Validation**: All transactions validated before signing
- **Approval**: User approval required for all transactions
- **Rate Limiting**: Bridge rate limiting (planned)
- **Origin Validation**: Bridge origin checks

### Network Security

- **HTTPS Only**: All RPC calls use HTTPS
- **Certificate Pinning**: Planned for production
- **RPC Validation**: Validate RPC responses

## Error Handling

### RPC Errors

**Handling**:
- Network errors: Retry with exponential backoff
- RPC errors: Parse and return user-friendly message
- Timeout errors: Retry or show timeout message

### Transaction Errors

**Common Errors**:
- Insufficient balance
- Gas estimation failed
- Transaction reverted
- Network congestion

**User Experience**:
- Clear error messages
- Actionable suggestions
- Retry options

## Performance Optimization

### Caching Strategy

- **Balance**: Cache 30 seconds
- **Gas Price**: Cache 30 seconds
- **Token Metadata**: Cache 5 minutes
- **Transaction History**: Cache 1 minute

### Batch Operations

**Planned**:
- Batch RPC calls
- Multicall support
- Transaction batching

## Future Enhancements

1. **EIP-712 Typed Data**: Full support for typed data signing
2. **EIP-1559 Gas**: Support for EIP-1559 gas pricing
3. **Multicall**: Batch contract calls
4. **Event Listening**: Real-time event subscriptions
5. **Contract Verification**: Source code verification
6. **Seed Phrase**: BIP-39 mnemonic support

---

**Related Documentation:**
- [System Overview](./system-overview.md)
- [Data Flow](./data-flow.md)
- [Security Architecture](../security/auth.md)
- [WebView Bridge](../integrations/webview-bridge.md)
