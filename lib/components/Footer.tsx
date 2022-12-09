import styles from '../../styles/Home.module.css';
import Image from 'next/image'

export default function Footer() {
    return <footer className="container mx-auto flex flex-col items-center">
        <div className={styles.nala}>
            <Image src="/images/nala.png" alt="nala cat" width={100} height={60} />
            <div className="room-wall"></div>
        </div>
    </footer>
}