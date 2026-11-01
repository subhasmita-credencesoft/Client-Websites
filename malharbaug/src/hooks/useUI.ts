import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  openDrawer,
  closeDrawer,
  setDrawerOpen,
  setDrawerRendered,
  setScrolled,
} from '@/store/slices/uiSlice';

export function useUI() {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector((state) => state.ui.isDrawerOpen);
  const isDrawerRendered = useAppSelector((state) => state.ui.isDrawerRendered);
  const isScrolled = useAppSelector((state) => state.ui.isScrolled);

  return {
    isDrawerOpen,
    isDrawerRendered,
    isScrolled,
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    setDrawerOpen: (open: boolean) => dispatch(setDrawerOpen(open)),
    setDrawerRendered: (rendered: boolean) => dispatch(setDrawerRendered(rendered)),
    setScrolled: (scrolled: boolean) => dispatch(setScrolled(scrolled)),
  };
}
