// Composables
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/components/shared/pages/404.vue'
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
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
