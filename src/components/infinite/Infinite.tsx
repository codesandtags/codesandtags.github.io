export default function Infinite() {
   return (
      <svg className="finny scroll fade scrolled" viewBox="-1 -1 12 8">
         <defs>
            <path
               id="infinite"
               d="M5 3C4 2 3.1 1 2 1a2 2  0 000 4c1.1 0 2-1 3-2s1.9-2  3-2a2 2 0 010 4C6.9  5 6 4 5 3"
            ></path>
            <radialGradient
               id="sgrad"
               gradientUnits="userSpaceOnUse"
               cx="5"
               cy="3"
               r="3.4"
            >
               <stop offset=".25" stopColor="#000"></stop>
               <stop offset=".9" stopColor="#000" stopOpacity="0"></stop>
            </radialGradient>
            <path
               id="shad1"
               className="clip-shadow"
               d="M4.5 2.5C3.7 1.7 2.9 1 2 1m6 4c-1 0-1.7-.7-2.5-1.5"
            ></path>
         </defs>
         <use href="#infinite" className="fbottom"></use>
         <use href="#shad1" className="shad even" />
         <g className="shad odd">
            <use href="#shad1" transform="translate(0 6) scale(1 , -1)" />
         </g>
         <use href="#infinite" className="ll"></use>
      </svg>
   );
}
