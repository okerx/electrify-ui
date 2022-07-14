import styled from '@emotion/styled';
import Card from '@/components/Card';

export const StyledDetailsCard = styled(Card)(() => ({
  margin: '1rem 0',
}));

export const CardAction = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  '& > *:not(:last-of-type)': {
    marginRight: '0.5rem',
  },
}));

export const CardHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '1rem',

  '& > *:not(:last-of-type)': {
    marginRight: '0.5rem',
  },
}));

export const CardStack = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',

  '& > *': {
    paddingBottom: '0.5rem',
    width: '100%',
    'input, select': {
      width: '100%',
    },
  },

  [`@media only screen and (min-width: ${theme.breakpoints.sm}px)`]: {
    '& > *': {
      width: 'calc(50% - 0.5rem)',

      '&:first-of-type:not(:only-child)': {
        marginRight: '0.5rem',
      },
      '&:last-of-type:not(:only-child)': {
        marginLeft: '0.5rem',
      },
    },
  },
}));

export const ChargersHeader = styled('div')(() => ({
  paddingTop: '1.5rem',
  paddingBottom: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const AddChargerButtonWrapper = styled('div')(({ theme }) => ({
  [`@media only screen and (max-width: ${theme.breakpoints.sm}px)`]: {
    width: '100%',
    marginTop: '1rem',

    button: {
      width: '100%',
    },
  },
}));

export const TableActions = styled('div')({
  display: 'flex',
  alignItems: 'center',

  '& > *:first-of-type:not(:only-child)': {
    marginRight: '0.5rem',
  },
});

export const NoDataWrapper = styled('div')({
  width: '100%',
  padding: '2rem 0',
  textAlign: 'center',
});
