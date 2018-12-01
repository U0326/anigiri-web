<template>
    <div>
        <graph-navigation v-on:tab-event="changeGraphMode" />
        <bar-graph :calculateLogic="calculateLogic" />
    </div>
</template>

<script>
    import GraphNavigation from './GraphNavigation.vue';
    import BarGraph from './BarGraph.vue';
    import calculateLogics from './calculate_logics';

    export default {
        data: function() {
            return {
                calculateLogics: null,
                calculateLogic: null,
            }
        },
        beforeMount: function() {
            this.calculateLogics = calculateLogics;
            this.calculateLogic = calculateLogics[0];
        },
        methods: {
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
