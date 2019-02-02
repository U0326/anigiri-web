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
        return retrieveJson('/anime/' + ids[2], 'graphData');
    } else {
        return retrieveJson('/cour/' + ids[0] + '/' + ids[1], 'graphData');
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
        graphTitle: null,
        ajaxResult: {}
    },
    mutations: {
        updateAllCours: function(state, payload) {
            state.allCours = payload.terms.sort(
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
        },
        updateAjaxResult: function(state, payload) {
            state.ajaxResult = payload;
        }
    },
    actions: {
        async updateBasedOnAnimeListId(context, animeListId) {
            let newAnimeListId = animeListId;
            context.commit('updateAnimeListId', newAnimeListId)
            let graphRowData = await fetchGraphRowData(newAnimeListId);
            if (!graphRowData) return;
            context.commit('updateGraphRowData', graphRowData);
            context.commit('updateGraphTitle', createGraphTitle(graphRowData));
        },
        reflectAjaxResult(context, { key, result }) {
            let newAjaxResult = {};
            Object.assign(newAjaxResult, context.state.ajaxResult);
            newAjaxResult[key] = result;
            context.commit('updateAjaxResult', newAjaxResult);
        }
    }
});

export default store;
