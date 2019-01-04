import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';

import { createAnimeListId, createCourLabel, retrieveJson } from './util.js';
import calculateLogics from './graph_common/calculate_logics';

Vue.use(Vuex);

function fetchGraphRowData(animeListId) {
    let ids = animeListId.split('-');
    // animeIdも含まれていた場合
    if (ids.length == 3) {
        return retrieveJson('/anime/' + ids[2]);
    } else {
        return retrieveJson('/cour/' + ids[0] + '/' + ids[1]);
    }
}
function createGraphTitle(graphRowData) {
    if (graphRowData.animeId) {
        // 各アニメ毎の詳細グラフ用のデータの場合、アニメタイトルを表示する。
        return graphRowData.title;
    } else {
        return graphRowData.year + '年' + createCourLabel(graphRowData.cour);
    }
}

const store = new Vuex.Store({
    state: {
        currentDisplayMethod: calculateLogics[0].label,
        allCours: null,
        graphRowData: null,
        animeListId: null,
        graphTitle: null
    },
    mutations: {
        updateAllCours: function(state, payload) {
            state.allCours = payload.term.sort(
                    function(x, y) {
                        // 年に関して、降順にソートする。
                        return x.year < y.year ? 1 : -1;
                    }).map(function(element) {
                        element.cours = element.cours.sort(function(x, y) {
                            // クールに関して、昇順にソートする。
                            return x > y ? 1 : -1;
                        })
                        return element;
                    });
        },
        updateCurrentDisplayMethod: function(state, payload) {
            state.currentDisplayMethod = payload;
        },
        updateAnimeListId: function(state, payload) {
            state.animeListId = payload;
        },
        updateGraphRowData: function(state, payload) {
            state.graphRowData = payload;
        },
        updateGraphTitle: function(state, payload) {
            state.graphTitle = payload;
        }
    },
    actions: {
        async updateBasedOnAnimeListId(context, animeListId) {
            let newAnimeListId = animeListId;
            context.commit('updateAnimeListId', newAnimeListId)
            let graphRowData = await fetchGraphRowData(newAnimeListId);
            context.commit('updateGraphRowData', graphRowData);
            context.commit('updateGraphTitle', createGraphTitle(graphRowData));
        }
    }
});

export default store;
