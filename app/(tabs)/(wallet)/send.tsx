import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { colors, spacing, typography, borderRadius } from '@/theme';
import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SendScreen() {
  const router = useRouter();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAsset] = useState('ETH');

  const handleSend = () => {
    console.log('[SendScreen] Sending:', { recipient, amount, asset: selectedAsset });
    router.back();
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: 'Send',
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.primary,
          headerLeft: () => null,
        }}
      />
      <Screen scrollable>
        <Card style={styles.card}>
          <Text style={styles.label}>Recipient Address</Text>
          <TextInput
            style={styles.input}
            placeholder="0x..."
            placeholderTextColor={colors.text.tertiary}
            value={recipient}
            onChangeText={setRecipient}
            autoCapitalize="none"
          />
        </Card>

        <Card style={styles.card}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.0"
              placeholderTextColor={colors.text.tertiary}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
            <Text style={styles.assetLabel}>{selectedAsset}</Text>
          </View>
          <Text style={styles.usdValue}>≈ $0.00</Text>
        </Card>

        <Card variant="glass" style={styles.feeCard}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Network Fee</Text>
            <Text style={styles.feeValue}>~0.002 ETH</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Total</Text>
            <Text style={styles.totalValue}>{amount || '0'} {selectedAsset}</Text>
          </View>
        </Card>

        <Button
          onPress={handleSend}
          disabled={!recipient || !amount}
          fullWidth
          style={styles.sendButton}
        >
          Send {selectedAsset}
        </Button>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.base,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontWeight: typography.fontWeight.medium,
  },
  input: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.mono,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  amountInput: {
    flex: 1,
    fontSize: typography.fontSize['2xl'],
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
  },
  assetLabel: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  usdValue: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  feeCard: {
    marginBottom: spacing.xl,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  feeLabel: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
  feeValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.mono,
  },
  totalValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold,
  },
  sendButton: {
    marginTop: spacing.base,
  },
});
