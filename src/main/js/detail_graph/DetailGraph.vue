<script>
    import BarGraph from '../graph_common/BarGraph.vue';

    const MAXIMUM_DISPLAY_COUNT = 30;
    export default {
        extends: BarGraph,
        methods: {
            sortData(graphRowData) {
                return this.graphRowData.data.sort(function(a, b) {
                    if (a.tweetedDate > b.tweetedDate) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            },
            doPrepareData(sortedData) {
                let labels = [];
                let data = [];
                for (let element of sortedData) {
                    labels.push(element.tweetedDate);
                    data.push(this.calculateLogic.calculate(element));
                }
                return {
                    labels: labels,
                    datasets: [ {data: data} ]
                }
            },
            appendOptions(chartData, newOptions) {
                newOptions.scales.xAxes[0].type = 'time';
                newOptions.scales.xAxes[0].time = {
                    autoSkip: false,
                    unit: 'day',
                    displayFormats: { day: 'M/D' },
                    min: chartData.labels[0],
                    max: chartData.labels[MAXIMUM_DISPLAY_COUNT]
                };
                return newOptions;
            },
        }
    }
</script>
