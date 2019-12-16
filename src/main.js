import Vue from 'vue'
import GetTextPlugin from 'vue-gettext'
import App from './App.vue'
import router from './router'

// Import the Design System
import DesignSystem from 'owncloud-design-system'
import 'owncloud-design-system/dist/system/system.css'
Vue.use(DesignSystem)

Vue.use(GetTextPlugin, {
  // availableLanguages: supportedLanguages,
  defaultLanguage: navigator.language.substring(0, 2),
  // TODO: read translations from json
  translations: [],
  silent: true
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
