import "../styles/globals.css";
import type { AppProps } from "next/app";
import BulbToggle from "../lib/components/bulb-toggle/BulbToggle";
import Footer from "../lib/components/Footer";
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
         <nav className="container mx-auto flex flex-row flex-end justify-end">
            <BulbToggle />
         </nav>
         <main className={styles.main}>
            <Component {...pageProps} />
         </main>
         <Footer />
      </>
   );
}
