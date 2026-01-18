# Data Flow

## Purpose

This document describes how data flows through the Scroll One SuperApp system, from user actions to blockchain transactions and back.

**Audience**: Engineers, architects, technical leads

## Overview

The system uses a hybrid architecture with client-side blockchain operations and optional backend services. Data flows through multiple layers: UI components, state management, services, blockchain, and backend API.

## High-Level Data Flow

```
User Action (UI)
    ↓
State Management (Zustand/React Query)
    ↓
Service Layer (Wallet, Transaction, Bridge)
    ↓
Blockchain (Scroll RPC) / Backend API
    ↓
Response Processing
    ↓
State Update
    ↓
UI Update
```

## Authentication Flow

### Wallet Authentication (Backend)

```
1. User → Connect Wallet (Frontend)
   - User clicks "Connect Wallet"
   - Wallet signature request initiated

2. Frontend → POST /auth/wallet/message
   - Request authentication message
   - Backend generates nonce and message

3. Backend → Response
   - Returns message to sign
   - Includes nonce and timestamp

4. User → Sign Message
   - User signs message with wallet private key
   - Signature generated using ethers.js

5. Frontend → POST /auth/wallet/verify
   - Sends wallet address, message, signature
   - Backend verifies signature

6. Backend → Verify & Create Session
   - Verifies signature matches wallet address
   - Checks nonce hasn't been reused
   - Creates/updates user in database
   - Generates JWT token

7. Backend → Response
   - Returns JWT token
   - Returns user information

8. Frontend → Store Token
   - Stores JWT in SecureStore (mobile) or localStorage (web)
   - Uses token for authenticated requests
```

### Admin Authentication

```
1. Admin → Navigate to /admin-super
   - Admin dashboard route accessed

2. Frontend → Check Authentication
   - Checks for existing JWT token
   - If missing, shows wallet connection UI

3. Admin → Connect Wallet & Sign
   - Same flow as wallet authentication
   - Additional role verification

4. Backend → Verify Admin Role
   - Verifies JWT token
   - Checks user role = 'super_admin'
   - Checks user status = 'active'

5. Backend → Grant Access
   - Returns admin dashboard data
   - All admin actions logged to audit trail
```

## Transaction Flow

### Native Transaction (Mobile App)

```
1. User → Initiate Transaction
   - User navigates to Send screen
   - Enters recipient address and amount
   - Clicks "Send"

2. UI → Validate Input
   - Validates address format
   - Validates amount > 0
   - Checks sufficient balance

3. Service → Estimate Gas
   - Calls scrollProvider.estimateGas()
   - Gets gas limit and price
   - Calculates total fee

4. UI → Show Transaction Details
   - Displays recipient, amount, fee
   - Shows approval modal

5. User → Approve Transaction
   - User reviews details
   - Confirms transaction

6. Service → Sign Transaction
   - Retrieves private key from SecureStore
   - Signs transaction with ethers.js
   - Creates signed transaction object

7. Service → Send Transaction
   - Calls scrollProvider.sendTransaction()
   - Sends to Scroll RPC endpoint
   - Receives transaction hash

8. Service → Poll Status
   - Polls transaction status via RPC
   - Updates status (pending → confirmed/failed)
   - Updates UI with status

9. Service → Send Notification (Optional)
   - Sends local notification on confirmation
   - Updates transaction history

10. UI → Update Display
    - Updates balance
    - Adds transaction to history
    - Shows success/error message
```

### Bridge Transaction (Mini-App)

```
1. dApp → Request Transaction
   - dApp calls window.scrollOne.signTransaction()
   - Creates bridge message

2. Bridge SDK → Send Message
   - Serializes message
   - Sends via postMessage to WebView

3. WebView → Receive Message
   - WebViewContainer receives message
   - Routes to bridgeService

4. Bridge Service → Validate
   - Validates message format
   - Checks origin (if configured)
   - Checks wallet is unlocked

5. Bridge Service → Show Approval Modal
   - Displays transaction details
   - Shows recipient, amount, gas
   - User can approve or reject

6. User → Approve/Reject
   - User reviews transaction
   - Approves or rejects

7. Bridge Handler → Execute Transaction
   - If approved: signs and sends transaction
   - If rejected: returns error to dApp

8. Bridge Service → Send Response
   - Serializes response
   - Sends via postMessage to WebView

9. dApp → Receive Response
   - Receives transaction hash or error
   - Updates UI accordingly
```

