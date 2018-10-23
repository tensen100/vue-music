import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import './assets/less/index.less'

Vue.config.productionTip = false;

Vue.use(VueLazyLoad, {
  loading: require('./assets/image/default.png')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
