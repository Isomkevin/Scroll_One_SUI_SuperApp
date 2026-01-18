# Frequently Asked Questions

## Purpose

This document answers common questions about Scroll One SuperApp.

**Audience**: All users of the documentation

## General

### What is Scroll One SuperApp?

Scroll One SuperApp is a mobile-first crypto SuperApp built exclusively on the Scroll blockchain. It combines a self-custodial wallet, mini-app marketplace, and decentralized identity in one unified interface.

### Why Scroll blockchain?

The app is built exclusively for Scroll to provide a focused, optimized experience for the Scroll ecosystem. Scroll is an Ethereum Layer 2 scaling solution that offers low fees and fast transactions.

### Is this open source?

The project is currently private and proprietary. All rights reserved.

## Wallet

### How are private keys stored?

Private keys are generated using cryptographically secure methods and stored encrypted in Expo SecureStore (device keychain/keystore). Keys never leave the device and are never backed up to cloud.

### Can I recover my wallet if I lose my device?

Currently, wallet recovery is not implemented. If you lose your device, wallets cannot be recovered. Seed phrase backup is planned for future implementation.

### Can I use MetaMask or other wallets?

No. The app uses a self-custodial wallet only. External wallet connections (MetaMask, WalletConnect) are not supported.

### How do I switch between mainnet and testnet?

Network switching code exists but UI is not yet implemented. This is planned for a future release.

## Mini-Apps

### How do I add my dApp as a mini-app?

Add your dApp to `miniapps/registry.ts`. The app will automatically appear in the Explore tab. For verified status, contact the team.

### How does the WebView bridge work?

The bridge enables secure communication between WebView-hosted dApps and the native wallet. dApps use `window.scrollOne` API to request wallet operations. See [WebView Bridge Integration](../integrations/webview-bridge.md) for details.

### Can any website be loaded as a mini-app?

Yes, but only verified apps are marked as verified. Unverified apps may have limited functionality or warnings.

## Backend

### Is the backend required?

No. The mobile app can operate fully standalone (client-side only). The backend provides enhanced features like user profiles, transaction indexing, and analytics.

### How do I set up the backend?

See [Backend Services](../backend/services.md) and [Deployment Guide](../deployment/environments.md) for setup instructions.

### What database is used?

PostgreSQL 15+ for primary data storage, Redis 7+ for caching.

## Admin Dashboard

### How do I access the admin dashboard?

Navigate to `/admin-super` (hidden route). You must have Super Admin role and be authenticated with a wallet.

### How do I become a Super Admin?

A Super Admin user must be created in the database. See [Admin Dashboard Setup](../deployment/admin-setup.md) for instructions.

### Is the admin dashboard secure?

Yes. It requires wallet signature authentication, Super Admin role verification, and all actions are audit logged. Additional security measures (IP whitelisting, 2FA) are recommended for production.

## Development

### How do I add a new feature?

See [Contribution Guide](../contributing/contribution-guide.md) for development workflow and guidelines.

### What testing is required?

Currently, manual testing is the primary method. Testing infrastructure is planned. See [Implementation Status](./implementation-status.md) for current state.

### How do I deploy to production?

See [Production Checklist](../deployment/production-checklist.md) for pre-launch requirements and [Deployment Guide](../deployment/environments.md) for deployment instructions.

## Security

### How secure is the app?

The app follows security best practices:
- Private keys never leave device
- Encrypted storage (SecureStore)
- HTTPS for all network calls
- Wallet signature authentication
- Input validation and sanitization

See [Security Documentation](../security/auth.md) for details.

### Has the app been audited?

Security audit is recommended before production launch. See [Production Checklist](../deployment/production-checklist.md).

## Troubleshooting

### App won't load on device

1. Ensure phone and computer are on the same WiFi network
2. Try tunnel mode: `bun start -- --tunnel`
3. Check firewall settings
4. Restart the development server

### Transaction failing

- Check you have sufficient ETH for gas fees
- Verify RPC endpoint is accessible
- Check transaction parameters are valid

### Bridge not working

- Ensure dApp is loading `scrollone-sdk`
- Check dApp is calling `window.scrollOne` API correctly
- Verify bridge origin validation settings
- See [WebView Bridge Guide](../integrations/webview-bridge.md) for troubleshooting

## Support

### Where can I get help?

- **Documentation**: See [Documentation Index](../README.md)
- **Issues**: Open an issue on GitHub
- **Community**: Join the Scroll community

---

**Related Documentation:**
- [Glossary](./glossary.md)
- [Implementation Status](./implementation-status.md)
- [System Overview](../architecture/system-overview.md)
