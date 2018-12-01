import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';

// TODO 以下ダミーデータの為、削除する必要あり。
import cours from '../../test/resources/cours.json';
import graphRowData from '../../test/resources/2018_04_cour.json'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        sortedCours: (function() {
            let yearSorted = cours.term.sort(function(x, y) {
                if (x.year < y.year) {
                    return 1;
                } else {
                    return -1;
                }
            });
            let yearAndCourSorted = yearSorted.map(function(element) {
                element.cours = element.cours.sort(function(x, y) {
                    if (x > y) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                return element;
            });
            return yearAndCourSorted;
        }()),
        courNavigationId: null,
        graphRowData: (function(){
            return graphRowData;
        }())
    },
    mutations: {
        updateGraphRowData: function(state, payload) {
            state.graphRowData = payload;
        }
    }
})
export default store;