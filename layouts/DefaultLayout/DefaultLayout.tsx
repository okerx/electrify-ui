import { forwardRef } from 'react';
import { DefaultLayoutProps } from '@/layouts/DefaultLayout/types';
import * as S from './styles';

const DefaultLayout = forwardRef<HTMLDivElement, DefaultLayoutProps>(
  ({ children, ...props }, ref) => {
    return (
      <S.StyledDefaultLayout ref={ref} {...props}>
        {children}
      </S.StyledDefaultLayout>
    );
  },
);

DefaultLayout.displayName = 'DefaultLayout';

export default DefaultLayout;
