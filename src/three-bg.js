import * as THREE from 'three';

export function initNeuralBackground() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: false,
        antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x070a12, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Node particle parameters
    const nodeCount = 75;
    const maxDistance = 110;
    const nodes = [];

    // Create particle nodes
    const nodeGeometry = new THREE.SphereGeometry(2, 12, 12);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];

    for (let i = 0; i < nodeCount; i++) {
        const x = (Math.random() - 0.5) * 600;
        const y = (Math.random() - 0.5) * 400;
        const z = (Math.random() - 0.5) * 300;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        velocities.push({
            x: (Math.random() - 0.5) * 0.4,
            y: (Math.random() - 0.5) * 0.4,
            z: (Math.random() - 0.5) * 0.3
        });
    }

    const nodeParticles = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < nodeCount; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        dummy.updateMatrix();
        nodeParticles.setMatrixAt(i, dummy.matrix);
    }
    scene.add(nodeParticles);

    // Line segments geometry
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.25
    });

    const linesGeometry = new THREE.BufferGeometry();
    const maxLines = nodeCount * nodeCount;
    const linePositions = new Float32Array(maxLines * 6);
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse tracking for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Gently rotate scene to mouse
        camera.position.x += (mouseX - camera.position.x) * 0.03;
        camera.position.y += (-mouseY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);

        let lineVertexIndex = 0;
        let connectedLines = 0;

        for (let i = 0; i < nodeCount; i++) {
            // Move nodes
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Bounce on boundary limits
            if (Math.abs(positions[i * 3]) > 320) velocities[i].x *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 220) velocities[i].y *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 200) velocities[i].z *= -1;

            dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            dummy.updateMatrix();
            nodeParticles.setMatrixAt(i, dummy.matrix);

            // Connect neighboring nodes
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDistance) {
                    linePositions[lineVertexIndex++] = positions[i * 3];
                    linePositions[lineVertexIndex++] = positions[i * 3 + 1];
                    linePositions[lineVertexIndex++] = positions[i * 3 + 2];

                    linePositions[lineVertexIndex++] = positions[j * 3];
                    linePositions[lineVertexIndex++] = positions[j * 3 + 1];
                    linePositions[lineVertexIndex++] = positions[j * 3 + 2];

                    connectedLines++;
                }
            }
        }

        nodeParticles.instanceMatrix.needsUpdate = true;
        linesGeometry.setDrawRange(0, connectedLines * 2);
        linesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
