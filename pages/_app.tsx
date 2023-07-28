import "../styles/globals.css";
import "../src/components/infinite/Infinite.css";

import type { AppProps } from "next/app";
import BulbToggle from "../src/components/bulb-toggle/BulbToggle";
import Footer from "../src/components/Footer";
import styles from "../styles/Home.module.css";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
