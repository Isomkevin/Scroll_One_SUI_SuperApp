# Production Deployment Checklist

## Purpose

This checklist ensures all critical items are completed before deploying Scroll One SuperApp to production.

**Audience**: DevOps engineers, technical leads, release managers

## Pre-Launch Requirements

### 🔴 Critical (Block Launch)

#### Configuration

- [ ] Replace placeholder token addresses with real Scroll mainnet addresses
  - File: `services/scroll/tokens.ts`
  - Verify: All token addresses are valid Scroll mainnet addresses

- [ ] Remove all mock data from production code
  - File: `app/(tabs)/(wallet)/index.tsx`
  - Verify: No MOCK_ASSETS or MOCK_TRANSACTIONS in production

- [ ] Configure production environment variables
  - Backend `.env` file configured
  - Frontend environment variables set
  - All secrets stored securely (not in code)

- [ ] Set up production database
  - Schema applied
  - Migrations run
  - Admin schema applied (if using admin dashboard)
  - Initial data seeded (if needed)

#### Security

- [ ] Security audit completed
  - Private key handling reviewed
  - Bridge security reviewed
  - Transaction signing flow reviewed
  - API security reviewed

- [ ] JWT secret is strong and unique
  - Minimum 32 characters
  - Cryptographically random
  - Not committed to repository

- [ ] HTTPS enforced for all endpoints
  - SSL certificates installed
  - HTTP redirects to HTTPS
  - HSTS headers configured

- [ ] CORS configured correctly
  - Only allowed origins specified
  - No wildcard origins in production

- [ ] Rate limiting enabled
  - API endpoints rate limited
  - Admin endpoints stricter limits
  - DDoS protection configured

#### Testing

- [ ] All critical flows tested
  - Wallet creation
  - Transaction sending
  - Bridge communication
  - Transaction history
  - Token balances

- [ ] Error handling tested
  - Network failures
  - RPC errors
  - Invalid inputs
  - Edge cases

- [ ] Security testing completed
  - Authentication flows
  - Authorization checks
  - Input validation
  - SQL injection prevention

### 🟡 Important (Should Have)

#### Features

- [ ] Network switching UI implemented (if needed)
- [ ] ERC-20 token balance in bridge
- [ ] EIP-712 typed data signing
- [ ] Contract address risk assessment

#### Monitoring

- [ ] Error tracking configured (Sentry or similar)
- [ ] Logging configured (structured logs)
- [ ] Monitoring dashboards set up
- [ ] Alert system configured
- [ ] Health check endpoints working

#### Performance

- [ ] Database indexes optimized
- [ ] Query performance tested
- [ ] Caching strategy implemented
- [ ] CDN configured (if applicable)
- [ ] Load testing completed

#### Documentation

- [ ] API documentation up to date
- [ ] Deployment runbook created
- [ ] Incident response plan documented
- [ ] Rollback procedure documented

### 🟢 Nice to Have (Can Wait)

- [ ] Testing infrastructure set up
- [ ] Analytics integrated
- [ ] ENS resolution implemented
- [ ] Advanced gas optimization

## Deployment Steps

### 1. Pre-Deployment

- [ ] Code review completed
- [ ] All tests passing
- [ ] Security review completed
- [ ] Performance testing completed
- [ ] Staging deployment successful

### 2. Database Migration

- [ ] Backup production database
- [ ] Test migration on staging
- [ ] Run migration on production
- [ ] Verify migration success
- [ ] Verify data integrity

### 3. Application Deployment

- [ ] Build production artifacts
- [ ] Deploy backend services
- [ ] Deploy frontend (landing page)
- [ ] Deploy mobile apps (if applicable)
- [ ] Verify all services healthy

### 4. Post-Deployment

- [ ] Smoke tests passed
- [ ] Monitoring shows healthy metrics
- [ ] No error spikes in logs
- [ ] User flows working correctly
- [ ] Performance metrics acceptable

### 5. Rollback Plan

- [ ] Rollback procedure documented
- [ ] Rollback tested in staging
- [ ] Database rollback plan ready
- [ ] Team notified of rollback procedure

## Production Configuration Checklist

### Backend

- [ ] Environment variables set
- [ ] Database connection configured
- [ ] Redis connection configured
- [ ] RPC endpoints configured (mainnet)
- [ ] API keys configured
- [ ] Logging configured
- [ ] Monitoring configured

### Frontend (Landing Page)

- [ ] API URL configured
- [ ] Environment variables set
- [ ] Build completed successfully
- [ ] Static assets optimized
- [ ] CDN configured (if applicable)

### Mobile App

- [ ] App signing configured
- [ ] Bundle IDs configured
- [ ] App Store/Play Store metadata ready
- [ ] Push notifications configured (if applicable)
- [ ] Deep linking configured (if applicable)

## Security Checklist

- [ ] All secrets in secure storage (not in code)
- [ ] API keys rotated and secure
- [ ] Database credentials secure
- [ ] JWT secret is strong and unique
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS prevention verified
- [ ] CSRF protection enabled (if applicable)

## Monitoring Checklist

- [ ] Error tracking configured
- [ ] Log aggregation set up
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured
- [ ] Database monitoring enabled
- [ ] Alert rules configured
- [ ] On-call rotation set up

## Backup Checklist

- [ ] Database backup strategy configured
- [ ] Backup retention policy set
- [ ] Backup restoration tested
- [ ] Point-in-time recovery tested
- [ ] Backup monitoring configured

## Documentation Checklist

- [ ] API documentation complete
- [ ] Deployment runbook created
- [ ] Incident response plan documented
- [ ] Rollback procedure documented
- [ ] Architecture documentation up to date
- [ ] Security documentation complete

## Post-Launch Monitoring

### First 24 Hours

- [ ] Monitor error rates
- [ ] Monitor performance metrics
- [ ] Monitor user activity
- [ ] Check database performance
- [ ] Verify all integrations working
- [ ] Monitor security events

### First Week

- [ ] Review error logs daily
- [ ] Monitor performance trends
- [ ] Gather user feedback
- [ ] Review security events
- [ ] Optimize based on metrics

## Emergency Contacts

- **On-Call Engineer**: [Contact Info]
- **DevOps Lead**: [Contact Info]
- **Security Team**: [Contact Info]
- **Database Admin**: [Contact Info]

## Rollback Procedure

If critical issues are detected:

1. **Immediate Actions**:
   - Notify team
   - Assess severity
   - Decide on rollback

2. **Rollback Steps**:
   - Stop new deployments
   - Revert to previous version
   - Restore database (if needed)
   - Verify system health
   - Communicate to users (if needed)

3. **Post-Rollback**:
   - Investigate root cause
   - Fix issues
   - Test fixes
   - Plan re-deployment

---

**Related Documentation:**
- [Environments](./environments.md)
- [CI/CD](./ci-cd.md)
- [Implementation Status](../reference/implementation-status.md)
