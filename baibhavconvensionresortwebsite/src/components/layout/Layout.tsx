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
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <RevealObserver />
      <Navbar />
      <main id="main-content">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      <Footer />
      <FloatingContact />
      <AIAssistant />
    </>
  );
}
