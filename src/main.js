import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 
import echarts from 'echarts';
import './css/normal.css';
import {myFun} from './functions';
import comm from './common';
import store from './store/store'
import axios from 'axios';

 
Vue.prototype.$axios=axios; 
Vue.use(ElementUI);
Vue.use(myFun);
Vue.mixin(comm);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
store.commit("log_auth");

/* eslint-disable no-new */
const v=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
  store.commit("log_auth");
  next();
})