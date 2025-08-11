import { create } from "zustand";

// get initial color mode
const colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

type ColorMode = "light" | "dark";

type State = {
    colorMode: ColorMode;
    vertexShader: string;
    fragmentShader: string;
    setColorMode: (colorMode: ColorMode) => void;
    setVertexShader: (vertexShader: string) => void;
    setFragmentShader: (fragmentShader: string) => void;
};

export const useStore = create<State>((set) => ({
    colorMode: colorMode,
    vertexShader: /* glsl */ `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            gl_Position = projectedPosition;

            vUv = uv;
        }
    `,
    fragmentShader: /* glsl */ `
        uniform float uTime;
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `,
    setColorMode: (colorMode: ColorMode) => set({ colorMode }),
    setVertexShader: (vertexShader: string) => set({ vertexShader }),
    setFragmentShader: (fragmentShader: string) => set({ fragmentShader }),
}));
