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
        }
    }
</script>
