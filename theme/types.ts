/**
 * The types in this file are helpers for the main Theme interface in `emotion.d.ts` file.
 * in addition to other common helper types, e.g. CommonColorVariants
 * */

export type CommonColorVariants =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export interface PaletteColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

export interface Palette {
  mode: 'dark' | 'light';
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  divider: string;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
}

export interface TypographyProps {
  fontFamily: string;
  fontSize: string;
  fontWeight: number | 'bolder' | 'bold' | 'normal' | 'light' | 'lighter';
  lineHeight: number | string;
  letterSpacing: number | string;
}

export interface Typography {
  base: {
    fontFamily: string;
    fontSize: string;
  };
  h1: TypographyProps;
  h2: TypographyProps;
  h3: TypographyProps;
  h4: TypographyProps;
  h5: TypographyProps;
  h6: TypographyProps;
  subtitle1: TypographyProps;
  subtitle2: TypographyProps;
  body1: TypographyProps;
  body2: TypographyProps;
  caption: TypographyProps;
  overline: TypographyProps;
  button: TypographyProps;
}

export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

type SpacingValue = number | 'auto';
export type Spacing = (
  val1?: SpacingValue,
  val2?: SpacingValue,
  val3?: SpacingValue,
  val4?: SpacingValue,
) => string;
