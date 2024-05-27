import { createRouter, createWebHistory } from 'vue-router'
import PlanetDetailsView from '../views/PlanetDetail.vue'
import PlanetsListView from '../views/PlanetsList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'planetsList',
      component: PlanetsListView
    },
    {
      path: '/planet',
      name: 'planetDetails',
      component: PlanetDetailsView
    }
  ]
})

export default router
