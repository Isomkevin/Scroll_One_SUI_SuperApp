# Third-Party APIs

## Purpose

This document describes all third-party API integrations used in Scroll One SuperApp.

**Audience**: Backend engineers, integration developers

## Overview

Scroll One SuperApp integrates with several third-party APIs for blockchain data, token prices, and transaction history.

## Scroll RPC

### Purpose

Direct blockchain interaction via Scroll RPC endpoints.

### Endpoints

**Mainnet**:
- URL: `https://rpc.scroll.io`
- Chain ID: `534352`

**Testnet**:
- URL: `https://sepolia-rpc.scroll.io`
- Chain ID: `534351`

### Usage

**Location**: `services/scroll/provider.ts`

**Operations**:
- Get balance
- Send transaction
- Estimate gas
- Get transaction receipt
- Call contract methods

### Authentication

No authentication required (public RPC).

### Rate Limiting

- No official rate limits documented
- Implement client-side rate limiting
- Use connection pooling

### Error Handling

- Network errors: Retry with exponential backoff
- RPC errors: Parse and handle appropriately
- Timeout: Set reasonable timeouts

## ScrollScan API

### Purpose

Blockchain explorer API for transaction history and block data.

### Endpoint

- Base URL: `https://api.scrollscan.com/api`
- Documentation: ScrollScan API docs

### Usage

**Location**: `services/scroll/transactions.ts`

**Operations**:
- Get transaction list
- Get transaction details
- Get account transactions

### Authentication

API key may be required (check ScrollScan documentation).

### Rate Limiting

- Check ScrollScan documentation for limits
- Implement caching to reduce requests
- Use pagination for large result sets

### Error Handling

- Handle API errors gracefully
- Implement retry logic
- Cache responses appropriately

## CoinGecko API

### Purpose

Token price data and market information.

### Endpoint

- Base URL: `https://api.coingecko.com/api/v3`
- Documentation: CoinGecko API docs

### Usage

**Location**: `services/scroll/prices.ts`

**Operations**:
- Get token prices
- Get price history
- Get market data

### Authentication

Free tier: No authentication (rate limited)
Pro tier: API key required

### Rate Limiting

**Free Tier**:
- 10-50 calls/minute (varies)
- Implement caching (1 minute minimum)

**Pro Tier**:
- Higher limits with API key
- Check CoinGecko documentation

### Error Handling

- Handle rate limit errors (429)
- Implement exponential backoff
- Cache prices to reduce requests

### Caching Strategy

- Cache prices for 1 minute (minimum)
- Update prices in background
- Serve stale data if API unavailable

## IPFS (Planned)

### Purpose

Decentralized storage for metadata and assets.

### Status

Planned for future implementation.

### Use Cases

- User avatar storage
- NFT metadata
- Decentralized content

## Push Notifications (Planned)

### Purpose

Push notifications for transaction confirmations and updates.

### Services

- **FCM**: Firebase Cloud Messaging (Android)
- **APNs**: Apple Push Notification service (iOS)
- **Expo Push**: Expo push notification service

### Status

Planned for future implementation.

## API Integration Best Practices

### Error Handling

1. **Retry Logic**: Implement exponential backoff
2. **Timeout**: Set reasonable timeouts
3. **Fallback**: Provide fallback data when possible
4. **User Feedback**: Show clear error messages

### Rate Limiting

1. **Caching**: Cache responses to reduce requests
2. **Request Throttling**: Limit request frequency
3. **Queue**: Queue requests if needed
4. **Monitor**: Monitor rate limit usage

### Security

1. **API Keys**: Store securely (environment variables)
2. **HTTPS**: Always use HTTPS
3. **Validation**: Validate all API responses
4. **Sanitization**: Sanitize data from APIs

### Performance

1. **Caching**: Cache frequently accessed data
2. **Pagination**: Use pagination for large datasets
3. **Batch Requests**: Batch requests when possible
4. **Connection Pooling**: Reuse connections

## Monitoring

### Metrics to Track

- API response times
- Error rates
- Rate limit usage
- Cache hit rates

### Alerts

- High error rates
- Rate limit approaching
- API downtime
- Slow response times

## Future Integrations

1. **ENS Resolution**: Ethereum Name Service
2. **Token Lists**: Token registry APIs
3. **DEX Aggregators**: Best price routing
4. **Analytics**: User analytics services

---

**Related Documentation:**
- [Web3 Architecture](../architecture/web3-architecture.md)
- [Backend Services](../backend/services.md)
- [System Overview](../architecture/system-overview.md)
