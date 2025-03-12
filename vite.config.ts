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
        start_url: 'https://leegee.github.io/' + base,
        name: 'Learn Old English',
        short_name: 'Old English',
        description: 'Old English Learning',
        orientation: "portrait",
        theme_color: '#000033',
        icons: [
          {
            src: base + 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: base + 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: base + "icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          }
        ],
      },

      pwaAssets: {
        image: 'public/icons/icon-512x512.jpg'
      },
    }),
  ],


});
