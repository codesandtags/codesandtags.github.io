import "react";
import "./App.css";

import Profile from "../../components/Profile/Profile";
import WraperParticles from "../../components/WraperParticles/WraperParticles";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <WraperParticles />
      <Profile />
    </div>
  );
}

export default App;
