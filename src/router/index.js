import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AccessDenied from '../views/AccessDenied.vue'
import OidcCallbackPage from '../views/OidcCallback.vue'
import Mgr from '../services/SecurityService';


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
    name: 'oidc-callback',
    component: OidcCallbackPage,
  },
  {
    path: '/oidc-silent-redirect',
    name: 'oidc-silent-redirect',
    component: OidcCallbackPage,
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.getManager = function () {
  // HACK
  if (window.user_manager === undefined) {
    return fetch('config.json').then(config => {
      return config.json().then(json => {
        // HACK
        window.config = json
        const baseUrl = window.location.href
        json.openIdConnect.redirect_uri = baseUrl + 'oidc-callback'
        json.openIdConnect.post_logout_redirect_uri = baseUrl
        json.openIdConnect.silent_redirect_uri = baseUrl + 'oidc-silent-redirect'

        // HACK
        window.user_manager = new Mgr(json.openIdConnect);
        return window.user_manager
      })
    })
  } 

  return Promise.resolve(window.user_manager)
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    router.getManager().then(mgr => {
      mgr.getUser().then(
        user => {
          if (user === null) {
            mgr.signIn()
          }
          // eslint-disable-next-line no-console
          console.log(user)
          // TODO: set avatar
          next()
        })    
    }) 
  } else {
    next();
  }
});

export default router
