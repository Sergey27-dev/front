import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'url';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [
        vue(),

        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),

        Components({
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
        }),
    ],

    css: {
        preprocessorOptions: {
            scss: {
                additionalData: ['@use "./src/lib/element-plus/index.scss" as *;'],
            },
        },
    },

    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
