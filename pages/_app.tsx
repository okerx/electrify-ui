import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import theme, { GlobalStyles } from '@/theme';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/700.css';

/**
 * By default, Fontawesome will automatically add the accompanying CSS
 * on the client-side which is necessary to render the icons correctly.
 * The config below will prevent this behaviour, and we let Next.js to
 * handle it by importing the Fontawesome styles.css file above.
 * */
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
