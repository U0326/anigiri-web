<script>
    import { Bar } from 'vue-chartjs'
    import zoom from 'chartjs-plugin-zoom';
    import calculateLogics from './calculate_logics';

    const GRAPH_COLOR = '#ffeaff';
    export default {
        extends: Bar,
        data: function() {
            return {
                options: {
                    legend: { display: false },
                    title: { display: true, text: null },
                    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0 } }] },
                    onClick: null,
                    pan: { enabled: true, mode: 'x', },
                    zoom: { enabled: true, mode: '' }
                }
            }
        },
        computed: {
            graphRowData() {
                return this.$store.state.graphRowData;
            },
            animeListId() {
                return this.$store.state.animeListId;
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
            'graphRowData': function() {
                this.callRenderChart(this.graphRowData);
            }
        },
        methods: {
            callRenderChart(graphRowData) {
                if (!this.graphRowData) return;
                let sortedData = this.sortData(this.graphRowData);
                let chartData = this.prepareData(sortedData);
                let options = this.prepareOptions(chartData);
                this.renderChart(chartData, options);
            },
            sortData(graphRowData) {
                throw new Error("This is not implemented.");
            },
            prepareData(sortedData) {
                let chartData = this.doPrepareData(sortedData);
                let colors = [];
                for (let i = 0; i < chartData.datasets[0].data.length; i++) {
                    colors.push(GRAPH_COLOR);
                }
                chartData.datasets[0].backgroundColor = colors;
                return chartData;
            },
            doPrepareData(sortedData) {
                throw new Error("This is not implemented.");
            },
            prepareOptions(chartData) {
                let newOptions = Object.assign({}, this.options);
                newOptions.title.text = this.calculateLogic.description;
                return this.appendOptions(chartData, newOptions);
            },
            appendOptions(chartData, newOptions){
                throw new Error("This is not implemented.");
            }
        }
    }
</script>
