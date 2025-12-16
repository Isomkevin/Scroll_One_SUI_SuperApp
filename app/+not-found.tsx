import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';
import { Screen } from '@/components/layout/Screen';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Screen>
        <View style={styles.container}>
          <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </Link>
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  link: {
    marginTop: spacing.base,
    paddingVertical: spacing.md,
  },
  linkText: {
    fontSize: typography.fontSize.base,
    color: colors.accent.neonGreen,
    fontWeight: typography.fontWeight.semibold,
  },
});
