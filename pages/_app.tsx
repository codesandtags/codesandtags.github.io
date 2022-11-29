import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeContext, themes } from '../lib/themes/ThemeContext'

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeContext.Provider value={themes.dark}>
    <Component {...pageProps} />
  </ThemeContext.Provider>
}
