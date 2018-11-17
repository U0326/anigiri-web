<script>
    import { Bar } from 'vue-chartjs'
    import zoom from 'chartjs-plugin-zoom';

    const MAXIMUM_DISPLAY_COUNT = 8;

    export default {
        extends: Bar,
        data: function() {
            return {
                // TODO 以下をdataで持つ意味がない。別ファイルに切り出したい。
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: null
                    },
                    scales: {
                        xAxes: [{
                            ticks:{
                                autoSkip: false,
                                min: null,
                                max: null
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                    },
                    onClick: function (event, element) {
                        if (!element || element.length === 0) return;
                        console.log(element[0]._model.label);
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                    },
                    zoom: {
                        enabled: true,
                        mode: ''
                    }
                }
            }
        },
        props: ['rowData', 'calculateLogic'],
        mounted: function() {
            this.addPlugin(zoom);
            this.callRenderChart(this.rowData);
        },
        watch: {
            'calculateLogic': {
                handler(newValue, oldValue) {
                    this.callRenderChart(this.rowData);
                }
            }
        },
        methods: {
            callRenderChart(rowData) {
                let sortedData = this.rowData.animes.sort(this.calculateLogic.takeSortLogic);
                let resultChartData = this.prepareData(sortedData);
                let resultOptions = this.prepareOptions(sortedData);

                this.renderChart(resultChartData, resultOptions);
            },
            prepareData(sortedData) {
                let resultLabels = [];
                let resultData = [];
                for (let element of sortedData) {
                    resultLabels.push(element.title);
                    resultData.push(this.calculateLogic.calculate(element));
                }

                return {
                    labels: resultLabels,
                    datasets: [ {data: resultData} ]
                }
            },
            prepareOptions(sortedData) {
                let newOptions = this.options;
                newOptions.title.text = this.calculateLogic.description;

                newOptions.scales.xAxes[0].ticks.min = sortedData[0].title;
                newOptions.scales.xAxes[0].ticks.max = sortedData[MAXIMUM_DISPLAY_COUNT - 1].title;

                return newOptions;
            }
        }
    }
</script>
