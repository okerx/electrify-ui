import styled from '@emotion/styled';
import { TypographyVariant } from './types';

export const StyledTypography = styled('span')<{ variant: TypographyVariant }>(
  ({ theme, variant }) => ({ ...theme.typography[variant] }),
);
