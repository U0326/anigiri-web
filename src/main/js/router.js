import Vue from 'vue'
import VueRouter from 'vue-router'

import CourGraph from './cour_graph/CourGraph.vue'
import DetailGraph from './detail_graph/DetailGraph.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: CourGraph },
        { path: '/detail/:id', component: DetailGraph }
    ]
})

export default router