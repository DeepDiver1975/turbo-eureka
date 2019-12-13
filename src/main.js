import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Import the Design System
import DesignSystem from 'owncloud-design-system'
import 'owncloud-design-system/dist/system/system.css'
Vue.use(DesignSystem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
