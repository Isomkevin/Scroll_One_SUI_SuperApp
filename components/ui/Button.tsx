import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, borderRadius, shadows, typography } from '@/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  testID?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  testID,
  style,
  textStyle,
}: ButtonProps) {
  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text` as keyof typeof styles],
    styles[`${variant}Text` as keyof typeof styles],
    textStyle,
  ];

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={buttonStyles}
      testID={testID}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.text.primary : colors.background.primary}
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={textStyles}>{children}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  primary: {
    backgroundColor: colors.accent.neonGreen,
    ...shadows.md,
  },
  secondary: {
    backgroundColor: colors.background.elevated,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border.chrome,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: colors.status.error,
    ...shadows.md,
  },
  sm: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center' as const,
  },
  smText: {
    fontSize: typography.fontSize.sm,
  },
  mdText: {
    fontSize: typography.fontSize.base,
  },
  lgText: {
    fontSize: typography.fontSize.lg,
  },
  primaryText: {
    color: colors.background.primary,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.text.primary,
  },
  ghostText: {
    color: colors.text.primary,
  },
  dangerText: {
    color: colors.text.primary,
  },
});
