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
    marginTop: '1rem',

    button: {
      width: '100%',
    },
  },
}));

export const TableWrapper = styled('div')(() => ({
  paddingTop: '1rem',
}));
