import React, { useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Box } from "../class";

const Game = () => {
  const containerRef = useRef();

  useLayoutEffect(() => {
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
      renderer.shadowMap.enabled = true;
      renderer.setSize(container.clientWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.screenSpacePanning = false;

      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(0, 3, 2);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      const cube = new Box({
        width: 1,
        height: 1,
        depth: 1,
        color: 0x00ff00,
        velocity: {
          x: 0,
          y: -0.01,
          z: 0,
        },
      });
      cube.castShadow = true;
      scene.add(cube);

      const ground = new Box({
        width: 5,
        height: 0.5,
        depth: 10,
        color: 0x0000ff,
        position: {
          x: 0,
          y: -2,
          z: 0,
        },
      });
      ground.receiveShadow = true;
      scene.add(ground);

      const keys = {
        left: {
          pressed: false,
        },
        right: {
          pressed: false,
        },
        up: {
          pressed: false,
        },
        down: {
          pressed: false,
        },
      };

      const handleKeyDown = (event) => {
        switch (event.code) {
          case "ArrowLeft":
            keys.left.pressed = true;
            break;
          case "ArrowRight":
            keys.right.pressed = true;
            break;
          case "ArrowUp":
            keys.up.pressed = true;
            break;
          case "ArrowDown":
            keys.down.pressed = true;
            break;
        }
      };

      const handleKeyUp = (event) => {
        switch (event.code) {
          case "ArrowLeft":
            keys.left.pressed = false;
            break;
          case "ArrowRight":
            keys.right.pressed = false;
            break;
          case "ArrowUp":
            keys.up.pressed = false;
            break;
          case "ArrowDown":
            keys.down.pressed = false;
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

        cube.velocity.x = 0;
        cube.velocity.z = 0;
        if (keys.left.pressed) {
          cube.velocity.x = -0.05;
        } else if (keys.right.pressed) {
          cube.velocity.x = 0.05;
        }

        if (keys.up.pressed) {
          cube.velocity.z = -0.05;
        } else if (keys.down.pressed) {
          cube.velocity.z = 0.05;
        }

        cube.update(ground);
      };

      animate();
      return () => {
        container.removeChild(renderer.domElement);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  return <ObjectContainer ref={containerRef} />;
};

export default Game;

const ObjectContainer = styled.div`
  width: 100%;
  height: 100%;
`;
