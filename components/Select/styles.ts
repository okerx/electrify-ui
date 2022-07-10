import styled from '@emotion/styled';

export const StyledSelect = styled('div')<{ $error: boolean }>(
  ({ theme, $error }) => {
    const mainColor = $error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.23)';

    const focusColor = $error
      ? theme.palette.error.main
      : theme.palette.primary.main;

    return {
      display: 'inline-block',

      label: {
        position: 'absolute',
        fontSize: '1rem',
        left: '0',
        top: '1%',
        transform: 'translateY(-50%) scale(.7)',
        color: mainColor,
        padding: '0 0.3rem',
        margin: '0 0.5rem',
        transition: '.1s ease-out',
        transformOrigin: 'left',
        pointerEvents: 'none',
      },

      select: {
        fontSize: '1rem',
        outline: 'none',
        height: '46px',
        border: `1px solid ${mainColor}`,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        color: 'rgba(0, 0, 0, 0.7)',
        transition:
          'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,' +
          'transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,' +
          'max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms',

        '&:hover:enabled': !$error && {
          borderColor: 'rgba(0, 0, 0, 0.87)',
        },

        '&:focus': {
          borderColor: focusColor,
        },

        '&::placeholder': {
          color: 'transparent',
        },
      },

      'select:not(:placeholder-shown) + label': {
        top: '20%',
      },

      'select:focus + label': {
        color: focusColor,
      },
    };
  },
);

export const SelectWrapper = styled('div')({
  position: 'relative',
});

export const SelectHelperText = styled('span')<{ $error: boolean }>(
  ({ theme, $error }) => ({
    display: 'block',
    color: $error ? theme.palette.error.main : 'rgba(0, 0, 0, 0.6)',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
    textAlign: 'left',
    padding: '3px 14px 0px',
    minHeight: '1.435rem',
  }),
);
