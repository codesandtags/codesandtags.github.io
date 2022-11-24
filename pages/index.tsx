import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
          <Image src="/images/logo.png" alt="codesandtags" width={300} height={300} />
          <Image src="https://media.tenor.com/oFO9mCbbj98AAAAC/rocket-lift-off.gif" alt="Git launch" width={350} height={350} />
        </header>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.codesandtags.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          <span className={styles.logo}>
            <Image src="/images/codesandtags-letters.png" alt="codesandtags" width={150} height={80} />
          </span>
        </a>
      </footer>
    </div>
  )
}
