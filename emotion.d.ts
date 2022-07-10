import '@emotion/react';
import { Palette, Typography } from '@/theme/types';

declare module '@emotion/react' {
  export interface Theme {
    direction: 'ltr' | 'rtl';
    typography: Typography;
    palette: Palette;
    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}
