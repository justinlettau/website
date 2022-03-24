import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const { events } = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const gId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

      if (gId) {
        (window as any).gtag('config', gId, { page_path: url });
      }
    };

    events.on('routeChangeComplete', handleRouteChange);
    return () => events.off('routeChangeComplete', handleRouteChange);
  }, [events]);

  return <Component {...pageProps} />;
}

export default App;
