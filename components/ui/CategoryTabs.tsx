import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '@/theme';

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const allCategories = ['All', ...categories];
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>(
    Object.fromEntries(allCategories.map((cat) => [cat, new Animated.Value(1)]))
  ).current;

  useEffect(() => {
    const selected = selectedCategory || 'All';
    Object.keys(scaleAnims).forEach((cat) => {
      Animated.timing(scaleAnims[cat], {
        toValue: cat === selected ? 1.02 : 1,
        duration: 160,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedCategory, scaleAnims]);

  const handlePress = (category: string) => {
    onSelectCategory(category === 'All' ? null : category);
  };

  const isSelected = (category: string) => {
    return category === 'All' ? selectedCategory === null : selectedCategory === category;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allCategories.map((category) => {
          const selected = isSelected(category);
          return (
            <TouchableOpacity
              key={category}
              onPress={() => handlePress(category)}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.tab,
                  selected && styles.tabActive,
                  {
                    transform: [{ scale: scaleAnims[category] }],
                  },
                ]}
              >
                <Text style={[styles.tabText, selected && styles.tabTextActive]}>
                  {category}
                </Text>
                {selected && <View style={styles.underline} />}
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
  },
  tab: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: borderRadius.full,
    position: 'relative' as const,
    minHeight: 36,
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(110, 86, 207, 0.1)',
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  tabTextActive: {
    color: colors.accent.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  underline: {
    position: 'absolute' as const,
    bottom: 0,
    left: spacing.sm,
    right: spacing.sm,
    height: 2,
    backgroundColor: colors.accent.primary,
    borderRadius: 1,
  },
});
