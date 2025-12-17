export const colors = {
  /**
   * Scroll.io inspired core palette
   */
  background: {
    // App background
    primary: '#FAFAFA',
    // Primary surface used for cards/containers
    secondary: '#FFFFFF',
    tertiary: '#FFFFFF',
    elevated: '#FFFFFF',
  },
  surface: '#FFFFFF',
  border: {
    subtle: '#E5E7EB',
    medium: '#E5E7EB',
    strong: '#CBD5F5',
    chrome: '#E5E7EB',
  },
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#94A3B8',
    muted: '#94A3B8',
    disabled: '#CBD5E1',
  },
  accent: {
    // Primary Scroll accent
    primary: '#6E56CF',
    secondary: '#4C3DF2',
    // Backwards‑compatible aliases (avoid using directly in new code)
    neonGreen: '#6E56CF',
    electricBlue: '#4C3DF2',
    purple: '#6E56CF',
    cyan: '#4C3DF2',
  },
  status: {
    success: '#16A34A',
    warning: '#F59E0B',
    error: '#DC2626',
    info: '#4C3DF2',
  },
  overlay: {
    soft: 'rgba(15,23,42,0.04)',
    light: 'rgba(15,23,42,0.08)',
    medium: 'rgba(15,23,42,0.12)',
  },
  /**
   * Kept for legacy "glass" variants, but tuned down
   */
  glass: {
    background: 'rgba(255,255,255,0.9)',
    border: 'rgba(148,163,184,0.35)',
  },
} as const;

export type Colors = typeof colors;
