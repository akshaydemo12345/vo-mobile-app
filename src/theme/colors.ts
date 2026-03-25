export const palette = {
  // Brand
  primary: '#6C63FF',
  primaryLight: '#8B84FF',
  primaryDark: '#4E46E5',
  primaryMuted: 'rgba(108, 99, 255, 0.15)',

  // Accent
  accent: '#FF6B6B',
  accentLight: '#FF8E8E',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',

  // Dark palette
  dark: {
    bg: '#0F0F14',
    surface: '#1A1A24',
    surfaceElevated: '#232330',
    border: '#2E2E3E',
    borderSubtle: '#1E1E2C',
    text: '#F0F0F5',
    textSecondary: '#9090A8',
    textMuted: '#5A5A70',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shimmer1: '#1E1E2C',
    shimmer2: '#2A2A3C',
  },

  // Light palette
  light: {
    bg: '#F5F5FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    border: '#E5E5EF',
    borderSubtle: '#F0F0F8',
    text: '#0F0F14',
    textSecondary: '#6B6B80',
    textMuted: '#9999AF',
    overlay: 'rgba(0, 0, 0, 0.4)',
    shimmer1: '#EEEEF5',
    shimmer2: '#F8F8FF',
  },
} as const;

export type ColorPalette = typeof palette;
