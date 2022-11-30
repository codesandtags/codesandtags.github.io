import styles from '../../styles/Home.module.css';
import Image from 'next/image'

export default function Footer() {
    return <footer className="flex flex-col items-center">
        <div className={styles.nala}>
            <Image src="/images/nala.png" alt="nala cat" width={100} height={60} />
        </div>
        <a
            href="https://www.codesandtags.io/"
            target="_blank"
            rel="noopener noreferrer"
        >
            {' '}
            <Image src="/images/codesandtags-letters.png" alt="codesandtags" width={130} height={60} />
        </a>
    </footer>
}