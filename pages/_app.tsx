import 'nprogress/nprogress.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import emotionNormalize from 'emotion-normalize';
import { ThemeProvider } from 'emotion-theming';
import { DateTime } from 'luxon';
import App, { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { useState } from 'react';
import useAckee from 'use-ackee';

import { css, Global } from '@emotion/core';
import { config } from '@fortawesome/fontawesome-svg-core';
import { MDXProvider, MDXProviderProps } from '@mdx-js/react';

import { Layout } from '../components';
import CodeBlock from '../components/CodeBlock';
import { useInterval } from '../hooks/useInterval';
import { getTheme, globalStyles as themeGlobalStyles } from '../lib/theme';

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

const Pre: React.FC = (props) => <div {...props} />;

const mdxComponents: MDXProviderProps['components'] = {
  code: CodeBlock,
  pre: Pre,
  wrapper: Layout,
};

/**
 * Custom hook to initialize Ackee tracking.
 */
const useNextAckee = () => {
  const ackeeServerUrl = process.env.NEXT_PUBLIC_ACKEE_URL;
  const ackeeDomainId = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID;
  if (!ackeeServerUrl) {
    throw new Error(`Must define env var NEXT_PUBLIC_ACKEE_URL.`);
  }
  if (!ackeeDomainId) {
    throw new Error(`Must define env var NEXT_PUBLIC_ACKEE_DOMAIN_ID.`);
  }

  const router = useRouter();
  useAckee(
    router.asPath,
    { server: ackeeServerUrl, domainId: ackeeDomainId },
    { detailed: false, ignoreLocalhost: true },
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useNextAckee();

  // Recompute the theme every second
  const [theme, setTheme] = useState(getTheme());
  useInterval(() => {
    setTheme(getTheme(DateTime.local()));
  }, 1000);

  return (
    <>
      <Global
        styles={css`
          ${themeGlobalStyles}
          ${emotionNormalize}

          html {
            line-height: 1.5;
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

          /* https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/ */
          html {
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <MDXProvider components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </>
  );
};

export default class extends App {
  render() {
    return <MyApp {...this.props} />;
  }
}
