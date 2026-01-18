# WebView Bridge Integration

## Purpose

This document provides comprehensive documentation for integrating mini-apps with the Scroll One SuperApp via the WebView Bridge SDK.

**Audience**: dApp developers, mini-app integrators, frontend engineers

## Overview

The WebView Bridge enables secure two-way communication between web-based dApps (MiniApps) loaded in WebView and the native Scroll One SuperApp wallet. This allows dApps to request wallet operations without exposing private keys.

## Architecture

### Communication Flow

```
┌─────────────────┐
│   dApp (Web)    │
│  (WebView)      │
└────────┬────────┘
         │
         │ window.scrollOne.signTransaction()
         │ → BridgeMessage
         ▼
┌─────────────────┐
│  Injected JS    │
│  Bridge SDK     │
└────────┬────────┘
         │
         │ React Native WebView
         │ onMessage event
         ▼
┌─────────────────┐
│ Bridge Handler  │
│ (React Native)  │
└────────┬────────┘
         │
         │ Service calls
         ▼
┌─────────────────┐
│ Wallet Service  │
│ Provider        │
└─────────────────┘
```

### Key Components

1. **Injected JavaScript Bridge** - Runs in WebView, provides `window.scrollOne` API
2. **Bridge Handler** - React Native component that processes messages
3. **Bridge Service** - Core logic for message routing and validation
4. **Transaction Approval UI** - Modal for user confirmation
5. **dApp SDK** - JavaScript library for dApp developers

## SDK Usage

### Basic Integration

The SDK is automatically injected into WebView. dApps can use it immediately:

```javascript
// Wait for bridge to be ready
window.addEventListener('scrollOneReady', () => {
  console.log('Scroll One bridge ready!');
  initializeApp();
});

// Or check if already ready
if (window.scrollOne && window.scrollOne.isScrollOne) {
  initializeApp();
}
```

### Available Methods

#### GET_ACCOUNT

Get connected wallet address.

```javascript
const account = await window.scrollOne.getAccount();
// { address: string | null, isConnected: boolean }
```

#### GET_BALANCE

Get ETH balance (token support coming soon).

```javascript
const balance = await window.scrollOne.getBalance();
// { balance: string, formatted: string, symbol?: string }
```

#### SIGN_TRANSACTION

Sign and send a transaction (requires user approval).

```javascript
const result = await window.scrollOne.signTransaction({
  to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  value: '0.1', // ETH amount as string
  data: '0x...', // Optional
});
// { hash: string, from: string, to: string | null }
```

#### SIGN_MESSAGE

Sign an arbitrary message.

```javascript
const result = await window.scrollOne.signMessage('Hello, Scroll!');
// { signature: string }
```

#### GET_NETWORK

Get current network information.

```javascript
const network = await window.scrollOne.getNetwork();
// { chainId: number, chainName: string, rpcUrl: string, isTestnet: boolean }
```

#### ESTIMATE_GAS

Estimate gas for a transaction.

```javascript
const estimate = await window.scrollOne.estimateGas({
  to: '0x...',
  value: '0.1',
});
// { gasLimit: string, gasPrice: string, estimatedFee: string }
```

### Events

The SDK emits events for state changes:

```javascript
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

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>My dApp</title>
</head>
<body>
  <h1>My Scroll dApp</h1>
  <button id="connectBtn">Connect Wallet</button>
  <button id="sendTxBtn">Send Transaction</button>
  
  <script>
    window.addEventListener('scrollOneReady', () => {
      initializeApp();
    });

    if (window.scrollOne && window.scrollOne.isScrollOne) {
      initializeApp();
    }

    async function initializeApp() {
      const connectBtn = document.getElementById('connectBtn');
      const sendTxBtn = document.getElementById('sendTxBtn');

      // Check connection
      const account = await window.scrollOne.getAccount();
      if (account.isConnected) {
        console.log('Connected:', account.address);
        connectBtn.textContent = `Connected: ${account.address.slice(0, 6)}...${account.address.slice(-4)}`;
      }

      // Connect wallet
      connectBtn.addEventListener('click', async () => {
        try {
          const account = await window.scrollOne.getAccount();
          if (account.isConnected) {
            alert('Already connected: ' + account.address);
          } else {
            alert('Please connect wallet in Scroll One app');
          }
        } catch (error) {
          console.error('Connection error:', error);
        }
      });

      // Send transaction
      sendTxBtn.addEventListener('click', async () => {
        try {
          // First estimate gas
          const gasEstimate = await window.scrollOne.estimateGas({
            to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            value: '0.01', // 0.01 ETH
          });

          console.log('Gas estimate:', gasEstimate);

          // Send transaction
          const result = await window.scrollOne.signTransaction({
            to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
            value: '0.01',
            gasLimit: gasEstimate.gasLimit,
          });

          console.log('Transaction sent:', result.hash);
          alert('Transaction sent: ' + result.hash);
        } catch (error) {
          console.error('Transaction error:', error);
          alert('Transaction failed: ' + error.message);
        }
      });

      // Listen for account changes
      window.scrollOne.on('accountChanged', (data) => {
        console.log('Account changed:', data);
        if (data.address) {
          connectBtn.textContent = `Connected: ${data.address.slice(0, 6)}...${data.address.slice(-4)}`;
        } else {
          connectBtn.textContent = 'Connect Wallet';
        }
      });
    }
  </script>
</body>
</html>
```

