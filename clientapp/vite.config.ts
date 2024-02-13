import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: './auto-imports.d.ts',
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
      imports: ['vue', 'vue-router'],
    }),
    Components({
      dts: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7112',
        changeOrigin: true,
        secure: false,
      },
      '/swagger': {
        target: 'https://localhost:7112',
        changeOrigin: true,
        secure: false,
      },
      '/hub': {
        target: 'https://localhost:7112',
        // changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
