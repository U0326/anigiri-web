<script>
    import BarGraph from '../graph_common/BarGraph.vue';
    import { createAnimeListId } from '../util.js';

    const MAXIMUM_DISPLAY_COUNT = 12;
    export default {
        extends: BarGraph,
        methods: {
            sortData(graphRowData) {
                return this.graphRowData.data.sort(this.calculateLogic.takeSortLogic);
            },
            doPrepareData(sortedData) {
                let labels = [];
                let datasets = [];
                for (let element of sortedData) {
                    labels.push(element.title);
                    datasets.push(this.calculateLogic.calculate(element));
                }

                return {
                    labels: labels,
                    datasets: [ {data: datasets} ]
                }
            },
            appendOptions(chartData, newOptions){
                newOptions.scales.xAxes[0].ticks = {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    min: chartData.labels[0],
                    max: chartData.labels[MAXIMUM_DISPLAY_COUNT]
                };
                return newOptions;
            },
            handleClick(event, element) {
                // グラフ以外の場所がクリックされた場合は何もしない。
                if (!element || element.length === 0) return;
                let id = this.graphRowData.data.find(function(anime) {
                    return anime.title === element[0]._model.label;
                }).id;
                let updatingAnimeListId = createAnimeListId(this.graphRowData) + '-' + id;
                this.$router.push('/detail/' + updatingAnimeListId.replace(/-/g, '/'));
            }
        }
    }
</script>
