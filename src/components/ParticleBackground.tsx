import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 150, mousePosition }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    return [positions, velocities];
  }, [count]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry();
  }, []);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positionAttribute = meshRef.current.geometry.attributes.position;
    const posArray = positionAttribute.array as Float32Array;
    
    const linePositions: number[] = [];
    const connectionDistance = 2.5;
    const maxConnections = 3;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      posArray[i3] += velocities[i3];
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];
      
      // Mouse interaction
      const mouseX = mousePosition.current.x * 10;
      const mouseY = mousePosition.current.y * 10;
      const dx = posArray[i3] - mouseX;
      const dy = posArray[i3 + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) * 0.001;
        posArray[i3] += dx * force;
        posArray[i3 + 1] += dy * force;
      }
      
      // Boundary check
      if (Math.abs(posArray[i3]) > 10) velocities[i3] *= -1;
      if (Math.abs(posArray[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
      if (Math.abs(posArray[i3 + 2]) > 5) velocities[i3 + 2] *= -1;
      
      // Create connections
      let connections = 0;
      for (let j = i + 1; j < count && connections < maxConnections; j++) {
        const j3 = j * 3;
        const distX = posArray[i3] - posArray[j3];
        const distY = posArray[i3 + 1] - posArray[j3 + 1];
        const distZ = posArray[i3 + 2] - posArray[j3 + 2];
        const distance = Math.sqrt(distX * distX + distY * distY + distZ * distZ);
        
        if (distance < connectionDistance) {
          linePositions.push(
            posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
            posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
          );
          connections++;
        }
      }
    }
    
    positionAttribute.needsUpdate = true;
    
    if (linesRef.current) {
      lineGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
    }
    
    // Subtle rotation
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00f0ff"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
}

function ParticleBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ background: 'linear-gradient(135deg, #05050a 0%, #0a0a14 50%, #05050a 100%)' }}
    >
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={120} mousePosition={mousePosition} />
      </Canvas>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(0, 240, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(112, 0, 255, 0.08) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
}

export default ParticleBackground;
