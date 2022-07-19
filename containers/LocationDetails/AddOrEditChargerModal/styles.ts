import styled from '@emotion/styled';

export const FormStack = styled('div')(({ theme }) => ({
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

      '&:first-of-type': {
        marginRight: theme.spacing(2),
      },
      '&:last-of-type': {
        marginLeft: theme.spacing(2),
      },
    },
  },
}));

export const FormActions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  '& > button:last-of-type': {
    marginLeft: '0.5rem',
  },
}));
