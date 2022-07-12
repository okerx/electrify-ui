import { forwardRef } from 'react';
import { CardProps } from './types';
import * as S from './styles';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <S.StyledCard ref={ref} {...props}>
        {children}
      </S.StyledCard>
    );
  },
);

Card.displayName = 'Card';

export default Card;
