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

// import '@/assets/css/font-awesome-pro.css'
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
          primary: '#1067AC',
          primary2: '#1283DE',
          primary3: '#379BEC',
          primary4: '#62B2F3',
          secondary: '#000000',
          secondary2: '#959DA4',
          secondary3: '#E0E2E4',
          alert1: '#EC3737',
          alert2: '#15DB29',
          alert3: '#662C80',
          alert4: '#DFC9E9',
          alert5: '#FFC101',
        },
      },
    },
  },
})
