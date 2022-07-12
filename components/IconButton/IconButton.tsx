import { forwardRef } from 'react';
import { IconButtonProps } from './types';
import { StyledIconButton } from './styles';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { children, color = 'primary', size = 'medium', loading = false, ...props },
    ref,
  ) => {
    return (
      <StyledIconButton
        ref={ref}
        $color={color}
        $loading={loading}
        $size={size}
        {...props}
      >
        {children}
      </StyledIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
