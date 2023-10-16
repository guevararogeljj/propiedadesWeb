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
      { path: '*', component: NotFound },
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
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
