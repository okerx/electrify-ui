import styled from '@emotion/styled';
import Container from '@/components/Container';

export const StyledDashboardLayout = styled('div')(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const AppBarContainer = styled(Container)(() => ({
  display: 'flex',
  height: '100%',
}));

export const LogoLink = styled('a')({
  display: 'flex',
  alignItems: 'center',

  '& > *:first-of-type': {
    marginRight: '0.3rem',
  },
});

export const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: '1.5rem',
  paddingBottom: '1rem',

  [`@media only screen and (min-width: ${theme.breakpoints.sm}px)`]: {
    paddingTop: '2rem',
    paddingBottom: '1.5rem',
  },
}));

export const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  textAlign: 'center',
  padding: '0.5rem 0',
  marginTop: 'auto',
}));
