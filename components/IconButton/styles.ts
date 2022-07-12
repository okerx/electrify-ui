import styled from '@emotion/styled';
import { CommonColorVariants } from '@/theme/types';
import { rgb } from '@/utils';
import { ButtonSize } from '@/components/Button/types';

export const StyledIconButton = styled('button')<{
  $color: CommonColorVariants;
  $loading: boolean;
  $size: ButtonSize;
}>(({ theme, $color, $loading, $size }) => {
  const buttonSizes = {
    small: {
      width: '28px',
      height: '28px',
      fontSize: '0.8125rem',
    },
    medium: {
      width: '35px',
      height: '35px',
      fontSize: '0.875rem',
    },
    large: {
      width: '45px',
      height: '45px',
      fontSize: '1.2rem',
    },
  };

  return {
    ...buttonSizes[$size],
    border: `1px solid transparent`,
    borderRadius: '50%',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, ' +
      'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: rgb(theme.palette[$color].main, 0.1),
    color: theme.palette[$color].main,

    '&:hover:enabled': {
      backgroundColor: rgb(theme.palette[$color].main, 0.3),
    },

    '&:disabled': !$loading && {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      color: 'rgba(0, 0, 0, 0.26)',
    },
  };
});
