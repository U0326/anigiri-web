import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue';
import router from './router.js'
import store from './store.js';

window.onload = function() {
    Vue.use(ElementUI, {locale});
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    })
}
