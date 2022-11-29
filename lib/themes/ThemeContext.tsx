import { createContext } from "react"

export const themes = {
    light: {
        background: '#e5e5e5',
        color: '#222222'
    },
    dark: {
        background: '#000000',
        color: '#ffffff'
    }
}

export const ThemeContext = createContext(themes.dark);