import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TeamsView from '../views/TeamsView.vue'
import SelectionView from '../views/SelectionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/teams',
      name: 'teams',
      component: TeamsView
    },
    {
      path: '/selection',
      name: 'selection',
      component: SelectionView
    },
  ]
})

export default router
