'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DElement() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 160;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Geometry — torusKnot as floating metallic ribbon
    const geometry = new THREE.TorusKnotGeometry(1.1, 0.30, 180, 36, 2, 3);
    const ringGeo = new THREE.TorusGeometry(1.9, 0.028, 16, 100);

    // Metallic Obsidian Orange material
    const sculptureMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FE8040'),
      emissive: new THREE.Color('#2A1208'),
      metalness: 0.9,
      roughness: 0.14,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    });

    const ringMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#492A1D'),
      metalness: 0.95,
      roughness: 0.2,
    });

    const meshGroup = new THREE.Group();
    meshGroup.scale.set(0.82, 0.82, 0.82);
    const sculpture = new THREE.Mesh(geometry, sculptureMat);
    meshGroup.add(sculpture);

    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    meshGroup.add(ring);

    scene.add(meshGroup);

    // Lights
    scene.add(new THREE.AmbientLight(0x191919, 1.6));

    const keyLight = new THREE.DirectionalLight(0xfe8040, 4.2);
    keyLight.position.set(5, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.0);
    rimLight.position.set(-5, 5, -3);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xff995f, 2.5, 12);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Mouse parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Animation loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      sculpture.rotation.x = t * 0.28 + mouse.y * 0.45;
      sculpture.rotation.y = t * 0.38 + mouse.x * 0.55;
      ring.rotation.z = -t * 0.14;
      ring.rotation.x = Math.PI / 3 + mouse.y * 0.2;

      // Gentle float
      meshGroup.position.y = Math.sin(t * 1.3) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      ro.disconnect();
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
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Soft ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254,128,64,0.10) 0%, transparent 70%)',
        }}
      />
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
