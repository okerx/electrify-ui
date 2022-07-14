import { forwardRef } from 'react';
import { BadgeProps } from './types';
import { StyledBadge, BadgeWrapper } from './styles';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, color = 'primary', size = 'medium', ...props }, ref) => {
    return (
      <BadgeWrapper $color={color} $size={size}>
        <StyledBadge ref={ref} {...props}>
          {children}
        </StyledBadge>
      </BadgeWrapper>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
