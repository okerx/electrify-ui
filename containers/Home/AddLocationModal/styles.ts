import styled from '@emotion/styled';
import Button from '@/components/Button';

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

export const FormActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  '& > button:last-of-type': {
    marginLeft: theme.spacing(2),
  },
}));

export const StyledChargerMiniForm = styled('div')(({ theme }) => ({
  border: '1px solid rgba(0, 0, 0, 0.3)',
  borderRadius: '7px',
  padding: theme.spacing(8, 2, 2),
  position: 'relative',
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(0.8),
}));

export const AddChargerButton = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 'bold',
  paddingBottom: theme.spacing(4),
}));

export const ChargerMiniFormCloseButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  margin: theme.spacing(1.25, 4, 4),

  svg: {
    fontSize: '1rem',
    color: theme.palette.error.main,
  },
}));
