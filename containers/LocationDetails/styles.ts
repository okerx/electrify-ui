import styled from '@emotion/styled';
import Card from '@/components/Card';

export const StyledDetailsCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(4, 0),
}));

export const CardAction = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  '& > *:not(:last-of-type)': {
    marginRight: theme.spacing(2),
  },
}));

export const CardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: theme.spacing(4),

  '& > *:not(:last-of-type)': {
    marginRight: theme.spacing(2),
  },
}));

export const CardStack = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',

  '& > *': {
    paddingBottom: theme.spacing(2),
    width: '100%',
    'input, select': {
      width: '100%',
    },
  },

  [`@media only screen and (min-width: ${theme.breakpoints.sm}px)`]: {
    '& > *': {
      width: `calc(50% - ${theme.spacing(2)})`,

      '&:first-of-type:not(:only-child)': {
        marginRight: theme.spacing(2),
      },
      '&:last-of-type:not(:only-child)': {
        marginLeft: theme.spacing(2),
      },
    },
  },
}));

export const ChargersHeader = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
}));

export const AddChargerButtonWrapper = styled('div')(({ theme }) => ({
  [`@media only screen and (max-width: ${theme.breakpoints.sm}px)`]: {
    width: '100%',
    marginTop: theme.spacing(4),

    button: {
      width: '100%',
    },
  },
}));

export const TableActions = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '& > *:first-of-type:not(:only-child)': {
    marginRight: theme.spacing(2),
  },
}));

export const NoDataWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(8, 0),
  textAlign: 'center',
}));
