<template>
    <div>
        <div>
            <anime-list />
        </div>
        <div>
            <graph-navigation />
            <router-view />
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
        computed: {
            paths() {return [this.pathYear, this.pathCour, this.pathAnimeId]},
            pathYear() {return this.$route.params.year },
            pathCour() {return this.$route.params.cour},
            pathAnimeId() {return this.$route.params.animeId},
        },
        mounted: function() {
            this.updateAnimeListIdFromPath();
        },
        watch: {
            'paths': function() {
                this.updateAnimeListIdFromPath();
            }
        },
        methods: {
            updateAnimeListIdFromPath() {
                let animeId = this.pathYear + '-' + this.pathCour;
                if (this.pathAnimeId) {
                    animeId += '-' + this.pathAnimeId;
                }
                this.$store.commit('updateBasedOnAnimeListId', animeId);
            }
        }
    }
</script>
