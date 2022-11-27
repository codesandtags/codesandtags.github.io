import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script';
import styles from '../styles/Home.module.css'
import sayHello from '../lib/utils/console';

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

        <meta name="description" content="Tutoriales de programación, experimentos de código y curiosidades del mundo del software. Curiosidad intensa por la programación." />
        <meta name="theme-color" content="#449ed0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@codesandtags" />
        <meta name="twitter:creator" content="@codesandtags" />
        <meta name="twitter:title" content="Codes and Tags" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Codes and Tags" />
        <meta property="og:site_name" content="Codes and Tags" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="es" />
      </Head>

      <main className={styles.main}>
        <header className='flex flex-col items-center'>
          <Image src="/images/logo.png" alt="codesandtags" className={styles.logo} width={300} height={300} />
        </header>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.codesandtags.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          <Image src="/images/codesandtags-letters.png" alt="codesandtags" width={150} height={80} />
        </a>
      </footer>
    </div>
  )
}
