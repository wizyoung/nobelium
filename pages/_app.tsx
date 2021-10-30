import BLOG from '@/blog.config';
import Scripts from '@/components/Scripts';
import { LocaleProvider } from '@/lib/locale';
import '@/styles/globals.css';
import '@/styles/notion.css';
import 'katex/dist/katex.min.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'react-notion-x/src/styles.css';
import 'react-static-tweets/styles.css';

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false });
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Scripts />
      <LocaleProvider>
        <>
          {BLOG.isProd && BLOG.analytics.provider === 'ackee' && (
            <Ackee
              ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
              ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
            />
          )}
          {BLOG.isProd && BLOG.analytics.provider === 'ga' && <Gtag />}
          <Component {...pageProps} />
        </>
      </LocaleProvider>
    </>
  );
};

export default MyApp;
