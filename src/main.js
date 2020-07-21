import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './store'
import './utils/Mock'
import './utils/MockCSRData'
Vue.use(Element)
// import 'element-ui/lib/theme-chalk/index.css';
import picc from 'web-plugin';
import "web-plugin/common/picc.css"
Vue.config.productionTip = false
window._router=router
Vue.use(picc)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
