# Authentication

## Purpose

This document describes the authentication system for Scroll One SuperApp, including wallet-based authentication, JWT tokens, and session management.

**Audience**: Backend engineers, security auditors, integration developers

## Authentication Overview

Scroll One SuperApp uses **wallet signature-based authentication** instead of traditional passwords. This provides a Web3-native, more secure authentication method.

## Authentication Flow

### Step 1: Request Authentication Message

Client requests a message to sign:

```http
POST /api/v1/auth/wallet/message
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
    "message": "Sign in to Scroll One SuperApp\n\nWallet: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\nNonce: abc123...\nTimestamp: 2024-01-15T12:00:00Z"
  }
}
```

### Step 2: Sign Message

Client signs the message with wallet private key using ethers.js or similar:

```javascript
import { ethers } from 'ethers';

const wallet = new ethers.Wallet(privateKey);
const signature = await wallet.signMessage(message);
```

### Step 3: Verify Signature

Client sends signature for verification:

```http
POST /api/v1/auth/wallet/verify
Content-Type: application/json

{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "message": "Sign in to Scroll One SuperApp...",
  "signature": "0x1234..."
}
```

**Backend Process**:
1. Verify signature matches wallet address
2. Verify message nonce is valid (not reused)
3. Verify message timestamp is recent
4. Create or get user in database
5. Generate JWT token
6. Return token to client

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d",
    "user": {
      "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "role": "user",
      "status": "active"
    }
  }
}
```

### Step 4: Use Token

Client includes token in Authorization header for authenticated requests:

```http
GET /api/v1/users/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## JWT Token Structure

### Token Payload

```json
{
  "walletAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "userId": "uuid",
  "role": "user",
  "iat": 1640995200,
  "exp": 1641599999
}
```

### Token Expiration

- **Default**: 7 days
- **Admin tokens**: 24 hours (stricter)
- **Refresh**: Not currently implemented (planned)

## Signature Verification

### Verification Process

1. **Recover Address**: Use `ethers.utils.verifyMessage()` to recover address from signature
2. **Compare Addresses**: Verify recovered address matches provided wallet address
3. **Verify Nonce**: Check message nonce hasn't been used before
4. **Verify Timestamp**: Ensure message is recent (within 5 minutes)

### Security Considerations

- **Nonce Reuse Prevention**: Each nonce can only be used once
- **Timestamp Validation**: Messages expire after 5 minutes
- **Signature Validation**: Cryptographic verification ensures authenticity

## Session Management

### Token Storage

**Mobile App**:
- Stored in Expo SecureStore (encrypted)
- Never stored in AsyncStorage

**Web (Landing Page)**:
- Currently stored in localStorage
- **Production Recommendation**: Use httpOnly cookies

### Token Refresh

Token refresh is not currently implemented. Users must re-authenticate after token expiration.

**Planned**: Implement refresh tokens for better UX.

## Authorization

### Role-Based Access Control (RBAC)

**User Roles**:
- `user` - Standard user (default)
- `admin` - Admin user (planned)
- `super_admin` - Super Admin (admin dashboard access)

**User Status**:
- `active` - User can access the system
- `suspended` - User temporarily blocked
- `banned` - User permanently blocked

### Permission Checks

Middleware checks user role and status before allowing access:

```typescript
// Standard authentication
authenticateToken() // Verifies JWT token

// Admin authentication
requireSuperAdmin() // Verifies JWT + Super Admin role + active status
```

## Admin Authentication

Admin endpoints require additional verification:

1. **JWT Token**: Valid JWT token required
2. **Super Admin Role**: User must have `role = 'super_admin'`
3. **Active Status**: User must have `status = 'active'`
4. **Audit Logging**: All admin actions are logged

See [Admin Dashboard Documentation](../backend/admin-dashboard.md) for details.

## Security Best Practices

### For Clients

1. **Never expose private keys**: Private keys should never be sent to the server
2. **Store tokens securely**: Use SecureStore (mobile) or httpOnly cookies (web)
3. **Validate tokens**: Check token expiration before making requests
4. **Handle errors**: Implement proper error handling for authentication failures

### For Backend

1. **Strong JWT secret**: Use cryptographically random secret (minimum 32 characters)
2. **Token expiration**: Set appropriate expiration times
3. **Rate limiting**: Limit authentication attempts to prevent brute force
4. **Audit logging**: Log all authentication attempts (success and failure)
5. **HTTPS only**: Enforce HTTPS in production

## Error Handling

### Authentication Errors

- `INVALID_SIGNATURE` - Signature verification failed
- `EXPIRED_MESSAGE` - Message timestamp too old
- `REUSED_NONCE` - Nonce already used
- `INVALID_WALLET_ADDRESS` - Invalid wallet address format
- `USER_SUSPENDED` - User account suspended
- `USER_BANNED` - User account banned

### Authorization Errors

- `UNAUTHORIZED` - No valid token provided
- `FORBIDDEN` - Insufficient permissions
- `INVALID_ROLE` - User role doesn't have required permissions

## Rate Limiting

Authentication endpoints are rate limited:

- **Message Request**: 10 requests per minute per IP
- **Signature Verification**: 5 attempts per minute per IP
- **Failed Attempts**: Temporary lockout after 5 failed attempts

## Future Enhancements

1. **Refresh Tokens**: Implement refresh token mechanism
2. **Multi-Factor Authentication**: Add 2FA for admin accounts
3. **Session Management**: Better session tracking and management
4. **Device Management**: Track and manage authenticated devices
5. **Biometric Authentication**: Native biometric auth for mobile app

---

**Related Documentation:**
- [Encryption](./encryption.md)
- [Secrets Management](./secrets-management.md)
- [Admin Dashboard](../backend/admin-dashboard.md)
- [API Design](../backend/api-design.md)
