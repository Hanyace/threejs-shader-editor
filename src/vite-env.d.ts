/// <reference types="vite/client" />


// vite env types
interface ImportMetaEnv {
  readonly VITE_GITHUB_LINK: string;
  readonly VITE_TITLE: string;
  readonly VITE_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
