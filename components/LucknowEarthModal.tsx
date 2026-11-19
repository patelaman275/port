'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X, MapPin, ExternalLink, RotateCcw, Compass, Globe } from 'lucide-react';

interface LucknowEarthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LucknowEarthModal({ isOpen, onClose }: LucknowEarthModalProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    // ── 1. Scene, Camera, Renderer ─────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5); // Outer space perspective

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ── 2. Earth Globe Geometry & Photorealistic Texture ───
    const earthRadius = 2.0;
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const textureLoader = new THREE.TextureLoader();

    // High-resolution Earth texture map (NASA Blue Marble)
    const earthMap = textureLoader.load('/earth-map.jpg', () => {
      renderer.render(scene, camera);
    });
    earthMap.colorSpace = THREE.SRGBColorSpace;

    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthMap,
      roughness: 0.65,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // ── 3. Realistic Atmospheric Cloud Layer ─────────────────
    const cloudsMap = textureLoader.load('/earth-clouds.png', () => {
      renderer.render(scene, camera);
    });
    const cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.012, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthGroup.add(cloudsMesh);

    // ── 4. Glowing Blue Atmospheric Haze (Fresnel Rim) ─────
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.04, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // ── 5. Lucknow Target Pin (26.8467° N, 80.9462° E) ─────
    const lucknowLat = 26.8467;
    const lucknowLon = 80.9462;

    const phi = (90 - lucknowLat) * (Math.PI / 180);
    const theta = (lucknowLon + 180) * (Math.PI / 180);

    const lx = -(earthRadius * Math.sin(phi) * Math.cos(theta));
    const lz = earthRadius * Math.sin(phi) * Math.sin(theta);
    const ly = earthRadius * Math.cos(phi);

    const lucknowVec = new THREE.Vector3(lx, ly, lz);

    // Target Pin Group anchored at Lucknow
    const pinGroup = new THREE.Group();
    pinGroup.position.copy(lucknowVec);

    // Glowing orange beacon dot
    const pinDot = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfe8040 })
    );
    pinGroup.add(pinDot);

    // Radiating radar pulse ring around Lucknow
    const ringGeo = new THREE.RingGeometry(0.06, 0.1, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfe8040,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const pinRing = new THREE.Mesh(ringGeo, ringMat);
    pinRing.lookAt(lucknowVec.clone().multiplyScalar(2));
    pinGroup.add(pinRing);

    earthGroup.add(pinGroup);

    // Target Quaternion that rotates Earth so Lucknow faces directly at the camera (+Z axis)
    const targetQuat = new THREE.Quaternion().setFromUnitVectors(
      lucknowVec.clone().normalize(),
      new THREE.Vector3(0, 0, 1)
    );

    // Initial overview orientation (showing broad angle)
    const initialEuler = new THREE.Euler(0.2, -1.8, 0, 'XYZ');
    const initialQuat = new THREE.Quaternion().setFromEuler(initialEuler);
    earthGroup.quaternion.copy(initialQuat);

    // ── 6. Stars in Deep Space ─────────────────────────────
    const starsCount = 500;
    const starCoords: number[] = [];
    for (let i = 0; i < starsCount; i++) {
      const sx = (Math.random() - 0.5) * 55;
      const sy = (Math.random() - 0.5) * 55;
      const sz = -12 - Math.random() * 45;
      starCoords.push(sx, sy, sz);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── 7. Lighting ─────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.6);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const softFillLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    softFillLight.position.set(-5, -2, -2);
    scene.add(softFillLight);

    // ── 8. Zoom Animation Loop & Interactive Drag ───────────
    let startTime = performance.now();
    let animId: number;

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

    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;
      prevMousePos = { x: e.clientX, y: e.clientY };

      const deltaQuatY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        dx * 0.005
      );
      const deltaQuatX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        dy * 0.005
      );
      earthGroup.quaternion.multiplyQuaternions(deltaQuatY, earthGroup.quaternion);
      earthGroup.quaternion.multiplyQuaternions(deltaQuatX, earthGroup.quaternion);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - prevMousePos.x;
      const dy = e.touches[0].clientY - prevMousePos.y;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      const deltaQuatY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        dx * 0.005
      );
      const deltaQuatX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        dy * 0.005
      );
      earthGroup.quaternion.multiplyQuaternions(deltaQuatY, earthGroup.quaternion);
      earthGroup.quaternion.multiplyQuaternions(deltaQuatX, earthGroup.quaternion);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = (performance.now() - startTime) / 1000;

      // Slowly rotate clouds
      cloudsMesh.rotation.y += 0.0004;

      // Pulse pin ring
      const pulse = 1 + Math.sin(elapsed * 4.5) * 0.35;
      pinRing.scale.set(pulse, pulse, pulse);
      ringMat.opacity = Math.max(0, 1 - (pulse - 0.7));

      // Space to Lucknow Zoom In Interpolation
      const zoomDuration = 2.6;
      const delay = 0.5;
      const progress = Math.min(Math.max((elapsed - delay) / zoomDuration, 0), 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setAnimProgress(ease);

      if (!isDragging) {
        // Slerp Earth quaternion to center Lucknow directly in front of camera
        earthGroup.quaternion.slerpQuaternions(initialQuat, targetQuat, ease);
      }

      // Camera zooms from space (8.5) down to tight orbital view (3.05)
      camera.position.z = 8.5 * (1 - ease) + 3.05 * ease;

      if (progress >= 0.95 && !isZoomedIn) {
        setIsZoomedIn(true);
      }

      renderer.render(scene, camera);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      earthGeo.dispose();
      earthMat.dispose();
      earthMap.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      cloudsMap.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [isOpen, replayKey]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2.5 sm:p-6 bg-black/90 backdrop-blur-lg select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[92vh] sm:h-[86vh] max-h-[680px] rounded-2xl border border-[#303030] shadow-2xl bg-[#090b0e] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 0 70px rgba(254,128,64,0.12), 0 30px 60px rgba(0,0,0,0.9)',
          }}
        >
          {/* Header Titlebar */}
          <div className="px-5 py-3.5 border-b border-[#303030] bg-[#121212] flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center font-bold">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3
                  className="text-sm font-bold text-[#F5F5F5] flex items-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Orbital Geolocation</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FE8040]/15 text-[#FE8040] border border-[#FE8040]/30">
                    SATELLITE LOCK
                  </span>
                </h3>
                <p className="text-[11px] text-[#777777] font-mono">
                  Descent trajectory &middot; Space to Lucknow, UP, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsZoomedIn(false);
                  setReplayKey((k) => k + 1);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#191919] hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] border border-[#303030] text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Replay Zoom In"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#191919] hover:bg-[#222222] text-[#999999] hover:text-[#FE8040] border border-[#303030] transition-colors flex items-center justify-center cursor-pointer ml-1"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Realistic Earth Canvas */}
          <div className="relative flex-1 w-full overflow-hidden bg-[#000000]">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Orbit HUD Altitude Indicator */}
            <div className="absolute top-4 left-4 z-10 bg-[#121212]/80 backdrop-blur-md p-3 rounded-xl border border-[#303030] font-mono text-xs space-y-1">
              <div className="flex items-center justify-between gap-4 text-[#777777]">
                <span>ALTITUDE:</span>
                <span className="text-[#FE8040] font-bold">
                  {Math.round((1 - animProgress) * 35786 + 420)} KM
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-[#777777]">
                <span>TRAJECTORY:</span>
                <span className="text-[#F5F5F5] font-bold">
                  {animProgress >= 0.95 ? 'LOCKED ON TARGET' : 'DESCENDING'}
                </span>
              </div>
              <div className="w-44 h-1 bg-[#222222] rounded-full overflow-hidden mt-1.5">
                <motion.div
                  className="h-full bg-[#FE8040]"
                  style={{ width: `${Math.round(animProgress * 100)}%` }}
                />
              </div>
            </div>

            {/* Target Location Card (Pops up when zoomed in on Lucknow) */}
            <AnimatePresence>
              {isZoomedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:max-w-sm z-20 bg-[#121212]/95 backdrop-blur-md p-5 rounded-xl border border-[#FE8040]/50 shadow-2xl text-[#CCCCCC]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FE8040] text-[#0F0F0F] flex items-center justify-center font-bold">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4
                          className="font-bold text-[#F5F5F5] text-base"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Lucknow, UP, India
                        </h4>
                        <span className="text-[11px] font-mono text-[#FE8040]">
                          26.8467° N, 80.9462° E
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#999999] leading-relaxed mb-4">
                    Capital of Uttar Pradesh &middot; Hometown of Aman Patel. Open to onsite relocation and worldwide remote software engineering positions.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4 pt-3 border-t border-[#303030]">
                    <div className="p-2 rounded bg-[#191919] border border-[#303030]">
                      <span className="text-[#777777] block text-[10px]">TIMEZONE</span>
                      <span className="text-[#F5F5F5] font-bold">IST (UTC+05:30)</span>
                    </div>
                    <div className="p-2 rounded bg-[#191919] border border-[#303030]">
                      <span className="text-[#777777] block text-[10px]">RELOCATION</span>
                      <span className="text-[#FE8040] font-bold">Ready Worldwide</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.google.com/maps/place/Lucknow,+Uttar+Pradesh/@26.848623,80.8593041,12z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#FE8040] text-[#0F0F0F] font-bold text-xs hover:bg-[#FF995F] transition-all cursor-pointer shadow-sm"
                    >
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag hint on bottom-left */}
            <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-[#777777] bg-[#121212]/60 px-3 py-1.5 rounded-lg border border-[#303030]/60">
              <Compass className="w-3 h-3 text-[#FE8040]" />
              <span>Click &amp; drag to rotate Earth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
