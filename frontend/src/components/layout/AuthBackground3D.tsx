import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function AuthBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Colors based on branding
    const primaryIndigo = 0x4F46E5;
    const secondarySlate = 0x94A3B8;
    const backgroundLight = 0xF1F5F9;

    // Abstract Factory Elements
    const group = new THREE.Group();

    // Main Floor
    const floorGeom = new THREE.BoxGeometry(10, 0.2, 10);
    const floorMat = new THREE.MeshPhongMaterial({ color: backgroundLight });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.position.y = -2;
    group.add(floor);

    // Abstract "Textile" Pillars/Blocks
    for (let i = 0; i < 8; i++) {
        const h = Math.random() * 3 + 1;
        const geom = new THREE.BoxGeometry(0.8, h, 0.8);
        const mat = new THREE.MeshPhongMaterial({ 
            color: i % 2 === 0 ? primaryIndigo : secondarySlate,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.x = (Math.random() - 0.5) * 6;
        mesh.position.z = (Math.random() - 0.5) * 6;
        mesh.position.y = h / 2 - 2;
        group.add(mesh);
    }

    // Glowing "Data" Lines
    const lineMaterial = new THREE.LineBasicMaterial({ color: primaryIndigo });
    for (let i = 0; i < 5; i++) {
        const points = [];
        points.push(new THREE.Vector3((Math.random() - 0.5) * 8, -1.9, (Math.random() - 0.5) * 8));
        points.push(new THREE.Vector3((Math.random() - 0.5) * 8, 2, (Math.random() - 0.5) * 8));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMaterial);
        group.add(line);
    }

    scene.add(group);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);

    let animationFrameId: number;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        group.rotation.y += 0.003;
        renderer.render(scene, camera);
    };

    const handleResize = () => {
        if (!containerRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode) {
          containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
