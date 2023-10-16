/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import WebFont from "webfontloader";
import store from '@/store';
export function registerPlugins (app) {
  WebFont.load({
    google: {
      families: ['Titillium Web:300,400,700', 'sans-serif']
    }
  });
  app
  .use(store)
    .use(vuetify)
    .use(router)
    .use(VueSweetalert2)
    .use(WebFont);
    
}
