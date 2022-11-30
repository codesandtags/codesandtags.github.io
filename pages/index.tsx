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
    <div className="container mx-auto">
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

      <nav className='flex flex-row flex-end justify-end'>
        <BulbToggle />
      </nav>

      <main className={styles.main}>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center	content-center mx-auto py-8">
          <Image src="/images/logo-transparent.png" alt="codesandtags" className={styles.logo} width={200} height={200} />

          <h1 className="text-normal px-4">Curiosidad Intensa por la programación</h1>

          <ul className='flex flex-row gap-3 mt-4'>
            <a href="https://youtube.com/@codesandtags" target="_blank">
              <div className="icon icon-youtube"></div>
            </a>
            <a href="https://twitter.com/codesandtags" target="_blank">
              <div className="icon icon-twitter"></div>
            </a>
            <a href="https://www.instagram.com/ed_traveler" target="_blank">
              <div className="icon icon-instagram"></div>
            </a>
            <a href="https://ca.linkedin.com/company/codesandtags" target="_blank">
              <div className="icon icon-linkedin"></div>
            </a>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
