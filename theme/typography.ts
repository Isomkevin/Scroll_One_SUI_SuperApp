export const typography = {
  fontFamily: {
    // Use Inter across the app; platform font mapping handled by Expo config/assets
    regular: 'Inter',
    medium: 'Inter',
    semibold: 'Inter',
    // Prefer medium/semibold over heavy bold; keep for legacy usage
    bold: 'Inter',
    mono: 'Courier',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 26,
    '4xl': 30,
    '5xl': 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '600' as const,
  },
  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.7,
  },
  letterSpacing: {
    tight: -0.2,
    normal: 0,
    wide: 0.2,
    wider: 0.4,
  },
} as const;

export type Typography = typeof typography;
