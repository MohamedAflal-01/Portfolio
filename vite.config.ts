import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Emit pre-compressed Brotli and gzip files alongside assets.
    // Static servers (Vercel, Nginx, Cloudflare) can serve these directly.
    compression({ algorithms: ['brotliCompress'], exclude: [/\.(png|jpe?g|webp|gif|svg|woff2?)$/i] }),
    compression({ algorithms: ['gzip'], exclude: [/\.(png|jpe?g|webp|gif|svg|woff2?)$/i] }),
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['both-velocity-levels-joan.trycloudflare.com'],
  },
  build: {
    // Split large dependencies into separate async chunks so the initial
    // bundle is as small as possible and browsers can cache each vendor chunk
    // independently across deploys.
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js is the heaviest dependency (~520 KB min). It is only
          // needed by the 3D components which are all lazily loaded, so it
          // will be fetched in parallel with — not before — the initial HTML.
          if (id.includes('node_modules/three')) {
            return 'three-vendor';
          }
          // Framer Motion (~130 KB min). Splits out animation runtime.
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-vendor';
          }
          // React + ReactDOM — stable across every deploy.
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor';
          }
          // Lucide icon tree-shakes well but still meaningful at scale.
          if (id.includes('node_modules/lucide-react')) {
            return 'icons-vendor';
          }
        },
      },
    },
  },
})
