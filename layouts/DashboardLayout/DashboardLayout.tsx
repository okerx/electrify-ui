import { forwardRef } from 'react';
import Link from 'next/link';
import AppBar from '@/components/AppBar';
import Logo from '@/components/Logo';
import Typography from '@/components/Typography';
import { DashboardLayoutProps } from './types';
import * as S from './styles';

const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({ children, ...props }, ref) => {
    return (
      <S.StyledDashboardLayout ref={ref} {...props}>
        <AppBar>
          <S.AppBarContainer>
            <Link href="/" passHref>
              <S.LogoLink>
                <Logo size={40} />
                <Typography variant="h5" as="h1">
                  Electrify
                </Typography>
              </S.LogoLink>
            </Link>
          </S.AppBarContainer>
        </AppBar>
        <S.MainContainer as="main">{children}</S.MainContainer>
        <S.StyledFooter>
          <Typography variant="body2">
            All rights reserved. <strong>Electrify©</strong>
          </Typography>
        </S.StyledFooter>
      </S.StyledDashboardLayout>
    );
  },
);

DashboardLayout.displayName = 'DashboardLayout';

export default DashboardLayout;
