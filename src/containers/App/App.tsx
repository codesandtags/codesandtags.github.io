import "react";
import "./App.css";

import Profile from "../../components/Profile/Profile";
import WraperParticles from "../../components/WraperParticles/WraperParticles";
import Resume from "../../components/Resume/Resume";
import Portfolio from "../../components/Portfolio/Portoflio";
import Passion from "../../components/Passion/Passion";

function App() {
  return (
    <>
      <header id="up" className="flex bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative justify-center items-center p-2">
        <Profile />
      </header>
      <Portfolio />
      <Passion />
      <Resume />
    </>
  );
}

export default App;
