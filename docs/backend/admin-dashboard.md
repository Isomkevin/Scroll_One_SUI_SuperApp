# Admin Dashboard

## Purpose

This document provides comprehensive documentation for the Super Admin Dashboard, including setup, features, and API endpoints.

**Audience**: Administrators, backend engineers, security auditors

## Overview

The Super Admin Dashboard is a hidden, secure administrative interface for managing the Scroll One SuperApp platform. It provides comprehensive oversight of users, transactions, mini-apps, security events, and system health.

## Access & Security

### Route

- **URL**: `/admin-super` (hidden route, not shown in navigation)
- **Access**: Super Admin role only
- **Authentication**: Wallet signature-based authentication

### Security Features

1. **Role-Based Access Control (RBAC)**
   - Only users with `role = 'super_admin'` can access
   - Middleware checks role on every request
   - Users must have `status = 'active'` to access

2. **Authentication Flow**
   - Wallet connection via Web3 wallet
   - Message signing for authentication
   - JWT token stored securely
   - Session management

3. **Audit Logging**
   - All admin actions logged to `admin_actions` table
   - Includes: admin ID, action type, resource type, IP address, user agent, timestamp
   - Full audit trail for compliance and security

4. **IP Whitelisting** (Recommended for Production)
   - Can be implemented in `requireSuperAdmin` middleware
   - Add IP whitelist check before role verification

5. **2FA** (Recommended for Production)
   - Can be added as additional verification step
   - Integrate with TOTP or SMS-based 2FA

## Setup

### Step 1: Apply Database Schema

```bash
cd backend
psql -U postgres -d scroll_one -f database/admin_schema.sql
```

This adds:
- `role` and `status` columns to `users` table
- `admin_actions` table for audit logging
- `feature_flags` table for feature management
- `system_health` table for health metrics

### Step 2: Create Super Admin User

```bash
cd backend
node scripts/create-super-admin.js 0xYourWalletAddressHere
```

Or manually:
```sql
UPDATE users 
SET role = 'super_admin', status = 'active' 
WHERE wallet_address = '0xYourWalletAddressHere';
```

### Step 3: Configure Environment Variables

**Frontend** (landing-page/.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 4: Access Dashboard

Navigate to: `http://localhost:3001/admin-super`

## Features

### Dashboard Overview

Real-time statistics and metrics:
- Total users, active users, new users (today, week, month)
- Transaction statistics (total, today, week, month, pending, failed)
- Mini-app counts and verification status
- Active users (24h, 7d, 30d)
- Security events summary

### User Management

- Search users by wallet, username, or display name
- Filter by role (user, admin, super_admin)
- Filter by status (active, suspended, banned)
- Update user role and status
- View user reputation and level
- Pagination support

### Transaction Monitoring

- View all transactions across the platform
- Filter by status (pending, confirmed, failed)
- Filter by type (send, receive, swap, contract)
- Link to blockchain explorer
- Transaction value and gas information
- Pagination support

### Mini-App Management

- Verify/unverify mini-apps
- Feature/unfeature apps
- View app analytics
- Manage app categories

### Security Monitoring

- Real-time security events log
- Failed login attempts
- Suspicious activity detection
- IP address tracking
- User agent logging
- Filtering and pagination

### System Health

- System metrics display
- Health status indicators
- Real-time updates
- API response times
- Database connection status
- Redis connection status

### Audit Logging

- Complete action history
- Admin identification
- Resource changes
- IP and user agent tracking
- Timestamp for all actions
- Filtering and search

## API Endpoints

All endpoints are prefixed with `/api/v1/admin` and require:
- `Authorization: Bearer <token>`
- Super Admin role

### Dashboard

```http
GET /admin/dashboard/stats
Authorization: Bearer <token>
```

### Users

```http
GET /admin/users?search=0x...&role=user&status=active&page=1&limit=50
Authorization: Bearer <token>

PUT /admin/users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "role": "admin",
  "status": "active"
}
```

### Transactions

```http
GET /admin/transactions?status=confirmed&type=send&page=1&limit=50
Authorization: Bearer <token>
```

### Mini-Apps

```http
PUT /admin/miniapps/:appId
Authorization: Bearer <token>
Content-Type: application/json

{
  "verified": true,
  "featured": true
}
```

### Security

```http
GET /admin/security/events?eventType=login_failed&page=1&limit=50
Authorization: Bearer <token>
```

### System

```http
GET /admin/system/health
Authorization: Bearer <token>
```

### Audit

```http
GET /admin/actions?actionType=UPDATE_USER&page=1&limit=50
Authorization: Bearer <token>
```

See [API Design](./api-design.md) for complete API reference.

## Database Schema

### Admin Tables

**admin_actions**: Audit log for all admin operations
**feature_flags**: Feature toggle management
**system_health**: System health metrics

### Modified Tables

**users**: Added `role` and `status` columns

See [Database Schema](./database.md) for detailed schema.

## Frontend Components

Located in `landing-page/components/admin/`:

- **AdminLayout**: Sidebar navigation, top bar
- **DashboardOverview**: Statistics and metrics
- **UsersManagement**: User list and management
- **TransactionsManagement**: Transaction monitoring
- **MiniAppsManagement**: Mini-app management
- **SecurityMonitoring**: Security events
- **SystemHealth**: System metrics
- **AdminActionsLog**: Audit trail

## Security Best Practices

### Production Recommendations

1. **Token Storage**: Use httpOnly cookies or secure storage (not localStorage)
2. **IP Whitelisting**: Implement IP restrictions for admin routes
3. **2FA**: Add two-factor authentication for Super Admin accounts
4. **Rate Limiting**: Stricter limits on admin endpoints
5. **Monitoring**: Set up alerts for admin actions
6. **HTTPS Only**: Enforce HTTPS in production
7. **Regular Audits**: Review admin action logs regularly
8. **Access Control**: Limit number of Super Admin accounts

### Monitoring

- Monitor admin action logs regularly
- Set up alerts for suspicious admin activity
- Review security events daily
- Track failed authentication attempts

## Troubleshooting

### Authentication Issues

- Verify wallet is connected
- Check JWT token is valid
- Ensure user has `super_admin` role
- Verify user status is `active`

### API Errors

- Check backend is running
- Verify API URL in environment variables
- Check CORS settings
- Review backend logs

### Database Issues

- Ensure admin schema migration ran successfully
- Verify database connection
- Check user role column exists

## Future Enhancements

1. **Feature Flags UI**: Manage feature toggles
2. **Advanced Analytics**: Charts and visualizations
3. **Batch Operations**: Bulk user/transaction operations
4. **Real-time Updates**: WebSocket integration
5. **Export Reports**: CSV/PDF generation
6. **Compliance Tools**: GDPR data export/deletion
7. **IP Whitelisting**: Additional security layer
8. **2FA Integration**: Two-factor authentication

---

**Related Documentation:**
- [API Design](./api-design.md)
- [Backend Services](./services.md)
- [Database Schema](./database.md)
- [Authentication](../security/auth.md)
- [Deployment Setup](../deployment/admin-setup.md)
