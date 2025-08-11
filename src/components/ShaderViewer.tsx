import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useStore } from "@/store";
// import { GUI } from "dat.gui";

const ShaderViewer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    // const guiRef = useRef<dat.GUI | null>(null);
    const vertexShader = useStore((state) => state.vertexShader);
    const fragmentShader = useStore((state) => state.fragmentShader);
    const uniforms = useMemo(
        () => ({
            uTime: new THREE.Uniform(0),
        }),
        []
    );

    useEffect(() => {
        if (!meshRef.current) return;

        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.vertexShader = vertexShader;
        material.fragmentShader = fragmentShader;
        material.needsUpdate = true;
        // init uniforms
        uniforms.uTime.value = 0;
    }, [vertexShader, fragmentShader, uniforms.uTime]);

    // TODO: add gui with coustom uniforms
    /* useEffect(() => {
        guiRef.current = new GUI();
        const gui = guiRef.current;

        return () => {
            gui.destroy();
        };
    }, [uniforms]); */

    return (
        <div className="flex-3/5 m-2 rounded-lg overflow-hidden shadow-md">
            <Canvas ref={canvasRef} className="size-full">
                <OrbitControls enableDamping zoomSpeed={0.5} />
                <ambientLight intensity={0.5} />
                <InitMesh
                    uniforms={uniforms}
                    meshRef={meshRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                />
            </Canvas>
        </div>
    );
};

type InitMeshProps = {
    meshRef: React.RefObject<THREE.Mesh | null>;
    vertexShader: string;
    fragmentShader: string;
    uniforms: { [uniform: string]: THREE.IUniform };
};
const InitMesh = ({
    meshRef,
    vertexShader,
    fragmentShader,
    uniforms,
}: InitMeshProps) => {
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    useFrame((state) => {
        if (meshRef.current && materialRef.current) {
            uniforms.uTime.value = state.clock.getElapsedTime();
            materialRef.current.needsUpdate = true;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default ShaderViewer;
