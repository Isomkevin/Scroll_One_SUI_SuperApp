# Secrets Management

## Purpose

This document describes how secrets, API keys, and sensitive configuration are managed across different environments.

**Audience**: DevOps engineers, backend developers, security engineers

## Secrets Overview

Secrets include:
- JWT signing secrets
- Database credentials
- API keys (ScrollScan, CoinGecko, etc.)
- Third-party service credentials
- Encryption keys

## Secret Storage

### Development

**Location**: `.env` files (not committed to repository)

**Format**:
```env
JWT_SECRET=dev-secret-min-32-chars
DB_PASSWORD=dev-password
SCROLLSCAN_API_KEY=dev-api-key
```

**Security**:
- `.env` files in `.gitignore`
- Different secrets than production
- Can be less secure (development only)

### Staging

**Location**: Staging secret management system

**Options**:
- Environment variables in deployment platform
- Secret management service (AWS Secrets Manager, HashiCorp Vault, etc.)
- Encrypted configuration files

**Security**:
- Separate from production secrets
- Access restricted to staging environment
- Rotated regularly

### Production

**Location**: Production secret management system

**Requirements**:
- Secure secret management service (AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, etc.)
- Encrypted at rest
- Access logging and auditing
- Versioning support
- Rotation capabilities

**Security**:
- Strong, unique secrets
- Access restricted to production services only
- Regular rotation
- Audit logging

## Secret Types

### JWT Secret

**Purpose**: Signing and verifying JWT tokens

**Requirements**:
- Minimum 32 characters
- Cryptographically random
- Unique per environment
- Rotated every 90 days

**Generation**:
```bash
# Generate secure random secret
openssl rand -base64 32
```

### Database Credentials

**Purpose**: PostgreSQL database access

**Requirements**:
- Strong passwords (minimum 16 characters)
- Unique per environment
- Rotated every 90 days
- Stored securely

### API Keys

**Purpose**: External service authentication

**Types**:
- ScrollScan API key
- CoinGecko API key
- Push notification service keys
- Email service credentials

**Requirements**:
- Stored securely
- Rotated on compromise
- Different keys per environment

## Secret Rotation

### Rotation Process

1. **Generate New Secret**: Create new secret using secure method
2. **Update Secret Store**: Add new secret to secret management system
3. **Update Application**: Update application to use new secret
4. **Deploy**: Deploy updated application
5. **Verify**: Verify application works with new secret
6. **Archive Old Secret**: Keep old secret for decryption if needed
7. **Remove Old Secret**: Remove old secret after grace period

### Rotation Schedule

- **JWT Secret**: Every 90 days
- **Database Passwords**: Every 90 days
- **API Keys**: Every 180 days (or on compromise)
- **On Security Incident**: Immediate rotation

## Environment Variables

### Backend Environment Variables

**Required**:
```env
NODE_ENV=production|staging|development
PORT=3000
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=scroll_one
DB_USER=postgres
DB_PASSWORD=your-secure-password
REDIS_HOST=your-redis-host
REDIS_PORT=6379
JWT_SECRET=your-very-secure-secret-min-32-chars
```

**Optional**:
```env
SCROLL_RPC_URL=https://rpc.scroll.io
SCROLLSCAN_API_KEY=your-api-key
COINGECKO_API_KEY=your-api-key
LOG_LEVEL=info|debug|error
```

### Frontend Environment Variables

**Landing Page**:
```env
NEXT_PUBLIC_API_URL=https://api.scrollone.app
NEXT_PUBLIC_APP_URL=https://scrollone.app
```

**Note**: `NEXT_PUBLIC_*` variables are exposed to the browser. Never include secrets.

## Best Practices

### Do's

1. **Use Secret Management**: Use dedicated secret management service in production
2. **Rotate Regularly**: Rotate secrets on schedule
3. **Separate Environments**: Use different secrets per environment
4. **Limit Access**: Restrict access to secrets
5. **Audit Access**: Log all secret access
6. **Encrypt at Rest**: Ensure secrets are encrypted when stored
7. **Version Control**: Version secrets for rollback capability

### Don'ts

1. **Never Commit Secrets**: Never commit secrets to version control
2. **No Hardcoding**: Never hardcode secrets in code
3. **No Sharing**: Never share secrets via insecure channels
4. **No Defaults**: Never use default or example secrets
5. **No Logging**: Never log secrets
6. **No Exposure**: Never expose secrets in error messages

## Secret Management Tools

### Recommended Tools

1. **AWS Secrets Manager**: For AWS deployments
2. **HashiCorp Vault**: For on-premises or multi-cloud
3. **Azure Key Vault**: For Azure deployments
4. **Google Secret Manager**: For GCP deployments
5. **Kubernetes Secrets**: For Kubernetes deployments (with encryption)

### Integration Example

```typescript
// Example: AWS Secrets Manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const client = new SecretsManager({ region: 'us-east-1' });
const secret = await client.getSecretValue({ SecretId: 'jwt-secret' });
const jwtSecret = JSON.parse(secret.SecretString).jwt_secret;
```

## Emergency Procedures

### Secret Compromise

If a secret is compromised:

1. **Immediate Actions**:
   - Rotate compromised secret immediately
   - Revoke old secret
   - Investigate breach scope
   - Notify security team

2. **Assessment**:
   - Determine what was exposed
   - Assess impact
   - Identify attack vector

3. **Remediation**:
   - Rotate all related secrets
   - Update affected systems
   - Monitor for abuse
   - Document incident

### Secret Loss

If a secret is lost:

1. **Recovery**:
   - Check secret management system backups
   - Check secure backup locations
   - Contact secret management service support

2. **Regeneration**:
   - If recovery not possible, generate new secret
   - Update all systems using the secret
   - Verify functionality

## Compliance

### Audit Requirements

- **Access Logging**: All secret access logged
- **Rotation Tracking**: Secret rotation history maintained
- **Incident Reporting**: Security incidents documented

### Regulatory Compliance

- **GDPR**: Secrets don't contain user data
- **SOC 2**: Secret management meets compliance requirements
- **PCI DSS**: If handling payment data (not currently applicable)

---

**Related Documentation:**
- [Authentication](./auth.md)
- [Encryption](./encryption.md)
- [Environments](../deployment/environments.md)
