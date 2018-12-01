import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';

import {createAnimeListId} from './util.js';

// TODO 以下ダミーデータの為、削除する必要あり。
import cours from '../../test/resources/cours.json';
import dummyData from '../../test/resources/2018_04_cour.json'

Vue.use(Vuex);
let graphRowData;
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
        graphRowData: (function() {
            graphRowData = dummyData;
            return graphRowData;
        }()),
        animeListId: (function() {
            return createAnimeListId(graphRowData);
        }())
    },
    mutations: {
        updateGraphRowData: function(state, payload) {
            state.graphRowData = payload;
        },
        updateAnimeListId: function(state, payload) {
            state.animeListId = payload;
        }
    }
})
export default store;