import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script';
import styles from '../styles/Home.module.css'
import sayHello from '../lib/utils/console';

import Footer from '../lib/components/Footer';
import MetaTags from '../lib/components/MetaTags';
import BulbToggle from '../lib/components/BulbToggle';

sayHello();

export default function Home() {
  return (
    <div className={styles.container}>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script strategy="lazyOnload">
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>

      <Head>
        <title>Codes and Tags | Curiosidad intensa por la programación</title>
        <link rel="icon" href="/favicon.ico" />
        <MetaTags />
      </Head>

      <nav className='flex flex-row flex-end'>
        <BulbToggle/>
      </nav>

      <main className={styles.main}>
        <header className='flex flex-col items-center'>
          <Image src="/images/logo.png" alt="codesandtags" className={styles.logo} width={200} height={200} />
        </header>
      </main>

      <Footer />
    </div>
  )
}
