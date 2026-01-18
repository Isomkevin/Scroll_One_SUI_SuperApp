# Contribution Guide

## Purpose

This guide explains how to contribute to Scroll One SuperApp, including development workflow, code standards, and pull request process.

**Audience**: Contributors, open-source maintainers, new engineers

## Getting Started

### Prerequisites

- Node.js 18+ and Bun
- Git
- Code editor (VS Code recommended)
- Basic understanding of React Native, TypeScript, and Web3

### Development Setup

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/Scroll_One_SuperApp.git
   cd Scroll_One_SuperApp
   ```
3. **Install dependencies**:
   ```bash
   bun install
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Changes

- Follow the existing code style (see [Code Style](./code-style.md))
- Write clear, self-documenting code
- Add comments for complex logic
- Update documentation for new features

### 2. Test Your Changes

- Test on iOS and Android (when possible)
- Test on web (for web-compatible features)
- Verify no regressions
- Test error cases

### 3. Commit Your Changes

Follow conventional commit messages:

```
feat: Add network switching UI
fix: Resolve token balance display issue
docs: Update API documentation
refactor: Simplify bridge handler logic
test: Add tests for transaction service
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear description of changes
- Reference to related issues
- Screenshots (for UI changes)
- Testing notes

## Code Style

See [Code Style Guide](./code-style.md) for detailed coding standards.

### Key Principles

1. **TypeScript**: Use strict types, avoid `any`
2. **Naming**: Clear, descriptive names
3. **Functions**: Small, focused functions
4. **Comments**: Explain why, not what
5. **Formatting**: Consistent with existing code

## Pull Request Process

### Before Submitting

- [ ] Code follows style guide
- [ ] All tests passing (if applicable)
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] No sensitive data in code
- [ ] Changes tested on target platforms

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guide
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated Checks**: CI/CD runs linting and tests
2. **Code Review**: At least one maintainer reviews
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves PR
5. **Merge**: PR merged to main branch

## Adding New Features

### Feature Checklist

- [ ] Feature aligns with product vision
- [ ] Architecture discussed (for large features)
- [ ] Implementation plan documented
- [ ] Tests written (if applicable)
- [ ] Documentation updated
- [ ] Backward compatibility maintained

### Adding a New Screen

1. Create file in `app/(tabs)/<tab>/<screen>.tsx`
2. Use `Screen` component wrapper
3. Use theme from `@/theme`
4. Use Zustand stores for state
5. Use services for business logic

### Adding a New Service

1. Create file in `services/scroll/<service>.ts`
2. Import `scrollProvider` for RPC access
3. Use ethers.js for blockchain interactions
3. Export functions, not classes
4. Add error handling and logging

### Adding a New Bridge Method

1. Add method to `BridgeMethod` enum in `scrollone-sdk/core/constants.ts`
2. Create handler in `services/bridge/handlers.ts`
3. Register handler in `services/bridge/bridgeService.ts`
4. Add to web SDK in `scrollone-sdk/web/webBridge.ts`
5. Update types if needed
6. Test with real dApp

### Adding a New Mini-App

1. Add entry to `miniapps/registry.ts`
2. App will appear in Explore tab automatically
3. Test WebView loading and bridge communication

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment (OS, device, app version)
- Screenshots (if applicable)
- Logs (if applicable)

### Feature Requests

Include:
- Description of the feature
- Use case and motivation
- Proposed implementation (if you have ideas)
- Alternatives considered

## Security Issues

**Do not** open public issues for security vulnerabilities.

Instead:
1. Email security team directly
2. Provide detailed description
3. Include steps to reproduce
4. Wait for response before disclosure

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the project

## Getting Help

- **Documentation**: Check [Documentation Index](../README.md)
- **Issues**: Search existing issues
- **Discussions**: Use GitHub Discussions
- **Questions**: Ask in issues or discussions

---

**Related Documentation:**
- [Code Style](./code-style.md)
- [System Overview](../architecture/system-overview.md)
- [Implementation Status](../reference/implementation-status.md)
