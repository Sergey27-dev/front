/// <reference types="vite/client" />

// noinspection JSUnusedGlobalSymbols
interface ImportMetaEnv {
    VITE_APP_NAME?: string;

    VITE_API_PROTOCOL?: string;
    VITE_API_HOST?: string;
    VITE_API_PATH?: string;

    VITE_DEFAULT_LOCALE?: string;
    VITE_FALLBACK_LOCALE?: string;
}
