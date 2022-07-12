import { forwardRef } from 'react';
import { AppBarProps } from '@/components/AppBar/types';
import * as S from './styles';

const AppBar = forwardRef<HTMLDivElement, AppBarProps>(
  ({ color, children, ...props }, ref) => {
    return (
      <S.StyledAppBar ref={ref} $color={color} {...props}>
        {children}
      </S.StyledAppBar>
    );
  },
);

AppBar.displayName = 'AppBar';

export default AppBar;
