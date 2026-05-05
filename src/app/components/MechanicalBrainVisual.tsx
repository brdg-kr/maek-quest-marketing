"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type FlowParticle = {
  phase: number;
  speed: number;
  source: THREE.Vector3;
  gate: THREE.Vector3;
  core: THREE.Vector3;
  idea: THREE.Vector3;
  color: THREE.Color;
};

const coreTargets = [
  new THREE.Vector3(-0.45, 0.34, 0.08),
  new THREE.Vector3(0.24, 0.06, -0.2),
  new THREE.Vector3(-0.06, -0.48, 0.24),
  new THREE.Vector3(0.58, 0.4, 0.18),
];

function seeded(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453123;
  return value - Math.floor(value);
}

function mixVectors(a: THREE.Vector3, b: THREE.Vector3, t: number) {
  return a.clone().multiplyScalar(1 - t).add(b.clone().multiplyScalar(t));
}

function quadraticPoint(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, t: number) {
  const ab = mixVectors(a, b, t);
  const bc = mixVectors(b, c, t);
  return mixVectors(ab, bc, t);
}

function makeLine(points: THREE.Vector3[], color: number, opacity: number) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Line(geometry, material);
}

export function MechanicalBrainVisual() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0.4, 0.24, 9.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.x = -0.08;
    scene.add(root);

    scene.add(new THREE.AmbientLight(0x7dd3fc, 0.45));

    const keyLight = new THREE.PointLight(0xf8fafc, 54, 24);
    keyLight.position.set(-3.6, 3.8, 5.2);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 48, 20);
    cyanLight.position.set(3.6, 1.8, 3.4);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xf5d784, 30, 18);
    goldLight.position.set(-4.8, -2.2, 3.8);
    scene.add(goldLight);

    const metal = new THREE.MeshStandardMaterial({
      color: 0x9aa7b6,
      metalness: 0.92,
      roughness: 0.26,
      emissive: 0x071119,
      emissiveIntensity: 0.28,
    });

    const darkMetal = new THREE.MeshStandardMaterial({
      color: 0x263241,
      metalness: 0.96,
      roughness: 0.18,
      emissive: 0x020a0d,
      emissiveIntensity: 0.36,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: 0x9be8ff,
      metalness: 0.08,
      roughness: 0.14,
      transmission: 0.56,
      transparent: true,
      opacity: 0.16,
      emissive: 0x0f5364,
      emissiveIntensity: 0.52,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const coreGlow = new THREE.MeshBasicMaterial({
      color: 0xdffcff,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const gate = new THREE.Group();
    gate.position.set(-2.9, 0, 0);
    gate.rotation.y = Math.PI / 2.8;
    root.add(gate);

    const ringGeometry = new THREE.TorusGeometry(1.48, 0.042, 18, 180);
    for (let i = 0; i < 5; i += 1) {
      const ring = new THREE.Mesh(ringGeometry, i % 2 === 0 ? metal : darkMetal);
      ring.scale.setScalar(1 + i * 0.16);
      ring.rotation.x = i * 0.18;
      ring.rotation.y = i * 0.24;
      gate.add(ring);
    }

    const toothGeometry = new THREE.BoxGeometry(0.08, 0.26, 0.16);
    for (let i = 0; i < 36; i += 1) {
      const tooth = new THREE.Mesh(toothGeometry, metal);
      const angle = (i / 36) * Math.PI * 2;
      tooth.position.set(Math.cos(angle) * 2.02, Math.sin(angle) * 2.02, 0);
      tooth.rotation.z = angle;
      gate.add(tooth);
    }

    const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 2.65, 32), darkMetal);
    axle.rotation.z = Math.PI / 2;
    axle.position.x = -0.3;
    gate.add(axle);

    const brain = new THREE.Group();
    brain.position.set(0.52, 0, 0.1);
    root.add(brain);

    const shell = new THREE.Mesh(new THREE.SphereGeometry(1.46, 64, 64), glass);
    shell.scale.set(1.18, 0.82, 0.72);
    brain.add(shell);

    const shellWire = new THREE.Mesh(
      new THREE.SphereGeometry(1.47, 32, 20),
      new THREE.MeshBasicMaterial({
        color: 0x9be8ff,
        transparent: true,
        opacity: 0.12,
        wireframe: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    shellWire.scale.copy(shell.scale);
    brain.add(shellWire);

    const coreGroup = new THREE.Group();
    brain.add(coreGroup);

    coreTargets.forEach((target, index) => {
      const core = new THREE.Mesh(new THREE.SphereGeometry(index === 0 ? 0.22 : 0.16, 32, 32), coreGlow);
      core.position.copy(target);
      coreGroup.add(core);

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(index === 0 ? 0.38 : 0.28, 0.01, 10, 90),
        new THREE.MeshBasicMaterial({
          color: index % 2 === 0 ? 0x67e8f9 : 0xf4d37e,
          transparent: true,
          opacity: 0.48,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      halo.position.copy(target);
      halo.rotation.x = Math.PI / 2.2;
      halo.rotation.y = index * 0.7;
      coreGroup.add(halo);
    });

    const nodeGeometry = new THREE.SphereGeometry(0.038, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf4fbff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < 32; i += 1) {
      const theta = seeded(i) * Math.PI * 2;
      const radius = 0.36 + seeded(i + 20) * 1.0;
      const y = (seeded(i + 40) - 0.5) * 1.34;
      const z = (seeded(i + 60) - 0.5) * 0.88;
      const position = new THREE.Vector3(Math.cos(theta) * radius * 0.88, y, Math.sin(theta) * radius * 0.58 + z * 0.42);
      nodes.push(position);

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(position);
      brain.add(node);
      nodeMeshes.push(node);
    }

    const networkMaterial = new THREE.LineBasicMaterial({
      color: 0x9be8ff,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < 0.64 && seeded(i * 37 + j * 17) > 0.28) {
          const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]), networkMaterial);
          brain.add(line);
        }
      }
    }

    const orbital = new THREE.Group();
    root.add(orbital);
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x8feaff,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < 7; i += 1) {
      const orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 150 }, (_, step) => {
            const angle = (step / 149) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(angle) * (2.1 + i * 0.32), Math.sin(angle) * (0.76 + i * 0.12), Math.sin(angle * 2 + i) * 0.18);
          }),
        ),
        orbitMaterial,
      );
      orbit.rotation.z = i * 0.18;
      orbit.rotation.y = -0.46 + i * 0.08;
      orbit.position.x = 0.28;
      orbital.add(orbit);
    }

    root.add(makeLine([new THREE.Vector3(-6.4, 1.7, -0.4), new THREE.Vector3(-3.8, 0.7, 0.12), new THREE.Vector3(-2.5, 0.18, 0.1)], 0x7dd3fc, 0.32));
    root.add(makeLine([new THREE.Vector3(-6.2, -1.45, 0.35), new THREE.Vector3(-3.8, -0.46, -0.12), new THREE.Vector3(-2.45, -0.2, -0.08)], 0xf5d784, 0.2));
    root.add(makeLine([new THREE.Vector3(1.3, 0.16, 0.02), new THREE.Vector3(3.4, 0.84, -0.24), new THREE.Vector3(6.3, 1.7, -0.52)], 0xb6f7ff, 0.3));
    root.add(makeLine([new THREE.Vector3(1.1, -0.2, 0.14), new THREE.Vector3(3.2, -0.7, 0.32), new THREE.Vector3(6.4, -1.35, 0.64)], 0xf4d37e, 0.2));

    const width = mount.clientWidth || 1200;
    const particleCount = width < 640 ? 520 : 960;
    const particles: FlowParticle[] = [];
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const lane = (seeded(i + 3) - 0.5) * 3.9;
      const source = new THREE.Vector3(-6.9 - seeded(i + 5) * 1.6, lane, (seeded(i + 7) - 0.5) * 1.7);
      const gatePoint = new THREE.Vector3(-2.9 + (seeded(i + 9) - 0.5) * 0.4, lane * 0.22, (seeded(i + 11) - 0.5) * 0.68);
      const core = coreTargets[Math.floor(seeded(i + 13) * coreTargets.length)].clone().add(new THREE.Vector3(0.52, 0, 0.1));
      const angle = -0.44 + seeded(i + 15) * 0.88;
      const radius = 4.1 + seeded(i + 17) * 2.7;
      const idea = new THREE.Vector3(2.2 + radius, Math.sin(angle) * 2.2 + (seeded(i + 19) - 0.5) * 0.5, Math.cos(angle) * 1.15);
      const color = new THREE.Color(seeded(i + 21) > 0.78 ? 0xf5d784 : seeded(i + 23) > 0.34 ? 0x9bf6ff : 0x83f7bd);

      particles.push({
        phase: seeded(i + 25),
        speed: 0.055 + seeded(i + 27) * 0.055,
        source,
        gate: gatePoint,
        core,
        idea,
        color,
      });

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: width < 640 ? 0.036 : 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    root.add(particleSystem);

    const clock = new THREE.Clock();
    let animationFrame = 0;
    let disposed = false;

    const resize = () => {
      const nextWidth = mount.clientWidth || 1;
      const nextHeight = mount.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.position.z = nextWidth < 680 ? 11.2 : 9.6;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      if (disposed) {
        return;
      }

      const elapsed = reducedMotion ? 7.2 : clock.getElapsedTime();
      const pulse = Math.sin(elapsed * 1.25) * 0.5 + 0.5;

      gate.rotation.z = elapsed * 0.12;
      gate.rotation.x = Math.sin(elapsed * 0.24) * 0.06;
      brain.rotation.y = Math.sin(elapsed * 0.28) * 0.18;
      brain.rotation.x = Math.cos(elapsed * 0.22) * 0.08;
      orbital.rotation.y = elapsed * 0.08;
      orbital.scale.setScalar(1 + pulse * 0.035);
      coreGroup.scale.setScalar(1 + pulse * 0.06);
      shellWire.rotation.y = elapsed * 0.06;
      shellWire.rotation.z = Math.sin(elapsed * 0.22) * 0.08;

      nodeMeshes.forEach((node, index) => {
        const scale = 1 + Math.sin(elapsed * 1.8 + index) * 0.28;
        node.scale.setScalar(scale);
      });

      particles.forEach((particle, index) => {
        const t = reducedMotion ? particle.phase : (particle.phase + elapsed * particle.speed) % 1;
        let position: THREE.Vector3;

        if (t < 0.62) {
          const local = t / 0.62;
          position = quadraticPoint(particle.source, particle.gate, particle.core, local);
        } else {
          const local = (t - 0.62) / 0.38;
          const eased = 1 - Math.pow(1 - local, 3);
          const lift = Math.sin(local * Math.PI) * 0.46;
          position = mixVectors(particle.core, particle.idea, eased);
          position.y += lift;
        }

        const shimmer = Math.sin(elapsed * 8 + index * 0.7) * 0.025;
        positions[index * 3] = position.x + shimmer;
        positions[index * 3 + 1] = position.y;
        positions[index * 3 + 2] = position.z - shimmer;
      });
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    resize();
    animate();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          object.geometry.dispose();

          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
