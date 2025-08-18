import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import { env } from 'process';

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7074';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    base: "https://kind-dune-0e0721310.2.azurestaticapps.net/",
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api': {
                target,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        },
        port: parseInt(env.DEV_SERVER_PORT || '58896')
    }
})
