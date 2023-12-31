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

import store from '@/store';
import * as components from "vuetify/components"
export function registerPlugins (app) {
  app
  .use(store)
  .use(components)
    .use(vuetify)
    .use(router)
    .use(VueSweetalert2);    
}
