import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: ['.vue', '.js'],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '@/styles/variables.scss';
                    @import '@/styles/mixins.scss';
                `,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
});
