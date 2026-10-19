import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroCube: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 3.8);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Helper to generate textures for each face with technical typographic labels
    const createFaceTexture = (text: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Dark metallic gradient background
        const grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#0c0c10');
        grad.addColorStop(0.5, '#16161f');
        grad.addColorStop(1, '#08080a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Tech grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(30, 30, 452, 452);
        ctx.strokeRect(60, 60, 392, 392);

        // Corner crosshairs
        const drawCross = (cx: number, cy: number) => {
          ctx.beginPath();
          ctx.moveTo(cx - 10, cy);
          ctx.lineTo(cx + 10, cy);
          ctx.moveTo(cx, cy - 10);
          ctx.lineTo(cx, cy + 10);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.stroke();
        };
        drawCross(45, 45);
        drawCross(467, 45);
        drawCross(45, 467);
        drawCross(467, 467);

        // Face text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px "Space Grotesk", "JetBrains Mono", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '8px';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.shadowBlur = 15;
        ctx.fillText(text, 256, 256);

        // Small subtext
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.letterSpacing = '3px';
        ctx.shadowBlur = 0;
        ctx.fillText('// AFLAL.CORE', 256, 310);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const textMaterials = [
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('IDEAS'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('CODE'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('CREATIVITY'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('SYSTEMS'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('FUTURE'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
      new THREE.MeshPhysicalMaterial({ map: createFaceTexture('PRECISION'), roughness: 0.15, metalness: 0.85, clearcoat: 1.0, clearcoatRoughness: 0.1, transparent: true, opacity: 0.92 }),
    ];

    // Main Cube
    const cubeGeo = new THREE.BoxGeometry(1.35, 1.35, 1.35);
    const cubeMesh = new THREE.Mesh(cubeGeo, textMaterials);
    cubeGroup.add(cubeMesh);

    // Glowing silver edges
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2,
      transparent: true,
      opacity: 0.75,
    });
    const edgeLines = new THREE.LineSegments(edgesGeo, edgesMat);
    cubeGroup.add(edgeLines);

    // Outer wireframe cage for futuristic depth
    const cageGeo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xd0d0e0,
      transparent: true,
      opacity: 0.18,
    });
    const cageMesh = new THREE.LineSegments(cageEdges, cageMat);
    cubeGroup.add(cageMesh);

    // Floor reflection disk
    const floorGeo = new THREE.CircleGeometry(1.6, 32);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      side: THREE.DoubleSide,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.3;
    scene.add(floorMesh);

    // Ring light on floor
    const ringGeo = new THREE.RingGeometry(1.4, 1.55, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.3;
    scene.add(ringMesh);

    // Lighting
    const pointLight = new THREE.PointLight(0xffffff, 4, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x8899bb, 3, 10);
    pointLight2.position.set(-3, -2, -2);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Mouse tracking
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Gentle auto-rotation
      cubeMesh.rotation.x += 0.005;
      cubeMesh.rotation.y += 0.007;
      
      cageMesh.rotation.x -= 0.003;
      cageMesh.rotation.y -= 0.004;

      // Floating wave
      cubeGroup.position.y = Math.sin(time) * 0.08;

      // Mouse Parallax easing
      cubeGroup.rotation.y += (targetX - cubeGroup.rotation.y) * 0.05;
      cubeGroup.rotation.x += (targetY - cubeGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      cubeGeo.dispose();
      textMaterials.forEach(m => m.dispose());
      edgesGeo.dispose();
      edgesMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      {/* Background radial glow */}
      <div className="absolute w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div ref={containerRef} className="w-full h-full min-h-[360px] min-w-[300px]" />
    </div>
  );
};
