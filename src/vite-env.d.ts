/// <reference types="vite/client" />


// vite env types
interface ImportMetaEnv {
  readonly VITE_GITHUB_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
