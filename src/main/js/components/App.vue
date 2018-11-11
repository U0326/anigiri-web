<template>
    <div>
        <graph-navigation v-on:tab-event="changeGraphMode" :calculateLogics="calculateLogics" />
        <bar-graph :calculateLogic="calculateLogic" :rowData="rowData" />
    </div>
</template>

<script>
    import GraphNavigation from './GraphNavigation.vue';
    import BarGraph from './BarGraph.vue';
    import calculateLogics from './calculate_logics';

    // TODO 以下ダミーデータの為、削除する必要あり。
    import dummy_data from '../../../test/resources/2018_04_cour.json'

    export default {
        data: function() {
            return {
                calculateLogics: null,
                calculateLogic: null,
                rowData: null
            }
        },
        beforeMount: function() {
            this.init();
        },
        methods: {
            init() {
                this.calculateLogics = calculateLogics;
                this.calculateLogic = calculateLogics[0];
                // TODO 動的に値を設定する様に修正する。
                this.rowData = dummy_data;
            },
            changeGraphMode: function(label) {
                this.calculateLogic = calculateLogics.find(function(logic) {
                    return logic.label === label;
                });
            }
        },
        components: {
            GraphNavigation,
            BarGraph
        }
    }
</script>
