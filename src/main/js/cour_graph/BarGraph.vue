<script>
    import { Bar } from 'vue-chartjs'
    import zoom from 'chartjs-plugin-zoom';
    import { createAnimeListId } from '../util.js';
    import calculateLogics from './calculate_logics';

    const MAXIMUM_DISPLAY_COUNT = 8;

    export default {
        extends: Bar,
        data: function() {
            return {
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
                            // TODO 各アニメ個別のグラフはx軸がdateである。
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
                    onClick: null,
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
        computed: {
            graphRowData() {
                return this.$store.state.graphRowData
            },
            animeListId() {
                return this.$store.state.animeListId
            },
            calculateLogic() {
                return calculateLogics.find((logic) => {
                    return logic.label === this.$store.state.currentDisplayMethod;
                });

            }
        },
        mounted: function() {
            this.addPlugin(zoom);
            this.options.onClick = this.handleClick;
            this.callRenderChart(this.graphRowData);
        },
        watch: {
            'calculateLogic': function() {
                this.callRenderChart(this.graphRowData);
            },
            'animeListId': function() {
                this.callRenderChart(this.graphRowData);
            }
        },
        methods: {
            callRenderChart(graphRowData) {
                // クール毎のgraphRowDataが用意できていない場合はスキップする。戻るボタン押下直後などが該当する。
                if (!this.graphRowData.animes) return;
                // TODO 各アニメ個別のグラフはソートしない。
                let sortedData = this.graphRowData.animes.sort(this.calculateLogic.takeSortLogic);
                let resultChartData = this.prepareData(sortedData);
                let resultOptions = this.prepareOptions(sortedData);

                this.renderChart(resultChartData, resultOptions);
            },
            prepareData(sortedData) {
                let resultLabels = [];
                let resultData = [];
                for (let element of sortedData) {
                    // TODO 各アニメ個別のグラフはYY-mm-dd
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
            },
            handleClick(event, element) {
                if (!element || element.length === 0) return;
                let id = this.graphRowData.animes.find(function(anime) {
                    return anime.title === element[0]._model.label;
                }).id;
                let updatingAnimeListId = createAnimeListId(this.graphRowData) + '-' + id;
                this.$store.commit('updateBasedOnAnimeListId', updatingAnimeListId);
                this.$router.push('/detail/' + updatingAnimeListId.replace(/-/g, '/'));
            }
        }
    }
</script>
