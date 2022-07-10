import { forwardRef } from 'react';
import { SpinnerProps } from './types';
import { StyledSpinner } from './styles';

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 40, color, ...props }, ref) => {
    return (
      <StyledSpinner
        ref={ref}
        role="progressbar"
        size={size}
        color={color}
        {...props}
      >
        <svg viewBox="22 22 44 44">
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
          ></circle>
        </svg>
      </StyledSpinner>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
