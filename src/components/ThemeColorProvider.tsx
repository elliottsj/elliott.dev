'use client';

import { DateTime } from 'luxon';
import { useEffect } from 'react';
import { getBackgroundColor } from '@/lib/theme';

export default function ThemeColorProvider() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--color-background',
      getBackgroundColor(DateTime.local()).css(),
    );
  }, []);

  return null;
}
