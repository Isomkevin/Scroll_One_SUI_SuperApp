import { Platform } from 'react-native';

const createShadow = (
  elevation: number,
  shadowColor: string = '#0F172A',
  opacity: number = 0.05
) => {
  if (Platform.OS === 'android') {
    return {
      elevation,
    };
  }
  
  const height = elevation / 2;
  const radius = elevation;
  
  return {
    shadowColor,
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
};

export const shadows = {
  none: {},
  sm: createShadow(2),
  md: createShadow(4),
  lg: createShadow(8),
  xl: createShadow(12),
  '2xl': createShadow(16),
} as const;

export type Shadows = typeof shadows;
