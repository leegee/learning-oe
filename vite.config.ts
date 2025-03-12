import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import packageJson from './package.json';

const homepage = packageJson.homepage || '/';
const base = homepage ? (new URL(homepage)).pathname.replace(/\/?$/, '/') : '/';

console.info(['='.repeat(30), 'Base: ' + base, "=".repeat(30)].join("\n"))

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Learn Old English',
        short_name: 'Old English',
        description: 'Old English Learning',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      pwaAssets: {
        image: 'public/icons/icon-512x512.jpg'
      },
    }),
  ],


});
