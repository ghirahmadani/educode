import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

import './Particle.css';

const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  return (
    <div className="container w-full flex absolute">
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullscreen: {
            enable: false,
            zIndex: 0
        },
        particles: {
            color: {
                value: "#d4af37",
            },
            links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.3,
                width: 0.3,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 3,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100,
            },
            opacity: {
                value: 0.3,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 1 },
            },
        },
        detectRetina: true,
    }
    }
    />
    </div>
  );
};

export default Particle;
