import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Shield, Star } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { type MiniApp } from '@/store/miniAppStore';

interface MiniAppGridCardProps {
  app: MiniApp;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - spacing.base * 3) / 2;

export function MiniAppGridCard({ app, onPress }: MiniAppGridCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{app.icon}</Text>
        {app.verified && (
          <View style={styles.verifiedBadge}>
            <Shield
              color={colors.accent.electricBlue}
              size={12}
              fill={colors.accent.electricBlue}
            />
          </View>
        )}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {app.name}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {app.category}
      </Text>
      {app.featured && (
        <View style={styles.featuredBadge}>
          <Star
            color={colors.accent.neonGreen}
            size={10}
            fill={colors.accent.neonGreen}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    padding: spacing.md,
    backgroundColor: colors.background.elevated,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    position: 'relative' as const,
  },
  icon: {
    fontSize: 28,
  },
  verifiedBadge: {
    position: 'absolute' as const,
    top: -4,
    right: -4,
    backgroundColor: colors.background.elevated,
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    textAlign: 'center',
  },
  featuredBadge: {
    position: 'absolute' as const,
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0, 255, 136, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
});
