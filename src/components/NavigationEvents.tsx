'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect } from 'react';

export default function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
}
