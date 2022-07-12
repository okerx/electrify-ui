import styled from '@emotion/styled';

export const FormStack = styled('div')(({ theme }) => ({
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

      '&:first-of-type': {
        marginRight: '0.5rem',
      },
      '&:last-of-type': {
        marginLeft: '0.5rem',
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
