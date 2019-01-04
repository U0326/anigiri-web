<template>
    <div>
        <div id="header">
            <a href="/"><img src="images/logo.png"/></a>
            <h1>今期最も切られているアニメはこれだ！</h1>
            <h2>タイトル + 「切った」でヒットしたツイートを集計中、</br>効率的なアニメライフを送ろう。</h2>
        </div>
            <div id="content">
                <div id="side-menu">
                    <anime-list />
                </div>
                <div id="graph" v-loading="loadingGraphData">
                    <graph-navigation />
                    <router-view />
                </div>
            </div>
        <div id="footer">
            <span id="copyright">© 2019 Garaku Project.</span>
        </div>
    </div>
</template>

<script>
    import AnimeList from './graph_common/AnimeList.vue';
    import GraphNavigation from './graph_common/GraphNavigation.vue'

    export default {
        components: {
            AnimeList,
            GraphNavigation
        },
        data: function() {
            return {
                loadingGraphData: null
            }
        },
        computed: {
            paths() {return [this.pathYear, this.pathCour, this.pathAnimeId]},
            pathYear() {return this.$route.params.year },
            pathCour() {return this.$route.params.cour},
            pathAnimeId() {return this.$route.params.animeId},
            graphRowData() {return this.$store.state.graphRowData}
        },
        mounted: function() {
            this.updateAnimeListIdFromPath();
        },
        watch: {
            'paths': function() {
                this.updateAnimeListIdFromPath();
            },
            'graphRowData': function() {
                this.loadingGraphData = false;
            }
        },
        methods: {
            updateAnimeListIdFromPath() {
                this.loadingGraphData = true;
                let animeId = this.pathYear + '-' + this.pathCour;
                if (this.pathAnimeId) {
                    animeId += '-' + this.pathAnimeId;
                }
                this.$store.dispatch('updateBasedOnAnimeListId', animeId);
            }
        }
    }
</script>

<style lang="sass">
    @font-face
        font-family: 'keifont'
        src: url('../resources/static/font/keifont.ttf')

    body
        padding: 0
        margin: 0
        background: repeating-linear-gradient(45deg, #f4f4f4, #f4f4f4 25px, #f0f0f0 25px, #f0f0f0 50px)
        background-attachment: fixed
        font-family: -apple-system, BlinkMacSystemFont,  "游ゴシック体",  YuGothic, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", Arial, Helvetica, "sans-serif"

        #header
            height: 320px
            background: url('../resources/static/images/header.png') repeat-x
            text-align: center
            margin-bottom: 20px
            h1
                font-family: "keifont"
        #content
            min-height: calc(100vh - 340px - 150px)
            width: 980px
            margin: 0 auto
            overflow : hidden
            #side-menu
                float: left
                width: 250px
                padding: 5px
                margin-right: 20px
                background-color: white
                border-radius: 15px
            #graph
                float: right
                width: 680px
                padding: 5px
                background-color: white
                border-radius: 15px
                text-align: center

        #footer
            clear: both
            margin-top: 36px
            height: 114px
            background: url('../resources/static/images/footer.png') repeat-x
            text-align: center
            #copyright
                vertical-align: -60px
                color: gray
</style>
