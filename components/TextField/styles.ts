import styled from '@emotion/styled';
import { CommonColorVariants } from '@/theme/types';

export const StyledTextField = styled('div')<{
  $error: boolean;
  $fullWidth: boolean;
  $color: CommonColorVariants;
}>(({ theme, $error, $fullWidth, $color }) => {
  const mainColor = $error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.23)';
  const width = $fullWidth ? '100%' : undefined;

  const focusColor = $error
    ? theme.palette.error.main
    : theme.palette[$color].main;

  return {
    width,
    display: 'inline-block',

    label: {
      width,
      position: 'absolute',
      fontSize: '1rem',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      color: mainColor,
      padding: theme.spacing(0, 1.2),
      margin: theme.spacing(0, 2),
      transition: '.1s ease-out',
      transformOrigin: 'left',
      pointerEvents: 'none',
    },

    input: {
      width,
      fontSize: '1rem',
      outline: 'none',
      border: `1px solid ${mainColor}`,
      borderRadius: '5px',
      padding: theme.spacing(4, 2.8, 0.8),
      color: 'rgba(0, 0, 0, 0.7)',
      transition:
        'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,' +
        'transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,' +
        'max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',

      '&:hover:enabled:not(:focus)': !$error && {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },

      '&:focus': {
        borderColor: focusColor,
      },

      '&::placeholder': {
        color: 'transparent',
      },
    },

    'input:not(:placeholder-shown) + label': {
      top: '25%',
      transform: 'translateY(-50%) scale(.7)',
    },

    'input:focus + label': {
      color: focusColor,
      top: '25%',
      transform: 'translateY(-50%) scale(.7)',
    },
  };
});

export const TextFieldWrapper = styled('div')({
  position: 'relative',
});

export const TextFieldHelperText = styled('span')<{ $error: boolean }>(
  ({ theme, $error }) => ({
    display: 'block',
    color: $error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.6)',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    padding: theme.spacing(0.75, 3.5, 0),
    minHeight: '1.435rem',
  }),
);
