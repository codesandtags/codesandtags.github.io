// Import main SCSS for webpack compilation
import './scss/main.scss'

// Import all JS lib for webpack compilation
// import './scripts/lib'
import Typed from 'typed.js';

window.onload = () => {
    const options = {
        strings: [
            `...`,
            `I'm <span class="highlight">Edwin Torres</span>`,
            `Full Stack Developer`,
            `Also I'm Traveler <span class="highlight"><i class="fas fa-globe-americas"></i></span>`,
            `I love <span class="highlight">coding <3</span>`],
        typeSpeed: 80
    };

    const typed = new Typed('#typed-strings', options);
}