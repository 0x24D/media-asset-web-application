import Axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.Authorization = token;
}

Vue.prototype.$axios = Axios;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
