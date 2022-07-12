import styled from '@emotion/styled';
import { TypographyVariant } from './types';
import { CSSProperties } from 'react';

export const StyledTypography = styled('span')<{
  $variant: TypographyVariant;
  $fontWeight?: CSSProperties['fontWeight'];
  $color?: CSSProperties['color'];
}>(({ theme, $variant, $fontWeight, $color }) => {
  const styles: any = {
    ...theme.typography[$variant],
  };

  if ($fontWeight) {
    styles.fontWeight = $fontWeight;
  }

  if ($color) {
    styles.color = $color;
  }

  return styles;
});
