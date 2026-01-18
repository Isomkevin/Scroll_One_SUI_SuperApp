# Encryption and Key Management

## Purpose

This document describes encryption methods, key management, and secure storage practices used in Scroll One SuperApp.

**Audience**: Security engineers, backend developers, mobile developers

## Private Key Management

### Key Generation

Private keys are generated using cryptographically secure methods:

**Mobile App**:
```typescript
import * as Crypto from 'expo-crypto';

// Generate 32 random bytes (256 bits)
const privateKeyBytes = await Crypto.getRandomBytesAsync(32);
const privateKey = ethers.utils.hexlify(privateKeyBytes);
```

**Security Properties**:
- Cryptographically secure random number generation
- 256-bit entropy (sufficient for Ethereum wallets)
- No predictable patterns

### Key Storage

**Mobile App**:
- **Storage**: Expo SecureStore (device keychain/keystore)
- **Encryption**: Device-level encryption (iOS Keychain, Android Keystore)
- **Access**: Requires device unlock or biometric authentication
- **Backup**: Never backed up to cloud (local device only)

**Storage Format**:
```typescript
// Encrypted and stored in SecureStore
await SecureStore.setItemAsync('wallet_private_key', encryptedPrivateKey, {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
});
```

**Security Properties**:
- Keys never leave the device
- Encrypted at rest using device keychain
- No cloud backup
- Requires device authentication to access

### Key Usage

Private keys are only used for:
1. **Transaction Signing**: Signing blockchain transactions
2. **Message Signing**: Signing authentication messages
3. **Never**: Sent over network, logged, or exposed

## Data Encryption

### Sensitive Data

The following data is encrypted:

- **Private Keys**: Stored in SecureStore (device keychain)
- **Wallet Data**: Encrypted in SecureStore
- **Authentication Tokens**: Stored securely (SecureStore on mobile)

### Non-Sensitive Data

The following data is stored unencrypted (acceptable):

- **User Preferences**: AsyncStorage (non-sensitive)
- **App Settings**: AsyncStorage (non-sensitive)
- **Cache Data**: AsyncStorage or memory (temporary)

## Secure Communication

### HTTPS/TLS

All network communication uses HTTPS:

- **API Calls**: HTTPS only (enforced in production)
- **RPC Calls**: HTTPS to Scroll RPC endpoints
- **External APIs**: HTTPS to all external services

### Certificate Pinning (Planned)

Certificate pinning is planned for production to prevent man-in-the-middle attacks.

## Database Encryption

### At Rest

- **PostgreSQL**: Database encryption at rest (managed service)
- **Backups**: Encrypted backups
- **Sensitive Fields**: No sensitive data stored in database (private keys never stored)

### In Transit

- **Database Connections**: TLS/SSL encrypted
- **Connection Strings**: Stored securely (environment variables)

## Secrets Management

### Environment Variables

All secrets stored in environment variables:

**Backend**:
```env
JWT_SECRET=your-very-secure-secret-min-32-chars
DB_PASSWORD=your-secure-password
SCROLLSCAN_API_KEY=your-api-key
```

**Security**:
- Never committed to repository
- Stored in secure secret management system (production)
- Rotated regularly
- Different secrets per environment

### Secret Rotation

**Rotation Schedule**:
- **JWT Secret**: Every 90 days (or on security incident)
- **API Keys**: Every 180 days (or on compromise)
- **Database Passwords**: Every 90 days

**Rotation Process**:
1. Generate new secret
2. Update in secret management system
3. Update application configuration
4. Restart services
5. Verify functionality
6. Archive old secret (for decryption of old data if needed)

## Key Derivation

### Current Implementation

Each wallet uses an independently generated private key. No key derivation (BIP-44) is currently implemented.

### Planned Enhancement

**BIP-44 Key Derivation** (Planned):
- Single seed phrase for all wallets
- Hierarchical deterministic (HD) wallet support
- Better backup and recovery

## Backup and Recovery

### Current State

- **No Seed Phrase**: Wallets cannot be recovered if device is lost
- **Device-Only**: Keys stored only on device

### Planned Enhancement

**Seed Phrase Backup** (Planned):
- BIP-39 mnemonic phrase generation
- User-controlled backup
- Recovery process

## Security Considerations

### Private Key Security

1. **Never Log**: Private keys are never logged
2. **Never Expose**: Private keys never sent to server
3. **Secure Storage**: Only stored in SecureStore
4. **Access Control**: Requires device authentication

### API Security

1. **HTTPS Only**: All API calls use HTTPS
2. **Token Security**: JWT tokens stored securely
3. **No Secrets in Code**: All secrets in environment variables
4. **Input Validation**: All inputs validated and sanitized

### Database Security

1. **No Sensitive Data**: Private keys never stored in database
2. **Encrypted Connections**: TLS for all database connections
3. **Access Control**: Database access restricted
4. **Backup Encryption**: All backups encrypted

## Compliance

### Data Protection

- **GDPR**: User data can be exported/deleted
- **No Key Storage**: Private keys never stored on servers
- **User Control**: Users control their private keys

### Audit Requirements

- **Admin Actions**: All admin actions logged (audit trail)
- **Authentication Events**: Failed login attempts logged
- **Security Events**: Security incidents tracked

---

**Related Documentation:**
- [Authentication](./auth.md)
- [Secrets Management](./secrets-management.md)
- [Threat Model](../architecture/threat-model.md)
