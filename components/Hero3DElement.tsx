'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DElement() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 440;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // 2. Geometry: Elegant Geometric Twisted Torus Knot (Architectural Ribbon)
    // p=2, q=3 gives a sleek, balanced, premium SDE sculpture
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.38, 160, 36, 2, 3);

    // Inner orbiting subtle ring for depth
    const ringGeo = new THREE.TorusGeometry(2.35, 0.035, 16, 100);

    // 3. Materials: Metallic Glossy Obsidian Orange
    const sculptureMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FE8040'),
      emissive: new THREE.Color('#2A1208'),
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#303030'),
      metalness: 0.9,
      roughness: 0.25,
      wireframe: false,
    });

    const meshGroup = new THREE.Group();

    const sculpture = new THREE.Mesh(geometry, sculptureMat);
    meshGroup.add(sculpture);

    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    meshGroup.add(ring);

    scene.add(meshGroup);

    // 4. Lighting: Soft Orange Key Light + Pure White Rim Light + Ambient
    const ambientLight = new THREE.AmbientLight(0x191919, 1.4);
    scene.add(ambientLight);

    // Key Orange Light (Front Right)
    const keyLight = new THREE.DirectionalLight(0xfe8040, 3.8);
    keyLight.position.set(5, 4, 4);
    scene.add(keyLight);

    // Crisp White Rim Light (Top Back Left - creates high-end metallic edge reflections)
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.8);
    rimLight.position.set(-5, 5, -3);
    scene.add(rimLight);

    // Subtle Under-Fill Orange Glow
    const fillLight = new THREE.PointLight(0xff995f, 2.2, 10);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // 5. Mouse Interaction & Floating Animation
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Normalized between -1 and 1
      mouse.targetX = (e.clientX - centerX) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - centerY) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth resize handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Continuous subtle architectural rotation
      sculpture.rotation.x = elapsedTime * 0.28 + mouse.y * 0.45;
      sculpture.rotation.y = elapsedTime * 0.38 + mouse.x * 0.55;

      ring.rotation.z = -elapsedTime * 0.15;
      ring.rotation.x = Math.PI / 3 + mouse.y * 0.2;

      // Gentle vertical floating breathing
      meshGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      ringGeo.dispose();
      sculptureMat.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none">
      {/* Subtle radial ambient orange glow beneath sculpture */}
      <div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(254, 128, 64, 0.12) 0%, rgba(73, 42, 29, 0.04) 50%, transparent 70%)',
        }}
      />
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
