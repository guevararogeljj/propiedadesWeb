// Composables
import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '@/components/shared/pages/404.vue'
import store from '@/store/index';
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: 'pokemon',
        name: 'Pokemon',
        component: () => import('@/views/PokemonView.vue'),  
      },
      { path: '/:notFound', component: NotFound },
      {
        path: 'frequentQuestions',
        name: 'FrequentQuestions',
        component: () => import('@/components/shared/frequentQuestions.vue'),
      },
      {
        path: 'termsAndConditions',
        name: 'TermsAndConditions',
        component: () => import('@/components/shared/termsConditions.vue'),
      },
      {
        path: 'us',
        name: 'us',
        component: () => import('@/components/shared/us.vue'),
      },
      {
        path: 'privacyPolicy',
        name: 'privacyPolicy',
        component: () => import('@/components/shared/privacy.vue'),
      },
      {
        path: '/propiedades',
        name: 'properties',
        component: () => import(/* webpackChunkName: "properties" */ '@/components/client/modulo01-listapropiedades/ListaPropiedades.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/information',
        name: 'information',
        component: () => import('@/views/client/PropertyInfo.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/components/client/modulo-registrar/registrar.vue'),
      },
      {
        path: '/validacion',
        name: 'validation',
        component: () => import('@/components/shared/ValidationCodeview.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/registroterminado',
        name: 'registrationended',
        component: () => import('@/components/shared/WelcomeView.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/components/shared/LoginView.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: () => import('@/components/shared/forgotpassword.vue'),
      },
      {
        path: '/recuperacioncontrasena',
        name: 'passwordrecovery',
        component: () => import('@/components/shared/PasswordRecoveryView.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/recoverpasswordsuccess',
        name: 'recoverpasswordsuccess',
        component: () => import('@/components/shared/recoverpasswordsuccess.vue'),
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/components/shared/Profile.vue'),
      },
      {
        path: '/datos',
        name: 'userdata',
        component: () => import('@/components/shared/UserDataView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/nda',
        name: 'nda',
        component: () => import('@/components/shared/NDA.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/validacion3',
        name: 'data',
        component: () => import('@/components/shared/ValidationDataView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/datosfiscales',
        name: 'fiscaldata',
        component: () => import('@/components/shared/FiscalDataView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/registrocompletoterminado',
        name: 'completedregistrationended',
        component: () => import('@/components/shared/CompletedRegistrationView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/scan/:side',
        name: 'scandni',
        component: () => import('@/components/shared/ScanView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/validacion2',
        name: 'images',
        component: () => import('@/components/shared/ImagesView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/cambiocontrasena',
        name: 'passwordchange',
        component: () => import('@/components/shared/PasswordView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/contrasenasuccess',
        name: 'passwordchangesuccess',
        component: () => import('@/components/shared/PasswordSuccessView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/contrasenaerror',
        name: 'passwordchangeerror',
        component: () => import('@/components/shared/PasswordErrorView.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('@/components/client/modulo12-listafavoritos/ListaFavoritos.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/oportunidades',
        name: 'opportunities',
        component: () => import('@/components/client/modulo-oportunidades/ListaOportunidades.vue'),
        meta: { requiredlogin: false }
      },      
      {
        path: '/doblefactor',
        name: 'doblefactor',
        component: () => import('@/components/shared/PageDobleFactor.vue'),
        meta: { requiredlogin: false }
      }, 
      {
        path: '/codigodoblefactor',
        name: 'codigodoblefactor',
        component: () => import('@/components/shared/PageCodigoDobleFactor.vue'),
        meta: { requiredlogin: false }
      },
      {
        path: '/verificacionexitoso',
        name: 'verificacionexitoso',
        component: () => import('@/components/shared/PageDobleFactorExitoso.vue'),
        meta: { requiredlogin: true }
      },
      {
        path: '/AutenticadorLogin',
        name: 'AutenticadorLogin',
        component: () => import('@/components/shared/PageAutenticadorLogin.vue'),
        meta: { requiredlogin: true }
      }
    ],
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiredlogin)) {
    if (store.state.isLogin) {
      next();
    } else {
      next('login')
    }
  } else {
    next()
  }
})

export default router
