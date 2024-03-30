import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const Moon = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonTexture = new THREE.TextureLoader().load(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVo6HER2hYqasuxUxSIuJ7wrK3PFdgxQhtseC18Oj5rDwZDxMPyDgyn-pNHev8gW8Yl8c&usqp=CAU"
    );
    const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    scene.add(moon);

    const stars = [];
    const numStars = 100;
    const starColor = 0xffffff;

    for (let i = 0; i < numStars; i++) {
      const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const starMaterial = new THREE.MeshBasicMaterial({ color: starColor });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      star.position.set(
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20)
      );

      scene.add(star);
      stars.push(star);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      moon.rotation.y += 0.05;

      stars.forEach((star) => {
        star.position.z += 0.1;

        if (star.position.z > 10) {
          star.position.z = -5;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} />;
};

export default Moon;
