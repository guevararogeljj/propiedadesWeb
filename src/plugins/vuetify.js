/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'
// Composables
import { createVuetify } from 'vuetify'
import 'bootstrap/scss/bootstrap.scss'

import '@/assets/css/font-awesome-pro.css'
import '@/assets/css/flaticon_shofy.css'
import '@/assets/scss/main.scss'

export default createVuetify({
  components: {
    VSkeletonLoader
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
      fonts: {
        body: 'Roboto, sans-serif',
      },
    },
    fonts: {
      body: 'Roboto, sans-serif',
    },
  },
})
