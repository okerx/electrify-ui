import '@emotion/react';
import { Breakpoints, Palette, Spacing, Typography } from '@/theme/types';

declare module '@emotion/react' {
  export interface Theme {
    direction: 'ltr' | 'rtl';
    typography: Typography;
    palette: Palette;
    breakpoints: Breakpoints;
    spacing: Spacing;
  }
}
