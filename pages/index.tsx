import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import sayHello from '../lib/utils/console';

sayHello();

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>codesandtags | curiosidad intensa por la programación</title>
        <meta name="description" content="Tutoriales de programación, experimentos de código y curiosidades del mundo del software" />
        <link rel="icon" href="/favicon.ico" />
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
