"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CENTER = new THREE.Vector3(0, 0, 0);
const STREAM_ORIGINS = [
  new THREE.Vector3(-4.9, 0.38, -1.15),
  new THREE.Vector3(4.7, -0.18, -0.85),
  new THREE.Vector3(-3.25, -2.35, 0.62),
  new THREE.Vector3(2.65, 2.25, -0.18),
  new THREE.Vector3(-0.12, 2.95, -2.45),
  new THREE.Vector3(0.24, -2.75, 1.28),
];
const STREAM_CONTROLS = [
  new THREE.Vector3(-2.5, 0.86, -0.58),
  new THREE.Vector3(2.35, -0.72, -0.4),
  new THREE.Vector3(-1.64, -1.28, 0.16),
  new THREE.Vector3(1.35, 1.18, -0.38),
  new THREE.Vector3(-0.58, 1.62, -1.22),
  new THREE.Vector3(0.72, -1.46, 0.76),
];
const EXPANSION_TARGETS = [
  new THREE.Vector3(-2.25, 1.25, -0.72),
  new THREE.Vector3(2.34, 1.08, -0.55),
  new THREE.Vector3(-2.1, -1.36, 0.45),
  new THREE.Vector3(2.04, -1.28, 0.58),
  new THREE.Vector3(0.16, 2.12, -1.26),
  new THREE.Vector3(-0.32, -2.08, 1.08),
  new THREE.Vector3(1.32, 0.34, 1.42),
  new THREE.Vector3(-1.48, -0.24, 1.18),
];

function smooth(value: number) {
  return value * value * (3 - 2 * value);
}

function quadraticPoint(
  start: THREE.Vector3,
  control: THREE.Vector3,
  end: THREE.Vector3,
  t: number,
  target: THREE.Vector3,
) {
  const inv = 1 - t;
  target.set(
    inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x,
    inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y,
    inv * inv * start.z + 2 * inv * t * control.z + t * t * end.z,
  );
}

function Rail({ from, to, index }: { from: THREE.Vector3; to: THREE.Vector3; index: number }) {
  const transform = useMemo(() => {
    const midpoint = from.clone().add(to).multiplyScalar(0.5);
    const direction = to.clone().sub(from);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    );

    return { midpoint, quaternion, length };
  }, [from, to]);

  return (
    <group>
      <mesh position={transform.midpoint} quaternion={transform.quaternion}>
        <cylinderGeometry args={[0.052, 0.052, transform.length, 18, 1, true]} />
        <meshStandardMaterial
          color={index % 2 === 0 ? "#1b5d8f" : "#23324f"}
          emissive="#0a6fb2"
          emissiveIntensity={0.18}
          metalness={0.75}
          opacity={0.22}
          roughness={0.18}
          transparent
        />
      </mesh>
      <mesh position={transform.midpoint} quaternion={transform.quaternion}>
        <cylinderGeometry args={[0.108, 0.108, transform.length, 24, 1, true]} />
        <meshStandardMaterial
          color="#7dd3fc"
          emissive="#0ea5e9"
          emissiveIntensity={0.08}
          opacity={0.055}
          roughness={0.06}
          transparent
        />
      </mesh>
    </group>
  );
}

