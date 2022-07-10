import { Theme } from '@emotion/react';

const fontFamily = '"Open Sans",sans-serif';

const typography: Theme['typography'] = {
  base: { fontFamily, fontSize: '0.875rem' },
  h1: {
    fontFamily,
    fontSize: 'calc(1.375rem + 1.5vw)',
    fontWeight: 700,
    lineHeight: 1.167,
    letterSpacing: 0,
  },
  h2: {
    fontFamily,
    fontSize: 'calc(1.325rem + .9vw)',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  h3: {
    fontFamily,
    fontSize: 'calc(1.3rem + .6vw)',
    fontWeight: 700,
    lineHeight: 1.167,
    letterSpacing: 0,
  },
  h4: {
    fontFamily,
    fontSize: 'calc(1.275rem + .3vw)',
    fontWeight: 700,
    lineHeight: 1.235,
    letterSpacing: 0,
  },
  h5: {
    fontFamily,
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: 1.334,
    letterSpacing: 0,
  },
  h6: {
    fontFamily,
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.6,
    letterSpacing: 0,
  },
  subtitle1: {
    fontFamily,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: 0,
  },
  subtitle2: {
    fontFamily,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: 0,
  },
  body1: {
    fontFamily,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 0,
  },
  body2: {
    fontFamily,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: 0,
  },
  button: {
    fontFamily,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
  },
  caption: {
    fontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: 0,
  },
  overline: {
    fontFamily,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: 0,
  },
};

export default typography;
