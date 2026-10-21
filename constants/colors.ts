import { Platform } from 'react-native';

// Original app colors (unchanged) -- used by the existing screens.
export const COLORS = {
  primary: '#2E7D5B',
  background: '#F7F6F2',
  card: '#FFFFFF',
  textPrimary: '#14181F',
  textSecondary: '#5D6B7A',
  textOnPrimary: '#FFFFFF',
  surface: '#EFF3F0',
  border: '#DADFE3',
  shadow: '#14181F',
  warning: '#C97A2B',
  success: '#2E7D5B',
  danger: '#B3261E',
} as const;

// "Modern Campus Tech" palette: deep navy, electric blue + cyan accents,
// glass-style surfaces. Use this on screens that get the new look.
// Aurora design system — shared across every app screen.
export const CAMPUS = {
  bg: '#0B1020',
  bgDeep: '#10162B',
  surface: 'rgba(173,165,255,0.085)',
  surfaceStrong: 'rgba(173,165,255,0.15)',
  inputBg: 'rgba(241,243,255,0.065)',
  border: 'rgba(188,185,255,0.19)',
  primary: '#795AF5',
  primaryDeep: '#5935D7',
  accent: '#66E4DA',
  mint: '#57E3A2',
  text: '#F7F7FF',
  textMuted: '#B7B9D2',
  textFaint: '#858BAE',
  danger: '#FF809B',
  dangerBg: 'rgba(255,128,155,0.12)',
  dangerBorder: 'rgba(255,128,155,0.38)',
  mono: Platform.select({
    ios: 'Menlo', android: 'monospace',
    default: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  }) as string,
} as const;