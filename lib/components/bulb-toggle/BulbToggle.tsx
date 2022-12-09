import { useEffect, useState } from 'react';
import styles from './BulbToggle.module.css';
import cn from 'clsx';

const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

const getCurrentTheme = () => {
    if (document.documentElement.classList.contains(DARK_THEME)) {
        return DARK_THEME;
    } else if (document.documentElement.classList.contains(LIGHT_THEME)) {
        return LIGHT_THEME
    }

    // const matchesDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return DARK_THEME;
}

const toggleDarkLightMode = () => {
    const rootClasses = document.documentElement.classList;
    
    if (getCurrentTheme() === DARK_THEME) {
        rootClasses.add(LIGHT_THEME);
        rootClasses.remove(DARK_THEME);
        return;
    }

    rootClasses.add(DARK_THEME);
    rootClasses.remove(LIGHT_THEME);
}


export default function BulbToggle() {
    const [toggleBulb, setToggleBulb] = useState(true);
    let bulbSound;

    const toggleDarkMode = () => {
        setToggleBulb(!toggleBulb);
        toggleDarkLightMode();
        bulbSound = new Audio('/sounds/bulb-switch.mp3');
        bulbSound.play();
    }

    useEffect(() => {
        const isLightTheme = getCurrentTheme() === LIGHT_THEME;
        console.info(' 👩‍🎨 The default theme is: ', getCurrentTheme());
        setToggleBulb(isLightTheme);
        
    }, []);

    const bulbState = (toggleBulb) ? styles.bulbOn : styles.bulbOff;

    return <div className={cn(
        styles.bulb,
        bulbState
    )} onClick={toggleDarkMode}></div>
}