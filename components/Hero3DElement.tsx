'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DElement() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 320;
    let height = container.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.scale.set(0.85, 0.85, 0.85);

    // ── 1. Central Faceted Crystal Jewel (Octahedron / Polyhedral Core) ──
    const coreGeo = new THREE.OctahedronGeometry(0.85, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FE8040'),
      emissive: new THREE.Color('#3A170A'),
      metalness: 0.92,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      flatShading: true, // Gives sleek faceted diamond reflections
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // ── 2. Inner Orbiting Wireframe Cage ──
    const wireGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FE8040'),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // ── 3. Middle Gyroscopic Ring (Polished Orange Metal) ──
    const midRingGeo = new THREE.TorusGeometry(1.5, 0.03, 16, 100);
    const midRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FE8040'),
      metalness: 0.95,
      roughness: 0.18,
    });
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.x = Math.PI / 3;
    group.add(midRing);

    // ── 4. Outer Celestial Gimbal Ring (Charcoal Chrome) ──
    const outRingGeo = new THREE.TorusGeometry(1.95, 0.035, 16, 100);
    const outRingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#383838'),
      metalness: 0.9,
      roughness: 0.22,
    });
    const outRing = new THREE.Mesh(outRingGeo, outRingMat);
    outRing.rotation.y = Math.PI / 4;
    group.add(outRing);

    // ── 5. Orbiting Micro Satellite Nodes ──
    const satGroup = new THREE.Group();
    const satGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const sat1 = new THREE.Mesh(satGeo, satMat);
    sat1.position.set(1.5, 0, 0);
    satGroup.add(sat1);

    const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: 0xfe8040 }));
    sat2.position.set(-1.95, 0, 0);
    satGroup.add(sat2);

    group.add(satGroup);
    scene.add(group);

    // ── Lighting: Key Orange, White Rim, Ambient ──
    scene.add(new THREE.AmbientLight(0x191919, 1.8));

    const keyLight = new THREE.DirectionalLight(0xfe8040, 4.5);
    keyLight.position.set(5, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(-5, 5, -3);
    scene.add(rimLight);

    const underLight = new THREE.PointLight(0xff995f, 2.0, 10);
    underLight.position.set(0, -3, 2);
    scene.add(underLight);

    // ── Mouse Parallax ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── Responsive Resize ──
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

    // ── Smooth Animation Loop ──
    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Faceted core spins steadily
      coreMesh.rotation.x = t * 0.45;
      coreMesh.rotation.y = t * 0.65;

      // Wire cage counter-rotates
      wireMesh.rotation.x = -t * 0.25;
      wireMesh.rotation.z = t * 0.35;

      // Middle ring orbits
      midRing.rotation.z = t * 0.3;
      midRing.rotation.x = Math.PI / 3 + mouse.y * 0.3;

      // Outer ring spins on opposing axis
      outRing.rotation.x = -t * 0.2 + mouse.y * 0.25;
      outRing.rotation.y = Math.PI / 4 + mouse.x * 0.35;

      // Satellites orbit
      satGroup.rotation.z = t * 0.8;
      satGroup.rotation.y = t * 0.4;

      // Whole group breathes and tilts with cursor
      group.position.y = Math.sin(t * 1.5) * 0.08;
      group.rotation.y = mouse.x * 0.4;
      group.rotation.x = -mouse.y * 0.3;

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
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      midRingGeo.dispose();
      midRingMat.dispose();
      outRingGeo.dispose();
      outRingMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* Soft radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254, 128, 64, 0.12) 0%, transparent 70%)',
        }}
      />
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
