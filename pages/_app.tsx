import 'nprogress/nprogress.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import emotionNormalize from 'emotion-normalize';
import { ThemeProvider } from 'emotion-theming';
import { DateTime } from 'luxon';
import App, { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useState } from 'react';

import { css, Global } from '@emotion/core';
import { config } from '@fortawesome/fontawesome-svg-core';
import { MDXProvider, MDXProviderProps } from '@mdx-js/react';

import { Layout } from '../components';
import CodeBlock from '../components/CodeBlock';
import { useInterval } from '../hooks/useInterval';
import { getTheme, globalStyles as themeGlobalStyles } from '../lib/theme';

const Ackee = dynamic(() => import('../components/Ackee'), { ssr: false });

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

/**
 * Links in an MDX document are wrapped in a Next.js <Link /> if it's a link
 * to a page on this site.
 */
const MDXLink: React.FC<React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>> = (props) => {
  const { href, ...rest } = props;
  if (href?.startsWith('/')) {
    return (
      <Link href={href}>
        <a {...rest} />
      </Link>
    );
  }
  return <a href={href} {...rest} />;
};

const mdxComponents: MDXProviderProps['components'] = {
  code: CodeBlock,
  pre: Pre,
  wrapper: Layout,
  a: MDXLink,
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // Recompute the theme every second
  const [theme, setTheme] = useState(getTheme());
  useInterval(() => {
    setTheme(getTheme(DateTime.local()));
  }, 1000);

  const ackeeServerUrl = process.env.NEXT_PUBLIC_ACKEE_SERVER;
  const ackeeDomainId = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID;

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪐</text></svg>"
        />
      </Head>
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
      {ackeeServerUrl && ackeeDomainId && (
        <Ackee ackeeServerUrl={ackeeServerUrl} ackeeDomainId={ackeeDomainId} />
      )}
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
