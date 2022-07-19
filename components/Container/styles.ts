import styled from '@emotion/styled';

export const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1380px',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),

  [`@media only screen and (min-width: ${theme.breakpoints.sm}px)`]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
}));
