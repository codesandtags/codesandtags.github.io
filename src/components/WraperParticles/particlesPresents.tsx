const PRESETS: any = {
  default: {
    background: {
      color: {
        value: "#111",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 300,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 3,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "polygon",
      },
      size: {
        random: true,
        value: 5,
      },
    },
    detectRetina: true,
  },
  fireworks: {
    detectRetina: !0,
    background: { color: "#000" },
    fpsLimit: 120,
    emitters: {
      direction: "top",
      life: { count: 0, duration: 0.1, delay: 0.1 },
      rate: { delay: 0.5, quantity: 1 },
      size: { width: 100, height: 0 },
      position: { y: 100, x: 50 },
    },
    particles: {
      number: { value: 0 },
      destroy: {
        mode: "split",
        split: {
          count: 1,
          factor: { value: 0.333333 },
          rate: { value: 100 },
          particles: {
            stroke: { width: 0 },
            color: {
              value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
            },
            number: { value: 0 },
            collisions: { enable: !1 },
            opacity: {
              value: { min: 0.1, max: 1 },
              animation: {
                enable: !0,
                speed: 0.7,
                sync: !1,
                startValue: "max",
                destroy: "min",
              },
            },
            shape: { type: "circle" },
            size: { value: 2, animation: { enable: !1 } },
            life: { count: 1, duration: { value: { min: 1, max: 2 } } },
            move: {
              enable: !0,
              gravity: { enable: !1 },
              speed: 2,
              direction: "none",
              random: !0,
              straight: !1,
              outMode: "destroy",
            },
          },
        },
      },
      life: { count: 1 },
      shape: { type: "line" },
      size: {
        value: { min: 0.1, max: 50 },
        animation: {
          enable: !0,
          sync: !0,
          speed: 90,
          startValue: "max",
          destroy: "min",
        },
      },
      stroke: { color: { value: "#ffffff" }, width: 1 },
      rotate: { path: !0 },
      move: {
        enable: !0,
        gravity: { acceleration: 15, enable: !0, inverse: !0, maxSpeed: 100 },
        speed: { min: 10, max: 20 },
        outModes: { default: "destroy", top: "none" },
        trail: { fillColor: "#000", enable: !0, length: 10 },
      },
    },
  },
  seaAnemone: {
    fpsLimit: 120,
    particles: {
      color: { value: "#FF0000" },
      move: {
        attract: { enable: !1, rotate: { x: 2e3, y: 2e3 } },
        direction: "none",
        enable: !0,
        outModes: { default: "destroy" },
        path: {
          clamp: !1,
          enable: !0,
          delay: { value: 0 },
        },
        random: !1,
        speed: 2,
        straight: !1,
        trail: { fillColor: "#000", length: 30, enable: !0 },
      },
      number: { density: { enable: !0, area: 800 }, value: 0, limit: 300 },
      opacity: { value: 1 },
      shape: { type: "circle" },
      size: {
        value: 10,
        animation: {
          count: 1,
          startValue: "min",
          enable: !0,
          minimumValue: 1,
          speed: 10,
          sync: !0,
        },
      },
    },
    background: { color: "#000" },
    detectRetina: !0,
    emitters: {
      direction: "none",
      rate: { quantity: 10, delay: 0.3 },
      size: { width: 0, height: 0, mode: "precise" },
      spawnColor: {
        value: "#ff0000",
        animation: {
          h: {
            enable: !0,
            offset: { min: -1.4, max: 1.4 },
            speed: 5,
            sync: !1,
          },
          l: { enable: !0, offset: { min: 20, max: 80 }, speed: 0, sync: !1 },
        },
      },
      position: { x: 50, y: 50 },
    },
  },
  snow: {
    background: {
      color: {
        value: "#111",
      },
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    fullScreen: {
      zIndex: 0,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "repulse",
        },
        onHover: {
          enable: true,
          mode: "bubble",
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 0.3,
          opacity: 1,
          size: 4,
        },
        grab: {
          distance: 400,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      links: {
        color: {
          value: "#ffffff",
        },
        distance: 500,
        opacity: 0.4,
        width: 2,
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        direction: "bottom",
        enable: true,
        outModes: {
          bottom: "out",
          left: "out",
          right: "out",
          top: "out",
        },
      },
      number: {
        density: {
          enable: true,
        },
        value: 400,
      },
      opacity: {
        random: {
          enable: true,
        },
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          speed: 1,
          minimumValue: 0.1,
        },
      },
      size: {
        random: {
          enable: true,
        },
        value: {
          min: 1,
          max: 10,
        },
        animation: {
          speed: 40,
          minimumValue: 0.1,
        },
      },
    },
  },
};

const particlesPresets = (name: string) => {
  if (PRESETS[name]) {
    return PRESETS[name];
  }

  return PRESETS["default"];
};

export default particlesPresets;