## React/Next.js Integration

```typescript
import { useEffect, useState } from 'react';

interface ScrollOneAccount {
  address: string | null;
  isConnected: boolean;
}

declare global {
  interface Window {
    scrollOne?: {
      isScrollOne: boolean;
      getAccount: () => Promise<ScrollOneAccount>;
      getBalance: () => Promise<any>;
      signTransaction: (tx: any) => Promise<any>;
      signMessage: (message: string) => Promise<any>;
      estimateGas: (tx: any) => Promise<any>;
      getNetwork: () => Promise<any>;
      on: (event: string, callback: (data: any) => void) => void;
      off: (event: string, callback: (data: any) => void) => void;
    };
  }
}

export function useScrollOne() {
  const [account, setAccount] = useState<ScrollOneAccount>({
    address: null,
    isConnected: false,
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkBridge = () => {
      if (window.scrollOne && window.scrollOne.isScrollOne) {
        setIsReady(true);
        loadAccount();
      }
    };

    checkBridge();
    window.addEventListener('scrollOneReady', checkBridge);

    if (window.scrollOne) {
      window.scrollOne.on('accountChanged', (data: any) => {
        setAccount({
          address: data.address,
          isConnected: !!data.address,
        });
      });
    }

    return () => {
      window.removeEventListener('scrollOneReady', checkBridge);
    };
  }, []);

  const loadAccount = async () => {
    try {
      if (window.scrollOne) {
        const accountData = await window.scrollOne.getAccount();
        setAccount(accountData);
      }
    } catch (error) {
      console.error('Error loading account:', error);
    }
  };

  const sendTransaction = async (to: string, value: string) => {
    if (!isReady || !window.scrollOne) throw new Error('Bridge not ready');
    return await window.scrollOne.signTransaction({ to, value });
  };

  return {
    account,
    isReady,
    sendTransaction,
    getBalance: () => window.scrollOne?.getBalance(),
    getNetwork: () => window.scrollOne?.getNetwork(),
  };
}
```

## Security Considerations

### Origin Validation

The bridge validates message origins to prevent unauthorized access. Only messages from registered dApp URLs are processed.

### Method Allow-List

Only approved bridge methods can be called. Unsupported methods return appropriate errors.

### Transaction Approval

All transactions require explicit user approval via a native modal. Users can review transaction details before approving.

### Wallet Lock Checks

The bridge checks if the wallet is locked before processing signing requests. Locked wallets cannot sign transactions.

## Error Handling

All errors follow a standardized format:

```javascript
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

## Permissions System (Planned)

An ERC-7715-inspired permissions system is planned that will allow mini-apps to request fine-grained permissions for reduced approval prompts. See [Permissions System Implementation](../security/permissions-system.md) for details.

## Best Practices

1. **Always check bridge readiness** before using
2. **Handle errors gracefully** with user-friendly messages
3. **Listen for state changes** (account, network)
4. **Validate transaction data** before sending
5. **Estimate gas** before sending transactions
6. **Provide loading states** during async operations

## Testing

### Manual Testing

1. Load your dApp in Scroll One SuperApp
2. Test each bridge method
3. Verify transaction approval flow
4. Test error handling
5. Test state synchronization

### Test dApp

Create a simple HTML file to test all bridge functionality:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Bridge Test dApp</title>
</head>
<body>
  <h1>Scroll One Bridge Test</h1>
  <div id="status">Waiting for bridge...</div>
  <button onclick="testGetAccount()">Get Account</button>
  <button onclick="testGetBalance()">Get Balance</button>
  <button onclick="testSendTransaction()">Send Transaction</button>
  <pre id="output"></pre>

  <script>
    function log(message) {
      document.getElementById('output').textContent += message + '\n';
    }

    window.addEventListener('scrollOneReady', () => {
      document.getElementById('status').textContent = 'Bridge Ready!';
      log('Bridge initialized');
    });

    async function testGetAccount() {
      try {
        const account = await window.scrollOne.getAccount();
        log('Account: ' + JSON.stringify(account));
      } catch (error) {
        log('Error: ' + error.message);
      }
    }

    async function testGetBalance() {
      try {
        const balance = await window.scrollOne.getBalance();
        log('Balance: ' + JSON.stringify(balance));
      } catch (error) {
        log('Error: ' + error.message);
      }
    }

    async function testSendTransaction() {
      try {
        const result = await window.scrollOne.signTransaction({
          to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
          value: '0.001',
        });
        log('Transaction: ' + JSON.stringify(result));
      } catch (error) {
        log('Error: ' + error.message);
      }
    }
  </script>
</body>
</html>
```

## Additional Resources

- [SDK Reference](./sdk-reference.md) - Complete SDK documentation
- [Native Integration Guide](../architecture/web3-architecture.md) - For SuperApp developers
- [Security Best Practices](../security/auth.md) - Security guidelines

---

**Related Documentation:**
- [SDK Reference](./sdk-reference.md)
- [System Overview](../architecture/system-overview.md)
- [Security Architecture](../security/auth.md)
