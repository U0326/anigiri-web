<script>
    import { Bar, mixins } from 'vue-chartjs'

    export default {
        extends: Bar,
        mixins: [mixins.reactiveProp],
        data: function() {
            return {
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: this.titleText
                    },
                    scales: {
                        xAxes: [{
                            ticks:{
                                autoSkip: false,
                                maxTicksLimit: 2
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                            }
                        }]
                    }
                }
            }
        },
        props: ['chartData', 'titleText'],
        watch: {
            'titleText': {
                handler(newTitleText, oldTitleText) {
                    let newOptions = Object.assign({}, JSON.parse(JSON.stringify(this.options)));
                    newOptions.title.text = newTitleText;
                    this.renderChart(this.chartData, newOptions);
                }
            }
        },
        mounted: function() {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>