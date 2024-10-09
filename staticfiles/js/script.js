// Apply theme immediately
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `theme-${savedTheme}`;
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    // Theme management
    function setTheme(theme) {
        body.className = `theme-${theme}`;
        localStorage.setItem('theme', theme);
    }

    // Set the correct option in the select element
    if (themeSelect) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (e) => {
            setTheme(e.target.value);
        });
    } else {
        console.error('Theme select element not found');
    }

    // 3D object rendering with GLTFLoader
    const robotDisplay = document.querySelector('.robot-display');
    if (robotDisplay && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, robotDisplay.clientWidth / robotDisplay.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(robotDisplay.clientWidth, robotDisplay.clientHeight);
        robotDisplay.innerHTML = ''; // Clear any existing content
        robotDisplay.appendChild(renderer.domElement);

        let robot;
        let animationId;

        // Load the GLTF model
        const loader = new THREE.GLTFLoader();
        loader.load(
            '/static/models/r2botv1.gltf', // Adjust the path as needed
            (gltf) => {
                console.log('GLTF model loaded successfully');
                robot = gltf.scene;
                scene.add(robot);

                robot.scale.set(0.5, 0.5, 0.5);
                robot.position.set(0, 0, 0);

                animate();
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

        // Add lights
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        camera.position.z = 50; // Move the camera farther away

        function animate() {
            animationId = requestAnimationFrame(animate);
            if (robot) {
                robot.rotation.x += 0.01;
                robot.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            const width = robotDisplay.clientWidth;
            const height = robotDisplay.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        // Intersection Observer for performance optimization
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(robotDisplay);
    } else {
        console.error('Robot display element not found or Three.js is not loaded');
    }
});