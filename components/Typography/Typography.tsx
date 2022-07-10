import { forwardRef, ElementType, HTMLProps, useMemo } from 'react';
import { StyledTypography } from './styles';
import { TypographyProps } from './types';
import { VARIANTS_MAP } from './constants';

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ children, variant, paragraph = false, component, ...props }, ref) => {
    const Component = useMemo(() => {
      if (component) return component;
      if (paragraph) return 'p';
      if (variant) return VARIANTS_MAP[variant];
      return 'span';
    }, [component, paragraph, variant]);

    return (
      <StyledTypography
        variant={variant || 'body1'}
        ref={ref}
        as={Component}
        {...props}
      >
        {children}
      </StyledTypography>
    );
  },
);

Typography.displayName = 'Typography';

export default Typography;
