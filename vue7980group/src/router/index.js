import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue')
    },
    {
      path: '/browse/:filterType?',
      name: 'browse',
      component: () => import('../views/BrowseView.vue'),
      props: true
    },
    {
      path: '/search/:searchText?',
      name: 'search',
      component: () => import('../views/BrowseView.vue'),
      props: true
    },
    {
      path: '/post/:postId?',
      name: 'post',
      component: () => import('../views/PostView.vue'),
      props: true
    },
  ]
})


export default router
