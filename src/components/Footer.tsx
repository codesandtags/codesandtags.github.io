import Infinite from "./infinite/Infinite";

export default function Footer() {
  return (
    <footer className="mx-auto px-5 rounded-md drop-shadow-lg backdrop-blur-sm bg-slate-50">
      <div className="w-full flex flex-col justify-center items-center content-center mx-auto py-4">
        <ul className="flex flex-row gap-3">
          <a
            href="https://youtube.com/@codesandtags"
            target="_blank"
            title="Youtube"
            aria-label="Youtube"
          >
            <div className="icon icon-youtube"></div>
          </a>
          <a
            href="https://www.instagram.com/codesandtags"
            target="_blank"
            title="Instagram"
            aria-label="Instagram"
          >
            <div className="icon icon-instagram"></div>
          </a>
          <a
            href="https://ca.linkedin.com/company/codesandtags"
            target="_blank"
            title="Linkedin"
            aria-label="Linkedin"
          >
            <div className="icon icon-linkedin"></div>
          </a>
          <a
            href="https://www.tiktok.com/@codesandtags"
            target="_blank"
            title="TikTok"
            aria-label="TikTok"
          >
            <div className="icon icon-tiktok"></div>
          </a>
          <a
            href="https://github.com/codesandtags"
            target="_blank"
            title="Github"
            aria-label="Github"
          >
            <div className="icon icon-github"></div>
          </a>
          <a
            href="https://www.codesandtags.io/blog/"
            target="_blank"
            title="Blog"
            aria-label="Blog"
          >
            <div className="icon icon-blog"></div>
          </a>
        </ul>
      </div>
    </footer>
  );
}
