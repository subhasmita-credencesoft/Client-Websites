import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import AIAssistant from '@/components/ui/AIAssistant';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import RevealObserver from '@/components/ui/RevealObserver';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
      <FloatingContact />
      <AIAssistant />
    </>
  );
}
