// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
// import vitePluginRequire from 'vite-plugin-require'
// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import requireTransform from 'vite-plugin-require-transform';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    requireTransform({})
    // vitePluginRequire(),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    middleware: (app) => {
      app.use((req, res, next) => {
        // Handle the custom route for 404 error
        if (req.originalUrl === '@/components/shared/pages/404.vue') {
          res.statusCode = 404;
          res.end('Custom 404 Page');
        } else {
          next();
        }
      });
    },
    port: 8080,
  },
})
