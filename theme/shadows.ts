import { Platform } from 'react-native';

const createShadow = (
  elevation: number,
  shadowColor: string = '#000000',
  opacity: number = 0.3
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
  sm: createShadow(2, '#000000', 0.2),
  md: createShadow(4, '#000000', 0.25),
  lg: createShadow(8, '#000000', 0.3),
  xl: createShadow(12, '#000000', 0.35),
  '2xl': createShadow(16, '#000000', 0.4),
  glow: {
    ...createShadow(8, '#00FF88', 0.5),
  },
  glowBlue: {
    ...createShadow(8, '#0066FF', 0.5),
  },
} as const;

export type Shadows = typeof shadows;
