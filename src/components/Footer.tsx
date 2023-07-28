import Infinite from "./infinite/Infinite";

export default function Footer() {
  return (
    <footer className="mx-auto px-5 rounded-md drop-shadow-lg backdrop-blur-sm bg-slate-800">
      <div className="w-full flex flex-col justify-center items-center content-center mx-auto py-4">
        <ul className="flex flex-row gap-3">
          <a href="https://youtube.com/@codesandtags" target="_blank">
            <div className="icon icon-youtube"></div>
          </a>
          <a href="https://twitter.com/codesandtags" target="_blank">
            <div className="icon icon-twitter"></div>
          </a>
          <a href="https://www.instagram.com/codesandtags" target="_blank">
            <div className="icon icon-instagram"></div>
          </a>
          <a
            href="https://ca.linkedin.com/company/codesandtags"
            target="_blank"
          >
            <div className="icon icon-linkedin"></div>
          </a>
          <a href="https://www.tiktok.com/@codesandtags" target="_blank">
            <div className="icon icon-tiktok"></div>
          </a>
          <a href="https://github.com/codesandtags" target="_blank">
            <div className="icon icon-github"></div>
          </a>
        </ul>
      </div>
    </footer>
  );
}
