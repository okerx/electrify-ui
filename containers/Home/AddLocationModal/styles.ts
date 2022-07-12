import styled from '@emotion/styled';
import Button from '@/components/Button';

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

export const StyledChargerMiniForm = styled('div')({
  border: '1px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '7px',
  padding: '2rem 0.5rem 0.5rem',
  position: 'relative',
  marginBottom: '1rem',
  marginTop: '0.2rem',
});

export const AddChargerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
  paddingBottom: '1rem',
}));

export const ChargerMiniFormCloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '5px 1rem 0',

  svg: {
    fontSize: '1rem',
    color: theme.palette.error.main,
  },
}));
