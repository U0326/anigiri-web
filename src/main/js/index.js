import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router.js'

window.onload = function() {
    Vue.use(ElementUI);
    new Vue({
        el: '#app',
        router,
        render: h => h(App)
    })
}
