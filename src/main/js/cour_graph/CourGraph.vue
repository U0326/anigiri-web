<template>
    <div>
        <graph-navigation />
        <bar-graph />
    </div>
</template>

<script>
    import GraphNavigation from './GraphNavigation.vue';
    import BarGraph from './BarGraph.vue';
    import calculateLogics from './calculate_logics';

    export default {
        components: {
            GraphNavigation,
            BarGraph
        }
    }
</script>
