import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NextProgress from 'next-progress';
import { config } from '@fortawesome/fontawesome-svg-core';
import theme, { GlobalStyles } from '@/theme';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';
import DefaultLayout from '@/layouts/DefaultLayout';

/**
 * By default, Fontawesome will automatically add the accompanying CSS
 * on the client-side which is necessary to render the icons correctly.
 * The config below will prevent this behaviour, and we let Next.js to
 * handle it by importing the Fontawesome styles.css file above.
 * */
config.autoAddCss = false;

export type NextPageWithLayout<T = any> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? (page => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ThemeProvider theme={theme}>
      <title>Electrify - Fast EV Chargers</title>
      <meta name="description" content="Find charging locations" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <GlobalStyles />
      <NextProgress
        delay={300}
        color={theme.palette.secondary.main}
        options={{ showSpinner: false }}
      />
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
