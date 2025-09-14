document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Animate skill bars
    document.querySelectorAll('.skill-item').forEach(item => {
        const percent = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        
        gsap.to(progressBar, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            width: `${percent}%`,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
    
    // Initialize 3D background
    init3DBackground();
    
    // Initialize 3D hero model
    initHeroModel();
    
    // Initialize 3D profile model
    initProfileModel();
    
    // Initialize project 3D previews
    initProjectPreviews();
});

// 3D Background Animation
function init3DBackground() {
    const container = document.getElementById('3d-background');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create floating geometry
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x6e45e2,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    
    const particles = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(geometry, material.clone());
        particle.position.x = Math.random() * 20 - 10;
        particle.position.y = Math.random() * 20 - 10;
        particle.position.z = Math.random() * 20 - 10;
        particle.scale.setScalar(Math.random() * 2 + 0.5);
        scene.add(particle);
        particles.push(particle);
    }
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particles.forEach(particle => {
            particle.rotation.x += 0.001;
            particle.rotation.y += 0.001;
            
            // Float animation
            particle.position.y += Math.sin(Date.now() * 0.001 + particle.position.x) * 0.001;
            particle.position.x += Math.cos(Date.now() * 0.001 + particle.position.y) * 0.001;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 3D Hero Model
function initHeroModel() {
    const canvas = document.getElementById('hero-3d-model');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, canvas.clientWidth / canvas.clientHeight, 1, 10000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a developer avatar or abstract shape
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e45e2,
        emissive: 0x88d3ce,
        emissiveIntensity: 0.2,
        shininess: 100,
        wireframe: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    camera.position.z = 3;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// 3D Profile Model
function initProfileModel() {
    const canvas = document.getElementById('profile-3d');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a profile model (abstract head shape)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x6e45e2,
        emissive: 0x88d3ce,
        emissiveIntensity: 0.2,
        shininess: 100,
        wireframe: false,
        flatShading: true
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add some details
    const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.1, 0.9);
    scene.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.1, 0.9);
    scene.add(rightEye);
    
    camera.position.z = 2.5;
    
    // Make it interactive
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    canvas.addEventListener('mousedown', () => isDragging = true);
    canvas.addEventListener('mouseup', () => isDragging = false);
    canvas.addEventListener('mouseleave', () => isDragging = false);
    
    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };
        
        mesh.rotation.y += deltaMove.x * 0.01;
        mesh.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        if (!isDragging) {
            mesh.rotation.y += 0.002;
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

// Project 3D Previews
function initProjectPreviews() {
    const projectPreviews = document.querySelectorAll('.project-3d-preview');
    if (!projectPreviews.length) return;
    
    projectPreviews.forEach(canvas => {
        const projectId = canvas.getAttribute('data-project');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            canvas,
            antialias: true,
            alpha: true
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Create different shapes based on project ID
        let geometry;
        
        switch(projectId) {
            case '1':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case '2':
                geometry = new THREE.ConeGeometry(0.8, 1.5, 32);
                break;
            case '3':
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
                break;
            default:
                geometry = new THREE.SphereGeometry(0.8, 32, 32);
        }
        
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x6e45e2,
            emissive: 0x88d3ce,
            emissiveIntensity: 0.1,
            shininess: 100,
            wireframe: false
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        
        camera.position.z = 3;
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        
        animate();
    });
}
function init3DBackground() {
    const container = document.getElementById('3d-background');
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Create floating browser windows
    const createBrowserWindow = () => {
        const group = new THREE.Group();
        
        // Window frame
        const frameGeometry = new THREE.BoxGeometry(4, 3, 0.1);
        const frameMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            emissive: 0x1a1a1a,
            specular: 0x111111,
            shininess: 30
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        group.add(frame);
        
        // Window content (random UI)
        const contentTypes = ['code-editor', 'website', 'mobile-app'];
        const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
        
        const contentCanvas = document.createElement('canvas');
        contentCanvas.width = 512;
        contentCanvas.height = 384;
        const ctx = contentCanvas.getContext('2d');
        
        // Draw different UI content
        if (contentType === 'code-editor') {
            // Code editor UI
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(0, 0, contentCanvas.width, contentCanvas.height);
            
            // Editor tabs
            ctx.fillStyle = '#252526';
            ctx.fillRect(0, 0, contentCanvas.width, 30);
            
            // File tabs
            ctx.fillStyle = '#2d2d2d';
            ctx.fillRect(0, 30, 150, 30);
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(150, 30, contentCanvas.width-150, 30);
            
            // Code content
            ctx.font = '14px Consolas, monospace';
            const codeLines = [
                'import React from "react";',
                '',
                'function App() {',
                '  return (',
                '    <div className="app">',
                '      <Header />',
                '      <MainContent />',
                '      <Footer />',
                '    </div>',
                '  );',
                '}',
                '',
                'export default App;'
            ];
            
            ctx.fillStyle = '#d4d4d4';
            codeLines.forEach((line, i) => {
                ctx.fillText(line, 20, 80 + i * 20);
            });
            
            // Syntax highlighting
            ctx.fillStyle = '#569cd6';
            ctx.fillText('import', 20, 80);
            ctx.fillText('function', 20, 120);
            ctx.fillText('return', 20, 140);
            
            ctx.fillStyle = '#9cdcfe';
            ctx.fillText('React', 65, 80);
            ctx.fillText('App', 95, 120);
            
            ctx.fillStyle = '#d7ba7d';
            ctx.fillText('from', 110, 80);
            ctx.fillText('"react"', 150, 80);
            
        } else if (contentType === 'website') {
            // Website UI
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, contentCanvas.width, contentCanvas.height);
            
            // Navbar
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(0, 0, contentCanvas.width, 60);
            
            // Logo
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 18px Arial';
            ctx.fillText('MyPortfolio', 20, 35);
            
            // Nav items
            ctx.fillStyle = '#ecf0f1';
            ctx.font = '14px Arial';
            ctx.fillText('Home', 200, 35);
            ctx.fillText('Projects', 260, 35);
            ctx.fillText('About', 340, 35);
            ctx.fillText('Contact', 400, 35);
            
            // Hero section
            ctx.fillStyle = '#3498db';
            ctx.fillRect(0, 60, contentCanvas.width, 150);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('Welcome to My Portfolio', 50, 120);
            
            ctx.fillStyle = '#ecf0f1';
            ctx.font = '16px Arial';
            ctx.fillText('I build amazing web experiences', 50, 150);
            
            // Content cards
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(30, 230, 130, 120);
            ctx.fillRect(180, 230, 130, 120);
            ctx.fillRect(330, 230, 130, 120);
            
        } else {
            // Mobile app UI
            ctx.fillStyle = '#121212';
            ctx.fillRect(0, 0, contentCanvas.width, contentCanvas.height);
            
            // Status bar
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, contentCanvas.width, 30);
            
            // App header
            ctx.fillStyle = '#1f1f1f';
            ctx.fillRect(0, 30, contentCanvas.width, 60);
            
            // Back button
            ctx.fillStyle = '#bb86fc';
            ctx.beginPath();
            ctx.moveTo(20, 60);
            ctx.lineTo(40, 45);
            ctx.lineTo(40, 75);
            ctx.closePath();
            ctx.fill();
            
            // App title
            ctx.fillStyle = '#ffffff';
            ctx.font = '18px Roboto';
            ctx.fillText('Settings', 70, 65);
            
            // Settings items
            ctx.fillStyle = '#1f1f1f';
            ctx.fillRect(20, 100, contentCanvas.width-40, 50);
            ctx.fillRect(20, 160, contentCanvas.width-40, 50);
            ctx.fillRect(20, 220, contentCanvas.width-40, 50);
            ctx.fillRect(20, 280, contentCanvas.width-40, 50);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Roboto';
            ctx.fillText('Account', 40, 130);
            ctx.fillText('Notifications', 40, 190);
            ctx.fillText('Privacy', 40, 250);
            ctx.fillText('About', 40, 310);
            
            // Toggle switches
            ctx.fillStyle = '#bb86fc';
            ctx.fillRect(contentCanvas.width-80, 125, 50, 20);
            ctx.fillRect(contentCanvas.width-80, 185, 50, 20);
        }
        
        const contentTexture = new THREE.CanvasTexture(contentCanvas);
        const contentMaterial = new THREE.MeshBasicMaterial({ 
            map: contentTexture,
            transparent: true,
            opacity: 0.9
        });
        const content = new THREE.Mesh(
            new THREE.PlaneGeometry(3.8, 2.8),
            contentMaterial
        );
        content.position.z = 0.051;
        group.add(content);
        
        // Browser chrome (url bar, buttons)
        const chromeCanvas = document.createElement('canvas');
        chromeCanvas.width = 512;
        chromeCanvas.height = 30;
        const chromeCtx = chromeCanvas.getContext('2d');
        
        chromeCtx.fillStyle = '#f1f1f1';
        chromeCtx.fillRect(0, 0, chromeCanvas.width, chromeCanvas.height);
        
        // URL bar
        chromeCtx.fillStyle = '#ffffff';
        chromeCtx.fillRect(50, 5, chromeCanvas.width-150, 20);
        chromeCtx.fillStyle = '#777777';
        chromeCtx.font = '12px Arial';
        chromeCtx.fillText('https://myportfolio.com', 60, 20);
        
        // Buttons
        chromeCtx.fillStyle = '#e0e0e0';
        chromeCtx.beginPath();
        chromeCtx.arc(20, 15, 8, 0, Math.PI * 2);
        chromeCtx.fill();
        
        chromeCtx.beginPath();
        chromeCtx.arc(40, 15, 8, 0, Math.PI * 2);
        chromeCtx.fill();
        
        const chromeTexture = new THREE.CanvasTexture(chromeCanvas);
        const chromeMaterial = new THREE.MeshBasicMaterial({ 
            map: chromeTexture
        });
        const chrome = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 0.2),
            chromeMaterial
        );
        chrome.position.y = 1.5;
        chrome.position.z = 0.051;
        group.add(chrome);
        
        return group;
    };

    // Create floating UI components
    const createUIComponent = () => {
        const components = ['button', 'card', 'form', 'navbar'];
        const componentType = components[Math.floor(Math.random() * components.length)];
        const group = new THREE.Group();
        
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        if (componentType === 'button') {
            // Button component
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.roundRect(50, 50, 150, 60, 8);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Click Me', 125, 90);
            
            // Hover effect
            ctx.fillStyle = '#2980b9';
            ctx.beginPath();
            ctx.roundRect(50, 50, 150, 60, 8);
            ctx.globalAlpha = 0.3;
            ctx.fill();
            ctx.globalAlpha = 1.0;
            
        } else if (componentType === 'card') {
            // Card component
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(30, 30, 200, 180, 12);
            ctx.fill();
            
            // Card image
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(40, 40, 180, 100);
            
            // Card title
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('Project Title', 40, 160);
            
            // Card description
            ctx.fillStyle = '#7f8c8d';
            ctx.font = '14px Arial';
            ctx.fillText('A brief description of this project...', 40, 180);
            
            // Card button
            ctx.fillStyle = '#3498db';
            ctx.beginPath();
            ctx.roundRect(40, 190, 80, 30, 6);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('View', 80, 210);
            
        } else if (componentType === 'form') {
            // Form component
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(30, 30, 200, 200, 12);
            ctx.fill();
            
            // Form title
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Contact Us', 130, 60);
            
            // Form fields
            ctx.fillStyle = '#f5f5f5';
            ctx.beginPath();
            ctx.roundRect(40, 80, 180, 30, 4);
            ctx.fill();
            
            ctx.beginPath();
            ctx.roundRect(40, 120, 180, 30, 4);
            ctx.fill();
            
            ctx.beginPath();
            ctx.roundRect(40, 160, 180, 60, 4);
            ctx.fill();
            
            // Placeholder text
            ctx.fillStyle = '#95a5a6';
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('Name', 45, 100);
            ctx.fillText('Email', 45, 140);
            ctx.fillText('Message', 45, 180);
            
            // Submit button
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.roundRect(70, 230, 120, 30, 6);
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Submit', 130, 250);
            
        } else {
            // Navbar component
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(0, 0, canvas.width, 60);
            
            // Logo
            ctx.fillStyle = '#3498db';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'left';
            ctx.fillText('LOGO', 20, 35);
            
            // Nav items
            ctx.fillStyle = '#ecf0f1';
            ctx.font = '16px Arial';
            ctx.fillText('Home', 120, 35);
            ctx.fillText('About', 190, 35);
            ctx.fillText('Work', 260, 35);
            ctx.fillText('Contact', 320, 35);
            
            // Active indicator
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(190, 50);
            ctx.lineTo(240, 50);
            ctx.stroke();
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.9
        });
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            material
        );
        group.add(mesh);
        
        return group;
    };

    // Create elements
    const elements = [];
    
    // Create browser windows
    for (let i = 0; i < 5; i++) {
        const window = createBrowserWindow();
        window.position.x = Math.random() * 40 - 20;
        window.position.y = Math.random() * 30 - 15;
        window.position.z = Math.random() * 40 - 20;
        window.rotation.x = Math.random() * 0.2 - 0.1;
        window.rotation.y = Math.random() * 0.2 - 0.1;
        window.userData = {
            speed: Math.random() * 0.005 + 0.002,
            floatSpeed: Math.random() * 0.001 + 0.0005
        };
        scene.add(window);
        elements.push(window);
    }
    
    // Create UI components
    for (let i = 0; i < 10; i++) {
        const component = createUIComponent();
        component.position.x = Math.random() * 40 - 20;
        component.position.y = Math.random() * 30 - 15;
        component.position.z = Math.random() * 40 - 20;
        component.rotation.x = Math.random() * 0.5 - 0.25;
        component.rotation.y = Math.random() * 0.5 - 0.25;
        component.userData = {
            speed: Math.random() * 0.01 + 0.005,
            floatSpeed: Math.random() * 0.001 + 0.001
        };
        scene.add(component);
        elements.push(component);
    }

    camera.position.z = 30;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        elements.forEach(element => {
            // Rotation
            element.rotation.x += element.userData.speed * 0.3;
            element.rotation.y += element.userData.speed;
            
            // Floating movement
            element.position.y += Math.sin(Date.now() * element.userData.floatSpeed) * 0.01;
            element.position.x += Math.cos(Date.now() * element.userData.floatSpeed * 0.7) * 0.008;
        });
        
        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
