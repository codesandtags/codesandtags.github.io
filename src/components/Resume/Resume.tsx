import "react";
import resume from "./resume.json";

const Resume = () => {
  return (
    <>
      <section className="">
        <div className="bg-[url('/assets/images/bg_resume.jpeg')] h-screen bg-cover bg-center flex justify-center items-center p-4">
          <div className="container lg:w-3/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg  transform  duration-200 easy-in-out bg-gray-100/80 p-6">
            <h1 className="text-4xl font-semibold mb-6 mt-6">
              <span className="text-black">What is my background?</span>
            </h1>
            <p className="text-lg">
              I've been coding for about <strong className="">10 years</strong>{" "}
              in several Software Roles. I've worked for great global
              companies in different industries (Realt State, Payments, Health,
              Financial). My favorite topics are <strong className="text-rose-600">Web Development, Micro
              Frontends, InnerSource, Architecture Design</strong>. I love working
              closely with other Developers to improve their <strong>Development
              Experience</strong>, by creating better documentation or
              automating repetitive tasks.
            </p>
            <p className="text-center mb-6">
              <a href="https://docs.google.com/document/d/1hdsWC5jXtR7l-ZZzLd707D-2RYpDktjYN5aloYVnhMg/edit?usp=sharing" target="_blank">
                <button className="inline-block mt-10 px-10 py-3 bg-violet-500 text-lg text-white font-semibold hover:bg-blue-600 active:bg-blue-700">
                  📄 Get my resume
                </button>
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resume;
