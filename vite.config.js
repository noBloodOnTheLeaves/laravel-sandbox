import { defineConfig } from 'vite'
import laravel, { refreshPaths } from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        hmr: {
            host: 'localhost',
            watch: {
                usePolling: true,
            },
        },
    },
    ssr: {
        noExternal: [
            'laravel-vite-plugin',
            '@inertiajs/server'
        ],
    },
})
