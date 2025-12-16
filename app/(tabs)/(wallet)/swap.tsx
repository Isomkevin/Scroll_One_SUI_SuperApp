import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowDownUp } from 'lucide-react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SwapScreen() {
  const router = useRouter();
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromAsset] = useState('ETH');
  const [toAsset] = useState('USDC');

  const handleSwap = () => {
    console.log('[SwapScreen] Swapping:', { fromAmount, fromAsset, toAsset });
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Swap',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.primary,
          headerLeft: () => null,
        }}
      />
      <Screen scrollable>
        <Card style={styles.swapCard}>
          <Text style={styles.label}>From</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              placeholderTextColor={colors.text.tertiary}
              value={fromAmount}
              onChangeText={setFromAmount}
              keyboardType="decimal-pad"
            />
            <Text style={styles.asset}>{fromAsset}</Text>
          </View>
          <Text style={styles.balance}>Balance: 2.5431 {fromAsset}</Text>
        </Card>

        <View style={styles.swapIconContainer}>
          <TouchableOpacity style={styles.swapIcon}>
            <ArrowDownUp color={colors.accent.neonGreen} size={20} />
          </TouchableOpacity>
        </View>

        <Card style={styles.swapCard}>
          <Text style={styles.label}>To</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              placeholderTextColor={colors.text.tertiary}
              value={toAmount}
              onChangeText={setToAmount}
              keyboardType="decimal-pad"
              editable={false}
            />
            <Text style={styles.asset}>{toAsset}</Text>
          </View>
          <Text style={styles.balance}>≈ $0.00</Text>
        </Card>

        <Card variant="glass" style={styles.rateCard}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Exchange Rate</Text>
            <Text style={styles.rateValue}>1 {fromAsset} = 2,500 {toAsset}</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Network Fee</Text>
            <Text style={styles.rateValue}>~0.0015 ETH</Text>
          </View>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Slippage</Text>
            <Text style={styles.rateValue}>0.5%</Text>
          </View>
        </Card>

        <Button
          onPress={handleSwap}
          disabled={!fromAmount}
          fullWidth
          style={styles.swapButton}
        >
          Swap Tokens
        </Button>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  swapCard: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize['2xl'],
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
  },
  asset: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  balance: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  swapIconContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  swapIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.background.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rateCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rateLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  rateValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.mono,
  },
  swapButton: {
    marginTop: spacing.base,
  },
});
