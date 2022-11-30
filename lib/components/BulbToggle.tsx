import { useEffect, useState } from 'react';

const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

const getCurrentTheme = () => {
    if (document.documentElement.classList.contains(DARK_THEME)) {
        return DARK_THEME;
    } else if (document.documentElement.classList.contains(LIGHT_THEME)) {
        return LIGHT_THEME
    }

    const matchesDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    return matchesDarkTheme ? DARK_THEME : LIGHT_THEME;
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

    const toggleDarkMode = () => {
        setToggleBulb(!toggleBulb);
        toggleDarkLightMode();
    }

    useEffect(() => {
        const isLightTheme = getCurrentTheme() === LIGHT_THEME;
        console.log('The theme is: ', getCurrentTheme());
        setToggleBulb(isLightTheme);
    }, []);

    const bulbImage = (toggleBulb) ? 'bulb-on' : 'bulb-off';
    const bulbSizePx = `80px`;
    const backgroundStyle = {
        backgroundImage: `url(/images/${bulbImage}.png)`,
        backgroundSize: 'contain',
        transform: 'rotate(180deg)',
        transition: 'background-image 0.5s ease',
        cursor: 'pointer',
        width: bulbSizePx,
        height: bulbSizePx
    }

    return <div style={{ ...backgroundStyle }} onClick={toggleDarkMode}></div>
}