import Vue from 'vue';
import VueRouter from 'vue-router';

import BarGraph from './graph_common/BarGraph.vue';
import CourGraph from './cour_graph/CourGraph.vue'
import DetailGraph from './detail_graph/DetailGraph.vue';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', redirect: to => {
            let today = new Date();
            return '/term/' + today.getFullYear() + '/' + Math.floor(today.getMonth() / 3 + 1);
        }},
        { path: '/term/:year/:cour', component: CourGraph },
        { path: '/detail/:year/:cour/:animeId', component: DetailGraph }
    ]
})

export default router