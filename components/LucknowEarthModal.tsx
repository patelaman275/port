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
  const [animProgress, setAnimProgress] = useState(0); // 0 (outer space) -> 1 (zoomed in on Lucknow)
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
    camera.position.set(0, 0, 8.5); // Start far in space (Zoomed Out)

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

    // ── 2. Earth Globe Geometry & Texture ───────────────────
    const earthRadius = 2.0;
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    // Deep obsidian-blue ocean sphere
    const oceanGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const oceanMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0c131a'),
      emissive: new THREE.Color('#05090d'),
      roughness: 0.6,
      metalness: 0.2,
      clearcoat: 0.5,
    });
    const oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    earthGroup.add(oceanMesh);

    // ── 3. Continental Landmass Points (Procedural Dot-Matrix Continents) ──
    // Coordinates of world continents + detailed India/Asia cluster
    const landPoints: THREE.Vector3[] = [];
    const numPoints = 2600;

    // Approximate continent clusters
    const isLand = (lat: number, lon: number): boolean => {
      // India & South Asia (High density focus!)
      if (lat >= 7 && lat <= 36 && lon >= 68 && lon <= 96) return true;
      // Central & East Asia
      if (lat >= 15 && lat <= 65 && lon >= 60 && lon <= 140) return true;
      // Europe
      if (lat >= 36 && lat <= 70 && lon >= -10 && lon <= 50) return true;
      // Africa
      if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) return true;
      // North America
      if (lat >= 25 && lat <= 70 && lon >= -160 && lon <= -55) return true;
      // South America
      if (lat >= -55 && lat <= 12 && lon >= -80 && lon <= -35) return true;
      // Australia
      if (lat >= -44 && lat <= -10 && lon >= 113 && lon <= 154) return true;
      return false;
    };

    for (let i = 0; i < numPoints; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;

      const lat = 90 - (phi * 180) / Math.PI;
      const lon = ((theta * 180) / Math.PI) % 360 - 180;

      if (isLand(lat, lon)) {
        const radLat = (lat * Math.PI) / 180;
        const radLon = (lon * Math.PI) / 180;
        const r = earthRadius + 0.015;

        const x = r * Math.cos(radLat) * Math.sin(radLon);
        const y = r * Math.sin(radLat);
        const z = r * Math.cos(radLat) * Math.cos(radLon);

        landPoints.push(new THREE.Vector3(x, y, z));
      }
    }

    const landGeo = new THREE.BufferGeometry().setFromPoints(landPoints);
    const landMat = new THREE.PointsMaterial({
      color: new THREE.Color('#4a5968'),
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const landMesh = new THREE.Points(landGeo, landMat);
    earthGroup.add(landMesh);

    // ── 4. Glowing Atmosphere Rim ──────────────────────────
    const atmoGeo = new THREE.SphereGeometry(earthRadius * 1.08, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FE8040'),
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    earthGroup.add(atmoMesh);

    // ── 5. Lucknow Target Beacon Pin (26.8467° N, 80.9462° E) ──
    const lucknowLat = 26.8467;
    const lucknowLon = 80.9462;

    const radLuckLat = (lucknowLat * Math.PI) / 180;
    const radLuckLon = (lucknowLon * Math.PI) / 180;
    const pinR = earthRadius + 0.03;

    const lx = pinR * Math.cos(radLuckLat) * Math.sin(radLuckLon);
    const ly = pinR * Math.sin(radLuckLat);
    const lz = pinR * Math.cos(radLuckLat) * Math.cos(radLuckLon);

    const lucknowVec = new THREE.Vector3(lx, ly, lz);

    // Target Pin Mesh Group
    const pinGroup = new THREE.Group();
    pinGroup.position.copy(lucknowVec);

    // Glowing orange beacon dot
    const pinCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.065, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfe8040 })
    );
    pinGroup.add(pinCore);

    // Radiating radar pulse ring around Lucknow
    const ringGeo = new THREE.RingGeometry(0.08, 0.12, 32);
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

    // ── 6. Stars in Deep Space ─────────────────────────────
    const starsCount = 450;
    const starCoords: number[] = [];
    for (let i = 0; i < starsCount; i++) {
      const sx = (Math.random() - 0.5) * 50;
      const sy = (Math.random() - 0.5) * 50;
      const sz = -10 - Math.random() * 40;
      starCoords.push(sx, sy, sz);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x999999, size: 0.08, transparent: true, opacity: 0.5 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── 7. Lighting ─────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x191919, 1.8));

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.8);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const orangeBacklight = new THREE.PointLight(0xfe8040, 2.5, 15);
    orangeBacklight.position.set(-4, -2, -3);
    scene.add(orangeBacklight);

    // ── 8. Zoom Animation Math ──────────────────────────────
    // To face Lucknow (Lat 26.8°, Lon 80.9°) directly at the camera (Z axis):
    // Rotation Y must be -radLon, Rotation X must be radLat
    const targetRotY = -radLuckLon;
    const targetRotX = radLuckLat;

    // Start Earth rotation showing a broad overview
    earthGroup.rotation.y = targetRotY - 2.5;
    earthGroup.rotation.x = 0;

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

    // Interactive mouse rotation drag
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMousePos.x;
      const dy = e.clientY - prevMousePos.y;
      prevMousePos = { x: e.clientX, y: e.clientY };

      earthGroup.rotation.y += dx * 0.005;
      earthGroup.rotation.x += dy * 0.005;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // ── 9. Render & Zoom-In Interpolation Loop ──────────────
    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = (performance.now() - startTime) / 1000;

      // Pulse pin ring
      const pulse = 1 + Math.sin(elapsed * 4) * 0.4;
      pinRing.scale.set(pulse, pulse, pulse);
      ringMat.opacity = Math.max(0, 1 - (pulse - 0.7));

      // Phase 1 (0 to 1.0s): Float in outer space
      // Phase 2 (1.0 to 3.8s): Smooth orbital swoop & dramatic zoom in directly to Lucknow!
      const zoomDuration = 2.8;
      const delay = 0.6;
      const progress = Math.min(Math.max((elapsed - delay) / zoomDuration, 0), 1);

      // Smooth Quintic Ease-Out curve for dramatic space-to-ground zoom
      const ease = 1 - Math.pow(1 - progress, 4);
      setAnimProgress(ease);

      if (!isDragging) {
        // Interpolate Earth rotation to center Lucknow
        earthGroup.rotation.y = (targetRotY - 2.5) * (1 - ease) + targetRotY * ease;
        earthGroup.rotation.x = 0 * (1 - ease) + targetRotX * ease;
      }

      // Camera zooms from space (8.5) down to tight orbital view (3.0)
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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      oceanGeo.dispose();
      oceanMat.dispose();
      landGeo.dispose();
      landMat.dispose();
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
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[86vh] max-h-[680px] rounded-2xl border border-[#303030] shadow-2xl bg-[#090b0e] overflow-hidden flex flex-col"
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
                  <span>Orbital Geolocation Telemetry</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FE8040]/15 text-[#FE8040] border border-[#FE8040]/30">
                    SATELLITE LOCK
                  </span>
                </h3>
                <p className="text-[11px] text-[#777777] font-mono">
                  Orbital Descent &middot; Space to Lucknow, Uttar Pradesh, India
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
                title="Replay Zoom In Animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay Zoom</span>
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

          {/* 3D Earth WebGL Canvas Mount */}
          <div className="relative flex-1 w-full overflow-hidden bg-[#000000]">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Orbit HUD Altitude Indicator */}
            <div className="absolute top-4 left-4 z-10 bg-[#121212]/80 backdrop-blur-md p-3 rounded-xl border border-[#303030] font-mono text-xs space-y-1">
              <div className="flex items-center justify-between gap-4 text-[#777777]">
                <span>ORBITAL ALTITUDE:</span>
                <span className="text-[#FE8040] font-bold">
                  {Math.round((1 - animProgress) * 35786 + 420)} KM
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 text-[#777777]">
                <span>DESCENT TRAJECTORY:</span>
                <span className="text-[#F5F5F5] font-bold">
                  {animProgress >= 0.95 ? 'LOCKED ON TARGET' : 'INTERPOLATING'}
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
              <span>Click &amp; drag anywhere to rotate Earth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
