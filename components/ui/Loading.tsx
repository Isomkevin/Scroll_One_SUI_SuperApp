import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export function Loading({
  message,
  size = 'large',
  color = colors.accent.neonGreen,
  fullScreen = false,
}: LoadingProps) {
  const containerStyles = [
    styles.container,
    fullScreen && styles.fullScreen,
  ];

  return (
    <View style={containerStyles}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  message: {
    marginTop: spacing.base,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center' as const,
  },
});
