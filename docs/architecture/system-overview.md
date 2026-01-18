# System Overview

## Purpose

This document provides a high-level overview of the Scroll One SuperApp system architecture, including frontend, backend, and blockchain integration layers.

**Audience**: Engineers, architects, technical leads

## Architecture Principles

1. **Hybrid Architecture**: Combines client-side blockchain operations with optional backend API
2. **Mobile-First**: Native mobile experience with web support
3. **Scroll-Native**: Built exclusively for Scroll blockchain
4. **Security-First**: Self-custodial wallet with secure key management
5. **Modular Design**: Clear separation of concerns across layers

## High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Mobile App (React Native + Expo)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Wallet     │  │   Explore    │  │  Identity    │     │
│  │   Tab        │  │   Tab        │  │   Tab        │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         WebView Bridge (scrollone-sdk)               │  │
│  │  Mini-Apps loaded in WebView with bridge integration │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        │               │               │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│   Scroll     │ │  Backend   │ │  External  │
│  Blockchain  │ │    API     │ │    APIs    │
│   (RPC)      │ │ (Optional) │ │            │
└──────────────┘ └────────────┘ └─────────────┘
```

## Frontend Layer

### Mobile App Architecture

**Framework**: React Native 0.81.5 with Expo ~54.0.27

**Key Components**:

- **Routing**: Expo Router (file-based routing, similar to Next.js)
- **State Management**:
  - Zustand 5.0.2 (client state: wallet, user, mini-apps, settings)
  - React Query (@tanstack/react-query) for server state
- **UI Components**: Custom design system in `theme/` (colors, typography, spacing, shadows)
- **Icons**: Lucide React Native
- **WebView**: React Native WebView 13.15.0

**Component Communication Flow**:

```
React Components (app/, components/)
    ↓
Zustand Stores (store/)
    ↓
Services Layer (services/scroll/, services/bridge/)
    ↓
Blockchain / External APIs (Scroll RPC, CoinGecko, ScrollScan)
    ↓
Backend API (optional, for enhanced features)
```

### Landing Page

**Framework**: Next.js 14 with TypeScript

- Separate Next.js application
- Marketing and informational content
- Super Admin Dashboard (hidden route `/admin-super`)

See [Frontend Architecture](./frontend/ui-architecture.md) for detailed frontend structure.

## Backend Layer

### Backend API Architecture

**Technology Stack**:
- **Runtime**: Node.js 20+
- **Framework**: Express.js 4.18+
- **Language**: TypeScript 5.3+
- **Database**: PostgreSQL 15+
- **Cache**: Redis 7+

**Architecture Layers**:

```
API Layer (Routes → Controllers → Middleware)
    ↓
Service Layer (Business Logic)
    ↓
Data Layer (PostgreSQL, Redis, Blockchain)
```

**Key Services**:
- User & Identity Management
- Transaction Indexing
- Mini-App Registry
- Token Management
- Notifications
- Analytics
- Admin Dashboard

**Background Jobs**:
- Transaction Indexer (every 30s)
- Price Updater (every 5 minutes)

See [Backend Services](../backend/services.md) for detailed backend architecture.

## Blockchain Integration

### Scroll Blockchain

**Network Configuration**:
- **Mainnet**: `https://rpc.scroll.io` (chainId: 534352)
- **Testnet**: `https://sepolia-rpc.scroll.io` (chainId: 534351)

**Integration Points**:
- Direct RPC calls via ethers.js v6
- ScrollScan API for transaction history
- ERC-20 token contract interactions

**Wallet Operations**:
- Wallet creation (cryptographically secure)
- Transaction signing (ethers.js)
- Transaction sending (on-chain)
- Balance fetching (RPC calls)
- Gas estimation (RPC calls)

See [Web3 Architecture](./web3-architecture.md) for detailed blockchain integration.

## WebView Bridge

### Bridge Architecture

