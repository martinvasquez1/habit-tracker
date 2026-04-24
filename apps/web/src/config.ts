const runtime = window.__ENV__ || {};

export const config = {
    VITE_API_URL: runtime.VITE_API_URL || import.meta.env.VITE_API_URL,

    VITE_DEV_PORT: import.meta.env.VITE_DEV_PORT,

    VITE_PREVIEW_PORT: import.meta.env.VITE_PREVIEW_PORT,

    NODE_ENV: import.meta.env.NODE_ENV,
};