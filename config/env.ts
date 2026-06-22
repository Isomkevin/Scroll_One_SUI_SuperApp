/**
 * Centralized environment configuration for the mobile app.
 * Expo exposes only variables prefixed with EXPO_PUBLIC_ at build time.
 */
export const env = {
  sui: {
    mainnetRpcUrl:
      process.env.EXPO_PUBLIC_SUI_MAINNET_RPC_URL || 'https://fullnode.mainnet.sui.io:443',
    testnetRpcUrl:
      process.env.EXPO_PUBLIC_SUI_TESTNET_RPC_URL || 'https://fullnode.testnet.sui.io:443',
    devnetRpcUrl:
      process.env.EXPO_PUBLIC_SUI_DEVNET_RPC_URL || 'https://fullnode.devnet.sui.io:443',
  },
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  },
} as const;
