import React, { useRef, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { MainTheme } from "../consts/stylingValues";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Slider, Typography } from "@mui/material";

/**
 * This page shows a 3D model of Earth with the moon orbiting around it. There is
 * floating 3D text that can be clicked to toggle between low or high settings.
 * Both the moon and Earth slowly rotate. The clouds on Earth rotate slightly faster
 * than Earth itself. There are orbit controls too as well as a slider that controls
 * the simulation speed.
 */
export const Earth3JS = () => {
  // Used when high settings are toggled.
  const clouds3k = "/earth3JS/3k_earth_clouds.webp";
  const clouds1080p = "/earth3JS/1080p_earth_clouds.webp";
  const TwoKEarth = "/earth3JS/2k_earth_daymap.webp";
  // Used when high settings are toggled.
  const FourKEarth = "/earth3JS/4k_earth_daymap.webp";
  // Used when high settings are toggled.
  const moon720p = "/earth3JS/720p_moon.webp";
  const moon360p = "/earth3JS/360p_moon.webp";
  const [settingsAreLow, setSettingsAreLow] = useState(true);
  const [earthTextureToUse, setEarthTextureToUse] = useState(FourKEarth);
  const [moonTextureToUse, setMoonTextureToUse] = useState(moon720p);
  const [cloudsTextureToUse, setCloudsTextureToUse] = useState(clouds3k);
  const [earthTrisAmount, setEarthTrisAmount] = useState(128);
  const [moonTrisAmount, setMoonTrisAmount] = useState(32);
  /** For handling the speed of everything that is moving on the screen.
   *  The speed is set with the slider controls.
   */
  const simulationSpeed= useRef(1);

  /**
   * Function to toggle the graphics settings of various elements from highest
   * to lowest. It affects tri counts and texture sizes. The tri count of the
   * Earth sphere does not lower since it would clip through the clouds sphere.
   */
  const toggleGraphics = () => {
    if (settingsAreLow) {
      setSettingsAreLow(false);
      setMoonTrisAmount(16);
      setEarthTrisAmount(32);
      setMoonTextureToUse(moon720p);
      setCloudsTextureToUse(clouds1080p);
      setEarthTextureToUse(FourKEarth);
    } else {
      setSettingsAreLow(true);
      setMoonTrisAmount(32);
      setEarthTrisAmount(128);
      setMoonTextureToUse(moon360p);
      setCloudsTextureToUse(clouds3k);
      setEarthTextureToUse(TwoKEarth);
    }
  };

  const Earth = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += simulationSpeed.current* 0.0008;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(earthTextureToUse),
      []
    );

    return (
      <mesh {...props} ref={mesh} scale={[2, 2, 2]}>
        <sphereGeometry args={[1, earthTrisAmount, earthTrisAmount]} />
        {settingsAreLow && (
          <meshStandardMaterial
            attach="material"
            roughness={0.7}
            metalness={0.05}
            dithering={true}
          >
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material">
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  /**
   * The clouds sphere is slightly larger than the Earth sphere. The Earth sphere
   * goes inside the clouds sphere.
   */
  const Clouds = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += simulationSpeed.current* 0.001;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(cloudsTextureToUse),
      []
    );

    return (
      <mesh {...props} ref={mesh} scale={[2.005, 2.005, 2.005]}>
        <sphereGeometry transparent={true} args={[1, 64, 64]} />
        {settingsAreLow && (
          <meshStandardMaterial attach="material" transparent={true}>
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material" transparent={true}>
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  // The moon orbits and rotates slightly.
  const Moon = (props) => {
    let angle = 0;
    const radius = 5;
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y -= 0.001 * simulationSpeed.current;
      angle += Math.acos(1 - Math.pow(0.01 / radius, 2) / 2) * simulationSpeed.current;
      mesh.current.position.z = radius * Math.cos(angle);
      mesh.current.position.x = radius * Math.sin(angle);
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(moonTextureToUse),
      []
    );

    return (
      <mesh {...props} ref={mesh} scale={[0.4, 0.4, 0.4]}>
        <sphereGeometry
          transparent={true}
          args={[1, moonTrisAmount, moonTrisAmount]}
        />

        {settingsAreLow && (
          <meshStandardMaterial attach="material" roughness={1}>
            <primitive attach="map" object={texture} />
          </meshStandardMaterial>
        )}
        {!settingsAreLow && (
          <meshBasicMaterial attach="material">
            <primitive attach="map" object={texture} />
          </meshBasicMaterial>
        )}
      </mesh>
    );
  };

  const SettingsButton = (props) => {
    /**
     * This tracks wether mouse cursor is on the button so that the cursor can
     * change to a pointer.
     */
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);
    const mesh = useRef();

    useFrame(() => {
      if (settingsAreLow) {
        mesh.current.rotation.x =
          simulationSpeed.current* (Math.sin(Date.now() * 0.001) * Math.PI * 0.01);
        mesh.current.rotation.y =
          simulationSpeed.current* (Math.sin(Date.now() * 0.001) * Math.PI * 0.004);
        mesh.current.rotation.z =
          simulationSpeed.current* (Math.sin(Date.now() * 0.001) * Math.PI * 0.015);
      }
    });

    return (
      <mesh
        {...props}
        ref={mesh}
        scale={[0.15, 0.15, 0.15]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text depthTest={true} fillOpacity={0.85}>
          Toggle {settingsAreLow ? "Low" : "High"} Settings
        </Text>
      </mesh>
    );
  };

  return (
    <>
      <Head>
        <title>Earth 3JS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <ThemeProvider theme={MainTheme}>
          <Canvas
            camera={{ position: [0, 0, 8.5], fov: 40 }}
            style={{
              width: "100%",
              height: "100vh",
              objectFit: "cover",
              backgroundImage: "url('/earth3JS/8k_stars.webp')",
              backgroundSize: "cover",
              backgroundColor: "black",
              boxShadow:
                "0 0 200px rgba(0,0,0,0.4) inset, 0 0 300px rgba(0,0,0,1) inset",
            }}
          >
            <Earth position={[0, -0.1, 0]} />
            <Clouds position={[0, -0.1, 0]} />
            <Moon position={[3, 0, 2]} />
            <SettingsButton
              position={[-1.55, 2.5, 0]}
              onClick={toggleGraphics}
            />
            {settingsAreLow && (
              <>
                <ambientLight intensity={0.4} color="#fceaff" />
                <spotLight
                  position={[10, -1, 10]}
                  angle={1.7}
                  penumbra={1}
                  castShadow
                  color="#fffff5"
                  intensity={280}
                />
              </>
            )}
            <OrbitControls />
          </Canvas>
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 25,
              // backgroundColor: "#ccc",
              opacity: 0.85,
              paddingLeft: 2,
              paddingRight: 2,
              width: 100,
            }}
          >
            <Slider
              size="small"
              defaultValue={simulationSpeed.current}
              onChange={(_, newValue) => simulationSpeed.current = newValue}
              onChangeCommitted={(_, newValue) => simulationSpeed.current = newValue}
              valueLabelDisplay="auto"
              step={0.25}
              marks
              min={0}
              max={2.5}
            />
            <Typography color="primary" style={{ fontSize: 12 }}>
              Simulation Speed
            </Typography>
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              backgroundColor: "#ccc",
              opacity: 0.5,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Typography style={{ fontSize: 12 }}>
              <a
                href="https://www.solarsystemscope.com/textures/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Earth, Clouds, and Moon Texture Source
              </a>
              &emsp;|&emsp;
              <a
                href="https://photojournal.jpl.nasa.gov/catalog/PIA12348"
                target="_blank"
                rel="noopener noreferrer"
              >
                Background Texture Source
              </a>
            </Typography>
          </div>
        </ThemeProvider>
      </main>
    </>
  );
};

export default Earth3JS;
