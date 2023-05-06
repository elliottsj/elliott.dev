import { Layout } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import Seo from '@/components/Seo';
import { getTheme, globalStyles as themeGlobalStyles } from '@/lib/theme';
import { css, Global, ThemeProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { MDXProvider, MDXProviderProps } from '@mdx-js/react';
import { DateTime } from 'luxon';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import 'normalize.css/normalize.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React, { useEffect, useState } from 'react';

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

const BlockQuote: React.FC = (props) => (
  <blockquote
    css={css`
      margin: 0;
      padding-left: 20px;
      box-shadow: inset 3px 0 0 0 rgba(41, 41, 41, 1);
      font-style: italic;
    `}
    {...props}
  />
);

const Pre: React.FC<{ children: React.ReactNode }> = (props) => (
  <div
    css={css`
      display: grid;
    `}
  >
    {props.children &&
    typeof props.children === 'object' &&
    'type' in props.children &&
    props.children.type === 'code' ? (
      <CodeBlock {...props.children.props} />
    ) : (
      props.children
    )}
  </div>
);

const Table: React.FC = (props) => (
  <div
    css={css`
      display: grid;
    `}
  >
    <table
      css={css`
        display: block;
        overflow: auto;
        border-collapse: collapse;
        width: 99%;
      `}
      {...props}
    />
  </div>
);

const Td: React.FC = (props) => (
  <td
    css={css`
      border: 1px solid #e2e8f0;
      padding: 0.5rem;
    `}
    {...props}
  />
);

/**
 * Links in an MDX document are wrapped in a Next.js <Link /> if it's a link
 * to a page on this site.
 */
const MDXLink: React.FC<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = (props) => {
  const { href, children, ref: _ref, ...rest } = props;
  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return <a href={href} {...rest} />;
};

const mdxComponents: MDXProviderProps['components'] = {
  blockquote: BlockQuote,
  pre: Pre,
  wrapper: Layout,
  a: MDXLink,
  table: Table,
  td: Td,
};

/**
 * Workaround for https://github.com/vercel/next.js/issues/28271
 */
const useSafariRenderHack = () => {
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      const isVisited = localStorage.getItem('safari_visited');
      if (!isVisited) {
        localStorage.setItem('safari_visited', 'true');
        window.location.replace(window.location.href);
      }
    }
  }, []);
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useSafariRenderHack();

  // Recompute the theme on the client
  const [theme, setTheme] = useState(getTheme());
  useEffect(() => {
    setTheme(getTheme(DateTime.local()));
  }, []);

  const ackeeServerUrl = process.env.NEXT_PUBLIC_ACKEE_SERVER;
  const ackeeDomainId = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID;

  return (
    <>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪐</text></svg>"
        />
        <link rel="webmention" href="https://webmention.io/elliott.dev/webmention" />
        <link rel="pingback" href="https://webmention.io/elliott.dev/xmlrpc" />
      </Head>
      <Seo />
      <Global
        styles={css`
          ${themeGlobalStyles}

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

export default MyApp;
