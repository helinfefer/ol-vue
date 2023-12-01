import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入路由器
import router from './router';
import Paginate from 'vuejs-paginate';

// 引入mapbox
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

Vue.component('app-paginate', Paginate);

Vue.use(VueMapbox, { mapboxgl: Mapbox });

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  //导入插件
Vue.config.productionTip = true
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


// 引入 store 
import store from './store/index.js';


Vue.use(VueRouter);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ElementUI);


new Vue({
  router,
  render: h => h(App),
  store:store,  //可以简写
}).$mount('#app')

