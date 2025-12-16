import { Tabs } from 'expo-router';
import { Wallet, Search, User } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  const tabBarHeight = Platform.OS === 'ios' ? 60 : 56;
  const totalHeight = tabBarHeight + Math.max(insets.bottom, 8);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent.neonGreen,
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarStyle: {
          backgroundColor: colors.background.elevated,
          borderTopColor: colors.border.subtle,
          borderTopWidth: 1,
          height: totalHeight,
          paddingBottom: Math.max(insets.bottom, 8),
          paddingTop: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(wallet)"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Wallet color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(explore)"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="(identity)"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
