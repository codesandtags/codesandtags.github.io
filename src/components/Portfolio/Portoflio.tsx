import "react";
import portfolio from "./portfolio.json";

const Portfolio = () => {
  return (
    <>
      <div className="container h-screen bg-white">
        <h2>{portfolio.title}</h2>
      </div>
    </>
  );
};

export default Portfolio;
