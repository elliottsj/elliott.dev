import classNames from 'classnames';
import type { Metadata } from 'next';
import 'nprogress/nprogress.css';
import { Suspense } from 'react';
import Ackee from '@/components/Ackee';
import NavigationEvents from '@/components/NavigationEvents';
import ThemeColorProvider from '@/components/ThemeColorProvider';
import { firaCode, merriweather, ubuntu } from '@/lib/fonts';
import { getBackgroundColor } from '@/lib/theme';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'elliott.dev', template: '%s | elliott.dev' },
  description: 'The personal website of Spencer Elliott',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪐</text></svg>',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ackeeServerUrl = process.env.NEXT_PUBLIC_ACKEE_SERVER;
  const ackeeDomainId = process.env.NEXT_PUBLIC_ACKEE_DOMAIN_ID;

  return (
    <html
      lang="en"
      style={{ '--color-background': getBackgroundColor().css() } as React.CSSProperties}
    >
      <body className={classNames(merriweather.variable, ubuntu.variable, firaCode.variable)}>
        {children}
        <ThemeColorProvider />
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        {ackeeServerUrl && ackeeDomainId && (
          <Suspense fallback={null}>
            <Ackee ackeeServerUrl={ackeeServerUrl} ackeeDomainId={ackeeDomainId} />
          </Suspense>
        )}
      </body>
    </html>
  );
}
