'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { hydrateTheme } from './slices/themeSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    storeRef.current?.dispatch(hydrateTheme(isDark ? 'dark' : 'light'));
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
