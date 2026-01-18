# Glossary

## Purpose

This document defines key terms and concepts used throughout Scroll One SuperApp documentation.

**Audience**: All users of the documentation

## Terms

### A

**Admin Dashboard**: Hidden administrative interface at `/admin-super` for platform management (Super Admin only).

**APK**: Android Package Kit, the file format for Android applications.

### B

**Bridge**: Communication layer between WebView-hosted dApps and native wallet functionality. See [WebView Bridge](../integrations/webview-bridge.md).

**Bridge SDK**: Framework-agnostic SDK (`scrollone-sdk`) enabling secure dApp integration.

### C

**Chain ID**: Unique identifier for a blockchain network. Scroll mainnet: 534352, Scroll testnet: 534351.

**CoinGecko**: External API service used for token price data.

### D

**dApp**: Decentralized application, a Web3 application running on blockchain.

**DeFi**: Decentralized Finance, financial applications built on blockchain.

### E

**ERC-20**: Ethereum token standard for fungible tokens.

**ERC-7715**: Ethereum standard for wallet permissions (inspiration for planned permissions system).

**ethers.js**: JavaScript library for interacting with Ethereum-compatible blockchains (used in this project).

**EAS Build**: Expo Application Services cloud-based build service.

**Expo**: Framework and platform for React Native development.

### I

**Identity**: Decentralized identity system with Scroll ID, reputation, badges, and achievements.

### J

**JWT**: JSON Web Token, used for API authentication.

### M

**Mini-App**: Web-based dApp integrated into the SuperApp via WebView. Also called "MiniApp" or "dApp".

**Mainnet**: Production blockchain network (Scroll mainnet: chainId 534352).

### N

**Native**: Platform-specific code (iOS/Android) vs. cross-platform code.

### P

**Permissions System**: ERC-7715-inspired system for fine-grained dApp permissions (planned feature).

**PostgreSQL**: Relational database management system used for backend data storage.

**Private Key**: Cryptographic key used to sign transactions and messages. Never exposed or sent to servers.

### R

**RPC**: Remote Procedure Call, method for interacting with blockchain nodes.

**Redis**: In-memory data store used for caching.

**Reputation**: User reputation score earned through app usage and activity.

### S

**Scroll**: Ethereum Layer 2 scaling solution, the blockchain this app is built on.

**Scroll ID**: Unique decentralized identifier for users on Scroll network.

**ScrollScan**: Block explorer and API service for Scroll blockchain.

**ScrollOne SDK**: Custom WebView bridge SDK (`scrollone-sdk`).

**SecureStore**: Expo's secure storage API (uses device keychain/keystore).

**Self-Custodial**: Users control their own private keys (vs. custodial wallets where a third party controls keys).

**Super Admin**: Highest privilege role with access to admin dashboard.

**SuperApp**: Mobile application that combines multiple services and features in one interface.

### T

**Testnet**: Testing blockchain network (Scroll Sepolia testnet: chainId 534351).

**Transaction**: Blockchain transaction (send, receive, contract interaction, etc.).

### W

**WebView**: Component that displays web content within a native app.

**WebView Bridge**: Communication layer between WebView and native app. See [WebView Bridge](../integrations/webview-bridge.md).

**Wallet**: Self-custodial wallet for managing cryptocurrency and signing transactions.

### Z

**Zustand**: Lightweight state management library used in the mobile app.

---

**Related Documentation:**
- [FAQ](./faq.md)
- [System Overview](../architecture/system-overview.md)
