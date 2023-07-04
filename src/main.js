import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// 引入路由器
import router from './router';
import Paginate from 'vuejs-paginate';
Vue.component('app-paginate', Paginate);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  //导入插件
Vue.config.productionTip = true
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
