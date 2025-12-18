import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { WebViewContainer } from '@/miniapps/WebViewContainer';
import { type MiniApp } from '@/store/miniAppStore';
import { useWalletStore } from '@/store/walletStore';
import { colors, spacing, typography } from '@/theme';

const PROVIDER_CONFIG = {
  ramp: {
    name: 'Ramp Network',
    buildUrl: (address: string) =>
      `https://ramp.network/buy/?defaultAsset=ETH_SCROLL&swapAsset=ETH_SCROLL&userAddress=${encodeURIComponent(
        address,
      )}`,
  },
  moonpay: {
    name: 'MoonPay',
    buildUrl: (address: string) =>
      `https://buy.moonpay.com/?walletAddress=${encodeURIComponent(
        address,
      )}&currencyCode=eth&blockchain=scroll`,
  },
  transak: {
    name: 'Transak',
    buildUrl: (address: string) =>
      `https://global.transak.com/?walletAddress=${encodeURIComponent(
        address,
      )}&cryptoCurrencyCode=ETH&network=scroll`,
  },
} as const;

type ProviderKey = keyof typeof PROVIDER_CONFIG;

export default function OnrampProviderScreen() {
  const { provider } = useLocalSearchParams<{ provider?: string }>();
  const { address } = useWalletStore();

  const config = useMemo(() => {
    if (!provider) return undefined;
    const key = provider as ProviderKey;
    return PROVIDER_CONFIG[key];
  }, [provider]);

  if (!config || !address) {
    return (
      <>
        <Stack.Screen
          options={{
            title: 'On-ramp',
            headerStyle: { backgroundColor: colors.background.primary },
            headerTintColor: colors.text.primary,
          }}
        />
        <View style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Unable to open provider</Text>
          <Text style={styles.fallbackText}>
            Make sure your wallet is initialized and try again from the Deposit screen.
          </Text>
        </View>
      </>
    );
  }

  const app: MiniApp = {
    id: `onramp-${provider}`,
    name: config.name,
    url: config.buildUrl(address),
    icon: '💳',
    description: `${config.name} on-ramp`,
    category: 'Onramp',
    featured: false,
    verified: true,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: config.name,
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.primary,
        }}
      />
      <WebViewContainer app={app} />
    </>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  fallbackTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  fallbackText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});