function DataStreams() {
  const particleCount = 1_180;
  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(new Float32Array(particleCount * 3), 3));
    return buffer;
  }, []);
  const seeds = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        stream: index % STREAM_ORIGINS.length,
        phase: ((index * 0.61803398875) % 1 + (index % 11) * 0.017) % 1,
        lane: index * 1.731,
        radius: 0.035 + (index % 7) * 0.012,
        speed: 0.72 + (index % 13) * 0.018,
      })),
    [],
  );
  const temp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const positions = geometry.attributes.position.array as Float32Array;
    const elapsed = clock.elapsedTime;

    seeds.forEach((seed, index) => {
      const phase = (seed.phase + elapsed * 0.074 * seed.speed) % 1;
      const offset = index * 3;

      if (phase < 0.74) {
        const local = smooth(phase / 0.74);
        quadraticPoint(
          STREAM_ORIGINS[seed.stream],
          STREAM_CONTROLS[seed.stream],
          CENTER,
          local,
          temp,
        );
        const funnel = (1 - local * 0.78) * seed.radius;
        temp.x += Math.cos(seed.lane + local * 12.4) * funnel;
        temp.y += Math.sin(seed.lane * 0.73 + local * 9.1) * funnel;
        temp.z += Math.sin(seed.lane + local * 8.6) * funnel * 1.45;
      } else {
        const local = smooth((phase - 0.74) / 0.26);
        const target = EXPANSION_TARGETS[(index + seed.stream) % EXPANSION_TARGETS.length];
        temp.lerpVectors(CENTER, target, local);
        temp.x += Math.cos(seed.lane + elapsed * 0.34) * 0.035;
        temp.y += Math.sin(seed.lane + elapsed * 0.26) * 0.035;
      }

      positions[offset] = temp.x;
      positions[offset + 1] = temp.y;
      positions[offset + 2] = temp.z;
    });

    geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geometry}>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        color="#bff7ff"
        depthWrite={false}
        opacity={0.86}
        size={0.026}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function IntelligenceCore() {
  const coreRef = useRef<THREE.Mesh | null>(null);
  const innerRef = useRef<THREE.Mesh | null>(null);
  const ringARef = useRef<THREE.Mesh | null>(null);
  const ringBRef = useRef<THREE.Mesh | null>(null);
  const ringCRef = useRef<THREE.Mesh | null>(null);
  const nodeMeshRef = useRef<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nodeSeeds = useMemo(
    () =>
      Array.from({ length: 88 }, (_, index) => {
        const theta = index * 2.399963;
        const phi = Math.acos(1 - 2 * ((index + 0.5) / 88));
        return {
          theta,
          phi,
          radius: 0.58 + (index % 5) * 0.045,
          size: 0.018 + (index % 6) * 0.004,
          phase: index * 0.37,
        };
      }),
    [],
  );
  const locks = useMemo(() => Array.from({ length: 20 }, (_, index) => index), []);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y = elapsed * 0.18;
      coreRef.current.rotation.x = Math.sin(elapsed * 0.34) * 0.08;
      const pulse = 1 + Math.sin(elapsed * 1.28) * 0.035;
      coreRef.current.scale.setScalar(pulse);
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -elapsed * 0.24;
      innerRef.current.rotation.z = elapsed * 0.12;
    }
    if (ringARef.current) ringARef.current.rotation.z = elapsed * 0.18;
    if (ringBRef.current) ringBRef.current.rotation.y = elapsed * -0.15;
    if (ringCRef.current) ringCRef.current.rotation.x = elapsed * 0.11;

    if (nodeMeshRef.current) {
      nodeSeeds.forEach((seed, index) => {
        const radius = seed.radius + Math.sin(elapsed * 0.62 + seed.phase) * 0.035;
        dummy.position.set(
          Math.sin(seed.phi) * Math.cos(seed.theta + elapsed * 0.035) * radius,
          Math.cos(seed.phi) * radius * 0.86,
          Math.sin(seed.phi) * Math.sin(seed.theta + elapsed * 0.04) * radius,
        );
        const scale = seed.size * (1 + Math.sin(elapsed * 1.7 + seed.phase) * 0.22);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        nodeMeshRef.current?.setMatrixAt(index, dummy.matrix);
      });
      nodeMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {STREAM_ORIGINS.map((origin, index) => (
        <Rail from={origin} index={index} key={origin.x} to={CENTER} />
      ))}

      <mesh ref={ringARef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.012, 10, 160]} />
        <meshStandardMaterial color="#dffcff" emissive="#38bdf8" emissiveIntensity={0.86} metalness={0.48} />
      </mesh>
      <mesh ref={ringBRef} rotation={[0.55, 0.9, 0.12]}>
        <torusGeometry args={[1.42, 0.014, 10, 180]} />
        <meshStandardMaterial color="#60a5fa" emissive="#2563eb" emissiveIntensity={0.62} metalness={0.7} />
      </mesh>
      <mesh ref={ringCRef} rotation={[0.2, -0.62, 1.45]}>
        <torusGeometry args={[1.74, 0.01, 8, 180]} />
        <meshStandardMaterial color="#a5b4fc" emissive="#7c3aed" emissiveIntensity={0.32} metalness={0.78} />
      </mesh>

      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.78, 3]} />
        <meshStandardMaterial
          color="#dffcff"
          emissive="#22d3ee"
          emissiveIntensity={1.35}
          metalness={0.18}
          opacity={0.32}
          roughness={0.12}
          transparent
          wireframe
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial
          color="#f8fdff"
          emissive="#60a5fa"
          emissiveIntensity={1.8}
          metalness={0.26}
          opacity={0.54}
          roughness={0.08}
          transparent
        />
      </mesh>

      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, 88]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          blending={THREE.AdditiveBlending}
          color="#e0fbff"
          emissive="#22d3ee"
          emissiveIntensity={1.3}
          opacity={0.88}
          transparent
        />
      </instancedMesh>

      {locks.map((index) => {
        const angle = (index / locks.length) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 1.72, Math.sin(angle * 2) * 0.08, Math.sin(angle) * 1.72]}
            rotation={[0.18, -angle, 0.08]}
          >
            <boxGeometry args={[0.18, 0.032, 0.07]} />
            <meshStandardMaterial
              color="#cbd5e1"
              emissive={index % 3 === 0 ? "#38bdf8" : "#1e40af"}
              emissiveIntensity={index % 3 === 0 ? 0.42 : 0.12}
              metalness={0.88}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      <pointLight color="#67e8f9" distance={5.2} intensity={18} position={[0, 0.25, 0.8]} />
    </group>
  );
}

