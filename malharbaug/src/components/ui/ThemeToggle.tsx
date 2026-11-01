'use client';

import { useTheme } from '@/hooks';

export default function ThemeToggle() {
  const { mode, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-earth-200 text-earth-600 transition-colors duration-200 ease-out hover:bg-earth-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-earth-700 dark:text-earth-300 dark:hover:bg-earth-800"
    >
      <iconify-icon
        icon={mode === 'dark' ? 'solar:sun-2-bold' : 'solar:moon-bold'}
        width="20"
        height="20"
      ></iconify-icon>
    </button>
  );
}
