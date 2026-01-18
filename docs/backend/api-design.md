# API Design

## Purpose

This document provides comprehensive API reference documentation for the Scroll One SuperApp backend REST API.

**Audience**: API consumers, frontend developers, integration engineers

## Base URL

```
Production: https://api.scrollone.app/api/v1
Staging: https://api-staging.scrollone.app/api/v1
Development: http://localhost:3000/api/v1
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Wallet Authentication Flow

1. Client requests authentication message: `POST /auth/wallet/message`
2. Client signs message with wallet private key
3. Client sends signature: `POST /auth/wallet/verify`
4. Server verifies signature and returns JWT token
5. Client uses token for subsequent requests

See [Authentication Documentation](../security/auth.md) for detailed authentication flow.

## API Endpoints

### Authentication

#### Generate Authentication Message

```http
POST /auth/wallet/message
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Sign in to Scroll One SuperApp\n\nWallet: 0x...\nNonce: ...\nTimestamp: ..."
  }
}
```

#### Verify Wallet Signature

```http
POST /auth/wallet/verify
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "message": "Sign in to Scroll One SuperApp...",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d",
    "user": {
      "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
    }
  }
}
```

### Users

#### Create User Profile

```http
POST /users
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "scrollId": "scroll:0x...",
  "username": "johndoe",
  "displayName": "John Doe",
  "signature": "0x...",
  "message": "Sign in to Scroll One..."
}
```

#### Get User Profile

```http
GET /users/:walletAddress
```

#### Update User Profile

```http
PUT /users/:walletAddress
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayName": "New Name",
  "bio": "New bio",
  "avatar": "ipfs://..."
}
```

### Transactions

#### Get User Transactions

```http
GET /transactions/:walletAddress?status=confirmed&type=send&limit=50&offset=0
```

**Query Parameters:**
- `status`: `pending`, `confirmed`, `failed`
- `type`: `send`, `receive`, `swap`, `contract`
- `limit`: Items per page (default: 50)
- `offset`: Pagination offset (default: 0)

#### Get Transaction Details

```http
GET /transactions/hash/:hash
```

### Mini-Apps

#### List Mini-Apps

```http
GET /miniapps?category=DeFi&featured=true
```

#### Get Mini-App Details

```http
GET /miniapps/:appId
```

#### Track App Usage

```http
POST /miniapps/:appId/usage
Authorization: Bearer <token>
```

### Tokens

#### List Tokens

```http
GET /tokens
```

#### Get Token Details

```http
GET /tokens/:address
```

#### Get Token Price

```http
GET /tokens/:address/price
```

#### Get Token Balances

```http
GET /tokens/balances/:walletAddress
```

### Notifications

#### Get User Notifications

```http
GET /notifications
Authorization: Bearer <token>
```

#### Mark Notification as Read

```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

### Analytics

#### Track Analytics Event

```http
POST /analytics/event
Authorization: Bearer <token>
Content-Type: application/json

{
  "event": "transaction_sent",
  "properties": {
    "amount": "0.1",
    "symbol": "ETH"
  }
}
```

### Admin Endpoints (Super Admin Only)

All admin endpoints require Super Admin role. See [Admin Dashboard Documentation](./admin-dashboard.md) for details.

#### Dashboard Statistics

```http
GET /admin/dashboard/stats
Authorization: Bearer <token>
```

#### List Users

```http
GET /admin/users?search=0x...&role=user&status=active&page=1&limit=50
Authorization: Bearer <token>
```

#### Update User

```http
PUT /admin/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "admin",
  "status": "active"
}
```

#### List Transactions

```http
GET /admin/transactions?status=confirmed&type=send&page=1&limit=50
Authorization: Bearer <token>
```

#### Update Mini-App

```http
PUT /admin/miniapps/:appId
Authorization: Bearer <token>
Content-Type: application/json

{
  "verified": true,
  "featured": true
}
```

#### Security Events

```http
GET /admin/security/events?type=failed_login&page=1&limit=50
Authorization: Bearer <token>
```

#### System Health

```http
GET /admin/system/health
Authorization: Bearer <token>
```

#### Admin Actions Log

```http
GET /admin/actions?actionType=UPDATE_USER&page=1&limit=50
Authorization: Bearer <token>
```

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input data
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Public endpoints**: 100 requests per minute per IP
- **Authenticated endpoints**: 1000 requests per minute per user
- **Admin endpoints**: 500 requests per minute per admin

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Pagination

List endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 150,
      "totalPages": 3
    }
  }
}
```

## Versioning

API versioning is handled via URL path:
- Current version: `/api/v1`
- Future versions: `/api/v2`, etc.

Breaking changes will result in a new version number.

## CORS

CORS is configured to allow requests from:
- Production: `https://scrollone.app`, `https://app.scrollone.app`
- Staging: `https://staging.scrollone.app`
- Development: `http://localhost:3001`

## Webhooks (Planned)

Webhook support is planned for future versions to enable real-time notifications for:
- Transaction confirmations
- User events
- Mini-app updates

---

**Related Documentation:**
- [Backend Services](./services.md)
- [Database Schema](./database.md)
- [Admin Dashboard](./admin-dashboard.md)
- [Authentication](../security/auth.md)
