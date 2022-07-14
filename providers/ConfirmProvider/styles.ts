import styled from '@emotion/styled';

export const DialogActions = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '0.5rem',

  '& > *:first-of-type': {
    marginRight: '0.5rem',
  },
}));