The WebView Bridge enables secure communication between native wallet and WebView-hosted dApps:

```
dApp (WebView) → window.scrollOne API → postMessage → 
WebViewContainer → bridgeService → handlers → 
wallet/transaction services → Scroll blockchain
```

**Key Features**:
- Framework-agnostic SDK (`scrollone-sdk`)
- Secure message protocol
- Origin validation
- Method allow-lists
- Transaction approval UI

See [WebView Bridge Integration](../integrations/webview-bridge.md) for detailed bridge documentation.

## Data Flow

### Authentication Flow

1. Client requests authentication message
2. Client signs message with wallet private key
3. Backend verifies signature
4. Backend returns JWT token
5. Client uses token for authenticated requests

### Transaction Flow

1. User initiates transaction (native or via bridge)
2. Transaction request created with parameters
3. Gas estimated
4. User approves in modal (if required)
5. Transaction signed with private key
6. Transaction sent to Scroll network
7. Status polled until confirmed
8. Notification sent (if enabled)

### Mini-App Integration Flow

1. User selects mini-app from Explore tab
2. WebView loads dApp URL
3. Bridge SDK injected into WebView
4. dApp uses `window.scrollOne` API
5. Bridge routes requests to native handlers
6. Native handlers execute wallet operations
7. Results returned to dApp via bridge

See [Data Flow](./data-flow.md) for detailed data flow diagrams.

## Storage Architecture

### Client-Side Storage

- **Expo SecureStore**: Encrypted private keys, wallet data, sensitive information
- **AsyncStorage**: Non-sensitive preferences, app settings

### Backend Storage

- **PostgreSQL**: Primary data store (users, transactions, mini-apps, etc.)
- **Redis**: Caching layer, session storage

## External Services

- **Scroll RPC**: Blockchain data access
- **ScrollScan API**: Transaction indexing
- **CoinGecko API**: Token prices
- **IPFS**: Decentralized storage (planned)
- **FCM/Expo Push**: Push notifications

## Deployment Architecture

### Development

- Local development server (Expo)
- Local PostgreSQL and Redis (Docker)
- Direct RPC connections

### Production

- Load balancer (Nginx)
- Multiple backend instances
- PostgreSQL primary with read replicas
- Redis cluster
- CDN for static assets

See [Deployment Architecture](../deployment/environments.md) for detailed deployment information.

## Security Architecture

### Key Security Features

1. **Wallet Security**:
   - Private keys never leave device
   - Encrypted storage (SecureStore)
   - Biometric authentication support

2. **API Security**:
   - JWT authentication
   - Wallet signature verification
   - Role-based access control
   - Rate limiting

3. **Bridge Security**:
   - Origin validation
   - Method allow-lists
   - Transaction approval required
   - Message validation

See [Threat Model](./threat-model.md) for detailed security architecture.

## Performance Considerations

1. **Caching**: Redis for frequently accessed data
2. **Connection Pooling**: Database connection reuse
3. **Background Jobs**: Async processing for indexing
4. **Optimized Queries**: Database indexes and query optimization
5. **Response Compression**: Gzip compression for API responses

## Scalability

The architecture supports horizontal scaling:

- **Backend**: Multiple instances behind load balancer
- **Database**: Read replicas for read-heavy workloads
- **Cache**: Redis cluster for distributed caching
- **CDN**: Static asset delivery

## Monitoring & Observability

1. **Logging**: Winston with file and console outputs
2. **Health Checks**: `/health` endpoint
3. **Error Tracking**: Centralized error handling
4. **Metrics**: Request/response logging
5. **Database Monitoring**: Query performance tracking

---

**Related Documentation:**
- [Data Flow](./data-flow.md)
- [Web3 Architecture](./web3-architecture.md)
- [Backend Services](../backend/services.md)
- [Frontend Architecture](../frontend/ui-architecture.md)
- [Threat Model](./threat-model.md)
