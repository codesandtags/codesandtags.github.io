import "react";
import Particles from "react-tsparticles";
import particlesPresets from "./particlesPresents";

const WraperParticles = () => {
  return <Particles id="tsparticles" options={particlesPresets('fireworks')} />;
};

export default WraperParticles;
