import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("/textures/sun.jpg");
    const earthTexture = textureLoader.load("/textures/earth.jpg");
    const marsTexture = textureLoader.load("/textures/mars.jpg");

    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.castShadow = true;
    sun.receiveShadow = true;
    sun.name = "Sun";
    scene.add(sun);

    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.x = 3;
    earth.castShadow = true;
    earth.receiveShadow = true;
    earth.name = "Earth";
    scene.add(earth);

    const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);
    mars.position.x = 4.5;
    mars.castShadow = true;
    mars.receiveShadow = true;
    mars.name = "Mars";
    scene.add(mars);

    camera.position.z = 7;

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
    pointLight.position.set(5, 3, 5);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Add background stars
    const addStar = () => {
      const starGeometry = new THREE.SphereGeometry(0.05, 24, 24);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);

      scene.add(star);
    };

    Array(200).fill().forEach(addStar);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Set raycaster origin and direction
      raycaster.ray.origin.copy(camera.position);
      raycaster.ray.direction
        .set(mouse.x, mouse.y, 1)
        .unproject(camera)
        .sub(camera.position)
        .normalize();

      // Perform intersection check
      const intersects = raycaster.intersectObjects([sun, earth, mars]);

      console.log("Raycaster origin:", raycaster.ray.origin);
      console.log("Raycaster direction:", raycaster.ray.direction);
      console.log("Intersections:", intersects);

      if (intersects.length > 0) {
        const object = intersects[0].object;
        console.log("Intersected object:", object.name);
        setSelectedPlanet(object.name);
      } else {
        setSelectedPlanet(null);
      }
    };

    window.addEventListener("click", onMouseClick, false);

    const animate = () => {
      requestAnimationFrame(animate);

      sun.rotation.y += 0.005;
      earth.rotation.y += 0.01;
      mars.rotation.y += 0.008;

      earth.position.x = 3 * Math.cos(Date.now() * 0.001);
      earth.position.z = 3 * Math.sin(Date.now() * 0.001);

      mars.position.x = 4.5 * Math.cos(Date.now() * 0.0008);
      mars.position.z = 4.5 * Math.sin(Date.now() * 0.0008);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("click", onMouseClick);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }}></div>
      <div className="planet-info">
        {selectedPlanet
          ? `Selected Planet: ${selectedPlanet}`
          : "No planet selected"}
      </div>
    </>
  );
};

export default SolarSystem;
