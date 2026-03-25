import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { palette } from './colors';
import { fontSize, fontWeight } from './typography';
import { spacing, radius, shadow } from './spacing';

type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  bg: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  borderSubtle: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  overlay: string;
  shimmer1: string;
  shimmer2: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryMuted: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  white: string;
  black: string;
}

interface Theme {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
  spacing: typeof spacing;
  radius: typeof radius;
  shadow: typeof shadow;
  toggleTheme: () => void;
}

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const toggleTheme = useCallback(() => {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = useMemo<Theme>(() => {
    const isDark = mode === 'dark';
    const modeColors = isDark ? palette.dark : palette.light;
    return {
      mode,
      isDark,
      colors: {
        ...modeColors,
        primary: palette.primary,
        primaryLight: palette.primaryLight,
        primaryDark: palette.primaryDark,
        primaryMuted: palette.primaryMuted,
        accent: palette.accent,
        success: palette.success,
        warning: palette.warning,
        error: palette.error,
        info: palette.info,
        white: palette.white,
        black: palette.black,
      },
      fontSize,
      fontWeight,
      spacing,
      radius,
      shadow,
      toggleTheme,
    };
  }, [mode, toggleTheme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
