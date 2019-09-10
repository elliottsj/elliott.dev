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
            ${emotionNormalize}
          `}
        />
        <ThemeProvider theme={{}}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
