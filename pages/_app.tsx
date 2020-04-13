import 'nprogress/nprogress.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import emotionNormalize from 'emotion-normalize';
import { ThemeProvider } from 'emotion-theming';
import { DateTime } from 'luxon';
import App, { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useState } from 'react';

import { css, Global } from '@emotion/core';
import { config } from '@fortawesome/fontawesome-svg-core';

import { getTheme, globalStyles } from '../lib/theme';
import { useInterval } from '../hooks/useInterval';

// Configure font-awesome to prevent automatically inserting CSS.
// We are importing font-awesome's CSS above.
// See also:
//  - https://fontawesome.com/how-to-use/with-the-api/setup/configuration
//  - https://github.com/FortAwesome/react-fontawesome/tree/bf26f892c2e19bd3043ebd3a7c3ce10eec5f72fd#nextjs
config.autoAddCss = false;

// Show a loading bar during page transitions
Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Recompute the theme every second
  const [theme, setTheme] = useState(getTheme(DateTime.local()));
  useInterval(() => {
    setTheme(getTheme(DateTime.local()));
  }, 1000);

  return (
    <>
      <Global
        styles={css`
          ${globalStyles}
          ${emotionNormalize}

          html {
            line-height: normal;
          }
          body {
            font-family: ${theme.fonts.body};
          }
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-family: ${theme.fonts.heading};
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default class extends App {
  render() {
    return <MyApp {...this.props} />;
  }
}
