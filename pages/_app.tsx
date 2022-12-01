import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContext, themes } from '../lib/themes/ThemeContext'
import BulbToggle from '../lib/components/bulb-toggle/BulbToggle';
import Footer from '../lib/components/Footer';
import styles from "../styles/Home.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeContext.Provider value={themes.dark}>
      <nav className='flex flex-row flex-end justify-end'>
        <BulbToggle />
      </nav>
      <main className={styles.main}>
        <Component {...pageProps} />
      </main>
    <Footer />
  </ThemeContext.Provider>
}
