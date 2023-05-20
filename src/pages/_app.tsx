import { Layout } from '@/components';
import CodeBlock from '@/components/CodeBlock';
import Seo from '@/components/Seo';
import { merriweather, ubuntu } from '@/lib/fonts';
import { getBackgroundColor } from '@/lib/theme';
import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { MDXProvider, MDXProviderProps } from '@mdx-js/react';
import { DateTime } from 'luxon';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
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
  <blockquote className="m-0 pl-[20px] shadow-inner italic" {...props} />
);

const Pre: React.FC<{ children: React.ReactNode }> = (props) => (
  <div className="grid">
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
  <div className="grid">
    <table className="block overflow-auto border-collapse w-[99%]" {...props} />
  </div>
);

const Td: React.FC = (props) => (
  <td className="border border-solid border-[#e2e8f0] p-0.5" {...props} />
);

/**
 * Links in an MDX document are wrapped in a Next.js <Link /> if it's a link
 * to a page on this site.
 */
const MDXLink: React.FC<
  React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = (props) => {
  const { href, ref: _ref, ...rest } = props;
  if (href?.startsWith('/')) {
    return <Link href={href} {...rest} />;
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

  // Recompute the background color on the client
  const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor());
  useEffect(() => {
    setBackgroundColor(getBackgroundColor(DateTime.local()));
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
      <style jsx global>{`
        :root {
          --color-background: ${backgroundColor};
        }

        body {
          font-family: ${merriweather.style.fontFamily};
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${ubuntu.style.fontFamily};
        }
      `}</style>
      {ackeeServerUrl && ackeeDomainId && (
        <Ackee ackeeServerUrl={ackeeServerUrl} ackeeDomainId={ackeeDomainId} />
      )}
      <MDXProvider components={mdxComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
};

export default MyApp;
