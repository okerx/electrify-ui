import styled from '@emotion/styled';

export const HomeHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}));

export const AddLocationButtonWrapper = styled('div')(({ theme }) => ({
  [`@media only screen and (max-width: ${theme.breakpoints.sm}px)`]: {
    width: '100%',
    marginTop: theme.spacing(4),

    button: {
      width: '100%',
    },
  },
}));

export const TableWrapper = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));
