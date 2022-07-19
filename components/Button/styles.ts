import styled from '@emotion/styled';
import { ButtonSize, ButtonVariant } from './types';
import { CommonColorVariants } from '@/theme/types';
import Spinner from '@/components/Spinner';

export const StyledButton = styled('button')<{
  variant: ButtonVariant;
  $color: CommonColorVariants;
  size: ButtonSize;
  $loading: boolean;
}>(({ theme, $color, variant, size, $loading }) => {
  if (variant === 'text') {
    return {
      ...theme.typography.button,
      color: theme.palette[$color].main,
    };
  }

  const commonStyles = {
    border: `1px solid ${theme.palette[$color].main}`,
    borderRadius: '4px',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  };

  const buttonVariants = {
    contained: {
      backgroundColor: theme.palette[$color].main,
      color: theme.palette[$color].contrastText,

      '&:hover:enabled': {
        backgroundColor: theme.palette[$color].dark,
        borderColor: theme.palette[$color].dark,
      },

      '&:disabled': !$loading && {
        borderColor: 'rgba(0, 0, 0, 0)',
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.26)',
      },
    },
    outlined: {
      color: theme.palette[$color].main,

      '&:hover:enabled': {
        backgroundColor: theme.palette[$color].light,
        borderColor: theme.palette[$color].light,
        color: theme.palette[$color].contrastText,
      },

      '&:disabled': !$loading && {
        borderColor: 'rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.26)',
      },
    },
  };

  const buttonSizes = {
    small: {
      padding: theme.spacing(1, 1.25),
      fontSize: '0.8125rem',
    },
    medium: {
      padding: theme.spacing(1.5, 2),
      fontSize: '0.875rem',
    },
    large: {
      padding: theme.spacing(2, 2.75),
      fontSize: '0.9375rem',
    },
  };

  return {
    ...theme.typography.button,
    ...commonStyles,
    ...buttonVariants[variant],
    ...buttonSizes[size],
  };
});

export const ButtonSpinner = styled(Spinner)({
  verticalAlign: 'text-bottom',
});
