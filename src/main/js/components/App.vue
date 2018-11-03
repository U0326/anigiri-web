<template>
    <div>
        <anime-list />
        <bar-graph :titleText="titleText" :chartData="dataCollection" />
    </div>
</template>

<script>
    import BarGraph from './BarGraph.vue'
    import dummy_data from '../../../test/resources/2018_04_cour.json'
    export default {
        data: function() {
            return {
//              TODO 以下動的に値を設定する必要がある。
                titleText: '2018年第4クールのアニメ一覧',
                dataCollection: null
            }
        },
        mounted: function() {
            this.load();
        },
        methods: {
            load() {
                let labels = [];
                let data = [];
                for (let anime of dummy_data['animes']) {
                    labels.push(anime.title);
                    data.push(anime.gave_up_tweet_count);
                }

                this.dataCollection = {
                    labels: labels,
                    datasets: [ {data: data} ]
                }
            }
        },
        components: {
            BarGraph
        }
    }
</script>
