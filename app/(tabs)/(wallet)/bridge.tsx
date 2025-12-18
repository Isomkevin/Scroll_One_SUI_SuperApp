import React from 'react';
import { Stack } from 'expo-router';

import { WebViewContainer } from '@/miniapps/WebViewContainer';
import { type MiniApp } from '@/store/miniAppStore';
import { useWalletStore } from '@/store/walletStore';
import { colors } from '@/theme';

export default function BridgeScreen() {
  const { address } = useWalletStore();

  const app: MiniApp = {
    id: 'scroll-bridge',
    name: 'Scroll Bridge',
    url: 'https://scroll.io/bridge',
    icon: '🌉',
    description: 'Bridge assets to and from Scroll.',
    category: 'Bridge',
    featured: false,
    verified: true,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Scroll Bridge',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.primary,
        }}
      />
      <WebViewContainer app={app} />
    </>
  );
}


