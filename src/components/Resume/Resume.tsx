import "react";
import resume from "./resume.json";

const Resume = () => {
  return (
    <>
      <div className="container h-screen bg-white">
        <h2>{resume.title}</h2>
      </div>
    </>
  );
};

export default Resume;