function ExpansionNetwork() {
  const groupRef = useRef<THREE.Group | null>(null);
  const nodePositions = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => {
        const theta = index * 2.399963;
        const phi = Math.acos(1 - 2 * ((index + 0.5) / 26));
        const radius = 2.08 + (index % 4) * 0.22;
        return new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * radius,
          Math.cos(phi) * radius * 0.76,
          Math.sin(phi) * Math.sin(theta) * radius,
        );
      }),
    [],
  );
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    nodePositions.forEach((point, index) => {
      const next = nodePositions[(index + 5) % nodePositions.length];
      const near = nodePositions[(index + 9) % nodePositions.length];
      positions.push(point.x, point.y, point.z, next.x, next.y, next.z);
      if (index % 2 === 0) {
        positions.push(point.x, point.y, point.z, near.x, near.y, near.z);
      }
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [nodePositions]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsed = clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * 0.035;
    groupRef.current.rotation.x = Math.sin(elapsed * 0.18) * 0.035;
    const scale = 1 + Math.sin(elapsed * 0.42) * 0.025;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          blending={THREE.AdditiveBlending}
          color="#93c5fd"
          opacity={0.2}
          transparent
        />
      </lineSegments>
      {nodePositions.map((position, index) => (
        <mesh key={`${position.x}-${index}`} position={position}>
          <octahedronGeometry args={[index % 3 === 0 ? 0.105 : 0.065, 0]} />
          <meshStandardMaterial
            color={index % 4 === 0 ? "#ddd6fe" : "#bfdbfe"}
            emissive={index % 4 === 0 ? "#7c3aed" : "#38bdf8"}
            emissiveIntensity={0.65}
            metalness={0.35}
            roughness={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}

function EngineScene() {
  const sceneRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!sceneRef.current) return;
    const elapsed = clock.elapsedTime;
    sceneRef.current.rotation.y = pointer.x * 0.16 + Math.sin(elapsed * 0.09) * 0.05;
    sceneRef.current.rotation.x = -pointer.y * 0.08 + Math.sin(elapsed * 0.12) * 0.035;
    sceneRef.current.position.y = Math.sin(elapsed * 0.2) * 0.035;
  });

  return (
    <group ref={sceneRef} rotation={[0.05, -0.18, 0]}>
      <ambientLight color="#c7d2fe" intensity={0.8} />
      <directionalLight color="#eff6ff" intensity={2.8} position={[3.6, 4.2, 5.4]} />
      <pointLight color="#2563eb" distance={9} intensity={8} position={[-3.6, -2.2, 2.4]} />
      <DataStreams />
      <ExpansionNetwork />
      <IntelligenceCore />
    </group>
  );
}

function ReducedMotionCore() {
  return (
    <div className="hero-static-core" aria-hidden="true">
      <span className="hero-static-core__ring hero-static-core__ring--outer" />
      <span className="hero-static-core__ring hero-static-core__ring--middle" />
      <span className="hero-static-core__ring hero-static-core__ring--inner" />
      <span className="hero-static-core__beam hero-static-core__beam--left" />
      <span className="hero-static-core__beam hero-static-core__beam--right" />
      <span className="hero-static-core__beam hero-static-core__beam--top" />
      <span className="hero-static-core__beam hero-static-core__beam--bottom" />
      <span className="hero-static-core__core" />
    </div>
  );
}

export function Hero3D() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="hero-machine relative h-[460px] w-full sm:h-[620px] lg:h-[760px]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_47%,rgba(34,211,238,0.22),transparent_27%),radial-gradient(circle_at_68%_32%,rgba(79,70,229,0.16),transparent_22%)] blur-2xl" />
      {reducedMotion ? (
        <ReducedMotionCore />
      ) : (
        <Canvas
          camera={{ fov: 42, position: [0, 0.18, 6.5] }}
          className="relative z-10"
          dpr={[1, 1.55]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <fog attach="fog" args={["#05070d", 5.8, 11.5]} />
          <EngineScene />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-x-[13%] top-[47%] z-20 h-px bg-gradient-to-r from-transparent via-cyan-100/45 to-transparent" />
      <div className="pointer-events-none absolute inset-y-[18%] left-1/2 z-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-blue-200/24 to-transparent" />
    </div>
  );
}
