import React, { useEffect, useRef } from "react";
import "../../styles/homehero.css";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass.js";
import { Link } from "react-router-dom";

const HomeHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    const container = containerRef.current;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    // Handle window resize properly
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Initialize post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.5, // Bloom strength
      0.4, // Bloom radius
      0.85 // Bloom threshold
    );
    composer.addPass(bloomPass);

    // Improved lighting setup for better shininess
    const ambientLight = new THREE.AmbientLight(0x111111); // Brighter ambient light
    scene.add(ambientLight);

    // Adding a directional light for better shininess
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 2);
    scene.add(directionalLight);

    const lights = [];
    const lightColors = [0x4444ff, 0x44ff44, 0xff4444];
    lightColors.forEach((color, i) => {
      const light = new THREE.PointLight(color, 1.5, 50); // Increased intensity
      light.position.set(
        Math.sin((Math.PI * 2 * i) / 3) * 15,
        Math.cos((Math.PI * 2 * i) / 3) * 15,
        5 // Moved forward to better illuminate nodes
      );
      lights.push(light);
      scene.add(light);
    });

    // Neural network node class
    class NeuralNode {
      constructor(position) {
        this.position = position;
        this.connections = [];
        this.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        );
        this.activationLevel = Math.random();
        this.targetActivation = Math.random();
      }

      update() {
        // Update position with velocity
        this.position.add(this.velocity);

        // Bounce off boundaries
        const bound = 15;
        ["x", "y", "z"].forEach((axis) => {
          if (Math.abs(this.position[axis]) > bound) {
            this.position[axis] = Math.sign(this.position[axis]) * bound;
            this.velocity[axis] *= -1;
          }
        });

        // Smooth activation level changes
        this.activationLevel +=
          (this.targetActivation - this.activationLevel) * 0.05;
        if (Math.random() < 0.02) {
          this.targetActivation = Math.random();
        }
      }
    }

    // Create neural network - Reduced node count for performance
    const nodeCount = 150; // Reduced from 200 for better performance
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.15, 12, 12); // Reduced geometry complexity

    // Enhanced material for better shininess
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x88ccff,
      emissive: 0x2244ff,
      emissiveIntensity: 0.5,
      metalness: 0.5,
      roughness: 0.4, // Lower roughness for more shine
    });

    for (let i = 0; i < nodeCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
      nodes.push(new NeuralNode(position));
    }

    // Create node meshes with instancing for better performance
    const nodeMeshes = nodes.map((node) => {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      mesh.position.copy(node.position);
      scene.add(mesh);
      return mesh;
    });

    // Create connections with distance threshold
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.5,
    });

    const maxDistance = 8; // Maximum distance for connections
    const maxConnectionsPerNode = 3; // Maximum number of connections per node

    nodes.forEach((node, i) => {
      // Calculate distances to all other nodes
      const distances = nodes
        .map((other, j) => ({
          distance: node.position.distanceTo(other.position),
          index: j,
        }))
        .filter((d) => d.index !== i && d.distance <= maxDistance);

      // Sort by distance and take only the closest ones
      distances.sort((a, b) => a.distance - b.distance);
      const nearestNeighbors = distances.slice(0, maxConnectionsPerNode);

      // Create connections to nearest neighbors
      nearestNeighbors.forEach((neighbor) => {
        if (!node.connections.includes(neighbor.index)) {
          node.connections.push(neighbor.index);
        }
      });
    });

    // Create connection lines with optimized buffer usage
    const connectionGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(
      nodes.length * maxConnectionsPerNode * 6
    );
    connectionGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const connections = new THREE.LineSegments(
      connectionGeometry,
      connectionMaterial
    );
    scene.add(connections);

    // Add BokehPass (Depth of Field) - reduced blur for performance
    const bokehPass = new BokehPass(scene, camera, {
      focus: 1.0,
      aperture: 0.0001,
      maxblur: 0.5, // Reduced from 1.0 for better performance
      width: container.clientWidth,
      height: container.clientHeight,
    });
    composer.addPass(bokehPass);

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector2();

    // Use container for mouse coordinates calculation
    container.addEventListener("mousemove", (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Performance optimization: use object pooling for temporary vectors
    const tempVector = new THREE.Vector3();

    // Animation loop with throttled updates
    let time = 0;
    let frameCount = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.005;
      frameCount++;

      // Update nodes
      nodes.forEach((node, i) => {
        node.update();
        nodeMeshes[i].position.copy(node.position);

        // Update node appearance based on activation
        nodeMeshes[i].material.emissiveIntensity =
          0.5 + node.activationLevel * 0.5;
        nodeMeshes[i].scale.setScalar(0.8 + node.activationLevel * 0.4);
      });

      // Only update connections every other frame for performance
      if (frameCount % 2 === 0) {
        // Update connections dynamically based on current positions
        nodes.forEach((node, i) => {
          // Clear existing connections
          node.connections = [];

          // Calculate current distances to all other nodes
          const distances = [];
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;

            // Use object pooling for better performance
            tempVector.subVectors(node.position, nodes[j].position);
            const distance = tempVector.length();

            if (distance <= maxDistance) {
              distances.push({
                distance: distance,
                index: j,
              });
            }
          }

          // Update connections to nearest neighbors
          distances.sort((a, b) => a.distance - b.distance);
          const nearestNeighbors = distances.slice(0, maxConnectionsPerNode);
          nearestNeighbors.forEach((neighbor) => {
            if (!node.connections.includes(neighbor.index)) {
              node.connections.push(neighbor.index);
            }
          });
        });

        // Update connection positions
        const positions = connections.geometry.attributes.position.array;
        let index = 0;
        nodes.forEach((node, i) => {
          node.connections.forEach((connectionIndex) => {
            positions[index++] = node.position.x;
            positions[index++] = node.position.y;
            positions[index++] = node.position.z;
            positions[index++] = nodes[connectionIndex].position.x;
            positions[index++] = nodes[connectionIndex].position.y;
            positions[index++] = nodes[connectionIndex].position.z;
          });
        });
        connections.geometry.attributes.position.needsUpdate = true;
      }

      // Update lights
      lights.forEach((light, i) => {
        light.position.x = Math.sin(time + (i * Math.PI * 2) / 3) * 15;
        light.position.z = Math.cos(time + (i * Math.PI * 2) / 3) * 15;
      });

      // Smooth camera movement
      target.lerp(mouse, 0.05);
      camera.position.x = target.x * 5;
      camera.position.y = target.y * 5;
      camera.lookAt(scene.position);

      // Render with post-processing
      composer.render();
    }

    // Start animation
    animate();

    // Animation for content
    const applyAnimation = (selector, animation) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element) element.style.animation = animation;
      });
    };

    setTimeout(() => {
      applyAnimation(".hero-content", "showContent 1s 0s ease-in-out forwards");
      applyAnimation(
        "#hero-content-h1",
        "showContent 1s 0.4s ease-in-out forwards"
      );
      applyAnimation(
        "#home-h1-humanity",
        "showContent 1.2s 0.7s ease-in-out forwards"
      );
    }, 100);

    // Add glitch effect
    const addGlitchEffect = () => {
      const title = document.querySelector("#home-h1-humanity");
      if (!title) return;

      const originalText = title.textContent;
      title.addEventListener("mouseover", () => {
        let iterations = 0;
        let randomText = [];
        title.style.color = "red";
        const interval = setInterval(() => {
          for (let i = 0; i < originalText.length; i++) {
            randomText[i] = "!@#$%^&*()?><"[Math.floor(Math.random() * 13)];
            if (i === 3 && iterations !== 8) randomText[i] = "A";
            if (i === 4 && iterations !== 8) randomText[i] = "I";
          }
          title.textContent = randomText.join("");
          iterations++;
          if (iterations >= 500 / 30) {
            clearInterval(interval);
            title.textContent = randomText.join("");
            setTimeout(() => revertToOriginal(), 0);
          }
        }, 39);
      });

      const revertToOriginal = () => {
        let iterations1 = 0;
        const interval1 = setInterval(() => {
          title.style.color = "";
          title.textContent = originalText
            .split("")
            .map((letter, index) => {
              return index < iterations1
                ? originalText[index]
                : "!@#$%^&*()?><"[Math.floor(Math.random() * 13)];
            })
            .join("");

          iterations1 += 1 / 3;
          if (iterations1 >= originalText.length) {
            clearInterval(interval1);
            title.textContent = originalText;
          }
        }, 30);
      };
    };

    // Call the glitch effect setup
    addGlitchEffect();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose of resources properly to prevent memory leaks
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      composer.dispose();
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="hero-content" id="hero-content">
        <h1 id="hero-content-h1">
          Advancing Technology for <span id="home-h1-humanity">Humanity</span>
        </h1>
        <div className="buttons">
          <Link className="btn" to="/about">
            About Us
          </Link>
          <Link className="btn" to="/events">
            Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
