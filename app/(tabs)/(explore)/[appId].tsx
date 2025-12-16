import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, typography } from '@/theme';
import { WebViewContainer } from '@/miniapps/WebViewContainer';
import { getMiniAppById } from '@/miniapps/registry';
import { useMiniAppStore } from '@/store/miniAppStore';

export default function MiniAppScreen() {
  const { appId } = useLocalSearchParams<{ appId: string }>();
  const router = useRouter();
  const { setCurrentApp, addToRecent } = useMiniAppStore();

  const app = getMiniAppById(appId);

  useEffect(() => {
    if (app) {
      setCurrentApp(app);
      addToRecent(app);
      console.log('[MiniAppScreen] Loading app:', app.name);
    }
  }, [app, setCurrentApp, addToRecent]);

  if (!app) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>App not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: app.name,
          headerStyle: { backgroundColor: colors.background.primary },
          headerTintColor: colors.text.primary,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft color={colors.text.primary} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <WebViewContainer app={app} />
    </>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  },
});
