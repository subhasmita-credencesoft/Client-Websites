'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'hotel-cookie-choice';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function getSnapshot(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== 'set';
}

function getServerSnapshot(): boolean {
  return false;
}

export function CookiePanel() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'set');
    listeners.forEach((listener) => listener());
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 flex flex-wrap items-center gap-2.5 border border-forest/15 bg-cream px-3 py-2 text-forest shadow-[0_10px_30px_rgba(30,58,50,.14)] sm:right-auto sm:flex-nowrap">
      <Cookie className="h-3.5 w-3.5 shrink-0 text-terracotta" />
      <p className="min-w-0 flex-1 text-[11px] text-sage-muted sm:flex-none">
        We use small cookies to improve your stay.
      </p>
      <button
        type="button"
        data-testid="button-accept-cookies"
        onClick={dismiss}
        className="shrink-0 bg-forest px-2.5 py-1 text-[10px] font-mono-label text-cream"
      >
        That’s fine
      </button>
      <button
        type="button"
        aria-label="Dismiss cookie notice"
        data-testid="button-dismiss-cookies"
        onClick={dismiss}
        className="shrink-0 text-sage-muted transition-colors hover:text-forest"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}