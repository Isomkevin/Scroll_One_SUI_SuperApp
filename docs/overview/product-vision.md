# Product Vision

## Purpose

This document defines the vision, mission, and core value proposition of Scroll One SuperApp.

**Audience**: Product managers, engineers, stakeholders, new team members

## What We're Building

**Scroll One SuperApp** is a mobile-first crypto SuperApp built exclusively on the Scroll blockchain (Ethereum L2). It serves as a unified gateway to the Scroll ecosystem, combining:

- **Self-Custodial Wallet**: Real blockchain integration using ethers.js v6 with secure private key management
- **Mini-App Ecosystem**: WebView-based dApp marketplace with 20+ integrated Scroll-native applications
- **Decentralized Identity**: User profiles with reputation, badges, and achievements
- **WebView Bridge SDK**: Custom SDK (`scrollone-sdk`) enabling secure communication between native wallet and WebView-hosted dApps

## Core Problems We Solve

### 1. Fragmented DeFi Experience

**Problem**: Users currently juggle multiple wallets and dApps, creating a fragmented and confusing experience.

**Solution**: A unified SuperApp interface that provides wallet, identity, and dApp discovery in one place.

### 2. Scroll Ecosystem Discovery

**Problem**: Scroll-native dApps are difficult to discover and access.

**Solution**: Curated mini-app marketplace featuring verified Scroll ecosystem applications (SyncSwap, Skydrome, LayerBank, Aave v3, etc.).

### 3. Secure dApp Integration

**Problem**: Traditional wallet connections expose private keys or require complex integrations.

**Solution**: Custom WebView bridge that allows dApps to request wallet operations securely without exposing private keys.

### 4. Mobile-First Web3

**Problem**: Most Web3 experiences are desktop-focused, ignoring mobile users.

**Solution**: Native mobile experience with biometric security, optimized for iOS and Android.

## Why Scroll Blockchain

The codebase is **exclusively** built for Scroll:

- **RPC Endpoints**: Hardcoded to Scroll mainnet (`https://rpc.scroll.io`, chainId: 534352) and testnet (`https://sepolia-rpc.scroll.io`, chainId: 534351)
- **Explorer Integration**: Uses ScrollScan API (`https://api.scrollscan.com/api`)
- **Mini-App Registry**: All 20+ apps are Scroll-native dApps from the official Scroll ecosystem
- **Token Support**: Scroll-native token addresses (ERC-20 tokens on Scroll)

**Evidence in code:**
- `services/scroll/provider.ts` - ScrollProvider class with Scroll-specific RPC URLs
- `miniapps/registry.ts` - All apps point to Scroll dApps

## Key Highlights

- 🔐 **Self-Custodial Wallet**: Real blockchain integration with secure private key management
- 🌉 **WebView Bridge SDK**: Framework-agnostic SDK for secure dApp integration
- 🆔 **Decentralized Identity**: User profiles with reputation, badges, and achievements
- 🎯 **Mini-App Ecosystem**: Discover and use real Scroll-native dApps
- 🌐 **Cross-Platform**: Native iOS, Android, and Web support
- ⚡ **Modern Stack**: React Native, Expo, TypeScript, Zustand, and React Query
- ⛓️ **Scroll-Native**: Built exclusively for Scroll blockchain

## Target Users

See [Target Users](./target-users.md) for detailed user personas and use cases.

## Success Metrics

- User adoption and retention
- Number of active mini-apps
- Transaction volume
- User engagement with identity features
- Developer adoption of SDK

## Roadmap

See [Implementation Status](../reference/implementation-status.md) for current feature completion and planned enhancements.

---

**Related Documentation:**
- [Problem Statement](./problem-statement.md)
- [System Overview](../architecture/system-overview.md)
- [Web3 Architecture](../architecture/web3-architecture.md)
