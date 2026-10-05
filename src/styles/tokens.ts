/**
 * Universal UI baseline tokens. The stylesheet mirrors these values.
 * Light values are the specification. Dark values keep the same roles
 * and stay above WCAG AA for small text.
 */

export const tokens = {
  light: {
    surfaceBase: '#F8F9FA',
    surfaceElevated: '#FFFFFF',
    textPrimary: '#1A1A1B',
    textMuted: '#636975',
    brandPrimary: '#3B52C4',
    border: '#D5D8DE',
  },
  dark: {
    surfaceBase: '#1A1A1B',
    surfaceElevated: '#24262B',
    textPrimary: '#F8F9FA',
    textMuted: '#B4B9C4',
    brandPrimary: '#C5CEF8',
    border: '#3A3D44',
  },
  font: {
    small: '12px',
    base: '14px',
    h3: '18px',
    h2: '24px',
    h1: '32px',
    lineBody: '1.5',
    lineHeading: '1.2',
  },
  space: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    6: '24px',
    8: '32px',
    12: '48px',
    16: '64px',
  },
  z: {
    back: -1,
    base: 1,
    overlay: 100,
    modal: 1000,
  },
} as const;
