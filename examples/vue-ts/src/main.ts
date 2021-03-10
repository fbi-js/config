import Vue from 'vue'

import App from '@/App.vue'
import router from '@/router'
import '@/assets/css/main.scss'
import '@/assets/css/index.less'

Vue.config.productionTip = false

console.log(123123)
new Vue({
  name: 'MyApp',
  router,
  render: h => h(App)
}).$mount('#app')
