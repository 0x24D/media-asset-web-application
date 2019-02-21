import Axios from 'axios';
import Vue from 'vue';
import {
  MdButton,
  MdCard,
  MdDialog,
  MdField,
  MdList,
  MdRipple,
  MdSnackbar,
  MdToolbar,
  MdTooltip,
} from 'vue-material/dist/components';
import App from './App.vue';
import store from './store/index';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.Authorization = token;
}

Vue.prototype.$axios = Axios;

// Material components
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdDialog);
Vue.use(MdField);
Vue.use(MdList);
Vue.use(MdRipple);
Vue.use(MdSnackbar);
Vue.use(MdToolbar);
Vue.use(MdTooltip);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
