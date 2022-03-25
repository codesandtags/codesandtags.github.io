import "react";
import "./App.css";

import Profile from "../../components/Profile/Profile";
import Resume from "../../components/Resume/Resume";

function App() {
  return (
    <>
      <header id="up" className="flex bg-center bg-fixed bg-no-repeat bg-center bg-cover h-screen relative justify-center items-center p-4">
        <Profile />
      </header>
      <Resume />
    </>
  );
}

export default App;
