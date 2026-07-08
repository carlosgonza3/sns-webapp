import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
    base: isGitHubPages ? '/sns-webapp/' : '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});