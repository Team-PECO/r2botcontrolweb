// script.js
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Apply saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
    }

    // 3D object rendering
    const robotDisplay = document.querySelector('.robot-display');
    if (robotDisplay && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, robotDisplay.clientWidth / robotDisplay.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(robotDisplay.clientWidth, robotDisplay.clientHeight);
        renderer.setClearColor(0xf0f0f0, 1);
        robotDisplay.innerHTML = ''; // Clear any existing content
        robotDisplay.appendChild(renderer.domElement);

        // Create a simple robot-like shape
        const robotBody = new THREE.Group();

        // Body
        const bodyGeometry = new THREE.BoxGeometry(1, 1.5, 1);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4285f4 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        robotBody.add(body);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
        const headMaterial = new THREE.MeshPhongMaterial({ color: 0x34a853 });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.1;
        robotBody.add(head);

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
        const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(0.2, 1.2, 0.3);
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(-0.2, 1.2, 0.3);
        robotBody.add(leftEye);
        robotBody.add(rightEye);

        scene.add(robotBody);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            robotBody.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = robotDisplay.clientWidth;
            const height = robotDisplay.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });
    }
});
