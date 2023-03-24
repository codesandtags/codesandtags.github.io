import Infinite from "./infinite/Infinite";

export default function Footer() {
   return (
      <footer className="container mx-auto flex flex-col items-center">
         <div className="container">
            <div className="w-full flex flex-col justify-center items-center content-center mx-auto py-4">
               <ul className="flex flex-row gap-3 mt-4 mb-6">
                  <a href="https://youtube.com/@codesandtags" target="_blank">
                     <div className="icon icon-youtube"></div>
                  </a>
                  <a href="https://twitter.com/codesandtags" target="_blank">
                     <div className="icon icon-twitter"></div>
                  </a>
                  <a
                     href="https://www.instagram.com/codesandtags"
                     target="_blank"
                  >
                     <div className="icon icon-instagram"></div>
                  </a>
                  <a
                     href="https://ca.linkedin.com/company/codesandtags"
                     target="_blank"
                  >
                     <div className="icon icon-linkedin"></div>
                  </a>
                  <a
                     href="https://www.tiktok.com/@codesandtags"
                     target="_blank"
                  >
                     <div className="icon icon-tiktok"></div>
                  </a>
                  <a href="https://github.com/codesandtags" target="_blank">
                     <div className="icon icon-github"></div>
                  </a>
               </ul>
            </div>
         </div>
         <Infinite />
      </footer>
   );
}
