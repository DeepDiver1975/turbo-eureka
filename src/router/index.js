import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccessDenied from '../views/AccessDenied.vue'
import OidcCallbackPage from '../views/OidcCallback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
},
  {
    path: '/access-denied',
    name: 'addessDenied',
    component: AccessDenied,
  },
  {
    path: '/oidc-callback',
    components: OidcCallbackPage,
  },
  {
    path: '/oidc-silent-redirect',
    components: OidcCallbackPage,
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
