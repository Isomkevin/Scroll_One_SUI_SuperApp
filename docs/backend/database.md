# Database Schema

## Purpose

This document describes the PostgreSQL database schema for Scroll One SuperApp, including all tables, relationships, and indexes.

**Audience**: Backend engineers, database administrators

## Database Overview

**Database**: PostgreSQL 15+
**Primary Use**: Relational data storage
**Cache Layer**: Redis for frequently accessed data

## Core Tables

### users

User profiles and authentication.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address VARCHAR(42) UNIQUE NOT NULL,
  scroll_id VARCHAR(255),
  username VARCHAR(50) UNIQUE,
  display_name VARCHAR(100),
  avatar TEXT,
  bio TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
  reputation INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_role_status ON users(role, status);
```

### transactions

Transaction history indexed from blockchain.

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hash VARCHAR(66) UNIQUE NOT NULL,
  from_address VARCHAR(42) NOT NULL,
  to_address VARCHAR(42),
  value NUMERIC(78, 0) NOT NULL,
  symbol VARCHAR(10) DEFAULT 'ETH',
  gas_used NUMERIC(78, 0),
  gas_price NUMERIC(78, 0),
  fee NUMERIC(78, 0),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  block_number BIGINT,
  transaction_index INTEGER,
  timestamp TIMESTAMP NOT NULL,
  network VARCHAR(20) DEFAULT 'mainnet',
  type VARCHAR(20) CHECK (type IN ('send', 'receive', 'swap', 'contract')),
  data TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_hash ON transactions(hash);
CREATE INDEX idx_transactions_from_address ON transactions(from_address);
CREATE INDEX idx_transactions_to_address ON transactions(to_address);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_timestamp ON transactions(timestamp DESC);
```

### tokens

Token metadata and information.

```sql
CREATE TABLE tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address VARCHAR(42) UNIQUE NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  decimals INTEGER DEFAULT 18,
  logo_url TEXT,
  price_usd NUMERIC(20, 8),
  price_updated_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tokens_address ON tokens(address);
CREATE INDEX idx_tokens_symbol ON tokens(symbol);
```

### miniapps

Mini-app registry.

```sql
CREATE TABLE miniapps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  category VARCHAR(50),
  featured BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_miniapps_category ON miniapps(category);
CREATE INDEX idx_miniapps_featured ON miniapps(featured);
CREATE INDEX idx_miniapps_verified ON miniapps(verified);
```

### notifications

User notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

### analytics

Analytics events.

```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event VARCHAR(100) NOT NULL,
  properties JSONB,
  session_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_user_id ON analytics(user_id);
CREATE INDEX idx_analytics_event ON analytics(event);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);
```

## Admin Tables

### admin_actions

Audit log for all admin actions.

```sql
CREATE TABLE admin_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_type VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(100),
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_admin_actions_admin_id ON admin_actions(admin_id);
CREATE INDEX idx_admin_actions_action_type ON admin_actions(action_type);
CREATE INDEX idx_admin_actions_created_at ON admin_actions(created_at DESC);
```

### feature_flags

Feature toggle management.

```sql
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key VARCHAR(100) UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT false,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### system_health

System health metrics.

```sql
CREATE TABLE system_health (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name VARCHAR(100) NOT NULL,
  metric_value NUMERIC(20, 4),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_system_health_metric_name ON system_health(metric_name);
CREATE INDEX idx_system_health_created_at ON system_health(created_at DESC);
```

## Relationships

### User Relationships

- `users` → `transactions` (one-to-many via from_address/to_address)
- `users` → `notifications` (one-to-many)
- `users` → `analytics` (one-to-many)
- `users` → `admin_actions` (one-to-many, admin only)

### Transaction Relationships

- `transactions` → `tokens` (many-to-one via symbol/address)

### Mini-App Relationships

- `miniapps` → `analytics` (indirect via event properties)

## Indexes

All foreign keys and frequently queried columns are indexed for performance:

- Primary keys (automatic)
- Foreign keys
- Frequently filtered columns (status, role, category)
- Frequently sorted columns (timestamp, created_at)
- Search columns (wallet_address, username)

## Migrations

Database migrations are managed via SQL files in `backend/database/`:

- `schema.sql` - Main schema
- `admin_schema.sql` - Admin dashboard extensions

### Applying Migrations

```bash
# Main schema
psql -U postgres -d scroll_one -f backend/database/schema.sql

# Admin schema
psql -U postgres -d scroll_one -f backend/database/admin_schema.sql
```

## Data Retention

- **Transactions**: Retained indefinitely
- **Analytics**: Retained for 2 years, then archived
- **Notifications**: Retained for 90 days, then deleted
- **Admin Actions**: Retained indefinitely (audit requirement)

## Backup Strategy

- **Frequency**: Daily full backups
- **Retention**: 30 days
- **Point-in-Time Recovery**: Enabled
- **Backup Location**: Secure cloud storage

## Performance Optimization

1. **Indexes**: All foreign keys and frequently queried columns indexed
2. **Partitioning**: Large tables (transactions, analytics) can be partitioned by date
3. **Connection Pooling**: PgBouncer or similar for connection management
4. **Query Optimization**: All queries reviewed for performance
5. **Caching**: Frequently accessed data cached in Redis

---

**Related Documentation:**
- [Backend Services](./services.md)
- [API Design](./api-design.md)
- [System Architecture](../architecture/system-overview.md)
