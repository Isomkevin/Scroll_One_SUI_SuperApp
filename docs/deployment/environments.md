# Environment Configuration

## Purpose

This document describes the different deployment environments and their configurations for Scroll One SuperApp.

**Audience**: DevOps engineers, backend developers, deployment managers

## Environment Types

### Development

**Purpose**: Local development and testing

**Configuration**:
- Local services (PostgreSQL, Redis via Docker)
- Hot reload enabled
- Debug logging enabled
- Testnet RPC endpoints (optional)
- No rate limiting (or very permissive)

**Setup**:
```bash
# Start local services
docker-compose up -d postgres redis

# Start backend
cd backend
npm run dev

# Start mobile app
bun run start
```

**Environment Variables**:
- `NODE_ENV=development`
- `PORT=3000` (backend)
- Local database credentials
- Test API keys (if needed)

### Staging

**Purpose**: Pre-production testing and QA

**Configuration**:
- Production-like infrastructure
- Mainnet RPC endpoints (or testnet)
- Production database schema
- Rate limiting enabled
- Monitoring enabled
- Staging API keys

**Access**: Limited to team members and QA

### Production

**Purpose**: Live application serving end users

**Configuration**:
- Production infrastructure (load balanced, scaled)
- Mainnet RPC endpoints only
- Production database with backups
- Strict rate limiting
- Full monitoring and alerting
- Production API keys
- HTTPS only
- Security hardening enabled

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

**Mobile App**:
- No environment variables (configuration in `app.json`)
- RPC URLs hardcoded in `services/scroll/provider.ts`

## Database Configuration

### Development

- Local PostgreSQL via Docker
- No replication
- Development data (can be reset)

### Staging

- Managed PostgreSQL instance
- Read replicas (optional)
- Staging data (refreshed from production periodically)

### Production

- Managed PostgreSQL with:
  - Primary instance
  - Read replicas for scaling
  - Automated backups
  - Point-in-time recovery
  - High availability

## Redis Configuration

### Development

- Local Redis via Docker
- No persistence (optional)

### Staging/Production

- Managed Redis cluster
- Persistence enabled
- High availability
- Backup strategy

## Network Configuration

### RPC Endpoints

**Mainnet**:
- Primary: `https://rpc.scroll.io`
- Chain ID: `534352`

**Testnet**:
- Primary: `https://sepolia-rpc.scroll.io`
- Chain ID: `534351`

### API Endpoints

**Development**: `http://localhost:3000`
**Staging**: `https://api-staging.scrollone.app`
**Production**: `https://api.scrollone.app`

## Security Configuration

### Development

- Permissive CORS
- Debug logging (may include sensitive data)
- No IP restrictions
- Test credentials

### Staging

- Restricted CORS
- Limited logging
- IP restrictions (optional)
- Staging credentials

### Production

- Strict CORS (specific origins only)
- No sensitive data in logs
- IP whitelisting for admin routes
- Production credentials (rotated regularly)
- Rate limiting enabled
- DDoS protection

## Monitoring

### Development

- Console logging
- Basic error tracking

### Staging/Production

- Structured logging (Winston)
- Error tracking (Sentry or similar)
- Performance monitoring
- Database query monitoring
- Uptime monitoring
- Alert system

## Backup Strategy

### Database Backups

- **Development**: Manual backups (optional)
- **Staging**: Daily automated backups
- **Production**: 
  - Continuous backups
  - Daily full backups
  - 30-day retention
  - Point-in-time recovery

### Application Backups

- Code: Git repository
- Configuration: Version controlled
- Secrets: Secure secret management system

## Scaling Configuration

### Development

- Single instance
- No load balancing
- Local resources

### Staging

- 2-3 instances
- Load balancer
- Staging resources

### Production

- Multiple instances (auto-scaling)
- Load balancer (Nginx/HAProxy)
- CDN for static assets
- Database read replicas
- Redis cluster

## Deployment Process

See [CI/CD](./ci-cd.md) for automated deployment processes.

## Environment-Specific Considerations

### Development

- Fast iteration
- Easy debugging
- Local testing
- Mock data acceptable

### Staging

- Production-like testing
- Integration testing
- Performance testing
- Security testing

### Production

- Zero-downtime deployments
- Rollback capability
- Monitoring and alerting
- Security hardening
- Performance optimization

---

**Related Documentation:**
- [CI/CD](./ci-cd.md)
- [Production Checklist](./production-checklist.md)
- [Backend Deployment](../backend/api-design.md)
