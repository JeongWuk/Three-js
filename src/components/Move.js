import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";

const Move = () => {
  const sceneRef = useRef(null);
  const sphereRef = useRef(null);
  const speed = 0.1;

  useEffect(() => {
    const container = sceneRef.current;
    if (container) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const eyeTexture = new THREE.TextureLoader().load(
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a0bebea3-9ff6-49c3-895a-452cc5c9da63/dg02efy-f9d35b77-b6f6-4452-b218-56d7d26fcce7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EwYmViZWEzLTlmZjYtNDljMy04OTVhLTQ1MmNjNWM5ZGE2M1wvZGcwMmVmeS1mOWQzNWI3Ny1iNmY2LTQ0NTItYjIxOC01NmQ3ZDI2ZmNjZTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.-hkwhZVuEme9R8TNChKRUT7dGzMcN0q6FfqHft2xN8g"
      );
      const material = new THREE.MeshPhongMaterial({ map: eyeTexture });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.y += 0.5;
      sphere.rotation.y += 4.7;
      scene.add(sphere);
      sphereRef.current = sphere;

      const groundGeometry = new THREE.PlaneGeometry(20, 20);
      const groundTexture = new THREE.TextureLoader().load(
        "https://cdn.pixabay.com/photo/2020/03/29/13/23/ground-texture-4980744_1280.jpg"
      );
      const groundMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: groundTexture,
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      scene.add(ground);

      const center = new THREE.Vector3();
      scene.traverse((child) => {
        center.add(child.position);
      });
      center.divideScalar(scene.children.length);

      camera.position.set(0, 0.5, 10);
      camera.lookAt(center);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.position.set(1, 0.5, 1).normalize();
      scene.add(directionalLight);

      function handleKeyDown(event) {
        switch (event.key) {
          case "ArrowUp":
            sphere.position.z -= speed;
            break;
          case "ArrowDown":
            sphere.position.z += speed;
            break;
          case "ArrowLeft":
            sphere.rotation.y -= speed;
            break;
          case "ArrowRight":
            sphere.rotation.y += speed;
            break;
          default:
            break;
        }
      }

      window.addEventListener("keydown", handleKeyDown);

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      return () => {
        container.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return <ObjectContainer ref={sceneRef} />;
};

export default Move;

const ObjectContainer = styled.div`
  width: 100%;
  height: 100%;
`;
