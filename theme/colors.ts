export const colors = {
  background: {
    primary: '#0A0A0A',
    secondary: '#151515',
    tertiary: '#1C1C1C',
    elevated: '#222222',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1A1',
    tertiary: '#6B6B6B',
    disabled: '#4A4A4A',
  },
  accent: {
    neonGreen: '#00FF88',
    electricBlue: '#0066FF',
    purple: '#9945FF',
    cyan: '#00F0FF',
  },
  border: {
    subtle: '#2A2A2A',
    medium: '#3A3A3A',
    strong: '#4A4A4A',
    chrome: '#606060',
  },
  status: {
    success: '#00FF88',
    warning: '#FFB800',
    error: '#FF3366',
    info: '#0066FF',
  },
  glass: {
    background: 'rgba(30, 30, 30, 0.8)',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  overlay: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.6)',
    heavy: 'rgba(0, 0, 0, 0.9)',
  },
} as const;

export type Colors = typeof colors;
