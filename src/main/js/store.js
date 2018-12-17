import 'babel-polyfill'
import Vue from 'vue';
import Vuex from 'vuex';

import { createAnimeListId, createCourLabel } from './util.js';

// TODO 以下ダミーデータの為、削除する必要あり。↓
import dummyData01 from '../../test/resources/2018_04_cour.json';
import dummyData02 from '../../test/resources/20xx_xx_cour.json';
import dummyData03 from '../../test/resources/2018_04_00001.json';
import cours from '../../test/resources/cours.json';
import dummyData from '../../test/resources/2018_04_cour.json'
// TODO 以下ダミーデータの為、削除する必要あり。↑

import calculateLogics from './graph_common/calculate_logics';

Vue.use(Vuex);

function fetchGraphRowData(animeListId) {
    if (animeListId) {
        let ids = animeListId.split('-');
        // animeIdも含まれていた場合
        if (ids.length == 3) {
            // TODO 適切なデータを取得する。
            return dummyData03;
        } else {
            // TODO 適切なデータを取得する。
            return dummyData02;
        }
    } else {
        // 初回表示時
        // TODO 今期のデータを取得する。
        return dummyData01;
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

// TODO 削除出来ないか検討する。利用個所はstate中のanimeListId, graphTitleである。
let graphRowData;
const store = new Vuex.Store({
    state: {
        currentDisplayMethod: calculateLogics[0].label,
        sortedCours: (function() {
            let yearSorted = cours.term.sort(function(x, y) {
                // 年に関して、降順にソートする。
                if (x.year < y.year) {
                    return 1;
                } else {
                    return -1;
                }
            });
            let yearAndCourSorted = yearSorted.map(function(element) {
                element.cours = element.cours.sort(function(x, y) {
                    // クールに関して、昇順にソートする。
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
            graphRowData = fetchGraphRowData();
            return graphRowData;
        }()),
        animeListId: (function() {
            return createAnimeListId(graphRowData);
        }()),
        graphTitle: createGraphTitle(graphRowData)
    },
    mutations: {
        updateCurrentDisplayMethod: function(state, payload) {
            state.currentDisplayMethod = payload;
        },
        updateBasedOnAnimeListId: function(state, payload) {
            let newAnimeListId = payload;
            if (state.animeListId == newAnimeListId) return;
            let graphRowData = fetchGraphRowData(newAnimeListId);

            state.animeListId = newAnimeListId;
            state.graphRowData = graphRowData;
            state.graphTitle = createGraphTitle(graphRowData);
        },
    }
});

export default store;
