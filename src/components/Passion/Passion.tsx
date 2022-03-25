import "react";
import passion from "./passion.json";

const Passion = () => {
  return (
    <>
      <div className="container h-screen bg-white">
        <h2>{passion.title}</h2>
      </div>
    </>
  );
};

export default Passion;
