// Import main SCSS for webpack compilation
import './scss/main.scss'

// Import all JS lib for webpack compilation
// import './scripts/lib'
import Typed from 'typed.js';

window.onload = () => {
    const options = {
        strings: [
            'Full Stack Developer',
            'Traveler',
            `Passionate for <span class="highlight">coding</span>`],
        typeSpeed: 80
    };

    const typed = new Typed('#typed-strings', options);
}