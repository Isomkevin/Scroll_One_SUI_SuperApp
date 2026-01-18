# Target Users

## Purpose

This document defines the primary user personas and use cases for Scroll One SuperApp.

**Audience**: Product managers, designers, engineers

## Primary User Personas

### 1. DeFi Power User

**Profile:**
- Active DeFi trader
- Uses multiple protocols regularly
- Values efficiency and speed
- Technical knowledge: High

**Needs:**
- Quick access to multiple dApps
- Fast transaction execution
- Portfolio tracking
- Gas optimization

**How We Serve Them:**
- Unified wallet for all operations
- Curated DeFi mini-apps (DEXes, lending, etc.)
- Transaction history and analytics
- Gas estimation and optimization

### 2. Casual Crypto User

**Profile:**
- New to Web3 or occasional user
- Values simplicity and safety
- Technical knowledge: Low to Medium

**Needs:**
- Easy-to-use interface
- Clear transaction explanations
- Security assurance
- Guided experience

**How We Serve Them:**
- Simple, intuitive UI
- Transaction approval modals with clear information
- Verified and featured apps
- Help and documentation

### 3. Mobile-First User

**Profile:**
- Primarily uses mobile devices
- Values convenience
- Technical knowledge: Varies

**Needs:**
- Native mobile experience
- Fast performance
- Offline capabilities (where possible)
- Mobile-optimized features

**How We Serve Them:**
- Native iOS and Android apps
- Optimized mobile UI
- Biometric authentication
- Push notifications

### 4. Scroll Ecosystem Explorer

**Profile:**
- Interested in Scroll blockchain
- Wants to discover new dApps
- Values curation and verification
- Technical knowledge: Medium

**Needs:**
- Easy dApp discovery
- Trust signals (verification, ratings)
- Category organization
- Featured recommendations

**How We Serve Them:**
- Curated mini-app marketplace
- Category filtering
- Featured and verified badges
- Search functionality

### 5. Developer/Builder

**Profile:**
- Building dApps on Scroll
- Needs SDK integration
- Values documentation and examples
- Technical knowledge: High

**Needs:**
- Clear SDK documentation
- Integration examples
- Testing tools
- Support and community

**How We Serve Them:**
- Comprehensive SDK documentation
- Code examples and guides
- Developer tools
- Active support

## Use Cases

### Use Case 1: Daily DeFi Operations

**User**: DeFi Power User

**Scenario**: User wants to swap tokens, provide liquidity, and check positions across multiple protocols.

**Flow**:
1. Open Scroll One SuperApp
2. Navigate to Explore tab
3. Select DEX mini-app (e.g., SyncSwap)
4. Connect wallet (automatic via bridge)
5. Execute swap
6. Navigate to lending protocol (e.g., LayerBank)
7. Check positions
8. All within one app, one wallet

**Value**: Unified experience, no wallet switching, faster operations

### Use Case 2: First-Time User Onboarding

**User**: Casual Crypto User

**Scenario**: New user wants to get started with Scroll ecosystem.

**Flow**:
1. Download app
2. Create wallet (guided process)
3. Receive test tokens (if available)
4. Explore featured apps
5. Try a simple transaction
6. Learn about identity and badges

**Value**: Smooth onboarding, clear guidance, low barrier to entry

### Use Case 3: Mobile Trading

**User**: Mobile-First User

**Scenario**: User wants to execute a trade while away from desktop.

**Flow**:
1. Open app on mobile
2. Authenticate with Face ID/Touch ID
3. Navigate to wallet
4. Check balance
5. Open DEX mini-app
6. Execute trade
7. Receive push notification when confirmed

**Value**: Full functionality on mobile, native security, convenience

### Use Case 4: Discovering New dApps

**User**: Scroll Ecosystem Explorer

**Scenario**: User wants to find new interesting dApps on Scroll.

**Flow**:
1. Open Explore tab
2. Browse categories
3. Filter by verified apps
4. Read descriptions and ratings
5. Try featured apps
6. Add favorites

**Value**: Easy discovery, trust signals, curated experience

### Use Case 5: Building a dApp

**User**: Developer/Builder

**Scenario**: Developer wants to integrate their dApp with Scroll One SuperApp.

**Flow**:
1. Read SDK documentation
2. Review integration examples
3. Implement `window.scrollOne` API
4. Test in development
5. Submit for verification
6. Deploy and monitor

**Value**: Clear documentation, easy integration, support

## User Journey Maps

### New User Journey

1. **Discovery**: Learn about Scroll One SuperApp
2. **Download**: Install from App Store/Play Store
3. **Onboarding**: Create wallet, learn basics
4. **First Use**: Explore apps, make first transaction
5. **Engagement**: Regular use, build reputation
6. **Advocacy**: Recommend to others, earn badges

### Power User Journey

1. **Adoption**: Switch from other wallets
2. **Integration**: Connect existing workflows
3. **Optimization**: Use advanced features
4. **Automation**: Leverage permissions (planned)
5. **Community**: Engage with identity features

## Success Metrics by User Type

### DeFi Power User
- Number of transactions per session
- Time to complete multi-protocol operations
- Retention rate

### Casual Crypto User
- Onboarding completion rate
- First transaction success rate
- Feature discovery rate

### Mobile-First User
- Mobile app usage vs. web
- Mobile transaction volume
- Push notification engagement

### Scroll Ecosystem Explorer
- Apps discovered per session
- Verified app usage rate
- Category exploration depth

### Developer/Builder
- SDK adoption rate
- Integration time
- Developer satisfaction

---

**Related Documentation:**
- [Product Vision](./product-vision.md)
- [Problem Statement](./problem-statement.md)
- [System Overview](../architecture/system-overview.md)
