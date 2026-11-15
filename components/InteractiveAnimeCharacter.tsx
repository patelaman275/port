'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveAnimeCharacterProps {
  className?: string;
}

export default function InteractiveAnimeCharacter({
  className = '',
}: InteractiveAnimeCharacterProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const targetPupilX = useRef(0);
  const targetPupilY = useRef(0);
  const currentPupilX = useRef(0);
  const currentPupilY = useRef(0);
  const blinkProgress = useRef(0);

  // ── Build Scene ────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 500;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 5.8);

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5e8, 3.0);
    keyLight.position.set(-2, 3, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc0d8ff, 1.1);
    fillLight.position.set(3, 1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfe8040, 1.6);
    rimLight.position.set(0.5, -1, -4);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x1a1420, 2.0));

    // Materials
    const mk = (color: string, rough = 0.65, metal = 0.0, emissive?: string, emissiveInt = 0) => {
      const m = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: rough,
        metalness: metal,
      });
      if (emissive) {
        m.emissive = new THREE.Color(emissive);
        m.emissiveIntensity = emissiveInt;
      }
      return m;
    };

    const skinMat      = mk('#f5c5a3', 0.65);
    const skinDarkMat  = mk('#e8a882', 0.7);
    const hairMat      = mk('#1a1a2e', 0.5, 0.3);
    const hairHiMat    = mk('#2a2a46', 0.4, 0.4);
    const eyeWhiteMat  = mk('#f4f4ff', 0.1);
    const irisMat      = mk('#1a3a5c', 0.1, 0.2, '#0a1a2c', 0.3);
    const pupilMat     = mk('#050a0f', 0.0, 0.1);
    const hlMat        = mk('#ffffff', 0.0, 0.0, '#ffffff', 1.0);
    const lashMat      = mk('#0a0a18', 0.5);
    const glassMat     = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#303060'), roughness: 0.0, metalness: 0.9,
      transparent: true, opacity: 0.28,
    });
    const frameMatG    = mk('#1a1a2e', 0.3, 0.8);
    const lipMat       = mk('#e8907a', 0.5);
    const browMat      = mk('#1a1a2e', 0.6);
    const shirtMat     = mk('#0d0d1a', 0.8, 0.1);
    const accentMat    = mk('#fe8040', 0.6);

    // ── Head Group (rotates with mouse) ───────────────────────────────────────
    const headGroup = new THREE.Group();
    scene.add(headGroup);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.5, 20), skinMat);
    neck.position.set(0, -1.0, 0);
    neck.castShadow = true;
    headGroup.add(neck);

    // Shirt/collar base
    const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.95, 0.52, 20), shirtMat);
    shirt.position.set(0, -1.44, 0);
    shirt.castShadow = true;
    headGroup.add(shirt);

    // Collar accent ring
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.035, 8, 24, Math.PI), accentMat);
    collar.position.set(0, -1.08, 0.18);
    collar.rotation.x = 0.1 * Math.PI;
    headGroup.add(collar);

    // Face (squashed oval)
    const face = new THREE.Mesh(new THREE.SphereGeometry(1.0, 48, 48), skinMat);
    face.scale.set(0.92, 1.05, 0.88);
    face.castShadow = true;
    face.receiveShadow = true;
    headGroup.add(face);

    // Chin
    const chin = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), skinMat);
    chin.position.set(0, -0.78, 0.0);
    chin.scale.set(0.68, 0.45, 0.72);
    chin.castShadow = true;
    headGroup.add(chin);

    // Ears
    const earGeo = new THREE.SphereGeometry(0.22, 20, 20);
    [-0.9, 0.9].forEach((xPos) => {
      const ear = new THREE.Mesh(earGeo, skinMat);
      ear.position.set(xPos, 0.0, -0.08);
      ear.scale.set(0.5, 0.75, 0.4);
      headGroup.add(ear);
    });

    // ── Hair ─────────────────────────────────────────────────────────────────
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    const hairCap = new THREE.Mesh(
      new THREE.SphereGeometry(1.05, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.65),
      hairMat
    );
    hairCap.position.set(0, 0.1, -0.05);
    hairCap.scale.set(0.95, 0.98, 0.98);
    hairCap.castShadow = true;
    hairGroup.add(hairCap);

    // Forehead fringe
    const fringes = [
      { x: -0.42, y: 1.08, z: 0.68, rx: -0.9, rz: -0.3, mat: hairMat },
      { x: -0.18, y: 1.1,  z: 0.75, rx: -0.85, rz: -0.1, mat: hairMat },
      { x:  0.08, y: 1.09, z: 0.78, rx: -0.82, rz:  0.05, mat: hairHiMat },
      { x:  0.32, y: 1.06, z: 0.74, rx: -0.88, rz:  0.2, mat: hairHiMat },
      { x:  0.52, y: 1.0,  z: 0.65, rx: -0.95, rz:  0.35, mat: hairMat },
    ];
    fringes.forEach(({ x, y, z, rx, rz, mat }) => {
      const strand = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.42, 6), mat);
      strand.position.set(x, y, z);
      strand.rotation.set(rx, 0, rz);
      strand.castShadow = true;
      hairGroup.add(strand);
    });

    // Side strands
    const sides = [
      { x: -0.98, y: 0.1, z: 0.0, rx: 0.1, rz: -1.2, mat: hairMat },
      { x: -0.9, y: -0.3, z: 0.1, rx: 0.2, rz: -1.0, mat: hairMat },
      { x:  0.98, y: 0.1, z: 0.0, rx: 0.1, rz:  1.2, mat: hairHiMat },
      { x:  0.9, y: -0.3, z: 0.1, rx: 0.2, rz:  1.0, mat: hairHiMat },
    ];
    sides.forEach(({ x, y, z, rx, rz, mat }) => {
      const s = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.48, 6), mat);
      s.position.set(x, y, z);
      s.rotation.set(rx, 0, rz);
      hairGroup.add(s);
    });

    const backHair = new THREE.Mesh(
      new THREE.SphereGeometry(1.04, 32, 32, 0, Math.PI * 2, Math.PI * 0.4, Math.PI * 0.6),
      hairMat
    );
    backHair.position.set(0, -0.1, -0.08);
    backHair.scale.set(0.98, 1.0, 1.02);
    hairGroup.add(backHair);

    // ── Eyebrows ──────────────────────────────────────────────────────────────
    const browGeo = new THREE.BoxGeometry(0.36, 0.055, 0.08);
    [[-0.34, 0.12], [0.34, -0.12]].forEach(([xPos, rz]) => {
      const brow = new THREE.Mesh(browGeo, browMat);
      brow.position.set(xPos, 0.42, 0.78);
      brow.rotation.z = rz;
      brow.scale.set(1, 1, 0.5);
      headGroup.add(brow);
    });

    // ── Eyes ──────────────────────────────────────────────────────────────────
    const leftEyeGroup = new THREE.Group();
    const rightEyeGroup = new THREE.Group();
    let leftPupilRef: THREE.Mesh | null = null;
    let rightPupilRef: THREE.Mesh | null = null;
    let leftUpperLidRef: THREE.Mesh | null = null;
    let rightUpperLidRef: THREE.Mesh | null = null;
    let leftIrisRef: THREE.Mesh | null = null;
    let rightIrisRef: THREE.Mesh | null = null;
    let leftHlRef: THREE.Mesh | null = null;
    let rightHlRef: THREE.Mesh | null = null;

    const buildEye = (xPos: number, grp: THREE.Group, side: 'L' | 'R') => {
      grp.position.set(xPos, 0.18, 0.72);

      // Sclera (eyeball)
      const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.185, 24, 24), eyeWhiteMat);
      sclera.scale.set(1, 1.05, 0.85);
      grp.add(sclera);

      // Iris
      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.12, 32), irisMat);
      iris.position.set(0, 0, 0.154);
      grp.add(iris);
      if (side === 'L') leftIrisRef = iris;
      else rightIrisRef = iris;

      // Pupil
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.07, 24), pupilMat);
      pupil.position.set(0, 0, 0.158);
      grp.add(pupil);
      if (side === 'L') leftPupilRef = pupil;
      else rightPupilRef = pupil;

      // Highlight dot
      const hl = new THREE.Mesh(new THREE.CircleGeometry(0.028, 12), hlMat);
      hl.position.set(0.04, 0.038, 0.162);
      grp.add(hl);
      if (side === 'L') leftHlRef = hl;
      else rightHlRef = hl;

      // Upper lid (blinking)
      const lid = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.5),
        lashMat
      );
      lid.position.set(0, 0, 0);
      lid.scale.set(1.08, 0.001, 0.92);
      lid.rotation.x = -0.3;
      grp.add(lid);
      if (side === 'L') leftUpperLidRef = lid;
      else rightUpperLidRef = lid;

      headGroup.add(grp);
    };

    buildEye(-0.34, leftEyeGroup, 'L');
    buildEye(0.34, rightEyeGroup, 'R');

    // Eyelashes
    const buildLashes = (xPos: number) => {
      const lg = new THREE.Group();
      lg.position.set(xPos, 0.18, 0.72);
      [-0.12, -0.06, 0, 0.06, 0.12].forEach((lx, i) => {
        const lash = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.065, 0.01), lashMat);
        lash.position.set(lx, 0.185, 0.165);
        lash.rotation.z = (i - 2) * 0.18;
        lg.add(lash);
      });
      headGroup.add(lg);
    };
    buildLashes(-0.34);
    buildLashes(0.34);

    // ── Glasses ───────────────────────────────────────────────────────────────
    const buildFrame = (xPos: number) => {
      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.025, 10, 40), frameMatG);
      frame.position.set(xPos, 0.17, 0.74);
      frame.scale.set(1.05, 1.0, 0.3);
      headGroup.add(frame);

      const lens = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), glassMat);
      lens.position.set(xPos, 0.17, 0.75);
      lens.scale.set(1.05, 1.0, 1);
      headGroup.add(lens);
    };
    buildFrame(-0.34);
    buildFrame(0.34);

    // Bridge & temples
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 0.04), frameMatG);
    bridge.position.set(0, 0.17, 0.75);
    headGroup.add(bridge);

    [[-0.76, -0.4], [0.76, 0.4]].forEach(([tx, ry]) => {
      const temple = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 0.025), frameMatG);
      temple.position.set(tx, 0.17, 0.5);
      temple.rotation.y = ry;
      headGroup.add(temple);
    });

    // ── Nose ──────────────────────────────────────────────────────────────────
    const noseGeo = new THREE.SphereGeometry(0.07, 16, 16);
    const noseBridge = new THREE.Mesh(noseGeo, skinDarkMat);
    noseBridge.position.set(0, -0.08, 0.86);
    noseBridge.scale.set(0.9, 0.7, 0.75);
    headGroup.add(noseBridge);
    [-0.08, 0.08].forEach((nx) => {
      const nostril = new THREE.Mesh(noseGeo, skinDarkMat);
      nostril.position.set(nx, -0.14, 0.84);
      nostril.scale.set(0.6, 0.45, 0.5);
      headGroup.add(nostril);
    });

    // ── Mouth & Lips ──────────────────────────────────────────────────────────
    const upperLip = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.038, 8, 24, Math.PI),
      lipMat
    );
    upperLip.position.set(0, -0.42, 0.8);
    upperLip.rotation.x = -0.1;
    headGroup.add(upperLip);

    const lowerLip = new THREE.Mesh(new THREE.SphereGeometry(0.19, 24, 12), lipMat);
    lowerLip.position.set(0, -0.52, 0.8);
    lowerLip.scale.set(0.85, 0.3, 0.55);
    headGroup.add(lowerLip);

    // ── Resize Observer ───────────────────────────────────────────────────────
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // ── Blink Scheduler ───────────────────────────────────────────────────────
    let blinkTimer: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      blinkTimer = setTimeout(() => {
        const start = performance.now();
        const dur = 180;
        const doBlink = () => {
          const t = Math.min((performance.now() - start) / dur, 1);
          blinkProgress.current = t < 0.5 ? t * 2 : (1 - t) * 2;
          if (t < 1) requestAnimationFrame(doBlink);
          else blinkProgress.current = 0;
        };
        doBlink();
        scheduleBlink();
      }, 2600 + Math.random() * 3400);
    };
    scheduleBlink();

    // ── Render Loop ───────────────────────────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let elapsed = 0;
    let last = performance.now();
    let animId: number;

    const render = () => {
      animId = requestAnimationFrame(render);
      const now = performance.now();
      elapsed += (now - last) / 1000;
      last = now;

      // Lerp head rotation
      currentRotX.current = lerp(currentRotX.current, targetRotX.current, 0.09);
      currentRotY.current = lerp(currentRotY.current, targetRotY.current, 0.09);
      headGroup.rotation.x = currentRotX.current;
      headGroup.rotation.y = currentRotY.current;

      // Idle breathing bob
      headGroup.position.y = Math.sin(elapsed * 1.1) * 0.025;

      // Hair subtle lag
      hairGroup.rotation.x = currentRotX.current * -0.05;
      hairGroup.rotation.y = currentRotY.current * -0.04;

      // Lerp pupils
      currentPupilX.current = lerp(currentPupilX.current, targetPupilX.current, 0.14);
      currentPupilY.current = lerp(currentPupilY.current, targetPupilY.current, 0.14);
      const px = currentPupilX.current;
      const py = currentPupilY.current;

      if (leftIrisRef) leftIrisRef.position.set(px, py, 0.154);
      if (leftPupilRef) leftPupilRef.position.set(px, py, 0.158);
      if (leftHlRef) leftHlRef.position.set(px + 0.04, py + 0.038, 0.162);
      if (rightIrisRef) rightIrisRef.position.set(px, py, 0.154);
      if (rightPupilRef) rightPupilRef.position.set(px, py, 0.158);
      if (rightHlRef) rightHlRef.position.set(px + 0.04, py + 0.038, 0.162);

      // Blink
      const bp = blinkProgress.current;
      if (leftUpperLidRef) leftUpperLidRef.scale.set(1.08, Math.max(0.001, bp * 1.1), 0.92);
      if (rightUpperLidRef) rightUpperLidRef.scale.set(1.08, Math.max(0.001, bp * 1.1), 0.92);

      renderer.render(scene, camera);
    };
    render();

    return () => {
      clearTimeout(blinkTimer);
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // ── Mouse Tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const container = mountRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.42;

      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth * 0.5)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * 0.5)));

      targetRotY.current = nx * 0.44;
      targetRotX.current = ny * 0.32;
      targetPupilX.current = nx * 0.055;
      targetPupilY.current = -ny * 0.04;
    };

    const handleLeave = () => {
      targetRotX.current = 0;
      targetRotY.current = 0;
      targetPupilX.current = 0;
      targetPupilY.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ aspectRatio: '4 / 5' }}
    >
      {/* Orange ambient back-glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 55%, rgba(254,128,64,0.14) 0%, transparent 70%)',
        }}
      />

      {/* Three.js WebGL canvas — transparent background, no border */}
      <div ref={mountRef} className="w-full h-full" style={{ background: 'transparent' }} />
    </div>
  );
}
