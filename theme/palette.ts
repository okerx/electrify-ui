import { Theme } from '@emotion/react';

const palette: Theme['palette'] = {
  mode: 'light',
  background: {
    default: '#fafafa',
    paper: '#ffffff',
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },
  divider: 'rgb(224, 224, 224)',
  primary: {
    main: '#ffda39',
    light: '#ffde4d',
    dark: '#e6bb00',
    contrastText: '#000000',
  },
  secondary: {
    main: '#395eff',
    light: '#617eff',
    dark: '#2e4bcc',
    contrastText: '#ffffff',
  },
  info: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
    contrastText: '#ffffff',
  },
  success: {
    main: '#3ed625',
    light: '#65de51',
    dark: '#32ab1e',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  warning: {
    main: '#ff9800',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#ffffff',
  },
};

export default palette;
