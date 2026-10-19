import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BootGlobeProps {
  progress: number;
  isExpanding?: boolean;
  reducedMotion?: boolean;
  className?: string;
}

export const BootGlobe: React.FC<BootGlobeProps> = ({
  progress,
  isExpanding = false,
  reducedMotion = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    rootGroup: THREE.Group;
    wireframeMesh: THREE.Mesh;
    wireframeMat: THREE.MeshBasicMaterial;
    orbitRing1: THREE.LineLoop;
    orbitRing2: THREE.LineLoop;
    particlesMesh: THREE.Points;
    particlesMat: THREE.PointsMaterial;
    coreMesh: THREE.Mesh;
    coreMat: THREE.MeshStandardMaterial;
    glowMesh: THREE.Mesh;
    glowMat: THREE.ShaderMaterial;
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    reqId: number;
  } | null>(null);

  const progressRef = useRef(progress);
  const isExpandingRef = useRef(isExpanding);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    isExpandingRef.current = isExpanding;
  }, [isExpanding]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Core Sphere (deep dark sphere with high roughness)
    const coreGeo = new THREE.SphereGeometry(1.0, 36, 36);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x07090e,
      roughness: 0.85,
      metalness: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Wireframe digital shell (delicate silver-blue lines)
    const wireGeo = new THREE.IcosahedronGeometry(1.15, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.0, // fades in with progress
    });
    const wireframeMesh = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wireframeMesh);

    // 3. Digital vertex node points
    const ptsGeo = new THREE.IcosahedronGeometry(1.15, 3);
    const particlesMat = new THREE.PointsMaterial({
      color: 0xe2e8f0,
      size: 2.2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.0,
    });
    const particlesMesh = new THREE.Points(ptsGeo, particlesMat);
    rootGroup.add(particlesMesh);

    // 4. Subtle orbital latitude rings
    const createOrbitRing = (radius: number, tiltX: number, tiltY: number) => {
      const ringPts: THREE.Vector3[] = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringMat = new THREE.LineBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.0,
      });
      const ring = new THREE.LineLoop(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const orbitRing1 = createOrbitRing(1.3, 0.4, 0.2);
    const orbitRing2 = createOrbitRing(1.22, -0.6, 0.5);
    rootGroup.add(orbitRing1);
    rootGroup.add(orbitRing2);

    // 5. Soft glowing rim / atmosphere shader
    const glowGeo = new THREE.SphereGeometry(1.22, 32, 32);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float uIntensity;
        uniform float uGlowBoost;
        void main() {
          float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          vec3 rimColor = mix(vec3(0.58, 0.77, 1.0), vec3(0.9, 0.95, 1.0), uGlowBoost);
          gl_FragColor = vec4(rimColor, 1.0) * rim * uIntensity;
        }
      `,
      uniforms: {
        uIntensity: { value: 0.0 },
        uGlowBoost: { value: 0.0 },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    rootGroup.add(glowMesh);

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3, 2, 2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-3, -1.5, -1);
    scene.add(rimLight);

    let reqId = 0;
    let clock = 0;
    let currentScale = 1.0;

    const animate = () => {
      const prog = progressRef.current;
      const isExp = isExpandingRef.current;
      const redMot = reducedMotionRef.current;

      // Opacity calculation based on progress
      // 0–15%: globe fades in smoothly
      const targetOpacity = Math.min(prog / 15, 1.0);
      wireMat.opacity = targetOpacity * 0.35;
      particlesMat.opacity = targetOpacity * 0.6;
      (orbitRing1.material as THREE.LineBasicMaterial).opacity = targetOpacity * 0.2;
      (orbitRing2.material as THREE.LineBasicMaterial).opacity = targetOpacity * 0.15;

      // 80–95%: slight brightness and rim boost
      const brightnessBoost = prog >= 80 ? Math.min((prog - 80) / 15, 1.0) : 0;
      glowMat.uniforms.uIntensity.value = targetOpacity * (0.45 + brightnessBoost * 0.4);
      glowMat.uniforms.uGlowBoost.value = brightnessBoost;
      keyLight.intensity = 2.0 + brightnessBoost * 1.5;
      rimLight.intensity = 1.2 + brightnessBoost * 1.0;

      // Rotation
      if (!redMot) {
        rootGroup.rotation.y += 0.0018;
        orbitRing1.rotation.z += 0.0012;
        orbitRing2.rotation.z -= 0.001;

        // Micro float
        clock += 0.015;
        rootGroup.position.y = Math.sin(clock) * 0.03;
      }

      // Smooth camera rush / expansion during final transition
      if (isExp) {
        currentScale = THREE.MathUtils.lerp(currentScale, 4.2, 0.055);
        rootGroup.scale.set(currentScale, currentScale, currentScale);
        wireMat.opacity = Math.max(0, wireMat.opacity - 0.018);
        particlesMat.opacity = Math.max(0, particlesMat.opacity - 0.02);
      } else {
        // Very subtle scale progression 0.95 -> 1.05 as boot loads
        const baseScale = 0.95 + (prog / 100) * 0.08;
        currentScale = THREE.MathUtils.lerp(currentScale, baseScale, 0.05);
        rootGroup.scale.set(currentScale, currentScale, currentScale);
      }

      renderer.render(scene, camera);

      if (!redMot || isExp) {
        reqId = requestAnimationFrame(animate);
      }
    };

    if (reducedMotion) {
      // Render single initial frame
      wireMat.opacity = 0.35;
      particlesMat.opacity = 0.6;
      glowMat.uniforms.uIntensity.value = 0.5;
      renderer.render(scene, camera);
    } else {
      reqId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth || 360;
      const h = containerRef.current.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      rootGroup,
      wireframeMesh,
      wireframeMat: wireMat,
      orbitRing1,
      orbitRing2,
      particlesMesh,
      particlesMat,
      coreMesh,
      coreMat,
      glowMesh,
      glowMat,
      keyLight,
      rimLight,
      reqId,
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ptsGeo.dispose();
      particlesMat.dispose();
      orbitRing1.geometry.dispose();
      (orbitRing1.material as THREE.Material).dispose();
      orbitRing2.geometry.dispose();
      (orbitRing2.material as THREE.Material).dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}>
      <div ref={containerRef} className="w-full h-full max-w-[420px] max-h-[420px]" />
    </div>
  );
};
