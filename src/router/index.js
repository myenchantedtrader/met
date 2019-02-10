import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/Home/'
import MarketPage from '@/views/Market/'
import NotFoundPage from '@/views/NotFound/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/market',
      name: 'market',
      component: MarketPage
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFoundPage
    }
  ]
})
