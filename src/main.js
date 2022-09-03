import Vue from 'vue'
import App from './App.vue'
// import dragResize from './index'
Vue.config.productionTip = false
// Vue.use(dragResize)
new Vue({
  render: h => h(App),
}).$mount('#app')
