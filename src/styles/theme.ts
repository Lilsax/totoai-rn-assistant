// ========================================
// Theme Constants - Saudi Banking Theme
// ========================================

export const COLORS = {
  // Primary Saudi Colors
  primary: '#1a472a', // Saudi Green
  secondary: '#b45309', // Saudi Gold/Brown

  // Supporting Colors
  success: '#059669', // Green
  error: '#dc2626', // Red
  warning: '#ea580c', // Orange
  info: '#1e3a8a', // Blue
  purple: '#7c3aed', // Purple

  // Neutral Colors
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Background Colors
  background: {
    primary: '#f8f9fa',
    secondary: '#ffffff',
    card: '#ffffff',
    skeleton: '#e2e8f0',
  },

  // Text Colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
    white: '#ffffff',
  },

  // Border Colors
  border: {
    light: '#e5e7eb',
    primary: 'rgba(26, 71, 42, 0.1)',
    secondary: 'rgba(180, 83, 9, 0.2)',
  },
};

export const SPACING = {
  xs: 2,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  xxl: 22,
  xxxl: 30,
  huge: 38,
};

export const BORDER_RADIUS = {
  sm: 2,
  md: 6,
  lg: 10,
  xl: 14,
  xxl: 18,
  round: 48,
};

export const FONT_SIZE = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 18,
  xxxl: 22,
  huge: 26,
  massive: 30,
  giant: 38,
};


export const FONT_WEIGHT = {
  light: '300' as const,
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  card: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  creditCard: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 15,
  },
};

export const LAYOUT = {
  screen: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    paddingTop: 50,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  card: {
    padding: SPACING.xl,
    margin: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
};
