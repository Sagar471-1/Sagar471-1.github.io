import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const scrollState = { y: 0, progress: 0 };

function updateScroll() {
    scrollState.y = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = maxScroll > 0 ? scrollState.y / maxScroll : 0;
}

// Shared geometries — created once, reused across all meshes
const SHARED_GEOMETRIES = [
    new THREE.OctahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.7, 0.25, 8, 24),       // reduced segments (was 16, 48)
    new THREE.TorusKnotGeometry(0.6, 0.2, 32, 6, 2, 3), // reduced segments (was 64, 8)
    new THREE.ConeGeometry(0.7, 1.4, 6),
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.8, 6, 4),              // reduced segments (was 8, 6)
];

// Shared materials — created once, reused across meshes by type
const SHARED_MATERIALS = {
    glass: [
        new THREE.MeshStandardMaterial({ color: '#150B1F', roughness: 0.3, metalness: 0.3, transparent: true, opacity: 0.12 }),
        new THREE.MeshStandardMaterial({ color: '#1a0f2e', roughness: 0.3, metalness: 0.3, transparent: true, opacity: 0.14 }),
        new THREE.MeshStandardMaterial({ color: '#2B124C', roughness: 0.3, metalness: 0.3, transparent: true, opacity: 0.16 }),
        new THREE.MeshStandardMaterial({ color: '#3d1f4e', roughness: 0.3, metalness: 0.3, transparent: true, opacity: 0.15 }),
    ],
    metallic: [
        new THREE.MeshStandardMaterial({ color: '#2B124C', emissive: '#150B1F', emissiveIntensity: 0.1, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.18 }),
        new THREE.MeshStandardMaterial({ color: '#522B5B', emissive: '#2B124C', emissiveIntensity: 0.1, roughness: 0.2, metalness: 0.8, transparent: true, opacity: 0.2 }),
    ],
    emissive: [
        new THREE.MeshStandardMaterial({ color: '#522B5B', emissive: '#2B124C', emissiveIntensity: 0.25, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.14 }),
        new THREE.MeshStandardMaterial({ color: '#854F6C', emissive: '#522B5B', emissiveIntensity: 0.25, roughness: 0.4, metalness: 0.5, transparent: true, opacity: 0.12 }),
    ],
};

function ShapeField() {
    const meshRefs = useRef([]);

    const shapes = useMemo(() => {
        const count = window.innerWidth < 768 ? 18 : 35; // reduced from 30/60
        const items = [];

        const materialTypes = ['glass', 'glass', 'glass', 'metallic', 'metallic', 'emissive'];

        for (let i = 0; i < count; i++) {
            const type = materialTypes[Math.floor(Math.random() * materialTypes.length)];
            const matArray = SHARED_MATERIALS[type];
            const material = matArray[Math.floor(Math.random() * matArray.length)];
            const scale = Math.random() * 0.8 + 0.4;

            items.push({
                id: i,
                geometry: SHARED_GEOMETRIES[Math.floor(Math.random() * SHARED_GEOMETRIES.length)],
                material,
                scale: [scale, scale, scale],
                baseScale: scale,
                position: [
                    (Math.random() - 0.5) * 40,
                    (Math.random() - 0.5) * 60,
                    (Math.random() - 0.5) * 20 - 5
                ],
                speed: Math.random() * 0.3 + 0.05,
                floatOffset: Math.random() * Math.PI * 2,
                floatAmplitude: Math.random() * 1.5 + 0.5,
                rotationAxis: [
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                ],
            });
        }
        return items;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const mouseX = state.mouse.x * 3;
        const mouseY = state.mouse.y * 3;
        const scrollOffset = scrollState.progress * 25;

        for (let i = 0; i < shapes.length; i++) {
            const mesh = meshRefs.current[i];
            if (!mesh) continue;

            const { position, speed, floatOffset, floatAmplitude, rotationAxis } = shapes[i];

            mesh.rotation.x += speed * rotationAxis[0] * 0.01;
            mesh.rotation.y += speed * rotationAxis[1] * 0.015;
            mesh.rotation.z += speed * rotationAxis[2] * 0.008;

            const floatY = Math.sin(t * speed * 1.5 + floatOffset) * floatAmplitude;
            const floatX = Math.cos(t * speed * 0.8 + floatOffset * 1.3) * floatAmplitude * 0.3;

            mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, position[0] + mouseX + floatX, 0.03);
            mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, position[1] + mouseY + scrollOffset + floatY, 0.03);

            // Subtle scale pulse on fewer shapes
            if (i % 7 === 0) {
                const pulse = 1 + Math.sin(t * 0.5 + floatOffset) * 0.08;
                mesh.scale.setScalar(shapes[i].baseScale * pulse);
            }
        }
    });

    return (
        <>
            {shapes.map((shape, i) => (
                <mesh
                    key={shape.id}
                    ref={el => meshRefs.current[i] = el}
                    position={shape.position}
                    scale={shape.scale}
                    geometry={shape.geometry}
                    material={shape.material}
                    frustumCulled
                />
            ))}
        </>
    );
}

function SceneContent() {
    return (
        <>
            <fog attach="fog" args={['#050205', 20, 45]} />
            <ambientLight intensity={0.15} />

            {/* Reduced from 4 to 2 point lights */}
            <pointLight position={[15, 15, 10]} intensity={1.5} color="#854F6C" distance={60} decay={2} />
            <pointLight position={[-15, -15, -5]} intensity={1} color="#522B5B" distance={50} decay={2} />

            <Stars radius={150} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
            <Sparkles count={60} scale={30} size={1} color="#854F6C" opacity={0.3} speed={0.3} />

            <ShapeField />
        </>
    );
}

export default function Background3D() {
    useEffect(() => {
        updateScroll();
        window.addEventListener('scroll', updateScroll, { passive: true });
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-[#050205]">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 50 }}
                gl={{ antialias: false, stencil: false, depth: true, powerPreference: 'high-performance', alpha: false }}
                dpr={[1, 1.25]}
                performance={{ min: 0.5 }}
            >
                <SceneContent />
            </Canvas>
        </div>
    );
}
