import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";

const worldWidth = 256,
  worldDepth = 256;
const sensitivity = 0.002;

function Terrain() {
  const meshRef = useRef();
  const { camera, gl } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const data = generateHeight(worldWidth, worldDepth);
    const geometry = new THREE.PlaneGeometry(
      7500,
      7500,
      worldWidth - 1,
      worldDepth - 1
    );
    geometry.rotateX(-Math.PI / 2);
    const vertices = geometry.attributes.position.array;

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i] * 10;
    }

    const texture = new THREE.CanvasTexture(
      generateTexture(data, worldWidth, worldDepth)
    );
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    meshRef.current.geometry = geometry;
    meshRef.current.material.map = texture;
    meshRef.current.material.needsUpdate = true;

    camera.position.set(100, 800, -800);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useFrame(() => {
    camera.rotation.y = -mouse.x * sensitivity;
    camera.rotation.x = -mouse.y * sensitivity;
  });

  return <mesh ref={meshRef} />;
}

function generateHeight(width, height) {
  let seed = Math.PI / 4;
  Math.random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const size = width * height;
  const data = new Uint8Array(size);
  const perlin = new ImprovedNoise(),
    z = Math.random() * 100;
  let quality = 1;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = ~~(i / width);
      data[i] += Math.abs(
        perlin.noise(x / quality, y / quality, z) * quality * 1.75
      );
    }
    quality *= 5;
  }

  return data;
}

function generateTexture(data, width, height) {
  const sun = new THREE.Vector3(1, 1, 1).normalize();
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const imageData = image.data;
  const vector3 = new THREE.Vector3();

  for (let i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
    vector3
      .set(
        data[j - 2] - data[j + 2],
        2,
        data[j - width * 2] - data[j + width * 2]
      )
      .normalize();
    const shade = vector3.dot(sun);
    imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
    imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
    imageData[i + 2] = shade * 96 * (0.5 + data[j] * 0.007);
  }

  context.putImageData(image, 0, 0);
  return canvas;
}

export default function TeamHero() {
  return (
    <Canvas camera={{ fov: 60, near: 1, far: 10000 }}>
      <ambientLight intensity={0.5} />
      <Terrain />
    </Canvas>
  );
}
