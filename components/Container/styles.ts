import styled from '@emotion/styled';
import theme from '@/theme';

export const StyledContainer = styled('div')(() => ({
  width: '100%',
  maxWidth: '1380px',
  paddingLeft: '1rem',
  paddingRight: '1rem',

  [`@media only screen and (min-width: ${theme.breakpoints.sm}px)`]: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
}));
