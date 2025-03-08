// Initialize Three.js scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.02);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

// Get the container element
const container = document.querySelector('.hero');
if (!container) {
    console.error('Could not find .hero container');
    throw new Error('Container element not found');
}

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Transparent background
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Lighting setup with enhanced effects
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

const lights = [];
const lightColors = [0x4466ff, 0x44ffff, 0x4488ff];
lightColors.forEach((color, i) => {
    const light = new THREE.PointLight(color, 2, 50);
    light.position.set(
        Math.sin(Math.PI * 2 * i / 3) * 15,
        Math.cos(Math.PI * 2 * i / 3) * 15,
        0
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
        ['x', 'y', 'z'].forEach(axis => {
            if (Math.abs(this.position[axis]) > bound) {
                this.position[axis] = Math.sign(this.position[axis]) * bound;
                this.velocity[axis] *= -1;
            }
        });

        // Smooth activation level changes
        this.activationLevel += (this.targetActivation - this.activationLevel) * 0.05;
        if (Math.random() < 0.02) {
            this.targetActivation = Math.random();
        }
    }
}

// Create neural network with enhanced visuals
const nodeCount = 120; // Increased node count
const nodes = [];
const nodeGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Increased geometry detail
const nodeMaterial = new THREE.MeshPhongMaterial({
    color: 0x00B5E2,
    emissive: 0x00629B,
    shininess: 0,
    specular: 0x00B5E2
});

// Create nodes with better distribution
for (let i = 0; i < nodeCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const radius = 15 + (Math.random() - 0.5) * 10;
    
    const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    );
    nodes.push(new NeuralNode(position));
}

// Create node meshes with enhanced materials
const nodeMeshes = nodes.map(node => {
    const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
    mesh.position.copy(node.position);
    scene.add(mesh);
    return mesh;
});

// Create connections with improved visuals
const connectionMaterial = new THREE.LineBasicMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
});

const maxConnections = 4; // Increased connections
nodes.forEach((node, i) => {
    const distances = nodes.map((other, j) => ({
        distance: node.position.distanceTo(other.position),
        index: j
    }));
    
    distances.sort((a, b) => a.distance - b.distance);
    
    // Connect to nearest nodes
    for (let j = 1; j <= maxConnections && j < distances.length; j++) {
        const otherIndex = distances[j].index;
        if (!node.connections.includes(otherIndex)) {
            node.connections.push(otherIndex);
            nodes[otherIndex].connections.push(i);
        }
    }
});

// Create connection lines
const connectionGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(nodes.length * maxConnections * 6);
connectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
scene.add(connections);

// Camera setup
camera.position.z = 30;

// Mouse interaction
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();

// Use container for mouse coordinates calculation
container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

// Animation loop with enhanced effects
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.003;

    // Update nodes with smoother animations
    nodes.forEach((node, i) => {
        node.update();
        nodeMeshes[i].position.copy(node.position);
        
        // Enhanced node appearance based on activation
        const scale = 0.8 + node.activationLevel * 0.4;
        nodeMeshes[i].scale.setScalar(scale);
        
        // Dynamic color based on activation
        nodeMeshes[i].material.emissiveIntensity = node.activationLevel * 1.5;
        nodeMeshes[i].material.color.setHSL(0.6, 0.8, 0.3 + node.activationLevel * 0.4);
    });

    // Update connections with improved visibility
    const positions = connections.geometry.attributes.position.array;
    let index = 0;
    nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
            positions[index++] = node.position.x;
            positions[index++] = node.position.y;
            positions[index++] = node.position.z;
            positions[index++] = nodes[connectionIndex].position.x;
            positions[index++] = nodes[connectionIndex].position.y;
            positions[index++] = nodes[connectionIndex].position.z;
        });
    });
    connections.geometry.attributes.position.needsUpdate = true;

    // Rotating lights for dynamic illumination
    lights.forEach((light, i) => {
        light.position.x = Math.sin(time + i * Math.PI * 2 / 3) * 15;
        light.position.z = Math.cos(time + i * Math.PI * 2 / 3) * 15;
        light.intensity = 1.5 + Math.sin(time * 2) * 0.5;
    });

    // Smooth camera movement
    target.lerp(mouse, 0.05);
    camera.position.x = target.x * 5;
    camera.position.y = target.y * 5;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
});

// Start animation
animate();