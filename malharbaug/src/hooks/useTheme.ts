import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTheme, toggleTheme, ThemeMode } from '@/store/slices/themeSlice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  return {
    mode,
    isDark: mode === 'dark',
    toggle: () => dispatch(toggleTheme()),
    setTheme: (newMode: ThemeMode) => dispatch(setTheme(newMode)),
  };
}