## Transaction Indexing Flow (Backend)

```
1. Background Job → Trigger (Every 30s)
   - Scheduled job runs
   - Gets list of active users

2. For Each User:
   a. Query ScrollScan API
      - Fetches recent transactions for wallet
      - Filters new transactions

   b. Parse Transaction Data
      - Extracts transaction details
      - Determines transaction type
      - Calculates fees

   c. Store in Database
      - Inserts/updates transaction record
      - Links to user account

   c. Invalidate Cache
      - Removes cached transaction data
      - Ensures fresh data on next request

3. Update Transaction Statuses
   - Polls pending transactions
   - Updates status (pending → confirmed/failed)
   - Updates block numbers
```

## Mini-App Integration Flow

```
1. User → Select Mini-App
   - User navigates to Explore tab
   - Selects a mini-app

2. UI → Load WebView
   - Creates WebViewContainer
   - Loads dApp URL

3. WebView → Inject Bridge SDK
   - Injects scrollone-sdk JavaScript
   - Initializes window.scrollOne API
   - Emits 'scrollOneReady' event

4. dApp → Initialize
   - Listens for 'scrollOneReady' event
   - Calls window.scrollOne.getAccount()
   - Gets connected wallet address

5. dApp → Request Operations
   - Uses window.scrollOne API
   - Requests balance, transactions, etc.

6. Bridge → Route Requests
   - Routes to appropriate handlers
   - Executes wallet operations
   - Returns results to dApp

7. dApp → Update UI
   - Receives data from bridge
   - Updates dApp interface
```

## Price Update Flow (Backend)

```
1. Background Job → Trigger (Every 5 minutes)
   - Scheduled job runs
   - Gets list of tracked tokens

2. Query CoinGecko API
   - Fetches current prices
   - Gets USD prices for all tokens

3. Update Database
   - Updates token prices in database
   - Records update timestamp

4. Invalidate Cache
   - Removes cached price data
   - Ensures fresh prices on next request
```

## State Management Flow

### Zustand Stores

```
User Action
    ↓
Component calls store action
    ↓
Store updates state
    ↓
All subscribed components re-render
    ↓
UI updates
```

### React Query (Server State)

```
Component mounts
    ↓
React Query fetches data
    ↓
Shows loading state
    ↓
Data received
    ↓
Updates cache
    ↓
Component re-renders with data
    ↓
Background refetch (if configured)
```

## Error Flow

```
1. Error Occurs
   - Service throws error
   - Network request fails
   - Validation fails

2. Error Handling
   - Try/catch in service layer
   - Error logged (console/logger)
   - Error transformed to user-friendly message

3. Error Propagation
   - Error returned to component
   - Component shows error UI
   - User sees error message

4. Error Recovery
   - User can retry operation
   - Error state cleared on retry
   - Normal flow resumes
```

## Caching Flow

### Client-Side Caching

```
1. Data Request
   - Component requests data
   - Check React Query cache

2. Cache Hit
   - Return cached data immediately
   - Show stale data
   - Background refetch

3. Cache Miss
   - Fetch from API/RPC
   - Store in cache
   - Return fresh data
```

### Backend Caching (Redis)

```
1. API Request
   - Request received
   - Check Redis cache

2. Cache Hit
   - Return cached data
   - Skip database query

3. Cache Miss
   - Query database
   - Store in Redis
   - Return data
   - Set expiration
```

## Data Synchronization

### Wallet State Sync

```
1. Wallet Unlocked
   - Wallet unlocked in app
   - Bridge state updated
   - WebView notified

2. Account Changed
   - User switches wallet
   - All stores updated
   - Bridge state updated
   - WebView notified

3. Network Changed
   - User switches network
   - Provider updated
   - Bridge state updated
   - WebView notified
```

---

**Related Documentation:**
- [System Overview](./system-overview.md)
- [Web3 Architecture](./web3-architecture.md)
- [Backend Services](../backend/services.md)
- [WebView Bridge](../integrations/webview-bridge.md)
