import type { AppProps } from 'next/app';
import ReduxProvider from '@/lib/redux-provider';
import Layout from '@/components/layout/Layout';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ReduxProvider>
  );
}
