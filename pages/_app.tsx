import { Global, css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import { ThemeProvider } from 'emotion-theming';
import App from 'next/app';
import React from 'react';

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Global
          styles={css`
            @import url('https://fonts.googleapis.com/css?family=Merriweather|Ubuntu&display=swap');

            ${emotionNormalize}

            body {
              font-family: 'Merriweather', serif;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: 'Ubuntu', sans-serif;
            }
          `}
        />
        <ThemeProvider theme={{}}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
