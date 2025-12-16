import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius } from './spacing';
import { shadows } from './shadows';

export { colors, typography, spacing, borderRadius, shadows };

export type { Colors } from './colors';
export type { Typography } from './typography';
export type { Spacing, BorderRadius } from './spacing';
export type { Shadows } from './shadows';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

export default theme;
