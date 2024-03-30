import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";

const Earth = () => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.clientWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
      const earthTexture = new THREE.TextureLoader().load(
        "https://gist.githubusercontent.com/juanmirod/081a0b45372f6da81469/raw/526488c67e82f8916f21c07c0b7707b6d5a3615c/earth_texture_map_1000px.jpg"
      );
      const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
      const earth = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earth);

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

        earth.rotation.y += 0.005;

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
    }
  }, []);

  return <ObjectContainer ref={containerRef} />;
};

export default Earth;

const ObjectContainer = styled.div`
  width: 100%;
  height: 100%;
`;
