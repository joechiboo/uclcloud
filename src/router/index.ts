import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/labs',
      name: 'labs',
      component: () => import('../views/LabListView.vue'),
    },
    {
      path: '/lab/:id',
      name: 'lab-detail',
      component: () => import('../views/LabDetailView.vue'),
    },
    {
      path: '/health-assistant',
      name: 'health-assistant',
      component: () => import('../views/HealthAssistantView.vue'),
    },
    {
      path: '/member-center',
      name: 'member-center',
      component: () => import('../views/MemberCenterView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
