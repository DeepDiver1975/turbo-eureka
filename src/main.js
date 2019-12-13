import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Mgr from './services/SecurityService';

// Import the Design System
import DesignSystem from 'owncloud-design-system'
import 'owncloud-design-system/dist/system/system.css'
Vue.use(DesignSystem)

Vue.config.productionTip = false

// setup route guards
let mgr = new Mgr();
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  console.log('router.before: ' + to);
  if (to.matched.some(route => route.meta.requiresAuth)) {
      mgr.getUser().then(
        user => {
          if (user === null) {
            mgr.signIn()
          }
          // eslint-disable-next-line no-console
          console.log(user)
          // TODO: set avatar
          next()
        },
        err => {
          // eslint-disable-next-line no-console
          console.log(err);
          next('/access-denied');
        }
      )    
  } 
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
