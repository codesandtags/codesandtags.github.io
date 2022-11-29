import styles from '../../styles/Home.module.css';
import Image from 'next/image'

export default function Footer() {
    return <footer className={styles.footer}>
        <a
            href="https://www.codesandtags.io/"
            target="_blank"
            rel="noopener noreferrer"
        >
            {' '}
            <Image src="/images/codesandtags-letters.png" alt="codesandtags" width={150} height={80} />
        </a>
    </footer>
}