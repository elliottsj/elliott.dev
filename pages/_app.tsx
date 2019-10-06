import emotionNormalize from 'emotion-normalize';
import { ThemeProvider } from 'emotion-theming';
import App, { AppProps } from 'next/app';
import React, { useState } from 'react';

import { css, Global } from '@emotion/core';

import { getTheme, globalStyles } from '../common/theme';
import { useInterval } from '../hooks/useInterval';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Recompute the theme every second
  const [theme, setTheme] = useState(getTheme(new Date()));
  useInterval(() => {
    setTheme(getTheme(new Date()));
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
