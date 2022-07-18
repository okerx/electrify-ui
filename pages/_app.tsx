import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
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
import ConfirmProvider, { ConfirmDialog } from '@/providers/ConfirmProvider';
import HeadTags from '@/components/HeadTags';
import Error from 'next/error';

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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ?? (page => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <ThemeProvider theme={theme}>
      <HeadTags />
      <GlobalStyles />
      <NextProgress
        delay={300}
        color={theme.palette.secondary.main}
        options={{ showSpinner: false }}
      />
      <Toaster position="top-right" />
      <QueryClientProvider client={queryClient}>
        <ConfirmProvider>
          {pageProps.error ? (
            <Error
              statusCode={pageProps.error.statusCode}
              title={pageProps.error.title}
            />
          ) : (
            getLayout(<Component {...pageProps} />)
          )}
          <ConfirmDialog />
        </ConfirmProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
