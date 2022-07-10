import { forwardRef, useMemo } from 'react';
import { useTheme } from '@emotion/react';
import { StyledButton, ButtonSpinner } from './styles';
import { ButtonProps } from './types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = 'medium',
      color = 'primary',
      variant = 'contained',
      loading = false,
      disabled,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const spinnerColor = useMemo(() => {
      if (variant === 'contained') {
        return theme.palette[color].contrastText;
      }
      return theme.palette[color].main;
    }, [color, theme, variant]);

    const spinnerSize = useMemo(() => {
      switch (size) {
        case 'small':
          return 16;
        case 'medium':
          return 18;
        case 'large':
          return 20;
      }
    }, [size]);

    return (
      <StyledButton
        ref={ref}
        $color={color}
        size={size}
        variant={variant}
        $loading={loading}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <ButtonSpinner size={spinnerSize} color={spinnerColor} /> Loading
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
