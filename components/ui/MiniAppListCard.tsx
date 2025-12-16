import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Shield, Star } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, shadows } from '@/theme';
import { type MiniApp } from '@/store/miniAppStore';

interface MiniAppListCardProps {
  app: MiniApp;
  onPress: () => void;
}

export function MiniAppListCard({ app, onPress }: MiniAppListCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{app.icon}</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.name}>{app.name}</Text>
          {app.verified && (
            <Shield
              color={colors.accent.electricBlue}
              size={16}
              fill={colors.accent.electricBlue}
            />
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {app.description}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.category}>{app.category}</Text>
          {app.featured && (
            <View style={styles.featuredBadge}>
              <Star
                color={colors.accent.neonGreen}
                size={12}
                fill={colors.accent.neonGreen}
              />
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: spacing.base,
    backgroundColor: colors.background.elevated,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 32,
  },
  info: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginRight: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  category: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginRight: spacing.sm,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.xs,
  },
  featuredText: {
    fontSize: typography.fontSize.xs,
    color: colors.accent.neonGreen,
    marginLeft: 4,
    fontWeight: typography.fontWeight.medium,
  },
});
