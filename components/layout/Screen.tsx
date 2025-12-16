import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  type ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
  testID?: string;
}

export function Screen({
  children,
  scrollable = false,
  padding = true,
  backgroundColor = colors.background.primary,
  style,
  testID,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  
  const containerStyles = [
    styles.container,
    { backgroundColor },
    padding && styles.padding,
    style,
  ];

  if (scrollable) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <ScrollView
          style={containerStyles}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, spacing.md) },
          ]}
          showsVerticalScrollIndicator={false}
          testID={testID}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <View style={containerStyles} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  padding: {
    padding: spacing.base,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
