import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Input, Tree, Dialog, Tabs, TabPane} from 'element-ui';
import Axios from 'axios';
import Qs from 'qs';

import scrollBar from './components/ScrollBar';
import MyButton from './components/MyButton';

Vue.use(Button)
Vue.use(Input)
Vue.use(Tree)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)

Axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

Vue.prototype.$qs = Qs;
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

Vue.component('scroll-bar', scrollBar);
Vue.component('my-but', MyButton);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')