import { Theme } from '@emotion/react';
import palette from './palette';
import typography from './typography';

const theme: Theme = {
  palette,
  typography,
  direction: 'ltr',
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

export default theme;
