import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  testID?: string;
}

export function Header({
  title,
  subtitle,
  onBack,
  rightComponent,
  testID,
}: HeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ArrowLeft color={colors.text.primary} size={24} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {rightComponent && (
          <View style={styles.rightContainer}>{rightComponent}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  rightContainer: {
    marginLeft: spacing.md,
  },
});
