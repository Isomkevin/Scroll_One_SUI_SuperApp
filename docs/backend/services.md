# Backend Services

## Purpose

This document describes the backend service architecture, including all services, their responsibilities, and how they interact.

**Audience**: Backend engineers, architects

## Service Architecture

The backend follows a layered architecture:

```
API Layer (Routes → Controllers → Middleware)
    ↓
Service Layer (Business Logic)
    ↓
Data Layer (PostgreSQL, Redis, Blockchain)
```

## Service Layer

### User Service

**Location**: `backend/src/services/user/`

**Responsibilities**:
- User profile management
- Badge system
- Reputation tracking
- User preferences
- User search and filtering

**Key Methods**:
- `createUser()` - Create new user profile
- `getUserByWallet()` - Get user by wallet address
- `updateUser()` - Update user profile
- `awardBadge()` - Award badge to user
- `updateReputation()` - Update user reputation

### Transaction Service

**Location**: `backend/src/services/transaction/`

**Responsibilities**:
- Transaction indexing from blockchain
- Transaction history management
- Transaction statistics
- Status updates and polling

**Key Methods**:
- `indexTransactions()` - Index transactions from ScrollScan
- `getUserTransactions()` - Get transaction history
- `getTransactionByHash()` - Get transaction details
- `getTransactionStats()` - Get statistics

**Background Jobs**:
- Transaction indexer runs every 30 seconds
- Updates transaction statuses
- Indexes new transactions

### Token Service

**Location**: `backend/src/services/token/`

**Responsibilities**:
- Token metadata management
- Token balance tracking
- Price tracking and updates
- Custom token support

**Key Methods**:
- `getTokenMetadata()` - Get token information
- `getTokenBalance()` - Get token balance for wallet
- `getTokenPrice()` - Get current token price
- `updateTokenPrices()` - Update prices from CoinGecko

**Background Jobs**:
- Price updater runs every 5 minutes
- Updates token prices from CoinGecko API

### Mini-App Service

**Location**: `backend/src/services/miniapp/`

**Responsibilities**:
- Mini-app registry management
- App analytics and usage tracking
- Category management
- Verification and featuring

**Key Methods**:
- `getMiniApps()` - List mini-apps with filters
- `getMiniAppById()` - Get app details
- `trackUsage()` - Track app usage
- `verifyApp()` - Verify mini-app
- `featureApp()` - Feature/unfeature app

### Notification Service

**Location**: `backend/src/services/notification/`

**Responsibilities**:
- Notification creation and management
- Push notification delivery
- Notification preferences
- Read status tracking

**Key Methods**:
- `createNotification()` - Create notification
- `sendPushNotification()` - Send push notification
- `getUserNotifications()` - Get user notifications
- `markAsRead()` - Mark notification as read

### Analytics Service

**Location**: `backend/src/services/analytics/`

**Responsibilities**:
- Event tracking
- User analytics
- Session tracking
- Behavior analysis

**Key Methods**:
- `trackEvent()` - Track analytics event
- `getUserAnalytics()` - Get user analytics
- `getPlatformAnalytics()` - Get platform-wide analytics

### Admin Service

**Location**: `backend/src/services/admin/`

**Responsibilities**:
- Dashboard statistics aggregation
- User management with advanced filtering
- Transaction monitoring across platform
- Mini-app management (verification, featuring)
- Security events tracking
- System health metrics
- Admin actions audit logging

**Key Methods**:
- `getDashboardStats()` - Aggregate dashboard statistics
- `getUsers()` - List users with filters
- `updateUser()` - Update user role/status
- `getTransactions()` - List all transactions
- `getSecurityEvents()` - Get security events
- `getSystemHealth()` - Get system metrics
- `logAdminAction()` - Log admin action to audit trail

See [Admin Dashboard Documentation](./admin-dashboard.md) for detailed admin service documentation.

## Data Layer

### PostgreSQL Database

**Primary data store** for all persistent data.

**Key Tables**:
- `users` - User profiles with role and status
- `transactions` - Transaction history
- `tokens` - Token metadata
- `miniapps` - Mini-app registry
- `notifications` - User notifications
- `analytics` - Analytics events
- `admin_actions` - Admin audit log
- `feature_flags` - Feature toggles
- `system_health` - System metrics

See [Database Schema](./database.md) for detailed schema documentation.

### Redis Cache

**Caching layer** for frequently accessed data.

**Usage**:
- Session storage
- Frequently accessed data (user profiles, token prices)
- Rate limiting counters
- Temporary data

### Blockchain Integration

**Direct RPC calls** to Scroll blockchain.

**Usage**:
- Transaction monitoring
- Balance queries
- Signature verification
- Gas estimation

## Background Jobs

### Transaction Indexer

**Schedule**: Every 30 seconds

**Process**:
1. Get active users
2. For each user:
   - Query ScrollScan API for new transactions
   - Parse transaction data
   - Store in database
   - Invalidate cache
3. Update transaction statuses

### Price Updater

**Schedule**: Every 5 minutes

**Process**:
1. Get list of tracked tokens
2. Query CoinGecko API for prices
3. Update token prices in database
4. Invalidate cache

## Service Communication

### Internal Communication

Services communicate through:
- Direct function calls (synchronous)
- Shared database (asynchronous)
- Event system (planned)

### External Communication

Services communicate with:
- Scroll RPC (blockchain data)
- ScrollScan API (transaction indexing)
- CoinGecko API (price data)
- IPFS (metadata storage, planned)
- FCM/Expo Push (push notifications)

## Error Handling

All services follow consistent error handling:

1. **Validation Errors**: Return 400 with validation details
2. **Not Found Errors**: Return 404
3. **Authorization Errors**: Return 403
4. **Server Errors**: Return 500, log error, don't expose details

## Logging

All services use Winston for structured logging:

- **Info**: Normal operations
- **Warn**: Recoverable issues
- **Error**: Errors requiring attention
- **Debug**: Detailed debugging information (development only)

## Performance Considerations

1. **Caching**: Redis for frequently accessed data
2. **Database Indexes**: Optimized queries
3. **Connection Pooling**: Reuse database connections
4. **Background Jobs**: Async processing
5. **Pagination**: Limit result sets

---

**Related Documentation:**
- [API Design](./api-design.md)
- [Database Schema](./database.md)
- [Admin Dashboard](./admin-dashboard.md)
- [System Architecture](../architecture/system-overview.md)
