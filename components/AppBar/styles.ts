import styled from '@emotion/styled';
import { CommonColorVariants } from '@/theme/types';

export const StyledAppBar = styled('header')<{ $color?: CommonColorVariants }>(
  ({ theme, $color = 'primary' }) => ({
    backgroundColor: theme.palette[$color].main,
    color: theme.palette[$color].contrastText,
    height: '70px',
  }),
);
