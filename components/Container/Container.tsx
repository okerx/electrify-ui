import { forwardRef } from 'react';
import { ContainerProps } from './types';
import * as S from './styles';

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <S.StyledContainer ref={ref} {...props}>
        {children}
      </S.StyledContainer>
    );
  },
);

Container.displayName = 'Container';

export default Container;
