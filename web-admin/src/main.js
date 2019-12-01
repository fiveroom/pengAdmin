import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Input, Table, TableColumn, Tree } from 'element-ui';
import Axios from 'axios';
import Qs from 'qs';

import scrollBar from './components/ScrollBar'

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tree)

Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

Vue.prototype.$qs = Qs;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

Vue.component('scroll-bar', scrollBar);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')