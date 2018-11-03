import Vue from 'vue';
import App from './components/App.vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

window.onload = function() {
    Vue.use(ElementUI);
    new Vue(App).$mount('#app');
}
