<script>
    import { Bar, mixins } from 'vue-chartjs'

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
                        text: this.calculateLogic.description
                    },
                    scales: {
                        xAxes: [{
                            ticks:{
                                autoSkip: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                    }
                },
            }
        },
        props: ['rowData', 'calculateLogic'],
        watch: {
            'calculateLogic': {
                handler(newValue, oldValue) {
                    let newOptions = Object.assign({}, JSON.parse(JSON.stringify(this.options)));
                    newOptions.title.text = newValue.description;
                    this.renderChart(this.prepareData(this.rowData), newOptions);
                }
            }
        },
        mounted: function() {
            this.renderChart(this.prepareData(this.rowData), this.options)
        },
        methods: {
            prepareData(rowData) {
                let sortedData = this.rowData.animes.sort(this.calculateLogic.takeSortedLogic);

                let labels = [];
                let data = [];
                for (let element of sortedData) {
                    labels.push(element.title);
                    data.push(this.calculateLogic.calculate(element));
                }

                return {
                    labels: labels,
                    datasets: [ {data: data} ]
                }
            }
        }
    }
</script>
